# Sakai Storybook

React + Vite Storybook for documenting the [PrimeFaces Sakai React](https://github.com/primefaces/sakai-react) template as a design system.

[View the published Storybook](https://marcosrocha85.github.io/primereact-storybook/).

## Scripts

- `npm run storybook`: starts Storybook at `http://localhost:6006`.
- `npm run build-storybook`: builds the static Storybook into `storybook-static`.
- `npm run dev`: starts the local Vite landing page.
- `npm run build`: validates TypeScript and builds the Vite app.
- `npm run sync:sakai`: downloads or updates the upstream Sakai React repo in `vendor/sakai-react`.

## Structure

- `.storybook/`: Storybook configuration, global preview, and manager theme.
- `src/docs/`: MDX documentation pages.
- `src/stories/components/`: component-level stories and summary docs.
- `src/stories/sakaiStoryHelpers.tsx`: helper that renders the original upstream demo and isolates a selected section.
- `src/sakai/`: local components adapted from or inspired by Sakai.
- `scripts/`: project automation.

## Component Coverage

The current model is aligned with the reference Storybook: `Components/*` contains one `Summary` page per component, interactive stories with Controls, and `Show code` in the Canvas.

The project generated 67 components from the Sakai UI Kit pages: Input, Float Label, Invalid State, Button, Table, List, Tree, Panel, Overlay, Media, Menu, Message, File, Chart, and Misc. Repeated variations were merged into the base component, for example `Float Label` and `Invalid State` appear under their corresponding input components.

The component catalog is sourced from these upstream demo pages:

- Button
- Charts
- File
- Float Label
- Form Layout
- Input
- Invalid State
- List
- Media
- Menu
- Message
- Misc
- Overlay
- Panel, Tabs and Containers
- Table
- Tree

Each story renders the selected component example and includes the relevant upstream usage snippet in the Docs/Source panel.

## Recommended Workflow

1. Run `npm run sync:sakai` to fetch the upstream Sakai code.
2. Run `npm run storybook`.
3. Map a component or demo in `vendor/sakai-react`.
4. Update `scripts/generate-component-stories.mjs` when the component set changes.
5. Run `node scripts/generate-component-stories.mjs` and verify with `npm run build-storybook`.

## GitHub Pages

This repository includes a GitHub Actions workflow that builds Storybook and deploys `storybook-static` to GitHub Pages.

To enable it in GitHub, set **Settings -> Pages -> Build and deployment -> Source** to **GitHub Actions**.

## Sequential issue implementation

After committing these automation files to `main`, start from a clean checkout:

```sh
bash scripts/implement-issues.sh --dry-run 13 14 15
bash scripts/implement-issues.sh 13 14 15
```

Issues run in the supplied order. Invoking the script authorizes implementation, publication and squash merge for those issues. Closed issues are skipped. Each issue starts from updated `main` on `codex/issue-<number>`. Codex edits and validates; the shell checks its structured report, stages only the reported files, commits, creates a PR, waits for GitHub checks, squash-merges the exact validated head and confirms the issue closed. It then updates `main` and deletes only that issue's merged local/remote branch. Ignored assets such as `node_modules`, `vendor` and build output remain available.

The terminal uses `cli-progress` to show a numbered header such as `1/3 [#24]` and keep one compact status line visible while Codex runs, with a batch progress bar, elapsed time, the current phase and an ETA. The first issue displays `ETA calculating`; after one issue completes, the estimate updates from the observed batch progress. Raw Codex/build and routine Git/GitHub output remains in the run logs instead of flooding the console. A resumed invocation calculates a new ETA for its remaining queue.

Requirements: Bash 4.4+, Git, Node.js/npm, `flock`, authenticated `gh` and an authenticated Codex CLI supporting `exec --output-schema` and `--output-last-message`. The project dependencies, Sakai checkout and Playwright browser/system libraries must be available for the required validation. The script uses `workspace-write` with network access enabled and approval policy `never`; a sandbox/permission failure stops the issue rather than bypassing restrictions. Git and GitHub mutations are performed by the shell outside the agent sandbox. Model and profile default to your Codex configuration:

```sh
CODEX_MODEL=your-model CODEX_PROFILE=your-profile bash scripts/implement-issues.sh 13 14
CHECK_TIMEOUT_SECONDS=1800 bash scripts/implement-issues.sh 13
```

To delegate implementation to Qwen in LM Studio, add `--use-qwen`:

```sh
CODEX_MODEL=your-codex-model bash scripts/implement-issues.sh --use-qwen 21 22

# Optional overrides; these are the defaults.
QWEN_MODEL=qwen/qwen3-30b-a3b QWEN_BASE_URL=http://127.0.0.1:1234/v1 \
  bash scripts/implement-issues.sh --use-qwen 21 22
```

GitHub Issues remains the backlog. Codex generates an implementation plan with exact allowed files; Qwen implements that plan; the controller runs independent validation; Codex reviews the actual diff and validation evidence and generates the PR metadata. Only then does the shell publish and squash the PR, confirm issue closure and prepare `main` for the next issue. Technical review findings return to Codex for a revised plan and Qwen for corrections. Codex never takes over implementation in this mode. Without the flag, the existing Codex-only flow remains in effect.

`CODEX_MODEL` and `CODEX_PROFILE` select the planner/reviewer configuration. Qwen runs through a separate Codex CLI invocation with `--ignore-user-config` and a custom Responses provider pointing to `QWEN_BASE_URL`; it does not receive `CODEX_PROFILE`. Both implementation and planning/review commands have network access for authenticated `gh issue view`, `gh pr view` and `gh pr diff` reads. The prompts explicitly require `gh`, not GitHub connectors, and reserve Git/GitHub writes for the controller. Planning and review use the `issue_runner_readonly` permission profile, and repository fingerprints reject edits during either phase. Remove legacy `sandbox_mode` / `sandbox_workspace_write` settings from the Codex configuration or selected profile when using this mode: Codex gives those older settings precedence over [named permission profiles](https://learn.chatgpt.com/docs/permissions).

Use a recent Codex CLI supporting `--ignore-user-config`, custom Responses providers and named permission profiles (configuration checked with 0.153.4). Start the LM Studio server and make the exact `QWEN_MODEL` ID available at `/v1/models`. The endpoint must be reachable from the shell running this script; for WSL with LM Studio on Windows, set `QWEN_BASE_URL` to the reachable host address if localhost is unavailable. Preflight checks connectivity and the advertised model before branching. It does not verify generation, tool calling or structured output: the LM Studio/model combination must support the Responses requests, tools and JSON schemas used by Codex. Integration tests mock model execution; compatibility with a live Qwen server must be verified separately.

The prompt requires `AGENTS.md`, full issue inspection, a native-API coverage inventory, explicit scope decisions, preservation of forwarded props/callbacks, focused tests and both project builds. An API inventory does not establish exhaustive compatibility. The runner checks the model report, then independently executes both builds, changed Node test files, affected component contract tests, the generator test when applicable, and affected component browser tests against an owned static server on a free localhost port. Browser libraries must also be available to the runner process (`LD_LIBRARY_PATH` is inherited). Commands are selected by the controller, never evaluated from model-provided shell strings. Git state, file contents and GitHub checks remain delivery gates. Automation does not replace independent code review.

Technical implementation/validation failures receive up to three attempts total by default. Each attempt gets the preserved tree and previous diagnosis, report and validation logs. Repeated identical failures with unchanged files and diagnosis stop early. External dependencies, missing permissions and scope decisions stop immediately. CLI failures (including model/version and authentication errors) preserve a checkpoint and require environment repair; they are not blindly retried.

```sh
CODEX_MAX_ATTEMPTS=3 bash scripts/implement-issues.sh 15 16
bash scripts/implement-issues.sh --resume .git/codex-issue-runs/run-XXXXXXXX
```

`--resume` continues the current issue and the remaining saved queue, with a new bounded attempt budget (1–10). It only accepts a checkpoint produced by this version before delivery starts, on the same branch/base commit and with exactly the saved tracked/untracked file contents and modes. Existing work is never discarded. External edits, interrupted runs with unsaved changes, a published branch, an open implementing PR, or any post-commit checkpoint require manual reconciliation; resume will not guess how to recover those states. Ignored dependencies/build output may be repaired without changing the checkpoint.

Qwen runs save their execution mode, model and endpoint. `--resume` restores those settings without needing `--use-qwen` again. A Codex-only checkpoint cannot switch to Qwen with that flag; start a new run after reconciling the existing work.

Logs and independent validation exit codes live under `.git/codex-issue-runs/run-*/issue-*/attempt-*/`; the Codex transcript is `codex.log`. The runner never uses `git reset --hard`, `git clean`, automatic stashing, admin merges or force-pushing implementation commits. Failed GitHub checks, required approval, changed PR heads and merge timeouts still block delivery and the next issue. Concurrent invocations against the same Git repository are locked out. Automatic retries improve recovery; they do not authorize weakened tests or unrequested scope changes.

With `--use-qwen`, each attempt contains `plan.json`, `implementation.json`, `review.json`, the corresponding prompts/transcripts, and controller validation logs. An early blocker may stop the attempt before later artifacts exist.

The executor uses the [Codex non-interactive interface](https://developers.openai.com/codex/noninteractive/). Validate changes to this automation with:

```sh
bash -n scripts/implement-issues.sh
node --test tests/issue-runner.test.mjs
```

The tests use temporary Git repositories and mock Codex/GitHub/npm commands; they do not implement or merge real issues.
