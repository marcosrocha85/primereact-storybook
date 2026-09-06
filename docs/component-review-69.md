# Component review evidence — issue #69

This document records implementation and validation evidence. [GitHub issue #69](https://github.com/marcosrocha85/primereact-storybook/issues/69) remains the source of task status; this file is not a second backlog.

## Shared pattern

Every component has exactly one `Default` story and one `Summary` page. Summary uses Title/Subtitle and `Usage`, `Variations`, `Playground` in that order. Examples use responsive `.component-example.sb-unstyled` stages and adjacent copyable source. The unstyled boundary prevents Storybook typography from overriding PrimeIcons. Default owns Controls and the Code panel.

The generator writes 62 component sets and their typed React example modules. Button, Accordion, AutoComplete, Image and Panel remain manually curated. AutoComplete's Summary examples now live outside its story module. React playground components hold local hooks; Storybook render functions use `useArgs` to synchronize interactive state and Controls. Existing callbacks are preserved.

Sakai UI Kit sources under `vendor/sakai-react/app/(main)/uikit` were inspected for component contracts and examples, including input, overlay, message, list, table, tree, panel, media, menu, file, misc, charts and button. Vendored files were not changed. Whole upstream pages and CSS-based section extraction have been removed from component examples.

## Findings and fixes

| Finding | Evidence and reproduction | Resolution |
| --- | --- | --- |
| Controlled boolean fields ignore interaction | In the previous static build, Checkbox and InputSwitch stayed checked after a click (`before: true`, `after: true`). Their change handlers were no-ops. | State updates now reach Storybook args; click, Space, disabled and Controls tests pass. |
| Unwired actions and controlled values | Existing source had no-op/missing callbacks for selectors, list transfers, modal close, overlay/confirmation triggers and notifications. Reproduce by operating the corresponding Default story. | Local examples implement state changes, refs, open/close actions, confirmation results and notification triggers; regression tests exercise them. |
| Summary renders Controls and unrelated stories | Existing Button and generated MDX rendered Controls; the generator exported extra Sakai stories and mounted whole upstream pages. | Only Summary/Default remain; Summary examples are local React components. A generator regression test protects the contract and manual files. |
| PrimeIcons become unreadable in Summary | Rendered Button Summary computed `Nunito Sans` for `.pi` instead of `primeicons`; icon glyphs were missing. | `sb-unstyled` isolates examples. Computed font is now `primeicons`; browser tests check this on every page containing icons. |
| Visible upload controls and tooltips are hidden from accessibility APIs | Browser DOM and installed PrimeReact source showed `aria-hidden="true"` on Upload/Cancel buttons and the visible tooltip. | Local pass-through attributes correct the accessibility tree; tests use accessible roles to find and operate them. |
| Generated output can overwrite earlier manual reviews | The old generator skipped only Button, despite manually curated Accordion, AutoComplete, Image and Panel. | All five are preserved; repeat generation is deterministic and tested in an isolated directory. |
| Default controls/code are incomplete | Several story definitions exposed no Controls; static snippets omitted implemented handlers. | Each generated Default exposes supported properties; Code is enabled globally and includes the example implementation. |
| Demo media assumes deployment at domain root | Image paths started with `/demo/`. | Local gallery/image samples use `./demo/` so assets resolve relative to the Storybook deployment path. |

## Component audit

All 67 components pass the same browser checks at 1280×900 and 390×900: exactly one Default, an indexed Summary, the common section order, no Summary Controls, copyable source, no runtime exceptions, loaded example images, and preserved icon fonts. The table lists additional checks; presentation-only components have no state-changing action to exercise. This covers the documented examples, not every upstream prop combination. “Wired” explicitly denotes source inspection in addition to the automated interactions listed, not an independently exercised gesture.

| Component | Existing issue | Additional checks |
| --- | --- | --- |
| Accordion | [#69](https://github.com/marcosrocha85/primereact-storybook/issues/69) | Single/multiple expansion; selected indices; keyboard-capable headers |
| AutoComplete | [#69](https://github.com/marcosrocha85/primereact-storybook/issues/69) | Search filtering; selection; single/multiple values |
| Avatar | [#8](https://github.com/marcosrocha85/primereact-storybook/issues/8) | Presentation and curated visual variations; state-changing interactions not applicable |
| AvatarGroup | [#9](https://github.com/marcosrocha85/primereact-storybook/issues/9) | Presentation and curated visual variations; state-changing interactions not applicable |
| Badge | [#10](https://github.com/marcosrocha85/primereact-storybook/issues/10) | Sakai numbers/severities, positioned counts/dots, button badges and sizes; single-instance placement/value/severity/size/icon Controls; observable button feedback; Summary navigation and copyable Code panel |
| BreadCrumb | [#11](https://github.com/marcosrocha85/primereact-storybook/issues/11) | Item command feedback; local home action |
| Button | [#69](https://github.com/marcosrocha85/primereact-storybook/issues/69) | Presentation and curated visual variations; state-changing interactions not applicable |
| Calendar | [#12](https://github.com/marcosrocha85/primereact-storybook/issues/12) | Date selection and clear button |
| Card | [#13](https://github.com/marcosrocha85/primereact-storybook/issues/13) | Presentation and curated visual variations; state-changing interactions not applicable |
| Carousel | [#14](https://github.com/marcosrocha85/primereact-storybook/issues/14) | Next item navigation |
| Chart | [#15](https://github.com/marcosrocha85/primereact-storybook/issues/15) | Presentation and curated visual variations; state-changing interactions not applicable |
| Checkbox | [#16](https://github.com/marcosrocha85/primereact-storybook/issues/16) | Click and Space toggle; disabled; Controls synchronization |
| Chip | [#17](https://github.com/marcosrocha85/primereact-storybook/issues/17) | Remove action |
| Chips | [#18](https://github.com/marcosrocha85/primereact-storybook/issues/18) | Add and remove tokens |
| ColorPicker | [#19](https://github.com/marcosrocha85/primereact-storybook/issues/19) | Hue and color selection |
| ConfirmPopup | [#20](https://github.com/marcosrocha85/primereact-storybook/issues/20) | Trigger; accept/reject feedback; dismiss |
| ContextMenu | [#21](https://github.com/marcosrocha85/primereact-storybook/issues/21) | Context-click trigger; keyboard trigger wired |
| DataTable | [#22](https://github.com/marcosrocha85/primereact-storybook/issues/22) | Sorting; pagination; filtering; row selection |
| DataView | [#23](https://github.com/marcosrocha85/primereact-storybook/issues/23) | Pagination; list/grid composition |
| Dialog | [#24](https://github.com/marcosrocha85/primereact-storybook/issues/24) | Open; close; reopen |
| Divider | [#25](https://github.com/marcosrocha85/primereact-storybook/issues/25) | Presentation and curated visual variations; state-changing interactions not applicable |
| Dropdown | [#26](https://github.com/marcosrocha85/primereact-storybook/issues/26) | Option selection |
| Fieldset | [#27](https://github.com/marcosrocha85/primereact-storybook/issues/27) | Collapse and expand |
| FileUpload | [#28](https://github.com/marcosrocha85/primereact-storybook/issues/28) | Local image selection; simulated upload completion; no POST request |
| Galleria | [#29](https://github.com/marcosrocha85/primereact-storybook/issues/29) | Next image navigation; image assets |
| Image | [#69](https://github.com/marcosrocha85/primereact-storybook/issues/69) | Preview open/close; assets; sizes/styles |
| InputMask | [#30](https://github.com/marcosrocha85/primereact-storybook/issues/30) | Masked input formatting and retention |
| InputNumber | [#31](https://github.com/marcosrocha85/primereact-storybook/issues/31) | Currency-mode entry and formatting |
| InputSwitch | [#32](https://github.com/marcosrocha85/primereact-storybook/issues/32) | Click and Space toggle; disabled |
| InputText | [#33](https://github.com/marcosrocha85/primereact-storybook/issues/33) | Text entry and clearing |
| InputTextarea | [#34](https://github.com/marcosrocha85/primereact-storybook/issues/34) | Text entry and clearing |
| Knob | [#35](https://github.com/marcosrocha85/primereact-storybook/issues/35) | Arrow-key value change |
| ListBox | [#36](https://github.com/marcosrocha85/primereact-storybook/issues/36) | Option selection |
| MegaMenu | [#37](https://github.com/marcosrocha85/primereact-storybook/issues/37) | Nested menu opening; leaf command feedback |
| Menu | [#38](https://github.com/marcosrocha85/primereact-storybook/issues/38) | Popup trigger; Escape; command feedback |
| Menubar | [#39](https://github.com/marcosrocha85/primereact-storybook/issues/39) | Command feedback |
| Message | [#40](https://github.com/marcosrocha85/primereact-storybook/issues/40) | Presentation and curated visual variations; state-changing interactions not applicable |
| Messages | [#41](https://github.com/marcosrocha85/primereact-storybook/issues/41) | Show and clear feedback |
| MultiSelect | [#42](https://github.com/marcosrocha85/primereact-storybook/issues/42) | Option selection; selected chip; Escape |
| OrderList | [#43](https://github.com/marcosrocha85/primereact-storybook/issues/43) | Move selected item upward |
| OverlayPanel | [#69](https://github.com/marcosrocha85/primereact-storybook/issues/69) | Trigger; dismiss |
| Panel | [#69](https://github.com/marcosrocha85/primereact-storybook/issues/69) | Collapse and expand with controlled state |
| PanelMenu | [#44](https://github.com/marcosrocha85/primereact-storybook/issues/44) | Expand group; leaf command feedback |
| Password | [#45](https://github.com/marcosrocha85/primereact-storybook/issues/45) | Text entry and clearing |
| PickList | [#46](https://github.com/marcosrocha85/primereact-storybook/issues/46) | Transfer selected item; source/target state |
| ProgressBar | [#47](https://github.com/marcosrocha85/primereact-storybook/issues/47) | Presentation and curated visual variations; state-changing interactions not applicable |
| RadioButton | [#48](https://github.com/marcosrocha85/primereact-storybook/issues/48) | Selection; disabled |
| Rating | [#49](https://github.com/marcosrocha85/primereact-storybook/issues/49) | Select rating; cancel rating |
| ScrollPanel | [#50](https://github.com/marcosrocha85/primereact-storybook/issues/50) | Overflow scrolling |
| ScrollTop | [#51](https://github.com/marcosrocha85/primereact-storybook/issues/51) | Scroll threshold; return to top |
| SelectButton | [#52](https://github.com/marcosrocha85/primereact-storybook/issues/52) | Option selection |
| Sidebar | [#53](https://github.com/marcosrocha85/primereact-storybook/issues/53) | Open; close; reopen |
| Skeleton | [#54](https://github.com/marcosrocha85/primereact-storybook/issues/54) | Presentation and curated visual variations; state-changing interactions not applicable |
| Slider | [#55](https://github.com/marcosrocha85/primereact-storybook/issues/55) | Arrow-key value change |
| SplitButton | [#56](https://github.com/marcosrocha85/primereact-storybook/issues/56) | Primary-action feedback; menu commands wired |
| Splitter | [#57](https://github.com/marcosrocha85/primereact-storybook/issues/57) | Pointer resizing |
| Steps | [#58](https://github.com/marcosrocha85/primereact-storybook/issues/58) | Step selection |
| TabMenu | [#59](https://github.com/marcosrocha85/primereact-storybook/issues/59) | Active item change |
| TabView | [#60](https://github.com/marcosrocha85/primereact-storybook/issues/60) | Active tab change |
| Tag | [#61](https://github.com/marcosrocha85/primereact-storybook/issues/61) | Presentation and curated visual variations; state-changing interactions not applicable |
| TieredMenu | [#62](https://github.com/marcosrocha85/primereact-storybook/issues/62) | Popup trigger; Escape; nested command feedback |
| Toast | [#63](https://github.com/marcosrocha85/primereact-storybook/issues/63) | Show and clear notification |
| ToggleButton | [#64](https://github.com/marcosrocha85/primereact-storybook/issues/64) | Click and Space toggle; disabled |
| Toolbar | [#65](https://github.com/marcosrocha85/primereact-storybook/issues/65) | Action feedback |
| Tooltip | [#66](https://github.com/marcosrocha85/primereact-storybook/issues/66) | Keyboard focus/blur; visible tooltip exposed to accessibility tree |
| Tree | [#67](https://github.com/marcosrocha85/primereact-storybook/issues/67) | Expand; checkbox selection |
| TreeTable | [#68](https://github.com/marcosrocha85/primereact-storybook/issues/68) | Expand; checkbox selection |

## Validation

- `npm run build`: passed. Earlier TypeScript failures in vendored UI Kit pages are no longer pulled into the component build because examples no longer import those pages; no compiler options or vendor files were weakened.
- `npm run build-storybook`: passed; Vite still reports large-chunk and plugin-timing warnings.
- `node --test tests/component-generator.test.mjs`: 1 passed. Validates deterministic regeneration, preservation of manual components, a single Default export, Controls availability and Summary boundaries.
- `STORYBOOK_URL=http://127.0.0.1:6007 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test tests/component-review.test.mjs`: 89 passed against the static build served by `python3 -m http.server 6007 --bind 127.0.0.1 --directory storybook-static`.
- Final targeted check: `STORYBOOK_URL=http://127.0.0.1:6007 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='Menubar:|Controls reflect' tests/component-review.test.mjs`: 2 passed after the final Menubar Controls adjustment, including Controls reset.
- `git diff --check`: passed.
- Rendered Button desktop and Checkbox/DataTable mobile pages were visually inspected; the sampled documents did not overflow the viewport horizontally.

Chromium was installed for the existing Playwright dependency. The environment lacked browser system libraries, and global installation required a sudo password. The missing packages were instead extracted into `/tmp/sakai-browser-libs`; the `LD_LIBRARY_PATH` prefix is an environment workaround, not a project requirement or dependency change. Browser tests and generator subprocesses ran outside the restricted sandbox after it blocked local networking/process creation.

## Delivery boundary

Implementation and validation are local. Issue #69 and its existing component issues remain open until the changes are reviewed and merged, as required by the GitHub workflow. No issue is considered completed solely by this audit record.
