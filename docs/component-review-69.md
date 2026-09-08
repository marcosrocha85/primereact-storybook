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
