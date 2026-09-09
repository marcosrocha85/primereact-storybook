import assert from 'node:assert/strict';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const defaultQwenModel = 'qwen/qwen3-30b-a3b';
export const defaultQwenURL = 'http://127.0.0.1:1234/v1';

export function qwenSettings(model = defaultQwenModel, baseURL = defaultQwenURL) {
  assert.ok(typeof model === 'string' && model.trim() && !/[\r\n]/.test(model), 'Invalid Qwen model ID');
  const url = new URL(baseURL);
  assert.ok(['http:', 'https:'].includes(url.protocol) && !url.username && !url.password && !url.search && !url.hash, 'QWEN_BASE_URL must be an HTTP(S) API URL without credentials/query/fragment');
  return { model, baseURL: url.href.replace(/\/$/, '') };
}

export function qwenArgs(root, settings) {
  // A separate provider prevents the cloud profile/model from routing local work.
  const provider = `{ name = "LM Studio", base_url = ${JSON.stringify(settings.baseURL)}, wire_api = "responses", requires_openai_auth = false }`;
  return ['-a', 'never', 'exec', '--ignore-user-config', '--sandbox', 'workspace-write',
    '-c', 'sandbox_workspace_write.network_access=true', '-C', root,
    '-m', settings.model, '-c', 'model_provider="issue_runner_qwen"',
    '-c', `model_providers.issue_runner_qwen=${provider}`];
}

export function readOnlyArgs(args) {
  const result = [...args];
  const sandbox = result.indexOf('--sandbox');
  assert.ok(sandbox !== -1, 'Missing controller sandbox argument');
  result.splice(sandbox, 2);
  const network = result.indexOf('sandbox_workspace_write.network_access=true');
  assert.ok(network > 0 && result[network - 1] === '-c', 'Missing controller network argument');
  result.splice(network - 1, 2);
  // Legacy read-only blocks gh networking; permission profiles separate it from file access.
  result.push('-c', 'default_permissions="issue_runner_readonly"',
    '-c', 'permissions.issue_runner_readonly={ extends = ":read-only", network = { enabled = true } }');
  return result;
}

export function assertReady(report) {
  assert.ok(['ready', 'blocked'].includes(report.status), 'Invalid report status');
  assert.ok(['none', 'technical', 'external', 'permission', 'scope'].includes(report.blocker_kind), 'Missing blocker classification');
  assert.ok(Array.isArray(report.blockers) && report.blockers.every(item => typeof item === 'string'), 'Invalid blockers');
  assert.equal(typeof report.recovery_notes, 'string', 'Missing recovery evidence');
  assert.equal(report.status, 'ready', `${report.blocker_kind} blocker: ${JSON.stringify(report.blockers)}`);
  assert.equal(report.blocker_kind, 'none', 'Unresolved blocker classification');
  assert.deepEqual(report.blockers, [], 'Unresolved blockers');
}

export function assertPlan(plan) {
  assertReady(plan);
  assert.ok(typeof plan.plan === 'string' && plan.plan.trim(), 'Empty implementation plan');
  assert.ok(Array.isArray(plan.allowed_files) && plan.allowed_files.length, 'Plan has no allowed files');
  for (const file of plan.allowed_files) {
    assert.ok(typeof file === 'string' && file && !path.isAbsolute(file) &&
      !file.split('/').some(part => ['..', '.', '.git', ''].includes(part)) &&
      !/[\0\r\n*?\[\]\\]/.test(file), `Invalid plan file: ${file}`);
  }
  assert.equal(new Set(plan.allowed_files).size, plan.allowed_files.length, 'Duplicate plan files');
}

export function assertImplementation(plan, implementation, actualFiles) {
  assertReady(implementation);
  assert.ok(Array.isArray(implementation.changed_files) && implementation.changed_files.length, 'No implementation files');
  assert.deepEqual([...implementation.changed_files].sort(), actualFiles, 'Qwen report does not match the working tree');
  const unexpected = actualFiles.filter(file => !plan.allowed_files.includes(file));
  assert.deepEqual(unexpected, [], 'Qwen changed files outside the Codex plan');
}

export async function preflightQwen(settings) {
  let response;
  try {
    response = await fetch(`${settings.baseURL}/models`, { signal: AbortSignal.timeout(5000) });
  } catch (error) {
    throw new Error(`Cannot reach LM Studio at ${settings.baseURL}: ${error.cause?.code ?? error.message}`);
  }
  assert.ok(response.ok, `LM Studio models endpoint returned HTTP ${response.status}`);
  const models = await response.json();
  assert.ok(Array.isArray(models.data) && models.data.some(model => model.id === settings.model),
    `LM Studio does not advertise ${settings.model}; load it or set QWEN_MODEL to its exact API ID`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const settings = qwenSettings(process.argv[2], process.argv[3]);
    await preflightQwen(settings);
    console.log(`LM Studio available: ${settings.model} at ${settings.baseURL}`);
  } catch (error) {
    console.error(`Qwen preflight failed: ${error.message}`);
    process.exitCode = 1;
  }
}
