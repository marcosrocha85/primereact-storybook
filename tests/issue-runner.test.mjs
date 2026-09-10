import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { execFileSync, spawnSync, spawn } from 'node:child_process';

const project = process.cwd();
const gitEnv = { ...process.env, GIT_AUTHOR_NAME: 'Test', GIT_AUTHOR_EMAIL: 'test@example.com', GIT_COMMITTER_NAME: 'Test', GIT_COMMITTER_EMAIL: 'test@example.com' };

function fixture(scenario = '', extraEnv = {}) {
  const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'sakai-issue-runner-'));
  const repo = path.join(temp, 'repo');
  const remote = path.join(temp, 'origin.git');
  const bin = path.join(temp, 'bin');
  const state = path.join(temp, 'state.json');
  const git = (...args) => execFileSync('git', args, { cwd: repo, env: gitEnv, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  fs.mkdirSync(repo);
  fs.mkdirSync(bin);
  git('init', '--bare', remote);
  git('init', '-b', 'main');
  fs.mkdirSync(path.join(repo, 'scripts'));
  fs.cpSync(path.join(project, 'scripts/issue-runner'), path.join(repo, 'scripts/issue-runner'), { recursive: true });
  fs.copyFileSync(path.join(project, 'scripts/implement-issues.sh'), path.join(repo, 'scripts/implement-issues.sh'));
  fs.writeFileSync(path.join(repo, 'AGENTS.md'), 'Follow the issue acceptance criteria.\n');
  git('add', '.');
  git('commit', '-m', 'initial');
  git('remote', 'add', 'origin', remote);
  git('push', '-u', 'origin', 'main');
  fs.writeFileSync(state, JSON.stringify({ scenario, events: [], prs: {}, closed: [] }));
  const mock = `#!/usr/bin/env node
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const statePath=process.env.RUNNER_TEST_STATE;
const state=JSON.parse(fs.readFileSync(statePath,'utf8'));
const args=process.argv.slice(2);
const program=path.basename(process.argv[1]);
const save=()=>fs.writeFileSync(statePath,JSON.stringify(state));
const git=(...args)=>execFileSync('git',args,{encoding:'utf8',stdio:['ignore','pipe','pipe']}).trim();
const option=name=>args[args.indexOf(name)+1];
const json=value=>console.log(JSON.stringify(value));
if(program==='npm'){
 state.builds=(state.builds??0)+1;save();
 console.log('live-validation:'+state.builds);
 if(state.scenario==='actual-build-failure'||(state.scenario==='build-fails-once'&&state.builds===1))process.exit(1);
 process.exit(0);
}
if(program==='codex'){
 const prompt=fs.readFileSync(0,'utf8');
 const issue=Number(prompt.match(/Selected issue: #(\\d+)/)[1]);
 const role=prompt.includes('Role: Codex planner.')?'plan':prompt.includes('Role: Codex reviewer.')?'review':prompt.includes('Role: Qwen implementer.')?'qwen':'codex';
 console.log('live-model-output:'+role+':'+issue);
 state.calls??=[];state.calls.push({role,issue,args});
 if(role==='plan'){
  state.events.push('plan:'+issue);save();
  if(args.includes('--sandbox')||!args.includes('default_permissions="issue_runner_readonly"')||!args.includes('permissions.issue_runner_readonly={ extends = ":read-only", network = { enabled = true } }')||args.includes('--ignore-user-config'))throw Error('Planner isolation/config wrong');
  const result={status:'ready',blocker_kind:'none',blockers:[],recovery_notes:'Inspect issue and previous diagnostics',plan:'Implement component '+issue+'; preserve callbacks; run focused checks.',allowed_files:['component-'+issue+'.txt']};
  if(state.scenario==='plan-blocked'){result.status='blocked';result.blocker_kind='scope';result.blockers=['Missing acceptance decision'];}
  if(state.scenario==='plan-edits')fs.writeFileSync('planner-edit.txt','Must be preserved and rejected');
  fs.writeFileSync(option('--output-last-message'),JSON.stringify(result));process.exit(0);
 }
 if(role==='qwen'){
  state.events.push('qwen:'+issue);save();
  if(option('--sandbox')!=='workspace-write'||!args.includes('--ignore-user-config')||args.includes('-p'))throw Error('Qwen inherited cloud config');
  if(!args.includes('model_provider="issue_runner_qwen"')||!args.includes('sandbox_workspace_write.network_access=true'))throw Error('Wrong Qwen provider/network');
  if(!prompt.includes('gh issue view')||!prompt.includes('gh pr view')||!prompt.includes('gh pr diff')||!prompt.includes('Do not use connectors/MCP'))throw Error('Missing read-only gh guidance');
  if(!prompt.includes('Implement component '+issue)||!prompt.includes('allowed_files'))throw Error('Missing Codex plan');
  fs.writeFileSync('component-'+issue+'.txt','implemented '+issue+'\\n');
  if(state.scenario==='qwen-extra')fs.writeFileSync('outside-plan.txt','Unplanned change');
  const result={status:'ready',blocker_kind:'none',blockers:[],recovery_notes:'Implemented the Codex plan',changed_files:['component-'+issue+'.txt']};
  if(state.scenario==='qwen-blocked'){result.status='blocked';result.blocker_kind='permission';result.blockers=['Cannot run required tool'];}
  fs.writeFileSync(option('--output-last-message'),JSON.stringify(result));process.exit(0);
 }
 if(role==='review'){
  state.events.push('review:'+issue);save();
  if(args.includes('--sandbox')||!args.includes('default_permissions="issue_runner_readonly"')||!args.includes('permissions.issue_runner_readonly={ extends = ":read-only", network = { enabled = true } }')||args.includes('--ignore-user-config'))throw Error('Reviewer isolation/config wrong');
  if(!state.builds)throw Error('Review occurred before controller validation');
  const result={status:'ready',blocker_kind:'none',blockers:[],recovery_notes:'Reviewed diff and controller logs',pr_title:'Codex reviewed component '+issue,pr_body:'Codex plan and review, Qwen implementation; controller checks passed.',changed_files:['component-'+issue+'.txt'],validations:['npm run build','npm run build-storybook','git diff --check'].map(command=>({command,status:'passed'})),api_review_complete:true};
  const reviews=state.events.filter(event=>event==='review:'+issue).length;
  if(state.scenario==='review-blocked'||(state.scenario==='review-once'&&reviews===1)){result.status='blocked';result.blocker_kind='technical';result.blockers=['Missing planned behavior'];result.recovery_notes='Correct missing behavior on next Qwen attempt';}
  if(state.scenario==='review-edits')fs.writeFileSync('reviewer-edit.txt','Must be preserved and rejected');
  fs.writeFileSync(option('--output-last-message'),JSON.stringify(result));process.exit(0);
 }
 state.events.push('codex:'+issue); save();
 if(state.scenario==='codex-failure')process.exit(2);
 fs.writeFileSync('component-'+issue+'.txt','implemented '+issue+'\\n');
 if(state.scenario==='unexpected-commit'){git('add','.');git('commit','-m','Unexpected commit');}
 const attempt=state.events.filter(event=>event==='codex:'+issue).length;
 const result={blocker_kind:'none',recovery_notes:'Implementation inspected',status:'ready',pr_title:'Review component '+issue,pr_body:'Scoped implementation and validation.',changed_files:['component-'+issue+'.txt'],validations:['npm run build','npm run build-storybook','git diff --check'].map(command=>({command,status:'passed'})),api_review_complete:true,blockers:[]};
 if(state.scenario==='blocked') {result.status='blocked';result.blocker_kind='external';result.blockers=['Dependency unresolved'];}
 if(state.scenario==='technical-stuck'||(state.scenario==='technical-once'&&attempt===1)){result.status='blocked';result.blocker_kind='technical';result.blockers=['Regression failed'];result.recovery_notes='Reproduced wrapper failure';}
 if(state.scenario==='progress-but-blocked'){result.status='blocked';result.blocker_kind='technical';result.blockers=['Still failing'];result.recovery_notes='Hypothesis '+attempt;fs.writeFileSync('component-'+issue+'.txt','attempt '+attempt);}
 if(state.scenario==='malformed-once'&&attempt===1){fs.writeFileSync(option('--output-last-message'),'{');process.exit(0);}
 if(state.scenario==='unreported-file')fs.writeFileSync('extra.txt','preserve me');
 if(state.scenario==='missing-build')result.validations.shift();
 fs.writeFileSync(option('--output-last-message'),JSON.stringify(result));
 console.log(JSON.stringify(result));process.exit(0);
}
if(args[0]==='repo'&&args[1]==='view'){
 console.log(option('--jq')==='.nameWithOwner'?'marcosrocha85/primereact-storybook':'main');
}else if(args[0]==='issue'&&args[1]==='view'){
 const issue=Number(args[2]);const status=state.closed.includes(issue)?'CLOSED':'OPEN';
 if(args.includes('--jq'))console.log(status);else json({number:issue,state:status,title:'Review',body:'Implement',comments:[],assignees:[]});
}else if(args[0]==='api'){
 if(args.some(arg=>arg.includes('/pulls?'))){
  if(state.scenario==='existing-pr')json({number:900,body:'Closes #13',head:'other-branch'});
 }else json([]);
}else if(args[0]==='pr'&&args[1]==='create'){
 if(!fs.readFileSync(option('--body-file'),'utf8').includes('Controller validation:'))throw Error('Missing independent validation evidence');
 const branch=option('--head');const issue=Number(branch.split('-').at(-1));const head=git('rev-parse','HEAD');
 state.prs[issue]={head,branch,merged:false};state.events.push('pr:'+issue);save();
 console.log('https://github.com/marcosrocha85/primereact-storybook/pull/'+issue);
}else if(args[0]==='pr'&&args[1]==='view'){
 const issue=Number(args[2].split('/').at(-1));const pr=state.prs[issue];
 let checks=[];
 if(state.scenario==='failed-check')checks=[{__typename:'CheckRun',status:'COMPLETED',conclusion:'FAILURE',name:'CI'}];
 if(state.scenario==='pending-check')checks=[{__typename:'CheckRun',status:'IN_PROGRESS',conclusion:null,name:'CI'}];
 json({state:pr.merged?'MERGED':'OPEN',isDraft:false,headRefOid:state.scenario==='changed-head'?'unexpected':pr.head,headRefName:pr.branch,baseRefName:'main',mergeable:'MERGEABLE',mergeStateStatus:'CLEAN',reviewDecision:state.scenario==='review-required'?'REVIEW_REQUIRED':'',statusCheckRollup:checks,mergeCommit:pr.merged?{oid:pr.merge}:null});
}else if(args[0]==='pr'&&args[1]==='merge'){
 const issue=Number(args[2].split('/').at(-1));const pr=state.prs[issue];
 if(!args.includes('--squash')||option('--match-head-commit')!==pr.head)throw Error('Unsafe merge arguments');
 if(state.scenario==='queued-merge'){state.events.push('merge-request:'+issue);save();process.exit(0);}
 const base=git('rev-parse','origin/main');const tree=git('rev-parse',pr.head+'^{tree}');
 pr.merge=git('commit-tree',tree,'-p',base,'-m','Squash #'+issue);
 git('push','origin',pr.merge+':refs/heads/main');
 pr.merged=true;state.closed.push(issue);state.events.push('merge:'+issue);save();
}else {throw Error('Unexpected gh command: '+args.join(' '));}
`;
  for (const command of ['codex', 'gh', 'npm']) fs.writeFileSync(path.join(bin, command), mock, { mode: 0o755 });
  const runOptions = { cwd: repo, encoding: 'utf8', timeout: 30000,
    env: { ...gitEnv, PATH: `${bin}:${process.env.PATH}`, RUNNER_TEST_STATE: state, CHECK_TIMEOUT_SECONDS: '1', ...extraEnv } };
  const run = (...args) => spawnSync('bash', ['scripts/implement-issues.sh', ...args], runOptions);
  const runAsync = (...args) => new Promise((resolve, reject) => {
    const child = spawn('bash', ['scripts/implement-issues.sh', ...args], runOptions);
    let stdout = '', stderr = '';
    child.stdout.on('data', chunk => { stdout += chunk; });
    child.stderr.on('data', chunk => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', status => resolve({ status, stdout, stderr }));
  });
  return { repo, git, run, runAsync, setScenario: scenario => { const value = JSON.parse(fs.readFileSync(state, 'utf8')); value.scenario = scenario; fs.writeFileSync(state, JSON.stringify(value)); }, checkpoint: () => path.join(repo, '.git/codex-issue-runs', fs.readdirSync(path.join(repo, '.git/codex-issue-runs'))[0]), state: () => JSON.parse(fs.readFileSync(state, 'utf8')), cleanup: () => fs.rmSync(temp, { recursive: true, force: true }) };
}

function withFixture(scenario, fn) {
  const setup = fixture(scenario);
  try { fn(setup); } finally { setup.cleanup(); }
}

test('runner implements two issues sequentially and removes only its merged branches', () => {
  withFixture('', ({ git, run, state }) => {
    git('branch', 'unrelated');
    const result = run('13', '#14');
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.match(result.stdout, /========== 1\/2 \[#13\] Review ==========/);
    assert.match(result.stdout, /\[------------------------\]\s+0% \| 1\/2 \[#13\] preparing \| elapsed \d+s \| ETA calculating/);
    assert.match(result.stdout, /live-model-output:codex:13/);
    assert.match(result.stdout, /live-validation:1/);
    assert.match(result.stdout, /\[########################\] 100% \| 2\/2 \[#14\] completed/);
    assert.deepEqual(state().events, ['codex:13', 'pr:13', 'merge:13', 'codex:14', 'pr:14', 'merge:14']);
    assert.equal(git('branch', '--show-current'), 'main');
    assert.equal(git('status', '--porcelain'), '');
    assert.equal(git('rev-parse', 'HEAD'), git('rev-parse', 'origin/main'));
    assert.equal(git('branch', '--list', 'codex/*'), '');
    assert.equal(git('ls-remote', '--heads', 'origin', 'refs/heads/codex/*'), '');
    assert.ok(git('branch', '--list', 'unrelated'));
    assert.equal(git('rev-list', '--count', 'main'), '3', 'One squash commit per issue');
    const rerun = run('13', '14');
    assert.equal(rerun.status, 0, rerun.stderr);
    assert.equal(state().events.length, 6, 'Closed issues are skipped');
  });
});

test('dry-run and invalid/duplicate input never invoke Codex or GitHub mutations', () => {
  withFixture('', ({ run, state }) => {
    assert.equal(run('--dry-run', '13', '14').status, 0);
    assert.notEqual(run('13', '13').status, 0);
    assert.notEqual(run('13', 'bad-input').status, 0);
    assert.notEqual(run().status, 0);
    assert.deepEqual(state().events, []);
  });
});

test('dirty trees and existing PRs are preserved without starting an implementation', () => {
  withFixture('', ({ repo, run, state }) => {
    fs.writeFileSync(path.join(repo, 'user.txt'), 'keep');
    assert.notEqual(run('13').status, 0);
    assert.equal(fs.readFileSync(path.join(repo, 'user.txt'), 'utf8'), 'keep');
    assert.deepEqual(state().events, []);
  });
  withFixture('existing-pr', ({ run, state, git }) => {
    assert.notEqual(run('13').status, 0);
    assert.deepEqual(state().events, []);
    assert.equal(git('branch', '--show-current'), 'main');
  });
});

for (const scenario of ['codex-failure', 'blocked', 'missing-build', 'unreported-file', 'unexpected-commit', 'failed-check', 'pending-check', 'changed-head', 'review-required', 'queued-merge']) {
  test(`runner stops and preserves evidence on ${scenario}`, () => {
    withFixture(scenario, ({ run, state, git }) => {
      const result = run('13', '14');
      assert.notEqual(result.status, 0, result.stdout);
      assert.ok(state().events.includes('codex:13'));
      assert.ok(!state().events.includes('codex:14'));
      assert.ok(!state().events.includes('merge:13'));
      assert.equal(git('branch', '--show-current'), 'codex/issue-13');
      assert.match(result.stderr, /preserved/);
    });
  });
}


for (const scenario of ['technical-once', 'build-fails-once', 'malformed-once']) {
  test(`runner recovers from ${scenario} before delivering`, () => {
    withFixture(scenario, ({ run, state, git }) => {
      const result = run('13');
      assert.equal(result.status, 0, result.stderr + result.stdout);
      assert.equal(state().events.filter(event => event === 'codex:13').length, 2);
      assert.equal(state().events.filter(event => event === 'merge:13').length, 1);
      assert.equal(git('status', '--porcelain'), '');
      assert.ok(state().builds >= 2, 'Controller executed independent builds');
    });
  });
}

for (const scenario of ['technical-stuck', 'actual-build-failure']) {
  test(`runner stops without progress on ${scenario}`, () => {
    withFixture(scenario, ({ run, state }) => {
      const result = run('13', '14');
      assert.notEqual(result.status, 0);
      assert.equal(state().events.filter(event => event === 'codex:13').length, 2);
      assert.ok(!state().events.includes('pr:13'));
      assert.match(result.stderr, /No progress/);
    });
  });
}

test('resume preserves implementation and finishes the remaining saved queue', () => {
  withFixture('technical-stuck', ({ run, setScenario, checkpoint, state, git }) => {
    assert.notEqual(run('13', '14').status, 0);
    setScenario('');
    const result = run('--resume', checkpoint());
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.deepEqual(state().closed, [13, 14]);
    assert.equal(git('branch', '--show-current'), 'main');
    assert.equal(git('status', '--porcelain'), '');
  });
});

test('resume refuses external edits, changed HEAD and post-commit checkpoints', () => {
  for (const scenario of ['edits', 'head', 'delivery']) {
    withFixture(scenario === 'delivery' ? 'failed-check' : 'technical-stuck', ({ run, checkpoint, repo, git, state }) => {
      assert.notEqual(run('13').status, 0);
      const count = state().events.length;
      if (scenario === 'edits') fs.writeFileSync(path.join(repo, 'user.txt'), 'Preserve');
      if (scenario === 'head') { git('add', '.'); git('commit', '-m', 'External commit'); }
      assert.notEqual(run('--resume', checkpoint()).status, 0);
      assert.equal(state().events.length, count);
    });
  }
});


test('changing diagnoses remain bounded by the configured attempt budget', () => {
  const setup = fixture('progress-but-blocked', { CODEX_MAX_ATTEMPTS: '3' });
  try {
    assert.notEqual(setup.run('13').status, 0);
    assert.equal(setup.state().events.filter(event => event === 'codex:13').length, 3);
    assert.ok(!setup.state().events.includes('pr:13'));
  } finally { setup.cleanup(); }
});

test('independent validator runs affected browser tests on its own static server', () => {
  withFixture('', ({ repo, git }) => {
    const evidence = fs.mkdtempSync(path.join(os.tmpdir(), 'sakai-validation-'));
    try {
      fs.mkdirSync(path.join(repo, 'storybook-static'));
      fs.writeFileSync(path.join(repo, 'storybook-static/index.html'), 'Owned static artifact');
      fs.mkdirSync(path.join(repo, 'tests'));
      fs.writeFileSync(path.join(repo, 'tests/component-review.test.mjs'), `
        import { test } from 'node:test';
        import assert from 'node:assert/strict';
        test('Carousel: browser artifact', async () => {
          assert.match(process.env.STORYBOOK_URL, /^http:\\/\\/127\\.0\\.0\\.1:/);
          assert.equal(await (await fetch(process.env.STORYBOOK_URL)).text(), 'Owned static artifact');
          assert.equal((await fetch(process.env.STORYBOOK_URL + '/%2e%2e/AGENTS.md')).status, 404);
        });
        test('Unrelated: must not run', () => assert.fail('Unrelated test executed'));
      `);
      const list = path.join(evidence, 'files.list');
      fs.writeFileSync(list, 'src/stories/components/Carousel.stories.tsx\0');
      const result = spawnSync(process.execPath, ['scripts/issue-runner/validate.mjs', list, evidence], {
        cwd: repo, encoding: 'utf8', timeout: 15000,
        env: { ...gitEnv, PATH: `${path.join(path.dirname(repo), 'bin')}:${process.env.PATH}`, RUNNER_TEST_STATE: path.join(path.dirname(repo), 'state.json') }
      });
      assert.equal(result.status, 0, result.stderr + fs.readFileSync(path.join(evidence, 'validation.log'), 'utf8'));
      const results = JSON.parse(fs.readFileSync(path.join(evidence, 'validation.json'), 'utf8'));
      assert.equal(results.length, 4);
      assert.ok(results.every(result => result.code === 0));
      assert.equal(git('branch', '--show-current'), 'main');
    } finally { fs.rmSync(evidence, { recursive: true, force: true }); }
  });
});


test('CLI failure can resume after environment repair without discarding files', () => {
  withFixture('codex-failure', ({ run, setScenario, checkpoint, state }) => {
    assert.notEqual(run('13').status, 0);
    setScenario('');
    const result = run('--resume', checkpoint());
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.deepEqual(state().closed, [13]);
  });
});

async function withQwenFixture(scenario, fn, model = 'qwen/qwen3-30b-a3b') {
  let requests = 0;
  const server = http.createServer((request, response) => {
    requests++;
    assert.equal(request.url, '/v1/models');
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ data: scenario === 'missing-model' ? [] : [{ id: model }] }));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const setup = fixture(scenario, {
    CODEX_MODEL: 'selected-codex-model', CODEX_PROFILE: 'selected-profile',
    QWEN_MODEL: model, QWEN_BASE_URL: `http://127.0.0.1:${server.address().port}/v1`
  });
  try { await fn(setup, () => requests); }
  finally { setup.cleanup(); await new Promise(resolve => server.close(resolve)); }
}

test('--use-qwen plans and reviews with Codex, implements only with Qwen, then delivers sequentially', async () => {
  await withQwenFixture('', async ({ runAsync, state, git }) => {
    const result = await runAsync('--use-qwen', '13', '14');
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.deepEqual(state().events, ['plan:13', 'qwen:13', 'review:13', 'pr:13', 'merge:13', 'plan:14', 'qwen:14', 'review:14', 'pr:14', 'merge:14']);
    for (const { role, args } of state().calls) {
      assert.equal(args[args.indexOf('-m') + 1], role === 'qwen' ? 'qwen/qwen3-30b-a3b' : 'selected-codex-model');
      assert.equal(args.includes('selected-profile'), role !== 'qwen');
    }
    assert.equal(git('status', '--porcelain'), '');
    assert.equal(git('branch', '--show-current'), 'main');
  });
});

test('Codex review findings trigger a new Codex plan and Qwen correction', async () => {
  await withQwenFixture('review-once', async ({ runAsync, state }) => {
    const result = await runAsync('--use-qwen', '13');
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.deepEqual(state().events, ['plan:13', 'qwen:13', 'review:13', 'plan:13', 'qwen:13', 'review:13', 'pr:13', 'merge:13']);
  });
});

for (const scenario of ['plan-blocked', 'qwen-blocked', 'review-blocked', 'plan-edits', 'review-edits', 'qwen-extra', 'actual-build-failure']) {
  test(`delegated mode preserves changes and never delivers on ${scenario}`, async () => {
    await withQwenFixture(scenario, async ({ runAsync, state, git }) => {
      const result = await runAsync('--use-qwen', '13', '14');
      assert.notEqual(result.status, 0, result.stdout);
      assert.ok(!state().events.includes('pr:13'));
      assert.ok(!state().events.includes('plan:14'));
      assert.ok(!state().events.includes('codex:13'), 'No fallback to Codex implementation');
      assert.equal(git('branch', '--show-current'), 'codex/issue-13');
      if (scenario === 'plan-blocked') assert.ok(!state().events.includes('qwen:13'));
      if (scenario === 'actual-build-failure') assert.ok(state().events.includes('review:13'), 'Codex gets the failing controller evidence');
    });
  });
}

test('resume retains Qwen mode and model without repeating the flag', async () => {
  await withQwenFixture('review-blocked', async ({ runAsync, setScenario, checkpoint, state }) => {
    assert.notEqual((await runAsync('--use-qwen', '13', '14')).status, 0);
    setScenario('');
    const result = await runAsync('--resume', checkpoint());
    assert.equal(result.status, 0, result.stderr + result.stdout);
    assert.deepEqual(state().closed, [13, 14]);
    assert.ok(state().calls.filter(call => call.role === 'qwen').every(call => call.args.includes('custom-qwen-id')));
  }, 'custom-qwen-id');
});

test('Qwen preflight and dry-run never start implementation when the model is missing', async () => {
  await withQwenFixture('missing-model', async ({ runAsync, state, git }, requests) => {
    const dryRun = await runAsync('--use-qwen', '--dry-run', '13');
    assert.equal(dryRun.status, 0);
    assert.match(dryRun.stdout, /Codex plan -> Qwen implementation/);
    assert.equal(requests(), 0);
    const result = await runAsync('--use-qwen', '13');
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /does not advertise/);
    assert.deepEqual(state().events, []);
    assert.equal(git('branch', '--show-current'), 'main');
  });
});

test('an existing Codex-only checkpoint cannot silently switch into Qwen mode', () => {
  withFixture('technical-stuck', ({ run, checkpoint, state }) => {
    assert.notEqual(run('13').status, 0);
    const events = [...state().events];
    const result = run('--use-qwen', '--resume', checkpoint());
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Cannot enable --use-qwen/);
    assert.deepEqual(state().events, events);
  });
});
