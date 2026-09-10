# Project Agent Guide

## Project Purpose

This repository documents PrimeFaces Sakai React as a Storybook-based design system. The public artifact is the static Storybook build generated into `storybook-static` and deployed through GitHub Pages.

## Agentic SDLC Workflow

The component-review campaign is complete. GitHub Issues in `marcosrocha85/primereact-storybook` remains the source of truth for future work, but there is no standing component queue or local TODO backlog. Do not invent work when no issue or user-approved scope exists, and do not use a batch implementation runner.

Every new component or material component change follows these stages:

1. **Intake and discovery**
   - Read this guide and inspect the working tree. Preserve existing user changes.
   - Honor the issue or scope selected by the user. For issue-backed work, read the full issue body, comments, dependencies, assignees, and linked/open PRs with `gh` or the GitHub connector.
   - Inspect the relevant Sakai page and source, installed PrimeReact types and implementation, current component stories/docs, generator entry, and related tests.
   - Keep discovery read-only. Identify ambiguity, dependencies, native API risks, generated-file ownership, and missing acceptance criteria.
2. **Plan and approval**
   - Produce a concrete implementation plan covering scope, affected files, controls, compositions, callbacks, accessibility, documentation, and focused validation.
   - Record future backlog work in GitHub Issues rather than a repository checklist.
   - Wait for explicit implementation approval after presenting the plan. Approval authorizes the scoped branch, implementation, commit, push, and PR delivery described below.
3. **Implementation**
   - Before editing, verify that no Git operation or unresolved conflict remains and that any preceding implementation PR has been merged. Never merge it without explicit authorization.
   - Switch to `main`, run `git pull --ff-only origin main`, and create a dedicated branch from the updated `main`.
   - Implement only the approved scope. Update the generator instead of generated component files when the generator owns them.
4. **Validation and review**
   - Run focused tests for the changed behavior, then the required builds and `git diff --check`.
   - Review the final diff against the approved plan, issue acceptance criteria, Sakai behavior, the complete relevant PrimeReact API, and the controls exposed to users.
   - Report actual validation results and distinguish code defects from environment blockers.
5. **Pull request delivery**
   - Create a scoped Conventional Commit using `type(scope): description` or `type: description`.
   - Push the branch and open or update a PR against `main`. Include `Closes #<number>` only when the full issue is satisfied; use `Refs #<number>` for partial work.
   - Use a draft PR while required work or validation remains incomplete. Report the PR URL and any blocker.
   - PR creation does not authorize merging. Merge remains an explicit human gate. After a confirmed merge, synchronize `main` and delete only the confirmed merged implementation branches.

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
- The generator preserves the manually curated `Button`, `Accordion`, `AutoComplete`, `Image`, and `Panel` implementations. `Button` remains the structural reference.
- Generated `.examples.tsx` files hold typed, self-contained component examples. Update their component map in the generator rather than editing generated output directly.
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
- Whenever an `icon` property is exposed in Controls, follow `Button.stories.tsx`: use a `select` control with `[undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill']`, including the no-icon option. Do not use a free-text control. Apply this to both manually maintained stories and component entries in the generator.
- Preserve `Show code` behavior by keeping docs Canvas `sourceState="hidden"`; `Default` stories should expose copyable code through the Canvas source panel, preferably with an explicit `parameters.docs.source.code` snippet when the generated source is not clear.
- Prefer component-level docs over page-level docs.
- When a Sakai page contains variations of an already documented component, merge them into that component instead of creating a duplicate component page.
- Do not edit files inside `vendor/sakai-react`; update local wrappers, helpers, or the generator instead.
- Run `npm run build` and `npm run build-storybook` before considering the project ready.

For each new or materially changed component:

1. Inspect `Button.docs.mdx` and `Button.stories.tsx` as the exact structural reference.
2. Inspect the current component docs/story files.
3. Inspect the closest Sakai UI Kit source under `vendor/sakai-react`.
4. Move Sakai-specific exported stories into curated static examples inside `Summary`.
5. Keep only `Default` exported from the `.stories.tsx` file.
6. Do not render `<Controls>` in `Summary`.
7. Keep `Default` as the only controls playground.

### Shared Documentation and Interaction Pattern

- Every Summary uses `Title`, `Subtitle`, then the same second-level sections in order: `Usage`, `Variations`, `Playground`. Put component-specific variation names under third-level headings.
- Place examples in `.component-example.sb-unstyled` stages with responsive widths and adjacent copyable `Source` blocks. Do not mount whole upstream pages or hide unrelated components with CSS.
- Link the Playground section to the component's Default story. Summary examples own their state and never render Controls.
- For components with composition variations, expose the meaningful variations shown in Summary through Default Controls while rendering a single component instance. Use `AvatarGroup` as the reference: configurable member count, text/image/mixed content, size, shape, and an optional overflow indicator. Apply only the options relevant to each component; do not limit a compositional playground to `className` and `style` when users can explore its content and structure.
- Define typed story-only arguments for composition controls, keep them separate from the underlying PrimeReact props, and document count/overflow semantics. Preserve these controls in the generator, keep copyable code faithful to the composition, and validate the supported variations with focused browser tests.
- Default uses `useArgs` from `storybook/preview-api` to synchronize controlled values with Controls and resets. Keep React state/ref hooks inside a separate React playground component, not in the same function as Storybook hooks.
- Preserve supplied event callbacks when adding state synchronization. Connect open/close, confirmation, notification, menu and upload actions to observable behavior. Demo uploads are explicitly simulated in the browser.
- Keep sample assets relative to the Storybook base path so GitHub Pages deployments under a repository path work.
- Default exposes the Code panel through `parameters.docs.codePanel`; Summary source examples and Default code must describe the actual implementation.
- Validate the affected behaviors with `node --test tests/component-review.test.mjs` against a running Storybook. Set `STORYBOOK_URL` when using a different port or a static build. The test uses the existing Playwright dependency and requires its Chromium browser and system libraries.
- Historical audit evidence and applicable checks for the completed component-review campaign are recorded in `docs/component-review-69.md`. Future work belongs in GitHub Issues.

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

- The component-review campaign is complete, covering 67 component story sets under `src/stories/components`.
- The manual Button documentation is the target pattern for future refinements.
- The old page-level `Sakai React/*` story grouping was removed from navigation to keep the catalog focused on real components.
- New components and material changes follow the Agentic SDLC workflow above.
