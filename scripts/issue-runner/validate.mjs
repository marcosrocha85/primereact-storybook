import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawn } from 'node:child_process';

const [fileList, evidence] = process.argv.slice(2);
const files = fs.readFileSync(fileList, 'utf8').split('\0').filter(Boolean);
const log = fs.openSync(path.join(evidence, 'validation.log'), 'w');
const results = [];
let server;
async function run(command, args, env = process.env) {
  console.log(`Validate: ${command} ${args.join(' ')}`);
  fs.writeSync(log, `\n$ ${command} ${args.join(' ')}\n`);
  const child = spawn(command, args, { env, stdio: ['ignore', log, log] });
  const code = await new Promise((resolve, reject) => {
    child.once('error', reject);
    child.once('exit', resolve);
  });
  results.push({ command, args, code });
  if (code !== 0) throw new Error(`Validation failed: ${command} ${args.join(' ')}`);
}
try {
  await run('npm', ['run', 'build']);
  await run('npm', ['run', 'build-storybook']);
  const tests = new Set(files.filter(file => /^tests\/[^/]+\.test\.mjs$/.test(file) && file !== 'tests/component-review.test.mjs' && fs.existsSync(file)));
  if (files.includes('scripts/generate-component-stories.mjs')) tests.add('tests/component-generator.test.mjs');
  const components = [...new Set(files.flatMap(file => file.match(/^src\/stories\/components\/([A-Za-z0-9]+)\./)?.[1] ?? []))];
  for (const component of components) {
    const contract = `tests/${component.toLowerCase()}-contract.test.mjs`;
    if (fs.existsSync(contract)) tests.add(contract);
  }
  if (tests.size) await run(process.execPath, ['--test', ...tests]);
  if (components.length) {
    const staticRoot = path.resolve('storybook-static');
    const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
    server = http.createServer((request, response) => {
      try {
        const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
        const file = fs.realpathSync(path.resolve(staticRoot, '.' + (pathname === '/' ? '/index.html' : pathname)));
        if (!file.startsWith(staticRoot + path.sep) || !fs.statSync(file).isFile()) { response.writeHead(404).end(); return; }
        response.setHeader('Content-Type', mime[path.extname(file)] ?? 'application/octet-stream');
        const stream = fs.createReadStream(file);
        stream.on('error', () => response.destroy());
        stream.pipe(response);
      } catch { response.writeHead(404).end(); }
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    await run(process.execPath, ['--test', `--test-name-pattern=^(?:${components.join('|')}):`, 'tests/component-review.test.mjs'], {
      ...process.env, STORYBOOK_URL: `http://127.0.0.1:${server.address().port}`
    });
  } else if (files.includes('tests/component-review.test.mjs')) {
    throw new Error('Browser test changed without an identifiable component; a scoped validation plan is required');
  }
  await run('git', ['diff', '--check']);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  server?.closeAllConnections();
  server?.close();
  fs.closeSync(log);
  fs.writeFileSync(path.join(evidence, 'validation.json'), JSON.stringify(results, null, 2));
}
