import fs from 'node:fs';
import cliProgress from 'cli-progress';

const [mode, stateFile, ...args] = process.argv.slice(2);

function writeState(state) {
  const temporary = `${stateFile}.tmp`;
  fs.writeFileSync(temporary, JSON.stringify(state));
  fs.renameSync(temporary, stateFile);
}

if (mode === 'update') {
  const [total, completed, index, issue, title, phase, phaseFile] = args;
  writeState({
    total: Number(total),
    completed: Number(completed),
    index: Number(index),
    issue,
    title,
    phase,
    phaseFile,
    finished: false
  });
  process.exit(0);
}

if (mode === 'finish') {
  const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  writeState({ ...state, completed: state.total, phase: 'completed', finished: true });
  process.exit(0);
}

if (mode !== 'render') throw new Error(`Unknown progress mode: ${mode}`);

const format = (options, params, payload) => {
  const bar = cliProgress.Format.BarFormat(params.progress, options);
  const percentage = Math.floor(params.progress * 100);
  const duration = Math.round(((params.stopTime || Date.now()) - params.startTime) / 1000);
  const elapsed = cliProgress.Format.TimeFormat(duration, options, 1);
  return `[${bar}] ${String(percentage).padStart(3)}% | ${payload.index}/${params.total} [#${payload.issue}] ${payload.phase} | elapsed ${elapsed}`;
};

const progress = new cliProgress.MultiBar({
  format,
  barsize: 24,
  barCompleteChar: '#',
  barIncompleteChar: '-',
  clearOnComplete: false,
  gracefulExit: false,
  hideCursor: true,
  linewrap: false,
  fps: 4,
  stream: process.stdout
});

let bar;
let issue;
let timer;
let stopping = false;

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  clearInterval(timer);
  if (bar) progress.stop();
  process.exit(code);
}

function render() {
  let state;
  try {
    state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
  } catch {
    return;
  }
  if (state.phaseFile) {
    try {
      state.phase = fs.readFileSync(state.phaseFile, 'utf8').trim() || state.phase;
    } catch {
      // The shell may be switching between issue directories.
    }
  }
  if (!bar) {
    process.stdout.write(`\n========== ${state.index}/${state.total} [#${state.issue}] ${state.title} ==========\n`);
    bar = progress.create(state.total, state.completed, { index: state.index, issue: state.issue, phase: state.phase });
    issue = state.issue;
  } else if (issue !== state.issue) {
    progress.log(`\n========== ${state.index}/${state.total} [#${state.issue}] ${state.title} ==========\n`);
    issue = state.issue;
  }
  bar.update(state.completed, { index: state.index, issue: state.issue, phase: state.phase });
  if (state.finished) stop();
}

process.once('SIGINT', () => stop(130));
process.once('SIGTERM', () => stop(143));
render();
timer = setInterval(render, 250);
