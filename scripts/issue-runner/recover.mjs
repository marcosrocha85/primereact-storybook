import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { qwenSettings, qwenArgs, readOnlyArgs, assertPlan, assertImplementation } from './delegation.mjs';

const support = path.dirname(fileURLToPath(import.meta.url));
const [mode, directory, root, ...parameters] = process.argv.slice(2);
const stateFile = path.join(directory, 'checkpoint.json');
const git = (...args) => {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr);
  return result.stdout.trim();
};
function fingerprint() {
  const files = spawnSync('git', ['ls-files', '--cached', '--others', '--exclude-standard', '-z'], { cwd: root, encoding: 'utf8' });
  assert.equal(files.status, 0, files.stderr);
  const hash = crypto.createHash('sha256');
  hash.update(git('status', '--porcelain=v1'));
  for (const file of [...new Set(files.stdout.split('\0').filter(Boolean))].sort()) {
    hash.update(file + '\0');
    const filename = path.join(root, file);
    if (!fs.existsSync(filename) && !fs.lstatSync(filename, { throwIfNoEntry: false })) { hash.update('deleted'); continue; }
    const stat = fs.lstatSync(filename);
    hash.update(String(stat.mode));
    hash.update(stat.isSymbolicLink() ? fs.readlinkSync(filename) : fs.readFileSync(filename));
  }
  return hash.digest('hex');
}
function save(state) {
  fs.writeFileSync(stateFile + '.tmp', JSON.stringify(state, null, 2));
  fs.renameSync(stateFile + '.tmp', stateFile);
}
function invariant(state) {
  assert.equal(state.root, root, 'Checkpoint belongs to another checkout');
  assert.equal(git('branch', '--show-current'), state.branch, 'Branch changed since checkpoint');
  assert.equal(git('rev-parse', 'HEAD'), state.base, 'HEAD changed since checkpoint');
  assert.equal(git('diff', '--cached', '--name-only'), '', 'Unexpected staged changes');
  for (const operation of ['MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'rebase-merge', 'rebase-apply']) {
    assert.ok(!fs.existsSync(path.resolve(root, git('rev-parse', '--git-path', operation))), `Unfinished Git operation: ${operation}`);
  }
}

class RunnerFailure extends Error {}

function setPhase(label) {
  fs.writeFileSync(path.join(directory, 'phase'), label + '\n');
}

function execute(state, attempt, name, args, prompt, schema, readOnly = false) {
  const before = fingerprint();
  fs.writeFileSync(path.join(attempt, `${name}.prompt.md`), prompt);
  const log = fs.openSync(path.join(attempt, `${name}.log`), 'w');
  const resultFile = path.join(attempt, name === 'codex' ? 'result.json' : `${name}.json`);
  console.log(`${name}: ${attempt}`);
  setPhase(name === 'codex' ? `Codex implementation (attempt ${state.attempt})` : `${name} (attempt ${state.attempt})`);
  const execution = spawnSync('codex', [...args, '--output-schema', path.join(support, schema), '--output-last-message', resultFile, '-'], {
    cwd: root, input: prompt, stdio: ['pipe', log, log], encoding: 'utf8'
  });
  fs.closeSync(log);
  try {
    invariant(state);
    if (readOnly) assert.equal(fingerprint(), before, `${name} changed files despite its read-only role`);
  } catch (error) { throw new RunnerFailure(error.message); }
  state.fingerprint = fingerprint();
  save(state);
  fs.writeFileSync(path.join(attempt, 'changes.patch'), git('diff', 'HEAD'));
  if (execution.status !== 0) {
    throw new RunnerFailure(`Codex CLI failed (${execution.status ?? execution.error?.message}); inspect ${name}.log and resume after fixing the environment`);
  }
  return resultFile;
}

function changedFiles() {
  const read = args => {
    const result = spawnSync('git', args, { cwd: root, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    return result.stdout.split('\0').filter(Boolean);
  };
  return [...new Set([
    ...read(['diff', '--no-renames', '--name-only', '-z', 'HEAD']),
    ...read(['ls-files', '--others', '--exclude-standard', '-z'])
  ])].sort();
}

function validate(attempt) {
  setPhase(`controller validation (attempt ${JSON.parse(fs.readFileSync(stateFile, 'utf8')).attempt})`);
  return spawnSync(process.execPath, [path.join(support, 'validate.mjs'), path.join(directory, 'files.list'), attempt], { cwd: root, stdio: 'inherit' });
}

try {
  if (mode === 'init') {
    const qwen = parameters[0] === 'qwen' ? qwenSettings(parameters[1], parameters[2]) : null;
    save({ root, branch: git('branch', '--show-current'), base: git('rev-parse', 'HEAD'), phase: 'implementation', attempt: 0, fingerprint: fingerprint(), qwen });
  } else if (mode === 'resume') {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    invariant(state);
    assert.equal(state.phase, 'implementation', 'Automatic resume supports implementation only; inspect any existing commit/PR manually');
    assert.equal(state.fingerprint, fingerprint(), 'Working tree changed since checkpoint; preserve and reconcile external edits before resuming');
    console.log(state.base);
  } else if (mode === 'delivery') {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    invariant(state);
    assert.equal(state.fingerprint, fingerprint(), 'Working tree changed after independent validation');
    state.phase = 'delivery';
    save(state);
  } else if (mode === 'run') {
    const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    invariant(state);
    const limit = Number(process.env.CODEX_MAX_ATTEMPTS ?? 3);
    assert.ok(Number.isInteger(limit) && limit >= 1 && limit <= 10, 'CODEX_MAX_ATTEMPTS must be between 1 and 10');
    // Each explicit resume grants a new bounded recovery budget, retaining all prior evidence.
    let previousFailure;
    for (let round = 0; round < limit; round++) {
      invariant(state);
      const attempt = path.join(directory, `attempt-${++state.attempt}`);
      fs.mkdirSync(attempt);
      save(state);
      const prompt = fs.readFileSync(path.join(directory, 'prompt.md'), 'utf8') +
        `\nRecovery attempt: ${state.attempt}. Preserve and continue existing work. Read previous attempt directories in ${directory}, including diagnostics, result JSON, validation logs and changes.patch. A failed test is an investigation task. Do not repeat an unchanged failed approach.\n`;
      fs.writeFileSync(path.join(attempt, 'prompt.md'), prompt);
      console.log(`Attempt ${state.attempt}: ${attempt}`);
      let failure;
      let report;
      try {
        let resultFile;
        let validation;
        if (state.qwen) {
          // Planning and review retain the chosen cloud model/profile, with read-only file access.
          const context = prompt.slice(0, prompt.indexOf('\n\n'));
          const planPrompt = `${context}\n\n${fs.readFileSync(path.join(support, 'plan.md'), 'utf8')}\nAttempt directory: ${attempt}\nPrevious attempts: ${directory}`;
          const planFile = execute(state, attempt, 'plan', readOnlyArgs(parameters), planPrompt, 'plan.schema.json', true);
          report = JSON.parse(fs.readFileSync(planFile, 'utf8'));
          assertPlan(report);
          const plan = report;
          const planText = fs.readFileSync(planFile, 'utf8');
          const workerPrompt = `${context}\n\n${fs.readFileSync(path.join(support, 'implement-plan.md'), 'utf8')}\nCodex plan:\n${planText}`;
          const workerFile = execute(state, attempt, 'implementation', qwenArgs(root, state.qwen), workerPrompt, 'implementation.schema.json');
          report = JSON.parse(fs.readFileSync(workerFile, 'utf8'));
          if (fs.readFileSync(planFile, 'utf8') !== planText) throw new RunnerFailure('Qwen modified the saved Codex plan');
          const actual = changedFiles();
          if (actual.some(file => !plan.allowed_files.includes(file))) throw new RunnerFailure('Qwen changed files outside the Codex plan; inspect preserved changes before resuming');
          assertImplementation(plan, report, actual);
          fs.writeFileSync(path.join(directory, 'files.list'), actual.join('\0') + '\0');
          validation = validate(attempt);
          invariant(state);
          if (fingerprint() !== state.fingerprint) throw new RunnerFailure('Validation changed the implementation before Codex review');
          const reviewPrompt = `${context}\n\n${fs.readFileSync(path.join(support, 'review-plan.md'), 'utf8')}\nCodex plan:\n${planText}\nImplementation report: ${workerFile}\nController evidence directory: ${attempt}\nController validation exit: ${validation.status}`;
          resultFile = execute(state, attempt, 'review', readOnlyArgs(parameters), reviewPrompt, 'result.schema.json', true);
        } else {
          resultFile = execute(state, attempt, 'codex', parameters, prompt, 'result.schema.json');
        }
        report = JSON.parse(fs.readFileSync(resultFile, 'utf8'));
        assert.ok(['none', 'technical', 'external', 'permission', 'scope'].includes(report.blocker_kind), 'Missing blocker classification');
        if (report.status === 'blocked' && report.blocker_kind !== 'technical') {
          throw new Error(`External blocker (${report.blocker_kind}): ${JSON.stringify(report.blockers)}`);
        }
        assert.equal(report.blocker_kind, 'none', `Technical blocker: ${JSON.stringify(report.blockers)}`);
        const verification = spawnSync(process.execPath, [path.join(support, 'verify.mjs'), 'result', resultFile, path.join(directory, 'files.list')], { cwd: root, encoding: 'utf8' });
        assert.equal(verification.status, 0, verification.stderr);
        validation ??= validate(attempt);
        invariant(state);
        assert.equal(validation.status, 0, 'Independent validation failed; read validation.log');
        // Validation scripts must not silently change the patch that was reviewed.
        assert.equal(fingerprint(), state.fingerprint, 'Validation changed repository files; inspect and regenerate the report');
        fs.copyFileSync(resultFile, path.join(directory, 'result.json'));
        fs.copyFileSync(path.join(attempt, 'validation.json'), path.join(directory, 'validation.json'));
        state.fingerprint = fingerprint();
        save(state);
        process.exit(0);
      } catch (error) {
        if (error instanceof RunnerFailure) throw error;
        failure = error.message;
      }
      fs.writeFileSync(path.join(attempt, 'diagnostic.txt'), failure);
      state.fingerprint = fingerprint();
      save(state);
      console.error(failure);
      if (report?.status === 'blocked' && ['external', 'permission', 'scope'].includes(report.blocker_kind)) break;
      const signature = JSON.stringify([state.fingerprint, failure, report?.recovery_notes]);
      if (signature === previousFailure) { console.error('No progress across consecutive attempts.'); break; }
      previousFailure = signature;
    }
    throw new Error(`Recovery stopped. Fix external blockers or resume with --resume ${path.dirname(directory)}`);
  } else throw new Error(`Unknown mode: ${mode}`);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
