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

Requirements: Bash 4.4+, Git, Node.js/npm, `flock`, authenticated `gh` and an authenticated Codex CLI supporting `exec --output-schema` and `--output-last-message`. The project dependencies, Sakai checkout and Playwright browser/system libraries must be available for the required validation. The script uses `workspace-write` with network access enabled and approval policy `never`; a sandbox/permission failure stops the issue rather than bypassing restrictions. Git and GitHub mutations are performed by the shell outside the agent sandbox. Model and profile default to your Codex configuration:

```sh
CODEX_MODEL=your-model CODEX_PROFILE=your-profile bash scripts/implement-issues.sh 13 14
CHECK_TIMEOUT_SECONDS=1800 bash scripts/implement-issues.sh 13
```

The prompt requires `AGENTS.md`, full issue inspection, a native-API coverage inventory, explicit scope decisions, preservation of forwarded props/callbacks, focused tests and both project builds. An API inventory does not establish exhaustive compatibility. Validation records are reported by the model; the runner verifies their presence and status, the actual changed-file list, Git state and GitHub checks. Repositories without PR checks rely on those local validation reports. Automation does not replace independent code review.

The runner stops on the first failure and preserves work, branches and logs in `.git/codex-issue-runs/run-*/issue-*/`. It never uses `git reset --hard`, `git clean`, automatic stashing, admin merges or force-pushing implementation commits. A conflicting/open PR referencing an issue, an existing issue branch, failed checks, required GitHub approval, changed PR head or timeout blocks the next issue. Resolve the preserved work/PR manually and return to clean `main` before rerunning the remaining issue numbers. Concurrent invocations against the same Git repository are locked out.

The executor uses the [Codex non-interactive interface](https://developers.openai.com/codex/noninteractive/). Validate changes to this automation with:

```sh
bash -n scripts/implement-issues.sh
node --test tests/issue-runner.test.mjs
```

The tests use temporary Git repositories and mock Codex/GitHub commands; they do not implement or merge real issues.
