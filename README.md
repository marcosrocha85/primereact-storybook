# Sakai Storybook

React + Vite Storybook for documenting the [PrimeFaces Sakai React](https://github.com/primefaces/sakai-react) template as a design system.

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
