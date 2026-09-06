import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

test('regeneration preserves manual components and the Summary/Default contract', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'sakai-generator-'));
  const output = path.join(root, 'src/stories/components');
  const generator = path.resolve('scripts/generate-component-stories.mjs');
  const manual = ['Accordion', 'AutoComplete', 'Button', 'Image', 'Panel'];
  try {
    mkdirSync(output, { recursive: true });
    for (const name of manual) {
      for (const extension of ['stories.tsx', 'docs.mdx']) {
        writeFileSync(path.join(output, `${name}.${extension}`), `Manual ${name} ${extension}`);
      }
    }
    execFileSync(process.execPath, [generator], { cwd: root });
    const contents = () => Object.fromEntries(readdirSync(output).sort().map((file) => [file, readFileSync(path.join(output, file), 'utf8')]));
    const first = contents();
    for (const name of manual) {
      for (const extension of ['stories.tsx', 'docs.mdx']) {
        assert.equal(first[`${name}.${extension}`], `Manual ${name} ${extension}`);
      }
    }
    for (const [file, source] of Object.entries(first)) {
      if (manual.some((name) => file.startsWith(`${name}.`))) continue;
      if (file.endsWith('.stories.tsx')) {
        assert.deepEqual([...source.matchAll(/export const (\w+)/g)].map((match) => match[1]), ['Default']);
        assert.doesNotMatch(source, /include: \[\]/, 'Default exposes Controls');
        assert.doesNotMatch(source, /\bany\b/);
        if (/\bicon: \{/.test(source)) {
          assert.match(source, /icon: \{ control: 'select', options: \[undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'\] \}/, 'Icon Controls follow Button, including no icon');
        }
      }
      if (file.endsWith('.docs.mdx')) {
        assert.doesNotMatch(source, /<Controls\b|<Canvas\b/);
        assert.match(source, /<Source\b/);
        assert.match(source, /component-example sb-unstyled/);
      }
      assert.doesNotMatch(source, /vendor\/sakai-react/, 'Examples do not mount upstream pages');
    }
    execFileSync(process.execPath, [generator], { cwd: root });
    assert.deepEqual(contents(), first, 'Generation is deterministic');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
