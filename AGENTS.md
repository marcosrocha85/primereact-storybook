# Project Agent Guide

## Project Purpose

This repository documents PrimeFaces Sakai React as a Storybook-based design system. The public artifact is the static Storybook build generated into `storybook-static` and deployed through GitHub Pages.

## Required Session Startup: GitHub Issues

GitHub Issues in `marcosrocha85/primereact-storybook` is the authoritative backlog and task-status source. `TODO.md` is only a migration pointer, not an editable task queue.

At the beginning of every session, before choosing implementation work:

1. Read this guide and inspect the working tree. Preserve existing user changes.
2. Fetch the current open component-review queue from GitHub, including every page, sorted by issue number ascending:

   ```sh
   gh api --paginate 'repos/marcosrocha85/primereact-storybook/issues?state=open&labels=component-review&sort=created&direction=asc&per_page=100' --jq '.[] | select(.pull_request == null) | {number, title, html_url, assignees, labels}'
   ```

3. Honor an issue or scope explicitly selected by the user. Otherwise, select the lowest-numbered actionable issue from the queue. Read its full body, comments, dependencies, and linked pull requests before editing:

   ```sh
   gh issue view <number> --repo marcosrocha85/primereact-storybook --comments
   gh pr list --repo marcosrocha85/primereact-storybook --state open --limit 100 --json number,title,body,url
   ```

4. Skip issues with unresolved dependencies, an active implementation by another contributor, or an open implementing pull request; state the reason and select the next actionable issue. Report the selected issue number and scope before implementation. For a read-only or unrelated request, fetch the queue but keep the user's requested scope.
5. Treat the selected issue's acceptance criteria and the current code as implementation context. Do not rely on a cached queue or the former TODO checkboxes. If GitHub cannot be read, report the exact blocker instead of guessing the next task. If no actionable issues remain, report that result instead of inventing work.

Use the GitHub connector as an alternative when `gh` is unavailable, preserving the same filtering, pagination, ordering, and full issue inspection.

Keep implementation scoped to the selected issue. When publishing an authorized pull request, link it with `Closes #<number>` and include validation results and blockers. Close the issue only when its acceptance criteria are satisfied and the implementation is merged; local changes alone do not complete an issue. New backlog tasks belong in GitHub Issues, not in a second local checklist. Repository documentation remains the source for architecture and coding conventions; a GitHub Wiki is optional for longer-lived project context.

## Current Architecture

- Storybook 10 runs on React + Vite.
- PrimeReact, PrimeIcons, PrimeFlex, Sakai layout styles, and Sakai demo assets are loaded globally in `.storybook/preview.tsx`.
- The upstream Sakai React repository is synced into `vendor/sakai-react` with `npm run sync:sakai`.
- `vendor/sakai-react` is intentionally ignored by Git and treated as source reference material.
- The primary documentation model lives under `src/stories/components`.
- Each documented component has a `Components/<Component>/Summary` MDX page and a `Components/<Component>/Default` interactive story.
- `Summary` pages must never render Storybook Controls; controls belong only to `Default` stories.
- `Default` stories render one controllable component instance for Storybook Controls.
- Sakai demo variations are merged into the closest base component. For example, Float Label and Invalid State examples are documented under their related input components.

Always use https://sakai.primereact.org/ as the source of truth for component behavior, variations, and best practices. The Storybook documentation is a curated subset of that material, not a comprehensive reference. When in doubt, consult the Sakai UI Kit and Sakai React source code.

## Generation Workflow

- `scripts/generate-component-stories.mjs` generates most component-level `.stories.tsx` and `.docs.mdx` files.
- Run `node scripts/generate-component-stories.mjs` after changing the component map.
- The generator intentionally skips `Button`; `Button` is maintained manually as the reference-quality template.
- Generated stories should be reviewed so each component keeps only `Summary` and `Default`.
- Sakai demo examples should be folded into the `Summary` page as curated examples instead of exported as separate `Sakai / ...` stories.
- Use `Show code` in Storybook Canvas to inspect the relevant usage snippet.

## Component Scope

The component catalog is based on these Sakai UI Kit pages:

- Input
- Float Label
- Invalid State
- Button
- Table
- List
- Tree
- Panel
- Overlay
- Media
- Menu
- Message
- File
- Chart
- Misc

Do not document application pages such as dashboard, landing, auth, or full-page templates in `Components/*`.

## Coding Rules

- Keep all user-facing documentation text in English.
- Keep component docs under `Components/<Component>`.
- Use `Summary` for MDX overview pages.
- Use `Summary` to show curated static examples of key variations such as severities, sizes, icons, states, and common styles.
- Static `Summary` examples should include a copyable Storybook `<Source>` block with the relevant usage snippet.
- Do not render `<Controls>` in `Summary` MDX pages; only `Default` stories should expose Storybook Controls.
- Keep `Default` as a single interactive playground instance controlled by Storybook Controls.
- Preserve `Show code` behavior by keeping docs Canvas `sourceState="hidden"`; `Default` stories should expose copyable code through the Canvas source panel, preferably with an explicit `parameters.docs.source.code` snippet when the generated source is not clear.
- Prefer component-level docs over page-level docs.
- When a Sakai page contains variations of an already documented component, merge them into that component instead of creating a duplicate component page.
- Do not edit files inside `vendor/sakai-react`; update local wrappers, helpers, or the generator instead.
- Run `npm run build` and `npm run build-storybook` before considering the project ready.

For each reviewed component:

1. Inspect `Button.docs.mdx` and `Button.stories.tsx` as the exact structural reference.
2. Inspect the current component docs/story files.
3. Inspect the closest Sakai UI Kit source under `vendor/sakai-react`.
4. Move Sakai-specific exported stories into curated static examples inside `Summary`.
5. Keep only `Default` exported from the `.stories.tsx` file.
6. Do not render `<Controls>` in `Summary`.
7. Keep `Default` as the only controls playground.

## GitHub Pages

- GitHub Pages deployment is configured in `.github/workflows/pages.yml`.
- The workflow installs dependencies with `npm ci`, syncs Sakai upstream, builds Storybook, adds `.nojekyll`, uploads `storybook-static`, and deploys it with `actions/deploy-pages`.
- In the GitHub repository settings, Pages must use **GitHub Actions** as the source.

## Important Commands

- `npm run storybook`: start local Storybook.
- `npm run build-storybook`: build static Storybook.
- `npm run build`: type-check and build the Vite landing page.
- `npm run sync:sakai`: clone or update upstream Sakai React.
- `node scripts/generate-component-stories.mjs`: regenerate component docs and stories.

## Current Status

- 67 component story sets are generated under `src/stories/components`.
- The manual Button documentation is the target pattern for future refinements.
- The old page-level `Sakai React/*` story grouping was removed from navigation to keep the catalog focused on real components.
