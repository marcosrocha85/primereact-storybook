# Project Agent Guide

## Project Purpose

This repository documents PrimeFaces Sakai React as a Storybook-based design system. The public artifact is the static Storybook build generated into `storybook-static` and deployed through GitHub Pages.

## Current Architecture

- Storybook 10 runs on React + Vite.
- PrimeReact, PrimeIcons, PrimeFlex, Sakai layout styles, and Sakai demo assets are loaded globally in `.storybook/preview.tsx`.
- The upstream Sakai React repository is synced into `vendor/sakai-react` with `npm run sync:sakai`.
- `vendor/sakai-react` is intentionally ignored by Git and treated as source reference material.
- The primary documentation model lives under `src/stories/components`.
- Each documented component has a `Components/<Component>/Summary` MDX page and a `Components/<Component>/Default` interactive story.
- `Summary` pages show curated examples for important visual and behavioral variations.
- `Default` stories render one controllable component instance for Storybook Controls.
- Sakai demo variations are merged into the closest base component. For example, Float Label and Invalid State examples are documented under their related input components.

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
- Keep `Default` as a single interactive playground instance controlled by Storybook Controls.
- Preserve `Show code` behavior by keeping docs Canvas `sourceState="hidden"`.
- Prefer component-level docs over page-level docs.
- When a Sakai page contains variations of an already documented component, merge them into that component instead of creating a duplicate component page.
- Do not edit files inside `vendor/sakai-react`; update local wrappers, helpers, or the generator instead.
- Run `npm run build` and `npm run build-storybook` before considering the project ready.

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
