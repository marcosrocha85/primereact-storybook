import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const [mode, filename, ...args] = process.argv.slice(2);
const source = fs.readFileSync(filename, 'utf8');
const data = mode === 'open-prs' ? source.trim().split('\n').filter(Boolean).map(line => JSON.parse(line)) : JSON.parse(source);

try {
  if (mode === 'open-prs') {
    const [issue, branch] = args;
    const reference = new RegExp(`#${issue}(?![0-9])|/issues/${issue}(?![0-9])`);
    const existing = data.find(pr => pr.head === branch || reference.test(pr.body ?? ''));
    assert.ok(!existing, `Open PR #${existing?.number} already references this issue; inspect it before continuing`);
  } else if (mode === 'result') {
    assert.equal(data.status, 'ready', `Implementation blocked: ${JSON.stringify(data.blockers)}`);
    assert.equal(data.blocker_kind, 'none', 'Unresolved blocker classification');
    assert.equal(typeof data.recovery_notes, 'string', 'Missing recovery evidence');
    assert.equal(data.api_review_complete, true, 'API review is incomplete');
    assert.deepEqual(data.blockers, [], 'Unresolved blockers');
    for (const key of ['pr_title', 'pr_body']) {
      assert.equal(typeof data[key], 'string', `Missing ${key}`);
      assert.ok(data[key].trim(), `Empty ${key}`);
    }
    assert.ok(!/[\r\n]/.test(data.pr_title), 'PR title must be one line');
    assert.match(data.pr_title, /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9][a-z0-9._/-]*\))?!?: \S(?:.*\S)?$/, 'PR/commit title must use Conventional Commits');
    assert.ok(Array.isArray(data.validations) && data.validations.length > 0, 'Missing validation evidence');
    assert.ok(data.validations.every(check => typeof check.command === 'string' && check.status === 'passed'), 'A validation failed or was blocked');
    for (const command of ['npm run build', 'npm run build-storybook', 'git diff --check']) {
      assert.ok(data.validations.some(check => check.command === command), `Missing passing ${command}`);
    }
    assert.ok(Array.isArray(data.changed_files) && data.changed_files.length > 0, 'No reported changes');
    for (const file of data.changed_files) {
      assert.equal(typeof file, 'string');
      assert.ok(file && !path.isAbsolute(file) && !file.split('/').includes('..') && !/[\0\r\n]/.test(file), `Invalid file path: ${file}`);
    }
    assert.equal(new Set(data.changed_files).size, data.changed_files.length, 'Duplicate changed files');
    const gitFiles = command => execFileSync('git', command, { encoding: 'utf8' }).split('\0').filter(Boolean);
    const actual = [...new Set([
      ...gitFiles(['diff', '--no-renames', '--name-only', '-z', 'HEAD']),
      ...gitFiles(['ls-files', '--others', '--exclude-standard', '-z'])
    ])].sort();
    assert.deepEqual([...data.changed_files].sort(), actual, 'Reported files do not match the working tree');
    fs.writeFileSync(args[0], data.changed_files.join('\0') + '\0');
  } else if (mode === 'pr') {
    const [head, branch] = args;
    assert.equal(data.headRefOid, head, 'PR head changed after validation');
    assert.equal(data.headRefName, branch, 'Unexpected PR branch');
    assert.equal(data.baseRefName, 'main', 'Unexpected PR base');
    if (data.state === 'MERGED') {
      console.log('merged');
    } else {
      assert.equal(data.state, 'OPEN', 'PR is not open');
      assert.equal(data.isDraft, false, 'PR is a draft');
      assert.ok(!['CHANGES_REQUESTED', 'REVIEW_REQUIRED'].includes(data.reviewDecision), 'GitHub requires a review');
      assert.notEqual(data.mergeable, 'CONFLICTING', 'PR has conflicts');
      assert.ok(!['BLOCKED', 'BEHIND', 'DIRTY'].includes(data.mergeStateStatus), `PR is ${data.mergeStateStatus}`);
      let pending = false;
      for (const check of data.statusCheckRollup ?? []) {
        if (check.__typename === 'StatusContext') {
          assert.ok(['SUCCESS', 'PENDING', 'EXPECTED'].includes(check.state), `Failed status: ${check.context}`);
          pending ||= check.state !== 'SUCCESS';
        } else {
          if (check.status !== 'COMPLETED') pending = true;
          else assert.ok(['SUCCESS', 'NEUTRAL', 'SKIPPED'].includes(check.conclusion), `Failed check: ${check.name} (${check.conclusion})`);
        }
      }
      console.log(!pending && data.mergeable === 'MERGEABLE' && data.mergeStateStatus === 'CLEAN' ? 'ready' : 'wait');
    }
  } else {
    throw new Error(`Unknown verification mode: ${mode}`);
  }
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
