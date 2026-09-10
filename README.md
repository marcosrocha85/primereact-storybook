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

The completed component-review campaign covers 67 components from the Sakai UI Kit pages: Input, Float Label, Invalid State, Button, Table, List, Tree, Panel, Overlay, Media, Menu, Message, File, Chart, and Misc. Repeated variations were merged into the base component, for example `Float Label` and `Invalid State` appear under their corresponding input components. Audit evidence is retained in `docs/component-review-69.md`.

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

## Agentic SDLC

New components and material changes follow an issue-oriented Agentic SDLC instead of a batch implementation runner:

1. **Discovery:** inspect the selected GitHub issue or approved scope, Sakai source, installed PrimeReact API, current stories, generator ownership, and related tests.
2. **Plan:** define acceptance criteria, affected files, supported controls and compositions, native API behavior, interaction coverage, and validation. Implementation begins after the plan is approved.
3. **Implementation:** update `main`, create a dedicated branch, make the smallest scoped change, and update the generator rather than generated files when applicable.
4. **Validation:** run focused contract and browser tests, then `npm run build`, `npm run build-storybook`, and `git diff --check`.
5. **Review and delivery:** review the final diff against the plan and native API, create a Conventional Commit, push it, and open a PR linked to the issue. Merge remains a human approval gate.

GitHub Issues is the source of truth for future work. The completed component-review backlog and its former local migration file are not maintained as active task queues.

## GitHub Pages

This repository includes a GitHub Actions workflow that builds Storybook and deploys `storybook-static` to GitHub Pages.

To enable it in GitHub, set **Settings -> Pages -> Build and deployment -> Source** to **GitHub Actions**.
