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
| BreadCrumb | [#11](https://github.com/marcosrocha85/primereact-storybook/issues/11) | Sakai five-level hierarchy, optional Home and disabled-item examples; independent Summary state; model/Home editing and Controls reset; keyboard activation and disabled-item behavior; local command feedback and preserved Home URL; Summary navigation and copyable Code panel. Supplied command callbacks are preserved by source inspection. |
| Button | [#69](https://github.com/marcosrocha85/primereact-storybook/issues/69) | Presentation and curated visual variations; state-changing interactions not applicable |
| Calendar | [#12](https://github.com/marcosrocha85/primereact-storybook/issues/12) | Sakai popup/Today/Clear, floating-label, invalid and disabled examples; unique associated labels and independent Summary state; timestamp Controls synchronized with typed/selected dates, format changes and reset; invalid-field accessibility; Summary navigation and copyable Code panel. Additional browser checks preserved local dates in America/Sao_Paulo and Asia/Tokyo. Supplied onChange callbacks are preserved by source inspection. |
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

### ConfirmPopup API audit — issue #20

Source inspection covered the installed `ConfirmPopupProps` type, PrimeReact implementation, and the Sakai UI Kit menu/confirmation route. The story forwards the complete native props object; it adapts only `target`, `visible`/`onHide`, `accept`, and `reject` to connect the trigger and observable feedback. Supplied `onHide`, `accept`, and `reject` callbacks remain invoked.

| Native surface | ConfirmPopup contract | Story treatment |
| --- | --- | --- |
| `tagKey`, `target`, `visible`, `defaultFocus`, `dismissable`, `closeOnEscape` | Popup identity, target alignment, controlled visibility, focus choice, and dismissal behavior | Forwarded; `target` and `visible` are adapted for the playground trigger. Controls expose focus and dismissal settings. |
| `message`, `icon`, `rejectLabel`, `acceptLabel`, `rejectIcon`, `acceptIcon`, `rejectClassName`, `acceptClassName`, `className`, `style` | Message supports a React node or function; icons support `IconType`; labels and styling customize the popup and its buttons | Forwarded. Controls expose text labels and curated icon strings; React nodes/functions and arbitrary styling remain supported through native props but are outside the controls examples. |
| `appendTo`, `transitionOptions`, `unstyled` | Overlay mount target, transition configuration, and core-style opt-out | Forwarded unchanged; intentionally outside the curated playground controls. `appendTo` retains its `'self' | HTMLElement | null | (() => HTMLElement)` value modes. |
| `footer`, `content`, `children` | React node or function templates for footer/content and child content | Forwarded unchanged; intentionally outside the curated examples. The default composition uses the native message/footer implementation. |
| `pt`, `ptOptions` | Nested pass-through sections for `root`, `content`, `icon`, `message`, `footer`, `rejectButton`, `acceptButton`, `hooks`, and `transition` | Forwarded unchanged; user pass-through customizations are not replaced by playground defaults. |
| `onShow`, `onHide(result)`, `accept`, `reject` | Visibility and action callbacks | `onHide`, `accept`, and `reject` are wrapped only to synchronize local feedback, then invoke the supplied callback. `onShow` is forwarded unchanged. |
| Inherited DOM attributes and component-base props | Additional native attributes accepted by the PrimeReact component base | Forwarded by `{...args}`; not independently exercised in this focused review. |

The browser checks verify the documented trigger, accept/reject feedback, and Escape dismissal at desktop and mobile widths through the static Storybook build. They do not exhaustively test every native prop, template, pass-through section, lifecycle hook, transition configuration, or append target; those surfaces are source-inspected and forwarded.

## DataTable review — issue #22

### Sources and scope

Inspected the Button docs/story, the DataTable generator entry and generated files, the Sakai UI Kit table source at `vendor/sakai-react/app/(main)/uikit/table/page.tsx`, and the installed PrimeReact `datatable.d.ts`, `column.d.ts`, and implementation. The curated story uses the Sakai-relevant single-row table composition: sortable/filterable columns, pagination, striped/gridline and density options, responsive layout, and controlled single-row selection. Summary examples are static DataTable compositions with copyable source; Controls remain on Default only.

### API inventory

| Native surface | Treatment |
| --- | --- |
| `value`, `dataKey`, `selectionMode`, `selection`, `cellSelection` | Forwarded unchanged. The curated typed playground selects `DataTablePropsSingle` and adapts only single-row `selection` through `onSelectionChange`; native multiple, checkbox, and cell selection models remain supported by PrimeReact but are intentionally outside this single-row documentation scope. |
| Sorting: `sortField`, `sortOrder`, `sortMode`, `multiSortMeta`, `removableSort`, `defaultSortOrder`, `onSort` | Forwarded unchanged. Summary demonstrates sortable columns and sort configuration; `onSort` remains available to supplied args. |
| Filtering: `filterDisplay`, `filters`, `globalFilter`, `globalFilterFields`, `globalFilterMatchMode`, `filterDelay`, `filterLocale`, `onFilter`, `filterIcon`, `filterClearIcon` | Forwarded unchanged. Summary demonstrates row filters; menu filters, global filters, custom match modes, icons, and callbacks remain native args outside the curated Controls. |
| Pagination: `paginator`, `first`, `rows`, `rowsPerPageOptions`, `pageLinkSize`, `paginatorPosition`, `paginatorTemplate`, `paginatorClassName`, `paginatorLeft`, `paginatorRight`, `paginatorDropdownAppendTo`, `currentPageReportTemplate`, `alwaysShowPaginator`, `totalRecords`, `onPage` | Forwarded unchanged. `paginator` and `rows` are Controls; other paginator configuration is intentionally outside the curated Controls. |
| Display and layout: `size`, `stripedRows`, `showGridlines`, `showHeaders`, `responsiveLayout`, `scrollable`, `scrollHeight`, `frozenValue`, `frozenWidth`, `loading`, `loadingIcon`, `emptyMessage`, `className`, `style`, `tableClassName`, `tableStyle`, `tabIndex` | Forwarded unchanged. `size` and `responsiveLayout` are Controls; the remaining presentation modes are available through native args and selected Sakai examples only where relevant. |
| Row grouping, expansion, editing, reorder and resize: `groupRowsBy`, `rowGroupMode`, `expandableRowGroups`, `rowGroupHeaderTemplate`, `rowGroupFooterTemplate`, `expandedRows`, `rowExpansionTemplate`, `onRowToggle`, `onRowExpand`, `onRowCollapse`, `editMode`, `editingRows`, `rowEditor*`, `rowEditValidator`, `onRowEdit*`, `reorderableRows`, `onRowReorder`, `resizableColumns`, `columnResizeMode`, `onColumnResize*`, `reorderableColumns`, `reorderIndicator*` | Forwarded unchanged and outside the focused curated examples. No wrapper default replaces these templates, icons, or callbacks. |
| Selection and row/cell/context events: `onSelectionChange`, `onContextMenuSelectionChange`, `onSelectAllChange`, `onAllRowsSelect`, `onAllRowsUnselect`, `onRowSelect`, `onRowUnselect`, `onCellSelect`, `onCellUnselect`, `onCellClick`, `onRowClick`, `onRowDoubleClick`, `onRowPointerDown`, `onRowPointerUp`, `onRowMouseEnter`, `onRowMouseLeave`, `onContextMenu`, `isDataSelectable`, `showSelectAll`, `selectAll`, `selectionPageOnly`, `selectionAutoFocus`, `selectionAriaLabel`, `metaKeySelection`, `compareSelectionBy`, `dragSelection`, `selectOnEdit`, `showSelectionElement` | Forwarded unchanged. `onSelectionChange` is wrapped only to synchronize the controlled selection and then invokes the supplied callback with the original event. |
| Templates and exports: `header`, `footer`, `headerColumnGroup`, `footerColumnGroup`, `paginatorLeft`, `paginatorRight`, `rowClassName`, `cellClassName`, `showRowReorderElement`, `exportFunction`, `exportFilename`, `csvSeparator` | Forwarded unchanged; not independently rendered in the curated Summary. |
| State persistence and virtual scrolling: `stateKey`, `stateStorage`, `customSaveState`, `customRestoreState`, `onStateSave`, `onStateRestore`, `virtualScrollerOptions`, `onValueChange` | Forwarded unchanged and source-inspected, not exposed as playground Controls. |
| Pass-through and component base: `pt`, `ptOptions`, `unstyled`, `children`, inherited `HTMLAttributes<HTMLDivElement>` such as `id`, `role`, `aria-*`, `data-*`, DOM event handlers, `className`, and `style` | Forwarded by `{...args}`. User PT entries and unrelated native props are not replaced by wrapper defaults. `children` remains the native Column composition slot. |
| Column nested model | `Column` children retain their native `field`, `header`, `sortable`, `filter`, `filterPlaceholder`, body/header/footer templates, selection, editor, width, reorder, expander, frozen, and pass-through APIs. The story curates three fields while leaving Column props available to the composition. |
| Imperative ref API | PrimeReact's `clearState`, `reset`, export, filter/sort metadata, scrolling, column sizing/order, element/table accessors, and virtual-scroller accessors are source-inspected and remain outside the story wrapper. |

The inventory is source inspection, not exhaustive behavioral testing. Focused browser coverage verifies sorting, pagination, row filtering, and single-row selection. The contract test verifies native value/model props, nested children, pass-through objects, inherited attributes, and supplied callbacks survive the only intercepted selection handler. Multiple/cell selection, templates, state persistence, virtual scrolling, imperative methods, and every inherited DOM event are forwarded but not exhaustively exercised here.

Issue #22 validation: `node --test tests/datatable-contract.test.mjs tests/component-generator.test.mjs` passed (2 tests); `STORYBOOK_URL=http://127.0.0.1:6017 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='DataTable' tests/component-review.test.mjs` passed (2 tests, desktop/mobile Summary/Default plus sorting, pagination, filtering, and selection); `npm run build` passed; `npm run build-storybook` passed with existing large-chunk and plugin-timing warnings; `git diff --check` passed. The browser test used a temporary static server on port 6017, which was stopped after validation.

## DataView review — issue #23

### Sources and scope

Inspected the Button docs/story, the DataView generator entry and generated files, the Sakai UI Kit list source at `vendor/sakai-react/app/(main)/uikit/list/page.tsx`, and the installed PrimeReact `dataview.d.ts` and implementation. The curated story demonstrates the Sakai-relevant list/grid composition and pagination with a typed product template. Summary examples are static and copyable; Controls remain on the single Default story.

### API inventory

| Native surface | Treatment |
| --- | --- |
| `value`, `dataKey`, `layout` | Forwarded unchanged. The Default Controls expose the curated `list` and `grid` values; PrimeReact's declared string extension remains available programmatically. `dataKey` is passed through for stable item keys and is not a separate Control. |
| Pagination: `rows`, `first`, `totalRecords`, `paginator`, `paginatorPosition`, `alwaysShowPaginator`, `paginatorClassName`, `paginatorTemplate`, `paginatorLeft`, `paginatorRight`, `paginatorDropdownAppendTo`, `pageLinkSize`, `rowsPerPageOptions`, `currentPageReportTemplate` | Forwarded unchanged. `paginator` and `rows` are exposed as Controls; the remaining paginator configuration is intentionally outside the curated playground. The native uncontrolled paging state remains intact. |
| Sorting: `sortField`, `sortOrder` | Forwarded unchanged and outside the curated Controls. PrimeReact sorts a copied value array before rendering; no wrapper sorting or value mutation is introduced. |
| Display and data loading: `header`, `footer`, `emptyMessage`, `gutter`, `loading`, `loadingIcon`, `lazy`, `className`, `style`, `unstyled` | Forwarded unchanged. The product card template is the only story-owned default; custom loading, empty, header/footer, gutter, lazy/server data, styling and unstyled modes remain native props outside the curated examples. |
| Templates: `itemTemplate`, `listTemplate`, `children` | `itemTemplate` is passed through when supplied; otherwise the story supplies its product renderer to make the playground visible. `listTemplate` and children remain untouched and available programmatically. Both template value forms and arbitrary item models remain native. |
| `onPage` | Forwarded unchanged. The story does not intercept or replace supplied page callbacks; the default uses PrimeReact's internal paging state. |
| `pt`, `ptOptions` | Forwarded unchanged with no wrapper PT defaults. Native sections root, header, paginator, content, emptyMessage, footer, loadingOverlay, loadingIcon, grid and hooks retain their object/function forms and method options. |
| Inherited `HTMLAttributes<HTMLDivElement>` and DOM events | Forwarded by the native component base, including `id`, `role`, `aria-*`, `data-*`, `title`, `tabIndex`, `className`, `style`, keyboard, focus, pointer, mouse, touch, drag, clipboard, composition, form, animation, transition, scroll and capture handlers. Native routing to the root remains unchanged. |
| Ref API | Native `getElement()` remains available through the component ref and is not adapted or exposed as a Control. |
| Nested `DataViewLayoutOptions` | The related native component supports `id`, `layout`, `listIcon`, `gridIcon`, `style`, `className`, `onChange`, `children`, PT and inherited div attributes. It is used by Sakai to change layout but is not mounted in this DataView story; its icon/function value modes remain outside this curated scope. |

The inventory is based on source inspection and does not claim exhaustive testing. Focused browser coverage verifies pagination, Summary structure, list/grid rendering at desktop and mobile widths, and the Default source panel. The contract test verifies native prop identity, the custom item-template fallback, supplied item-template callbacks, PT, inherited attributes and `onPage` preservation. Sorting, lazy/server paging, custom paginator templates, list templates, arbitrary item models, PT callbacks, inherited events, ref methods and DataViewLayoutOptions are forwarded or documented but not exhaustively browser-tested.

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

## ColorPicker review — issue #19

### Sources and scope

Inspected Button docs/story, the ColorPicker generator entry and generated files, Sakai `app/(main)/uikit/input/page.tsx`, and the installed PrimeReact 10.9.7 `colorpicker/colorpicker.d.ts`, implementation, pass-through types, and component-base types. The Sakai example uses a controlled hex value, a two-rem preview, and the native `onChange` event. ColorPicker remains a single color input; no unrelated form-layout or application actions were added.

### API inventory

| Native API surface | Treatment |
| --- | --- |
| `value` and `format` | Exposed in Default Controls. `value` retains the native hex string, RGB object, HSB object, or `undefined` modes; `format` retains `hex`, `rgb`, and `hsb`. The adapter updates Controls with the event value without converting or narrowing it. |
| `onChange` | Wrapped only to synchronize `value` through `useArgs`/local Example state, then invokes the supplied callback with the original event. |
| `inline`, `defaultColor`, `disabled`, `autoFocus`, `inputId`, `inputRef`, `inputStyle`, `inputClassName`, `panelClassName`, `panelStyle`, `tooltip`, `tooltipOptions`, `transitionOptions`, `appendTo`, `children`, `unstyled` | Native props are passed through unchanged. The first nine relevant visual/input props are editable Controls where they are safe and meaningful; DOM refs, overlays, transitions, tooltip configuration, children, unstyled mode, and mount targets remain available to programmatic story args but outside the curated Controls. |
| `onShow`, `onHide` | Passed through unchanged; no wrapper callback replaces them. |
| Inherited `React.InputHTMLAttributes<HTMLInputElement>` except native `onChange`, `value`, and `ref` | Passed through by the native component. This includes `id`, `name`, `className`, `style`, `tabIndex`, `aria-*`, data attributes at runtime, input attributes, and inherited clipboard, composition, focus, keyboard, mouse, pointer, touch, drag, selection, animation and transition callbacks. `inputRef` remains the native ref prop; the story does not add ref forwarding. |
| `pt` | Passed through unchanged. Native sections are `root`, `input`, `panel`, `content`, `selector`, `color`, `colorHandle`, `hue`, `hueHandle`, `tooltip`, `hooks`, and `transition`; user entries are not replaced by wrapper defaults. |
| `ptOptions` | Passed through unchanged, including native merge sections/props behavior. |
| Nested models, selection modes, templates | No item model, selection mode, or template API exists. The native value model is the string/RGB/HSB union above; `children` is accepted by the native contract but does not define the picker UI. |
| Imperative ref API | Native `show`, `hide`, `focus`, `getElement`, `getOverlay`, and `getInput` methods are source-inspected and remain outside the story wrapper examples. |

### Evidence boundaries

`tests/colorpicker-contract.test.mjs` verifies the wrapper's value-mode, prop, pass-through, callback identity, and original-event behavior. The existing focused browser test verifies hue and saturation/brightness interaction. Browser coverage does not certify every inherited DOM event, every pass-through function/hook, portal target, transition callback, imperative ref method, or all string/object value combinations. Those surfaces are source-inspected and forwarded without interception.

### Final validation for issue #19

- `node scripts/generate-component-stories.mjs`: passed; generated changes are limited to ColorPicker.
- `node --test tests/colorpicker-contract.test.mjs tests/component-generator.test.mjs`: passed, 2 tests.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk and plugin-timing warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:6020 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='Slider, Knob, Rating and ColorPicker|ColorPicker: only Summary and Default' tests/component-review.test.mjs`: passed, 2 tests. Summary/Default and hue/color interaction passed at desktop/mobile widths.
- Manual Playwright visual inspection of Summary and Default at 1280px and 390px: passed; one Default instance rendered and no horizontal overflow was observed.
- `git diff --check`: passed.

Only Summary/Default are retained. Summary has copyable source for usage, inline, RGB, HSB, and disabled examples; Controls remain on Default only. The Default remains one ColorPicker instance and its stage uses the Sakai two-rem preview style.

## Card review — issue #13

### Sources and scope

Inspected Button docs/story, the Card generator entry and generated files, Sakai `app/(main)/uikit/panel/page.tsx` (custom padded heading and content), and installed PrimeReact `card/card.d.ts`, `card/card.esm.js`, `passthrough/index.d.ts`, and `componentbase/componentbase.d.ts`. The live Sakai panel URL could not be fetched; the local Sakai UI Kit source supplied the behavior reference. Card remains a presentation container. The upstream application popup menu is intentionally outside the curated Card examples; no inert actions, extra icons, images, selection modes, or artificial disabled/severity states were added.

### API inventory

| Native API surface | Treatment |
| --- | --- |
| `title`, `subTitle` | Exposed as text Controls; the full native ReactNode or `(props: CardProps) => ReactNode` types are retained and forwarded unchanged. Slot functions receive native resolved Card props. |
| `header`, `footer` | Passed through as native nodes or slot functions, including explicit null/false/zero/empty values. Only `undefined` activates the optional `headerText`/`footerText` story fallback. |
| `children` | Passed through as ReactNode, including arrays, elements, strings, numbers, booleans, null and portals. Only `undefined` activates `contentText`; function children are not supported by native Card. This fixes the previous unconditional replacement of supplied children. |
| `className`, `style` | Exposed and forwarded unchanged; responsive stage sizing is on an outer div, independent of the supplied Card style. |
| All inherited `React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>` members except native omissions `ref` and `title` | Passed through by the rest spread. Includes `key`, id, role, tabIndex, accessKey, contentEditable, dir, draggable, hidden, lang, slot, spellCheck, translate, defaultValue/defaultChecked, hydration/content-editable warning flags, HTML/RDFa/microdata attributes, all `aria-*` attributes, and all inherited React DOM event handlers and capture variants. Data attributes are forwarded at runtime. HTML title is replaced by the Card title slot. `dangerouslySetInnerHTML` retains React's native conflict with children; not offered as a Control. Ref forwarding through the story wrapper is intentionally outside the examples. |
| Inherited events | Clipboard, composition, focus, form/input, load/error, keyboard, media, mouse, drag/drop, selection, touch, pointer/capture, scroll/wheel, animation and transition handlers remain untouched. Card has no component-specific events. No callback is replaced or synthesized. |
| `pt` | Forwarded unchanged, with no wrapper defaults to overwrite or merge. All sections inventoried: root, header, body, title, subTitle, content, footer, hooks. Section attributes or functions using `CardPassThroughMethodOptions.props` retain native handling. |
| `pt.hooks` | Native useMountEffect, useUpdateEffect, useUnmountEffect retained; not exposed as Controls. |
| `ptOptions` | Native mergeSections, mergeProps and classNameMergeFunction retained unchanged; not exposed as Controls. |
| `unstyled` | Forwarded; intentionally outside the themed Sakai examples. |
| Nested models, selection/value modes, templates | No item model or selected value. The four named slots support React nodes/functions; children support React nodes. No native size, severity, icon, loading or disabled props. |
| Story-only contentText, headerText, footerText | Optional strings, stripped before forwarding; empty strings omit their fallback section. Header fallback uses Sakai heading spacing. The Default uses useArgs; Card has no internal value to synchronize back. |

### Evidence boundaries

`tests/card-contract.test.mjs` verifies actual native server rendering of node/function slots, custom root/content pass-through entries, fallback precedence, explicit empty value modes, inherited callback identity and invocation with the original event, and preservation of styles/options. It does not prove browser event propagation, every inherited attribute, portals, lifecycle hooks, function-valued pass-through entries, unstyled rendering, or all possible combinations. Those surfaces were source-inspected and are forwarded without interception.

`tests/component-review.test.mjs` has focused Card assertions for Summary/Default indexing, Summary sections and absence of Controls, copyable Source blocks, Default composition editing/clearing, one Card instance, and responsive widths. Validation results for this review are recorded below separately from the historical audit above.

### Final validation for issue #13

- `node scripts/generate-component-stories.mjs`: passed; only the Card generated set changed.
- `node --test tests/card-contract.test.mjs tests/component-generator.test.mjs`: passed, 3 tests.
- `npm run build`: passed on the final implementation.
- `npm run build-storybook`: passed on the final implementation; existing chunk-size and plugin-timing warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:6013 LD_LIBRARY_PATH=/tmp/sakai-breadcrumb-libs/extracted/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='^Card:' tests/component-review.test.mjs`: passed, 3 Card tests. No full browser suite was run.
- `git diff --check`: passed.
- Visually inspected Summary and composed Default at 1280 and 390 pixels. Content and section spacing are readable; no icons or interactive Card states apply. The centered Default initially overflowed at mobile width; the final stage uses a viewport-limited width and the regression test checks both Card bounds and document scroll width. Custom user CSS can still deliberately exceed that size.
- Initial browser launches using `/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu` and `/tmp/sakai-breadcrumb-libs/usr/lib/x86_64-linux-gnu` failed because `libnspr4.so` was missing at those paths. The existing `extracted` directory resolved the dependency. Intermediate runs found a hidden Code selector, mobile manager Controls visibility, and real stage overflow; those were corrected before the final passing run.

## Carousel review — issue #14

### Sources and scope

Inspected Button docs/story, the Carousel generator and generated set, Sakai `app/(main)/uikit/media/page.tsx` and `public/demo/data/products-small.json`, and installed PrimeReact 10.9.7 `carousel/carousel.d.ts`, `carousel/carousel.esm.js`, `passthrough/index.d.ts`, and `componentbase/componentbase.d.ts`. The live [Sakai Media page](https://sakai.primereact.org/uikit/media) returned no extractable content; the local UI Kit supplies the implementation reference.

The implementation replaces bare names with three Sakai product cards (image, name, price, stock), uses relative assets, and adds responsive, circular and vertical Summary examples with complete copyable source. The upstream application action buttons are deliberately omitted because this documentation has no corresponding product actions. These presentation changes make the item template and responsive collection visible. Only Summary/Default remain; Code panel and hidden Canvas source inherit the global preview configuration.

### API inventory

| Native API surface | Treatment |
| --- | --- |
| `value`, `itemTemplate` | Passed through unchanged. The sample array/template are defaults, not wrapper replacements. Native arbitrary arrays, primitive items, object models, empty arrays and omitted values retain their types. Custom data requires a matching custom template; the sample template expects name/image/price/inventoryStatus. There is no selection mode. Despite optional typing, native rendering throws for nonempty data without a callable template. |
| `page`, `onPageChange` | Page is exposed as a zero-based page index (the declaration describes it ambiguously as an item index; implementation uses pages). The wrapper adapts the native `{ page: number }` event to updateArgs and calls the supplied callback with the original event. Example owns state; Default uses useArgs. Only normal paging injects the adapter. Circular/autoplay use native internal paging and reject supplied onPageChange or nonzero page with an explicit message; see the limitation below. Responsive pages are clamped to the current viewport and synchronized back to Controls. |
| `numVisible`, `numScroll` | Exposed positive integer Controls for the three-item sample, forwarded unchanged. Valid configurations require numScroll <= numVisible and counts appropriate to data length; no native mode is coerced or narrowed in the props type. Invalid count combinations display guidance before mounting Carousel. Configuration changes remount the native instance because its count state is initialized from props. |
| `responsiveOptions` | Object Control; forwarded unchanged. Nested entries contain breakpoint (CSS max-width string), numVisible and numScroll. The playground accepts pixel breakpoints, validates the nested counts, and subscribes to viewport changes. Effective count changes remount the native instance, including after navigation, while clamping the page to its available range. The supplied options object is forwarded unchanged. Summary supplies 768px/2 and 560px/1 options. |
| `orientation`, `verticalViewPortHeight` | Exposed horizontal/vertical and viewport-height Controls; passed through. Vertical uses a 320px sample viewport. |
| `circular`, `showIndicators`, `showNavigators`, `autoplayInterval` | Exposed and passed through. Autoplay defaults to zero; native positive intervals imply circular behavior and navigation stops autoplay. Circular forward/backward wrapping, horizontal/vertical layouts, autoplay and hidden navigation have browser coverage. Switching layout or autoplay configuration remounts the native instance. |
| `header`, `footer` | Text Controls; full native ReactNode contract retained for programmatic arguments, including null/false/zero/arrays/elements. Native does not declare function slots here. |
| `prevIcon`, `nextIcon` | Full native IconType (string, React node, or options callback) forwarded; intentionally outside curated Controls. Native defaults provide orientation-specific arrows. |
| `contentClassName`, `containerClassName`, `indicatorsContentClassName` | Passed through, outside curated Controls. |
| `id`, `className`, `style` and inherited HTMLDivElement attributes | Forwarded unchanged. Stage sizing is on an outer div. Native extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> omitting ref: this includes key, title, role, tabIndex, accessKey, contentEditable, dir, draggable, hidden, lang, slot, spellCheck, translate, defaultValue/defaultChecked, hydration/content-editable warning flags, HTML/RDFa/microdata, and all aria attributes. Data attributes pass through at runtime. dangerouslySetInnerHTML retains the native React conflict with generated children. |
| Inherited DOM events | Clipboard, composition, focus, form/input, load/error, keyboard, media, mouse, drag/drop, selection, touch, pointer/capture, scroll/wheel, animation and transition handlers, including capture variants, forwarded unchanged. Native internal swipe/indicator handling remains native. Only onPageChange is intercepted. |
| `children` | Passed through as declared ReactNode; native Carousel builds its own item/header/footer children and does not render props.children. Not exposed as a composition Control. |
| `pt` | Forwarded unchanged without wrapper defaults. All sections: root, header, content, container, previousButton, previousButtonIcon, itemsContent, itemsContainer, itemCloned, item, nextButton, nextButtonIcon, indicators, indicator, indicatorButton, footer, hooks. Section objects/functions and their attribute/event merging retain native behavior. |
| Nested PT models | Method options include props, state (numVisible, numScroll, page, totalShiftedItems) and context (active). Hooks include useMountEffect, useUpdateEffect, useUnmountEffect. Source-inspected, outside Controls. |
| `ptOptions` | mergeSections, mergeProps and classNameMergeFunction forwarded unchanged. |
| `unstyled` | Passed through; intentionally outside themed Sakai examples. |
| Imperative ref API | Native startAutoplay, stopAutoplay, getElement; outside the wrapper examples. The wrapper does not forward a Carousel ref. |
| Story-only properties | None; ExampleArgs retains ComponentProps<typeof Carousel>. |

### Evidence and native limitation

PrimeReact 10.9.7 controlled circular navigation was reproduced failing before the change. Its changePage function does not update internal pageState in controlled mode, while circular navigation still reads that state. The playground therefore uses native uncontrolled paging for circular/autoplay, with page zero and no onPageChange callback. It explicitly rejects incompatible arguments instead of silently dropping user callbacks. This is a restriction of the documented playground, not a fix to the dependency. Normal paging still forwards the original event to supplied callbacks and synchronizes Controls. No dependency or vendor file was modified.

Contract tests inspect forwarding and server-render native Carousel with custom object/primitive/empty data, custom templates, slot nodes, root/item PT and original event callbacks. The viewport subscription and effect are stubbed only for direct adapter inspection; browser tests exercise real hooks. Tests also cover invalid counts/pages/responsive configurations and the explicit circular callback restriction. They do not prove every inherited attribute, PT hook/function, icon template, unstyled mode, imperative ref method or API combination.

Browser coverage includes Summary/Default indexing, assets, sections, Controls placement, copyable source, normal paging and reset; circular wrapping in both directions and orientations at 1280px/390px; responsive counts and desktop resize after mobile navigation; hidden navigators/indicators, header/footer and autoplay; all six valid sample count pairs in normal mode and circular wrapping for pairs with multiple pages; invalid configuration guidance and live count edits/reset. Desktop/mobile Default screenshots were inspected with no clipping or overlapping navigation.

### Actual validation

- `node scripts/generate-component-stories.mjs`: passed; generated changes are limited to Carousel.
- `node --test tests/carousel-contract.test.mjs tests/component-generator.test.mjs`: passed, 5 tests.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing build warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:6014 LD_LIBRARY_PATH=/tmp/sakai-breadcrumb-libs/extracted/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='^Carousel:' tests/component-review.test.mjs`: passed, 4 tests.
- After extending count coverage to circular mode, the same browser command with `--test-name-pattern='^Carousel: count'`: passed, 1 test.
- `git diff --check`: passed.

No full browser suite was run. API inventory is source-inspection evidence, not exhaustive behavioral certification.

## Chart review — issue #15

### Sources and scope

Inspected Button docs/story, the Chart generator and generated files, Sakai `app/(main)/uikit/charts/page.tsx`, installed PrimeReact `chart/chart.d.ts` and `chart/chart.esm.js`, PT/hook declarations, and Chart.js `dist/types/index.d.ts`. The live Sakai charts URL could not be opened by the web tool; the local upstream source provides the six chart variations.

Only Summary/Default remain. Summary has named line, bar, pie, doughnut, polar area and radar variations, each with self-contained copyable source. Default exposes native type/data/options Controls, uses useArgs, and inherits the global Code panel and hidden Canvas source. Chart has no controlled selection/value-change event to synchronize back from the canvas. Legend visibility and tooltips remain native transient Chart.js interactions.

Necessary presentation changes: Sakai palette, an explicit dataset label and title (also the native canvas accessible label), and viewport-limited stage width. Each Summary instance clones only the serializable sample defaults before applying supplied initialArgs. Sharing Chart.js configuration objects across simultaneous chart types caused blank data/incorrect axes in the initial visual inspection. Independent defaults fixed those examples; custom data/options/plugins/callbacks/PT are never cloned or replaced. A separate direct Chart.js experiment with shared versus independent configurations also produced different pie/doughnut/polar chart geometry; that experiment is narrower than the simultaneous Summary failure and is not a PrimeReact defect certification.

### API inventory

| Surface | Treatment |
| --- | --- |
| `type` | Select exposes the six Sakai types. Native optional string remains unchanged, including scatter, bubble and registered custom types programmatically; those require compatible data/registration and are outside curated examples. |
| `data` | Object Control, forwarded unchanged. Native object/undefined contract preserved. ChartData includes labels, xLabels, yLabels and datasets; datasets include per-dataset type, data, labels, ordering, visibility, axes, parsing, styles, element/controller and plugin options. Number/null, floating bar tuples, x/y points, x/y/r bubble points, object parsing, empty data and mixed dataset types remain native configurations, not converted into the numeric sample format. Only the three-number sample is browser validated. |
| `options` | Object Control, forwarded unchanged. Nested Chart.js configuration families: core colors/fonts/layout, responsiveness/aspect ratio/device pixel ratio, locale, events/interaction/hover, parsing/normalization, animation/transitions, per-type controller/dataset/element settings, Cartesian/radial scales, and plugins (legend, title/subtitle, tooltip, filler, decimation). Scriptable/indexable settings and functions remain supported through programmatic props; JSON Controls cannot author functions. Callbacks include onClick/onHover/onResize, animation progress/completion, scale/tick callbacks, legend click/hover/leave, tooltip callbacks/filter/sort/external rendering and scriptable contexts. None are intercepted. Arbitrary invalid JSON configurations are not validated by this documentation wrapper. |
| `plugins` | Native array passed by identity. Chart.js plugin id/defaults/events and install/start/stop/uninstall, initialization/update/layout/dataset/element/render/draw/event/resize/destroy hooks remain native; intentionally outside JSON Controls. No plugin is injected. |
| `width`, `height` | Native optional strings forwarded, used on root/canvas by PrimeReact; non-responsive dimensions are outside the responsive curated examples. |
| `ariaLabel` | Forwarded. Default uses the native fallback from options.plugins.title.text. Users editing data should update their title/accessible description as appropriate; there is no automatic derived label. |
| `children` | Forwarded ReactNode. Native implementation builds its own canvas and does not render these children. No React content/template slot is adapted. Canvas drawing customization belongs to Chart.js plugins/options. |
| Inherited div attributes | All DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> except ref/content/pt retain native forwarding: id, className, style, title, role, tabIndex, accessKey, contentEditable, dir, draggable, hidden, lang, slot, spellCheck, translate, defaultValue/defaultChecked, hydration/content-editable warning flags, HTML/RDFa/microdata and aria attributes; data attributes pass at runtime. dangerouslySetInnerHTML retains the native conflict with generated children. Stage sizing lives on a separate div. |
| Inherited DOM events | Clipboard, composition, focus, form/input, load/error, keyboard, media, mouse, drag/drop, selection, touch, pointer/capture, scroll/wheel, animation/transition and capture variants all pass through. Native canvas interaction callbacks are configured through options, not a selection event. |
| `pt` | All sections root, canvas, hooks pass unchanged, without wrapper defaults. Section attribute objects or functions receive ChartPassThroughMethodOptions containing props. Hook methods useMountEffect/useUpdateEffect/useUnmountEffect retain native handling. |
| `ptOptions` | mergeSections, mergeProps, classNameMergeFunction passed unchanged. |
| `unstyled` | Passed through, outside themed examples. |
| Ref API | Native getCanvas, getChart, getBase64Image, generateLegend, refresh, getElement remain outside curated examples; no ref adapter is introduced. generateLegend is declared but its implementation delegates to a Chart.js instance method, not exercised here. |
| Story-only args, selection modes, severity, disabled, icon/template props | Not applicable: none introduced or declared by Chart. |

Native source limitation: the installed PrimeReact memo comparator observes only data/options/type identity. Changes solely to other props can be ignored until one of those three changes. The wrapper preserves this native behavior and therefore does not advertise those fields as independently reactive Controls. This is source inspection, not a browser-tested exhaustive API claim.

### Validation evidence

- `node scripts/generate-component-stories.mjs`: passed; generated changes limited to Chart. The optional exampleDefaults generator field is used only by Chart; other outputs remain unchanged.
- `node --test tests/chart-contract.test.mjs tests/component-generator.test.mjs`: passed, 2 tests. Contract checks preserve configuration identities, undefined/empty/numeric-null/point data, inherited attributes, PT, plugins and supplied callback arguments. Callbacks are invoked directly through forwarded props; this does not claim browser coverage of every plugin/DOM hook.
- `npm run build`: passed.
- `npm run build-storybook`: passed, with existing build warnings.
- `STORYBOOK_URL=http://127.0.0.1:6015 LD_LIBRARY_PATH=/tmp/sakai-breadcrumb-libs/extracted/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='^Chart:' tests/component-review.test.mjs`: passed, 2 tests. Covers indexing, Summary structure/no Controls/source, Summary data-painted regression, six type Controls, JSON edits, reset, Code panel, and six chart widths at 1280/390 pixels.
- Visual inspection of Summary and Default screenshots at 1280/390 pixels: data, labels, legend swatches and title spacing render without clipping. No component icon/disabled/severity states apply. Source blocks retain their normal horizontal code scrolling.
- `git diff --check`: passed.

Initial browser attempts exposed test selectors that assumed an exact Controls tab name or an input ID before entering JSON edit mode, plus an asynchronous reset assertion. The tests now use actual accessible controls and wait for the reset. The data-painted regression was added after fixing the shared-default visual failure. No full browser suite was run. Arbitrary Chart.js configuration, all inherited attributes, imperative methods and unstyled/plugin combinations are inventoried, not exhaustively tested.

### Recovery attempt 2

The controller's independent validation failed before either browser test ran: Chromium could not load `libnspr4.so`. Its inherited `LD_LIBRARY_PATH` was empty. Reproduced with `node --test --test-name-pattern='^Chart:' tests/component-review.test.mjs` (exit 1, two hook failures). This is a browser runtime dependency failure, not evidence of a Chart regression.

Re-ran the generator, both contract/generator tests, both builds and `git diff --check` successfully. Served the rebuilt static Storybook on port 6015 and re-ran the exact browser command above with its explicit `LD_LIBRARY_PATH`: both Chart tests passed. Re-inspected desktop/mobile Summary and Default, scrolling each mobile example into view and waiting for its animation before capturing it; all six variations render their data and labels without clipping. The temporary server was stopped.

At the end of attempt 2, independent delivery validation remained blocked pending the calling controller's browser library configuration. A child command cannot change its parent's environment. No repository test infrastructure or system library directories were changed to work around that boundary.

### Recovery attempt 3

The calling environment now supplies `LD_LIBRARY_PATH=/tmp/sakai-breadcrumb-libs/extracted/usr/lib/x86_64-linux-gnu`. Re-ran `node scripts/generate-component-stories.mjs`, `node --test tests/chart-contract.test.mjs tests/component-generator.test.mjs` (2 passed), `npm run build`, and `npm run build-storybook`: all passed. Generated output remained unchanged.

`STORYBOOK_URL=http://127.0.0.1:6015 node --test --test-name-pattern='^Chart:' tests/component-review.test.mjs` passed both Chart tests against the rebuilt static Storybook, using inherited library configuration without a command-local override. Re-inspected desktop/mobile Summary examples and Default screenshots at 1280/390 pixels: data, titles and legends render without clipping. `git diff --check` passed. The temporary static server was stopped. The previous browser dependency blocker is resolved; no additional implementation or infrastructure changes were needed.

### Checkbox — issue #16 API review

Reviewed against Button, Sakai's [Input UI Kit](https://sakai.primereact.org/uikit/input) and
`vendor/sakai-react/app/(main)/uikit/input/page.tsx`, plus installed
`primereact/checkbox/checkbox.d.ts` and `checkbox.esm.js`.

| API surface | Treatment |
| --- | --- |
| `checked`, `disabled`, `readOnly`, `invalid`, `variant`, `icon` | Exposed in Default. Boolean checked Controls; outlined/filled; Button's icon options. Undefined icon restores the native check mark, rather than removing the checked indicator. |
| Story-only `label` | Exposed; associated with the supplied `inputId`, or a unique React ID. Removed before forwarding. Empty labels receive a fallback accessible name; supplied ARIA names take precedence. |
| `onChange` | Adapted to synchronize args, then forwards the exact event to the supplied callback. No coercion or nullish replacement of `event.checked`. |
| `value`, `trueValue`, `falseValue` | Passed through unchanged. Native runtime compares checked strictly with trueValue and emits trueValue/falseValue in event.checked. Native types declare checked as boolean despite runtime support for other values. Controls curate boolean mode; the wrapper preserves the installed type and runtime contract without casts. |
| `id`, `inputId`, `inputRef`, `name`, `autoFocus`, `required`, `tabIndex`, `style`, `className` | Passed through; only absent inputId receives a default. |
| `onClick`, `onMouseDown`, `onContextMenu`, inherited focus/blur, keyboard, pointer, mouse, touch, drag, clipboard, composition, form, animation, transition, capture and other React DOM handlers | Passed through unchanged; native DOM routing retained. |
| Inherited `InputHTMLAttributes` / `HTMLAttributes` / `AriaAttributes` | All remaining attributes spread unchanged, including input constraints/form attributes, defaultChecked/defaultValue, role, ARIA, title, language, direction, content-editing, access keys, data attributes and other global attributes. Native implementation sends otherProps to the root and copies ARIA to the input; accepting an inherited input attribute does not guarantee native input routing. Use native PT input for explicit input attributes. No wrapper override of that routing. |
| `icon` string, React node or render function | All native IconType forms passed through; Controls curate strings only. |
| `tooltip`, `tooltipOptions` | Passed through, outside curated examples. Nested options: appendTo, at, my, position, mouseTrack/Left/Top, event, showEvent/hideEvent, showDelay/hideDelay/updateDelay, autoHide, autoZIndex, baseZIndex, closeOnEscape, disabled, showOnDisabled, className, style, onBeforeShow/onBeforeHide/onShow/onHide, pt, ptOptions, unstyled. |
| `pt` | Passed through intact, with no wrapper defaults to merge. Sections root/input/box/icon/tooltip/hooks; object and callback forms, receiving props/context/state. Checkbox context exposes checked/disabled; state exposes focused. Tooltip's nested PT and lifecycle hooks remain native. |
| `ptOptions`, `unstyled` | Passed through. mergeSections, mergeProps and classNameMergeFunction retain native semantics. |
| `children` | Forwarded, but the native implementation does not render children; not used for labels. |
| Component ref; focus/getElement/getInput | Native Checkbox ref accepted through ComponentProps and forwarded; no wrapper imperative API. inputRef remains available. |

Sakai's checkbox list stores selection in an application-owned array and computes a boolean
checked for each city; it is not a native array selection mode. The curated playground keeps
one labeled city checkbox, with independent unchecked, disabled, read-only, invalid, filled
and custom-icon Summary examples. Multi-checkbox application state, input-group composition,
tooltips and custom PT styling remain outside these examples; no additional visual features
or native selection modes are invented.

Contract tests inspect forwarding and invoke supplied callbacks, including null, undefined,
string and numeric checked payloads (runtime inspection, beyond the native TypeScript declaration).
Browser coverage checks actual label activation, Space, disabled/read-only states, invalid/filled
classes, each offered icon, spacing, unique Summary IDs, Controls synchronization/reset and Code.
The API inventory is source inspection, not exhaustive testing of inherited attributes, arbitrary
templates, tooltips, PT combinations or custom-value browser behavior.

Validation for this revision:
- `node --test tests/checkbox-contract.test.mjs tests/component-generator.test.mjs`: passed, 3 tests.
- `STORYBOOK_URL=http://127.0.0.1:6016 node --test --test-name-pattern='^Checkbox:|^Controls reflect interaction' tests/component-review.test.mjs`: passed, 3 tests against the static build.
- `npm run build`, `npm run build-storybook`, `git diff --check`: passed.
- Summary screenshots inspected at 1280px and 390px: labels, unchecked/disabled/read-only/invalid/filled/icon examples remain aligned, with no page overflow. Source panels scroll horizontally on narrow screens.
- Initial Storybook build exposed an MDX string-escaping bug; generator now serializes snippet strings with JSON.stringify. Initial label test sampled state before the Storybook args update; it now waits for the expected input state without weakening the assertion.

### Chip — issue #17 API review

Inspected Button, Sakai's Misc UI Kit source at
`vendor/sakai-react/app/(main)/uikit/misc/page.tsx`, and installed PrimeReact
`chip/chip.d.ts` and `chip/chip.esm.js`. The live Sakai URL could not be opened by
the browser service; the local upstream source supplied the variation reference.

| API surface | Treatment |
| --- | --- |
| `label`, `icon`, `image`, `imageAlt`, `removable`, `className`, `style` | Exposed in Default and forwarded. Icon Controls use Button's options; image Controls curate two relative avatar assets. Native image-over-icon precedence retained; arbitrary image URLs remain accepted by the wrapper. |
| Story-only `visible` | Adapted: defaults true, removed before forwarding. Successful removal sets false; restoring true or resetting Controls remounts the chip. This also recreates native internal state/ref lifecycle. |
| `onRemove` / `ChipRemoveEvent` | Exact event forwarded; `originalEvent` and native `value` preserved. Callback runs before args update; returning false cancels both native removal and visibility synchronization. Missing callback permits removal. Native runtime value falls back from label to image to icon, although the declaration says string. No coercion. |
| `onImageError` | Passed through unchanged. |
| `icon`, `removeIcon` / `IconType<ChipProps>` | Native string, React node and render-function forms passed through. Custom remove icons and functional templates are outside curated Controls. |
| `template` / `TemplateType<ChipProps>` | Passed through: node or function receiving ChipProps. Native template replaces built-in content, including the remove control; no wrapper-invented removal behavior. |
| `children` | Forwarded, but native rendering ignores children; use template for custom content. |
| `pt` / `ChipPassThroughOptions` | Passed through intact, no wrapper defaults. Sections root, image, icon, label, removeIcon, hooks; attribute objects and callback forms remain native. Method options declare props and state; ChipState declares visible. Native metadata only explicitly supplies props, so callback state availability is not asserted. Lifecycle hooks use ComponentHooks: useMountEffect, useUpdateEffect and useUnmountEffect. |
| `ptOptions`, `unstyled` | Passed through; mergeSections, mergeProps, classNameMergeFunction and native style semantics unchanged. Unstyled examples are outside the curated Sakai theme. |
| Inherited div/HTML/ARIA attributes | All forwarded unchanged: id, title, role, ARIA/data attributes, tabIndex, accessKey, contentEditable, dir/lang, hidden, draggable, spellCheck, slot, defaultValue/defaultChecked and remaining React global attributes. Native otherProps routing retained. |
| Inherited events | Focus/blur, keyboard, mouse, pointer, touch, drag, clipboard, composition, form, animation, transition, scroll, media and capture variants passed through unchanged. Native remove-key behavior supports Enter, NumpadEnter and Backspace. |
| Component ref / `getElement`, `getVisible`, `setVisible` | Forwarded through ComponentProps; no wrapper imperative API. Calling native setVisible directly does not update the story-only visible arg. |
| Selection/value models | Not applicable: Chip is a label, not the separate Chips multi-value input. No size, severity, loading or disabled API is invented. |

Summary curates labels, icons, images and removable variants, each with copyable
source. Sakai's `custom-chip` container has no matching styling in the inspected
upstream styles, so no extra visual style was invented. Default renders at most
one Chip. Visibility restoration is the only extra story behavior; all native
props retain their contract. Global Code panel and hidden Canvas source settings
are inherited from preview.tsx.

Contract coverage checks forwarded identities (including refs, templates, PT and
callbacks), invokes supplied removal/image-error/click callbacks, verifies false
cancellation and absent callback behavior. This inventory is source inspection,
not exhaustive browser coverage of arbitrary templates, PT, inherited handlers,
unstyled rendering or imperative methods.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: passed; only Chip output changed.
- `node --test tests/chip-contract.test.mjs tests/component-generator.test.mjs`: passed, 2 tests.
- `npm run build`: passed.
- `npm run build-storybook`: passed, with existing build warnings.
- `STORYBOOK_URL=http://127.0.0.1:6017 node --test --test-name-pattern='^Chip:' tests/component-review.test.mjs`: passed, 2 tests, using inherited LD_LIBRARY_PATH. Covers Summary/Default navigation, no Summary Controls, copyable source/Code, mouse and keyboard removal, visibility synchronization/restoration/reset, all offered icons with spacing assertions, both image options and native image precedence.
- Summary and Default screenshots inspected at 1280px and 390px. Icons, labels, images and removal controls are aligned; mobile examples wrap without clipping. Source blocks scroll horizontally.
- `git diff --check`: passed.

Initial browser runs failed on an invented Code panel ID and an image path supplied
through URL args. Inspection found the real accessible Code tabpanel and Storybook's
“Omitted potentially unsafe URL args” warning. Tests now use the accessible panel
and actual image Controls; no component behavior or valid assertion was removed.
No previous diagnostic/result/validation/patch files existed in the supplied recovery
directory. No full browser suite was run. The temporary static server was stopped.

### Chips — issue #18 API review

Inspected Button, Sakai's input-related UI Kit pages at
`vendor/sakai-react/app/(main)/uikit/input/page.tsx` and
`vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx`, plus installed PrimeReact
`chips/chips.d.ts` and `chips/chips.esm.js`.

| API surface | Treatment |
| --- | --- |
| `value`, `placeholder`, `separator`, `max`, `addOnBlur`, `allowDuplicate`, `autoFocus`, `name`, `inputId`, `inputRef`, `ariaLabelledBy`, `readOnly`, `invalid`, `disabled`, `variant`, `removable`, `removeIcon`, `keyfilter`, `tooltip`, `tooltipOptions` | Exposed and/or preserved in source inspection with full native contract intent. Controls include `value` and text/boolean fields; function-valued options (`removeIcon`, function templates, keyfilters with custom objects, render functions) are intentionally outside curated controls and are forwarded unchanged when set through props.
| `itemTemplate` | Exposed by source inspection only and forwarded unchanged when supplied by story users.
| `onAdd` / `ChipsAddEvent` | Forwarded unchanged. When supplied and returning `false`, native Chips skips insertion and `onChange` emits an unchanged value; wrapper sync uses `event.value`.
| `onRemove` / `ChipsRemoveEvent` | Forwarded unchanged; return value is preserved and forwarded to callers. Native `onRemove` does not honor a false cancel contract, and the wrapper does not add one.
| `onChange` / `ChipsChangeEvent` | Wrapped to sync `value` and forward the event. `event.value` is normalized to `[]` when `undefined` before state sync.
| `onFocus`, `onBlur`, `onKeyDown` and inherited DOM callbacks | Passed through unchanged.
| `pt` / `ChipsPassThroughOptions` | Forwarded without wrapper defaults: sections `root`, `container`, `token`, `label`, `removeTokenIcon`, `inputToken`, `input`, `tooltip`, and `hooks` remain native.
| `ptOptions`, `unstyled` | Forwarded unchanged.
| `children` | Forwarded by spread. Native Chips does not consume children for rendering.
| `id`, `className`, `style`, `tabIndex`, `title`, `aria-*`, `data-*` and inherited DOM attributes/events | Forwarded unchanged via inherited `InputHTMLAttributes<HTMLDivElement>` minus `onChange`, `onFocus`, `onBlur`, `onKeyDown`, and `ref`, as declared by PrimeReact.
| `focus`, `getElement`, `getInput` | Ref-forwarded native methods are not adapted or wrapped.

### Evidence and validation boundaries

Contract tests cover forwarded prop/attribute identity, event forwarding, callback
invocation, and value sync behavior, including undefined `onChange` normalization.
Browser checks cover token creation and removal by icon and backspace, plus token
label/remove-icon alignment. Template rendering beyond plain string values, all
keyfilter variants, and all pass-through callback combinations are source-inspected but
not exhaustively validated.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: executed (generated 62 component story sets; preserved 5 manual components).
- `node --test tests/chips-contract.test.mjs`: passed.
- `node --test tests/component-generator.test.mjs`: passed.
- `npm run build`: passed.
- `npm run build-storybook`: passed.
- `STORYBOOK_URL=http://127.0.0.1:6006 node --test --test-name-pattern='Chips' tests/component-review.test.mjs`: passed.
- `git diff --check`: passed.

### Recovery attempt 4

No separate prior recovery artifact existed for this specific Chips pass.

### ContextMenu API audit — issue #21

Inspected Button, the Sakai menu UI Kit source at
`vendor/sakai-react/app/(main)/uikit/menu/page.tsx`, and the installed PrimeReact
`contextmenu/contextmenu.d.ts` and `contextmenu.esm.js`.

| API surface | Treatment |
| --- | --- |
| `model` | Exposed as an object Control and passed through after a shallow recursive adaptation that adds observable command feedback. Nested `items`, grouped items, separators, disabled/visible items, URLs, templates, icons, and item-level styling remain native. |
| `global`, `autoZIndex`, `baseZIndex`, `breakpoint`, `scrollHeight`, `ariaLabel` | Exposed where useful in Default and forwarded unchanged. Summary demonstrates nested items, separators, disabled items, responsive breakpoint and scroll height. |
| `appendTo`, `transitionOptions`, `submenuIcon`, `unstyled` | Passed through unchanged and intentionally outside curated Controls. Native value modes, including HTMLElement/function append targets and IconType submenu values, are not narrowed. |
| `onShow`, `onHide` | Passed through unchanged; the playground does not replace or synthesize these callbacks. The imperative `show`/`hide` ref methods remain native. |
| `children` | Forwarded by the native props spread; ContextMenu renders its menu overlay rather than arbitrary children. |
| `pt`, inherited `HTMLAttributes<HTMLDivElement>`, ARIA/data attributes and DOM events | Passed through by `{...args}` without wrapper defaults. Native PT sections include root, menu, menuitem, action, icon, label, submenuIcon, separator, hooks, transition, tabIndex, onFocus and onBlur. |
| MenuItem callbacks and templates | `menuWithActions` invokes each supplied `item.command` before its local status callback; item templates and other MenuItem fields are preserved. Function-valued templates/callbacks are source-inspected, not authored through JSON Controls. |
| Story-only trigger | The target div owns the context-menu event and keyboard equivalent (`ContextMenu` key or `Shift+F10`), prevents the browser menu, and calls the native ref `show` method. This trigger is outside the ContextMenu prop contract and is not forwarded. |

The story keeps the full `ContextMenuProps` type through `ComponentProps<typeof ContextMenu>`;
only displayed Controls are curated. No native selection/value mode applies to this overlay
component. Supplied ContextMenu callbacks and MenuItem commands are preserved; the only
adaptation is the local command wrapper used to make actions observable in the example.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: passed; generated output remained scoped to ContextMenu and preserved the manual components.
- `node --test tests/component-generator.test.mjs`: passed, 1 test.
- `STORYBOOK_URL=http://127.0.0.1:6017 node --test --test-name-pattern='popup menus and ContextMenu|ContextMenu: only Summary' tests/component-review.test.mjs`: passed, 2 tests against the static build.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk/plugin-timing warnings remain.
- `git diff --check`: passed.

Browser assertions cover right-click, `Shift+F10`, command feedback, Summary structure,
responsive rendering and the Default playground. The API inventory is source inspection, not
exhaustive behavioral testing of every inherited prop, PT callback, template or append target.
