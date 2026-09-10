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

### Toast API inventory — issue #63

Inspected the Button documentation/story reference, the Toast generator entry and generated files, the Sakai UI Kit message, file, and overlay examples under `vendor/sakai-react`, and the installed PrimeReact `toast.d.ts` and implementation. This inventory records source-reviewed behavior; it is not exhaustive interaction testing.

| Native surface | Treatment |
| --- | --- |
| `position` | Exposed through a select with all seven native positions and passed through unchanged. Summary curates top, bottom, and center placements. |
| `baseZIndex`, `transitionOptions`, `appendTo` | Passed through unchanged; intentionally outside curated Controls because transition objects and DOM/callback append targets are not useful JSON Controls. |
| `className`, `style`, `id`, `children`, and inherited `HTMLAttributes<HTMLDivElement>` | Passed through unchanged by the native props spread; intentionally outside most curated examples. This includes ARIA/data attributes, DOM events, focus/keyboard/mouse/pointer/touch/drag/clipboard/composition handlers, and global HTML attributes. |
| `content` | Passed through unchanged. Native node and function forms remain available for headless/custom rendering and are outside the curated examples. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged. Native root, message, content, icon, text, summary, detail, close button, close-button icon, transition, and hooks sections remain available, including object/function forms and merge configuration. No wrapper PT defaults replace user entries. |
| `onClick`, `onRemove`, `onShow`, `onHide`, `onMouseEnter`, `onMouseLeave` | Passed through unchanged. The story does not intercept or replace supplied callbacks. Their message/lifecycle event payloads and native cancellation behavior remain native-only. |
| `ToastMessage` fields: `severity`, `summary`, `detail`, `content`, `closable`, `icon`, `closeIcon`, `sticky`, `life`, `className`, `style`, `contentClassName`, `contentStyle`, `pt`, `ptOptions`, `unstyled` | The story-only message controls adapt severity, summary, detail, closability, stickiness, and life into the object supplied to the native `show` ref method. The complete message model, including node/function content, custom icons, classes/styles, nested PT, and arrays passed to `show`, remains available programmatically and is not narrowed. |
| Imperative ref methods `show`, `replace`, `remove`, `clear`, `getElement` | Native ref is forwarded; Default uses only `show` and `clear` for observable feedback. Other methods remain outside Controls. |
| Nested models, selection/value modes, and component templates | No option collection or selection/value model applies. `content` is the sole component-level template and message-level custom content is native-only; no wrapper-specific model or alternate value mode is invented. |

The Summary now contains local, stateful examples with copyable sources for severity, position, dismissible/sticky, and automatic-dismissal behavior. Default remains one Toast instance and synchronizes only Storybook args used by the playground; native callbacks and props are forwarded. The focused browser check covers show/clear feedback, Summary/Default structure, Controls placement, copyable sources, and desktop/mobile rendering. Severity rendering, close-button interaction, sticky timeout behavior, supplied callbacks, custom content/templates, PT callbacks, transition modes, append targets, inherited DOM events, arbitrary message arrays, and ref methods other than `show`/`clear` are source-inspected and not exhaustively browser-tested.

### InputMask API inventory — issue #30

The inventory below is based on the installed PrimeReact `InputMaskProps` and `InputTextProps` declarations plus the installed InputMask implementation. It records the contract reviewed for this issue; it is not an exhaustive interaction test.

| API surface | Status in the curated story | Evidence / scope decision |
| --- | --- | --- |
| `mask`, `slotChar`, `autoClear`, `unmask` | Exposed through Default Controls and passed through | Native mask tokens (`9`, `a`, `*`, and optional `?`) and formatted/unmasked value behavior verified by source inspection; date and phone masks are rendered in Summary; unmasked editing is not exhaustively tested. |
| `value` (`string \| null`) | Adapted for controlled Storybook synchronization | The playground normalizes nullish values to the native empty string for rendering and stores `event.value` back in args; the native formatted display remains intact. |
| `disabled`, `invalid`, `readOnly`, `variant` | Exposed through Default Controls and passed through | Disabled, invalid, read-only, and outlined/filled styling are curated; disabled/read-only behavior is source-inspected and the existing browser test covers formatted entry. |
| `required`, `name`, `id`, `type`, `size`, `maxLength`, `tabIndex`, `style`, `className`, `placeholder`, `autoFocus`, `keyfilter`, `validateOnly`, `tooltip`, `tooltipOptions`, `unstyled`, `pt`, `ptOptions`, `children` | Passed through unchanged; intentionally outside curated Controls/examples | These inherited HTML/InputText and passthrough properties remain available on `InputMaskProps`; the wrapper only consumes story-only `label`/`floatLabel` and supplies an id when none is provided. |
| `onChange` | Adapted and preserved | The wrapper updates the controlled value and invokes the supplied callback with PrimeReact's event. Formatted input retention is browser-tested; supplied callback invocation is preserved by source inspection, not independently asserted in the component-review browser test. |
| `onComplete` | Passed through unchanged | Native completion event and `string \| undefined \| null` value are source-inspected; no completion callback is synthesized by the playground. |
| `onFocus`, `onBlur` | Passed through unchanged | Native focus/blur callbacks are source-inspected; no callback is replaced by the wrapper. |
| InputMask templates / nested models / alternate value objects | Not applicable | InputMask exposes no item model, option collection, header/footer/item templates, or object-valued selection mode. Its nested contract is the inherited input element and passthrough options. |
| `label`, `floatLabel` | Story-only adaptation | These are not native InputMask props. They provide the Sakai form composition and are removed before native props are forwarded; supplied `id` is retained for label association. |

### SelectButton API inventory — issue #52

The inventory below is based on the installed PrimeReact `SelectButtonProps` declaration and implementation, the SelectButton styling in `vendor/sakai-react`, and the Button documentation/story pattern. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Status in the curated story | Evidence / scope decision |
| --- | --- | --- |
| `options`, `optionLabel`, `optionValue`, `optionDisabled`, `dataKey` | Passed through unchanged; object options and label/value/disabled field modes are used by the examples; only `value` is exposed as an object Control | The native implementation resolves primitive and object option values and compares with `dataKey`. Alternate option shapes remain available through native args and are outside the curated Controls. |
| `value` | Adapted only for controlled Storybook synchronization | The wrapper stores the exact native `event.value` in Storybook args, preserving scalar values for single selection and arrays for multiple selection. |
| `multiple`, `allowEmpty`, `unselectable`, `invalid`, `disabled`, `tabIndex` | `multiple`, `allowEmpty`, `invalid`, and `disabled` are exposed through focused Default Controls; all are passed through unchanged | Single, multiple, clearable, invalid, and disabled states are curated in Summary. Deprecated `unselectable` and keyboard/tab behavior remain native args and are source-inspected. |
| `itemTemplate`, `children` | Passed through unchanged; intentionally outside curated Controls | Native item rendering remains available, including arbitrary React nodes/functions and children. The examples use the default option-label rendering. |
| `tooltip`, `tooltipOptions`, `ariaLabelledBy`, inherited `HTMLAttributes<HTMLDivElement>` | Passed through unchanged; intentionally outside curated Controls | Root DOM attributes, ARIA/data attributes, class/style, DOM callbacks, tooltip configuration, and focus configuration remain available through `ExampleArgs`. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged; intentionally outside curated Controls | Native root/button/label/tooltip pass-through sections and lifecycle hooks are not replaced or merged with story defaults. |
| `onChange` | Adapted and preserved | The wrapper updates the controlled value, then invokes the supplied callback with the exact original PrimeReact event; the focused contract test asserts both paths. |
| Templates, nested option models, alternate value modes, and imperative methods | Native-only or not applicable to the curated examples | `SelectItemOptionsType` supports primitive/object option models and item templates; there are no nested component collections or alternate selection modes beyond single/multiple values. Native `focus()` and `getElement()` remain outside Controls and are source-inspected. |

The API inventory is source inspection, not exhaustive behavioral testing. `tests/selectbutton-contract.test.mjs` verifies representative object options, multiple values, inherited attributes, PT, item templates, and supplied `onChange` preservation. The component browser check verifies selection retention, Summary/Default structure, copyable sources, Controls placement, and desktop/mobile rendering. Every option model, callback form, PT callback, tooltip combination, keyboard path, ref method, and inherited DOM event remains forwarded but is not exhaustively tested.

### InputNumber API inventory — issue #31

The inventory below is based on the installed PrimeReact `InputNumberProps` declaration and InputNumber implementation, plus the Sakai UI Kit input, invalid-state, and float-label examples. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Status in the curated story | Evidence / scope decision |
| --- | --- | --- |
| `value` (`number \| null`) | Adapted for controlled Storybook synchronization | The playground wraps `onValueChange` only to store `event.value` in args/local Summary state; the original event and supplied callback are preserved without coercing the native number/null value. |
| Formatting: `format`, `locale`, `localeMatcher`, `mode`, `currency`, `currencyDisplay`, `useGrouping`, `minFractionDigits`, `maxFractionDigits`, `roundingMode`, `prefix`, `suffix` | Exposed through Default Controls where useful and passed through unchanged | Decimal, currency, grouping, fraction, prefix/suffix, and locale modes are source-inspected; Summary renders decimal, currency, and prefix/suffix compositions. Currency mode requires a native `currency` value. |
| Spinner and numeric constraints: `showButtons`, `buttonLayout`, `incrementButtonClassName`, `decrementButtonClassName`, `incrementButtonIcon`, `decrementButtonIcon`, `step`, `min`, `max`, `allowEmpty`, `maxLength` | Curated Controls expose the common layout/button and constraint properties; all are passed through unchanged | Stacked and horizontal spinner layouts are documented. Icon values retain PrimeReact's `IconType` string/node/function modes and are intentionally outside free-text Controls. |
| Input state and attributes: `placeholder`, `disabled`, `invalid`, `readOnly`, `variant`, `required`, `name`, `type`, `tabIndex`, `pattern`, `size`, `inputId`, `autoFocus`, `inputStyle`, `inputClassName`, `tooltip`, `tooltipOptions`, `ariaLabelledBy` | Common visual/state properties are exposed; the complete native set is forwarded by `{...args}` | Invalid, read-only, disabled, and outlined/filled states are source-inspected and curated where relevant. Native input attributes remain available through args even when outside Controls. |
| `onValueChange` | Adapted and preserved | The wrapper invokes `updateArgs({ value: event.value })`, then invokes the supplied callback with the exact original event. Focus, blur, key, and native `onChange` callbacks are not replaced. |
| `onChange`, `onFocus`, `onBlur`, `onKeyDown` | Passed through unchanged | Callback identity and original-event preservation for the intercepted `onValueChange` path are covered by `tests/inputnumber-contract.test.mjs`; the other callbacks are source-inspected. |
| `pt`, `ptOptions`, `unstyled`, inherited `HTMLAttributes<HTMLSpanElement>` and `children` | Passed through unchanged; intentionally outside curated Controls | Root/container attributes, DOM events, `id`, `className`, `style`, data/ARIA attributes, pass-through sections and native ref-compatible props remain available. No wrapper PT defaults replace user entries. |
| Templates, nested models, alternate value/selection modes, imperative methods | Not applicable or native-only | InputNumber has no option collection, item model, or render-template API. Native `focus`, `getFormatter`, `getElement`, and `getInput` methods remain outside the story Controls and are source-inspected. |

The API inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies representative formatting, constraint, input-attribute, PT, inherited-prop, and callback forwarding, including the intercepted supplied `onValueChange`. The browser check verifies decimal/currency entry, Summary/Default structure, copyable sources, Controls placement, and desktop/mobile rendering. Every locale, rounding mode, icon function, PT callback, imperative method, inherited DOM event, and native prop combination remains forwarded but is not exhaustively tested.

### PickList API inventory — issue #46

Inspected the Button documentation/story reference, the PickList generator entry and generated files, the Sakai UI Kit list example at `vendor/sakai-react/app/(main)/uikit/list/page.tsx`, and the installed PrimeReact `PickListProps` declaration and implementation. The inventory records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Status in the curated story | Evidence / scope decision |
| --- | --- | --- |
| `source`, `target`, `dataKey` | Adapted only for controlled Storybook synchronization; `dataKey` and both list values remain native props | `onChange` updates the Storybook args with the exact native `event.source` and `event.target`; arbitrary item objects and data keys remain supported through native args. |
| `sourceHeader`, `targetHeader`, `filter`, `filterMatchMode`, `showSourceControls`, `showTargetControls`, `metaKeySelection`, `breakpoint` | Exposed through focused Default Controls and passed through unchanged | These represent the primary PickList composition and filtering/responsive variations; filtering, preselected targets, hidden controls, and selection mode are curated in Summary. |
| `sourceSelection`, `targetSelection`, filter values/placeholders, source/target styles, focus options, `tabIndex`, `className`, `style`, `id`, `unstyled` | Passed through unchanged and intentionally outside the curated Controls | Native controlled selections, filter state, styling, focus, responsive, accessibility, and DOM configuration remain available through `ExampleArgs`; the story does not narrow their value modes. |
| Icon props and filter templates | Passed through unchanged; intentionally outside the curated Controls | `sourceFilterIcon`, `targetFilterIcon`, all move icons, and source/target filter templates accept native `IconType`, React nodes, or template functions and are not represented by text Controls. |
| `itemTemplate`, `sourceItemTemplate`, `targetItemTemplate`, `children` | Passed through unchanged, with a fallback item renderer only when `itemTemplate` is absent | The fallback preserves the documented default composition while a supplied `itemTemplate` wins; source/target-specific templates and children remain native args. |
| `pt`, `ptOptions` and lifecycle pass-through hooks | Passed through unchanged | Native root, controls, button, list, header, filter, item, and lifecycle sections remain available; no wrapper defaults replace or discard user pass-through entries. |
| `onChange` | Adapted for controlled source/target synchronization, then invoked with the exact original event | The focused contract test asserts callback preservation; the browser check transfers an item and verifies the resulting source/target state. |
| `onMoveToTarget`, `onMoveAllToTarget`, `onMoveToSource`, `onMoveAllToSource`, selection/filter callbacks, `onFocus`, `onBlur` | Passed through unchanged except `onMoveToTarget`, which adds observable demo status before invoking the supplied callback | The browser check exercises the single-item target move and supplied callback path; the remaining callback combinations are source-inspected and forwarded but not exhaustively tested. |
| Nested models, alternate value modes, and imperative methods | Not applicable or native-only | PickList has object-array source/target models but no alternate selection value mode; its native `getElement()` ref method remains outside Controls. |

The API inventory is source inspection, not exhaustive behavioral testing. `tests/picklist-contract.test.mjs` verifies representative prop spreading, fallback-template behavior, and intercepted callback preservation. The component browser check verifies transfer state, the move callback status, Summary/Default structure, copyable sources, Controls placement, runtime safety, and desktop/mobile rendering. Filter matching, multi-item moves, alternate icon/template forms, pass-through callback forms, selection callbacks, inherited DOM events, responsive breakpoints, refs, and every native prop combination remain forwarded but are not exhaustively tested.

### InputSwitch API inventory — issue #32

The inventory below is based on the installed PrimeReact `InputSwitchProps` declaration and implementation, plus the Sakai UI Kit input example. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `checked`, `trueValue`, `falseValue` | `checked` is adapted only to synchronize the controlled playground after `onChange`; `trueValue` and `falseValue` are forwarded unchanged, including non-boolean values. The curated Controls expose boolean `checked`; alternate value modes remain available through native args and are not narrowed by the story. |
| `disabled`, `invalid`, `autoFocus`, `inputId`, `inputRef`, `name`, `tabIndex`, `tooltip`, `tooltipOptions`, `className`, `style`, `unstyled` | Forwarded unchanged. `disabled` and `invalid` are exposed as curated Controls; focus, input identity, tooltip, styling, and unstyled behavior remain native args outside the curated Controls. |
| `onChange` | Adapted only to update `checked` for the controlled playground, then invokes the supplied callback with the exact original PrimeReact event. |
| `onFocus`, `onBlur` | Forwarded unchanged; the wrapper does not replace focus lifecycle callbacks. |
| `pt`, `ptOptions`, `children` | Forwarded unchanged. Root, input, slider, tooltip, and hook pass-through sections retain their native object/function forms; no wrapper PT defaults replace user entries. The native children slot remains available. |
| Inherited `HTMLAttributes<HTMLDivElement>` | Forwarded through `{...args}`, including `id`, `role`, `aria-*`, `data-*`, DOM event handlers, `className`, and `style`. The story supplies `aria-label="InputSwitch"` only when the caller has not supplied one, so a supplied accessible name is preserved. |
| Nested models, templates, selection modes, alternate component value objects | Not applicable. InputSwitch has no option collection, item model, or render-template API; its native alternate value mode is the `trueValue`/`falseValue` pair above. |
| Imperative ref API | Native `focus`, `getElement`, and `getInput` methods remain available through PrimeReact refs and are outside the curated Controls. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies native true/false values, inherited attributes, PT, children, and the supplied change/focus/blur callbacks across the intercepted change path. The component browser check verifies click and Space toggling, disabled behavior, Summary/Default structure, copyable source, and desktop/mobile rendering. Every pass-through callback form, tooltip/transition behavior, ref method, and inherited DOM event remains forwarded but is not exhaustively tested.

### MegaMenu API inventory — issue #37

The inventory below is based on the installed PrimeReact `MegaMenuProps`, `MenuItem` model, pass-through declarations, and implementation, plus the Sakai UI Kit menu examples. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `model` (`MenuItem[]`, including nested `MenuItem[][]` column groups) | Adapted only to decorate leaf commands with the playground feedback callback. The recursive adapter preserves item properties, nested group structure, and each supplied `item.command` before invoking the story feedback. |
| `orientation`, `breakpoint`, `scrollHeight`, `tabIndex` | Exposed through focused Default Controls and passed through unchanged. Horizontal and vertical layouts plus responsive breakpoint/scroll-height behavior are curated in Summary. |
| `start`, `end`, `submenuIcon`, `menuIcon` | Passed through unchanged and intentionally outside the curated Controls because they accept React nodes or `IconType` functions in addition to strings. The native submenu icon string mode is shown in Summary. |
| `onFocus`, `onBlur`, inherited `HTMLAttributes<HTMLDivElement>` | Passed through unchanged via `{...args}`; supplied DOM/ARIA attributes, class/style, and event callbacks are not replaced by the playground. |
| `pt`, `ptOptions`, `unstyled`, `children` | Passed through unchanged; no wrapper pass-through defaults are merged over caller values. These are available through native story args but outside the curated visual Controls. |
| Templates, selection/value modes, option filtering, imperative methods | Not applicable or native-only. MegaMenu has no selection value model or filtering API; its native `getElement()` ref method remains outside Controls. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies recursive model decoration, supplied leaf-command preservation, and passthrough spread. The component browser check verifies nested submenu opening, supplied command feedback, Summary/Default structure, copyable sources, and desktop/mobile rendering. Every `MenuItem` property, icon function, PT callback, inherited DOM event, and ref method remains forwarded but is not exhaustively tested.

### Menu API audit — issue #38

The inventory below is based on the installed PrimeReact `MenuProps`, `MenuItem` model, pass-through declarations, and implementation, plus the Sakai UI Kit menu source. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `model` (`MenuItem[]`, including nested items) | Exposed as an object Control and adapted only to decorate leaf commands with local feedback. The recursive adapter preserves every item property, nested structure, and each supplied `item.command` before reporting the selected label. |
| `popup`, `popupAlignment`, `closeOnEscape`, `autoZIndex`, `baseZIndex`, `tabIndex` | Exposed where they define the documented inline/popup compositions and passed through unchanged. Popup opening uses the native `toggle` ref method; Escape behavior remains native. |
| `appendTo`, `transitionOptions`, `onShow`, `onHide`, `onFocus`, `onBlur` | Passed through unchanged by `{...args}` and intentionally outside the curated Controls because their native element/function and callback forms are not represented by object Controls. |
| `aria-label`, inherited `HTMLAttributes<HTMLDivElement>`, `children`, `className`, `style` | Forwarded unchanged. `aria-label`, `className`, and `style` are exposed as focused Controls; other ARIA/data attributes and DOM events remain available through native story args. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged; no wrapper pass-through defaults replace caller values. Native root, menu, content, submenu header, menuitem, action, icon, label, separator, hook, and transition sections remain available. |
| Selection/value modes, filtering, templates, and imperative methods | Not applicable or native-only. Menu has no selection value model or filtering API; `toggle`, `show`, `hide`, `getElement`, and `getTarget` remain available through the native ref and are outside Controls. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies native prop spreading, popup alignment Controls, ref usage, recursive command preservation, and generator consistency. The component browser checks popup opening, Escape dismissal, command feedback, Summary/Default structure, copyable sources, and desktop/mobile rendering. Every `MenuItem` field, PT callback, inherited DOM event, transition option, append target, and ref method remains forwarded but is not exhaustively tested.

### TieredMenu API audit — issue #62

Inspected the Button documentation/story reference, the TieredMenu generator entry and generated files, the Sakai UI Kit menu source at `vendor/sakai-react/app/(main)/uikit/menu/page.tsx`, and the installed PrimeReact `TieredMenuProps`, `MenuItem`, pass-through declarations, and implementation. This inventory records source-inspection evidence for the issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `model` (`MenuItem[]`, including recursively nested items) | Exposed as an object Control and adapted only to decorate leaf items for observable feedback. The recursive adapter preserves nested arrays, every supplied item property, and each supplied `item.command` before reporting the selected label. |
| `MenuItem` fields: `id`, `label`, `icon`, `url`, `items`, `expanded`, `disabled`, `visible`, `target`, `separator`, `style`, `className`, `command`, `template`, `data` | Forwarded unchanged inside `model`; nested navigation, icons, separators, disabled items, and commands are curated in Summary. URLs, targets, templates, arbitrary data, visibility, expanded state, and custom item styling remain available through native args but outside the curated examples. |
| `popup`, `autoZIndex`, `breakpoint`, `scrollHeight`, `baseZIndex`, `tabIndex` | Exposed through focused Default Controls and passed through unchanged. Inline, popup, and responsive layouts are curated in Summary; popup opening uses the native `toggle` ref method and Escape dismissal remains native. |
| `appendTo`, `transitionOptions`, `submenuIcon`, `onShow`, `onHide`, `onFocus`, `onBlur` | Passed through unchanged by `{...args}` and intentionally outside the curated Controls because they accept DOM elements, transition objects, React/icon functions, or callbacks not represented by object Controls. |
| `aria-*`, inherited `HTMLAttributes<HTMLDivElement>`, `children`, `className`, `style` | Forwarded unchanged. `aria-label`, `className`, and `style` are exposed as focused Controls; other ARIA/data attributes and DOM handlers remain available through native story args. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged; no wrapper pass-through defaults replace caller values. Native root, menu, submenu, menuitem, action, icon, label, submenu icon, separator, lifecycle, and transition sections remain available. |
| Selection/value modes, filtering, templates, and imperative methods | TieredMenu has no separate controlled selection/value or filtering API. `MenuItem.template` remains part of the native model, while `toggle` and `getElement` remain available through the native ref and outside Controls. |

The inventory is source inspection, not exhaustive behavioral testing. The component browser checks nested command feedback, popup trigger and Escape dismissal, Summary/Default structure, copyable sources, and desktop/mobile rendering. Every `MenuItem` field, PT callback, inherited DOM event, transition option, append target, callback form, and ref method remains forwarded or source-inspected but is not exhaustively tested.

## Component audit

### Skeleton API inventory — issue #54

Inspected the Button documentation/story reference, Sakai's Skeleton example at
`vendor/sakai-react/app/(main)/uikit/misc/page.tsx`, and the installed PrimeReact
`skeleton.d.ts` and implementation. This inventory records the native contract reviewed
for this issue; it is source-inspection evidence, not exhaustive behavioral testing.

| API surface | Treatment |
| --- | --- |
| `shape`, `size`, `width`, `height`, `borderRadius`, `animation` | Exposed through focused Default Controls and passed through unchanged. Rectangle/circle, square sizing, content dimensions, custom radius, wave animation, and the static `none` animation are curated in Summary. |
| `className`, `style`, `id`, `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLDivElement>` | Passed through unchanged by `{...args}`; intentionally outside the curated visual Controls. |
| `children` | Passed through unchanged by the story contract; the native Skeleton implementation renders its placeholder as a leaf element, so children are not a curated composition. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged; root and lifecycle pass-through options remain available through native args, with no wrapper defaults replacing user entries. |
| DOM event callbacks and other inherited attributes | Passed through unchanged by the native component; no callback is intercepted because Skeleton has no state-changing event API. Focus, pointer, keyboard, form, clipboard, drag, animation, and transition handlers are source-inspected and not exhaustively tested. |
| Nested models, templates, selection/value modes, component callbacks, imperative methods | Not applicable or native-only. Skeleton has no option collection, nested item model, render-template API, selection/value model, or component event callbacks; its native `getElement()` ref method remains outside Controls. |

The API inventory is source inspection, not exhaustive interaction testing. The generic
component-review browser test verifies Summary/Default navigation, Controls placement,
copyable sources, runtime safety, and desktop/mobile rendering for Skeleton. Every native
attribute combination, pass-through callback form, ref method, and custom composition remains
forwarded or source-inspected but is not exhaustively tested.

### RadioButton API inventory — issue #48

Inspected the Button documentation/story reference, Sakai's input UI Kit source at
`vendor/sakai-react/app/(main)/uikit/input/page.tsx`, and the installed PrimeReact
`radiobutton/radiobutton.d.ts` and `radiobutton.esm.js`. This inventory records the
native contract reviewed for this issue; it is source-inspection evidence, not exhaustive
behavioral testing.

| API surface | Treatment |
| --- | --- |
| `checked`, `value`, `name`, `disabled`, `invalid`, `readOnly`, `required`, `variant` | Exposed through focused Default Controls and passed through unchanged. The Summary shows controlled group selection, checked, disabled, invalid and filled states. The application owns the group value; RadioButton does not provide a native array selection model. |
| `onChange` | Adapted only to synchronize the story's controlled `checked` arg, then forwards the exact native event to the supplied callback. No value or event payload coercion is applied. |
| `inputId`, `inputRef`, `id`, `autoFocus`, `tabIndex`, `className`, `style`, `children`, `tooltip`, `tooltipOptions` | Passed through unchanged. The playground supplies a generated `inputId` only when the caller omits one and adds a label for the curated single-option example; supplied IDs and tooltip configuration win. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged. Native root, input, box, icon, tooltip and lifecycle pass-through sections remain available; the story adds no PT defaults that could replace user entries. |
| Inherited `HTMLDivElement` attributes and handlers | Forwarded by the native component through `{...args}`, including ARIA/data attributes, focus/blur, pointer, mouse, keyboard, form, clipboard, composition, drag, animation and transition handlers. Native routing of inherited attributes to the root versus inner input remains PrimeReact's behavior. |
| Nested models, templates, selection/value modes, component callbacks and imperative methods | No nested item model or render template API applies. Selection is application-managed through `checked`/`value`; `onChange` is the sole component callback. `focus()`, `select()`, `getElement()`, `getInput()` and input refs remain native-only and outside Controls. |

The focused contract test verifies representative prop spreading, supplied callback
preservation, PT/tooltip values, generated versus supplied IDs and exact change-event
forwarding. The component browser check verifies the Summary/Default contract, group
selection, disabled behavior, Controls synchronization, copyable sources, and desktop/mobile
rendering. Alternate value types, every inherited DOM event, PT callback form, tooltip event,
imperative method, arbitrary children and every native prop combination remain forwarded or
source-inspected but are not exhaustively tested.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: passed; generated output remained scoped to RadioButton.
- `node --test tests/radiobutton-contract.test.mjs tests/component-generator.test.mjs`: passed, 3 tests.
- `STORYBOOK_URL=http://127.0.0.1:4173 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='RadioButton|boolean inputs' tests/component-review.test.mjs`: passed, 3 tests against the static build at desktop/mobile widths.
- `npm run build`, `npm run build-storybook`, and `git diff --check`: passed. Storybook emitted existing large-chunk and plugin-timing warnings.
- Visual inspection at 1280px and 390px confirmed aligned labels/radio indicators, group wrapping, checked/disabled/invalid/filled states, Controls, and Code panel without clipping.

### Rating API inventory — issue #49

Inspected the Button documentation/story reference, Sakai's Rating usage in
`vendor/sakai-react/app/(main)/uikit/input/page.tsx`, the list and table product
compositions, and the installed PrimeReact `rating/rating.d.ts` and
`rating/rating.esm.js`. This inventory records source-inspection evidence; it is
not exhaustive behavioral testing.

| Native API surface | Treatment |
| --- | --- |
| `value`, `stars`, `cancel`, `disabled`, `readOnly` | Exposed through focused Default Controls and passed through unchanged. Summary covers selectable, custom star-count, clearable, read-only and disabled ratings. The native numeric value model remains available; `null`/`undefined` means no selected value. |
| `onChange` | Adapted only to synchronize the story's controlled `value` arg, preserving `undefined` when the native cancel event reports `null`; then forwards the exact native event to the supplied callback. |
| `onIcon`, `offIcon`, `cancelIcon`, `cancelIconProps`, `onIconProps`, `offIconProps` | Passed through unchanged. Icon values support native strings, nodes and functions; they are not represented by text-only Controls. |
| `tooltip`, `tooltipOptions`, `id`, `className`, `style`, `tabIndex`, `children`, and inherited `HTMLDivElement` attributes/handlers | Passed through unchanged through `{...args}`. This includes ARIA/data attributes and focus, blur, keyboard, pointer, mouse, clipboard, composition, drag, animation and transition handlers. `children` is accepted by the native contract but does not replace the generated rating items. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged. Native root, item, cancel item, on/off/cancel icon, tooltip and lifecycle pass-through sections remain available; the story supplies no PT defaults that could replace user entries. |
| Nested models, templates, selection modes and imperative methods | Not applicable or native-only. Rating has no item model, render-template API or alternate selection/value mode. The native ref exposes the component element and remains outside Controls. |

The focused contract test verifies representative numeric/configuration values,
inherited attributes and callbacks, icon/tooltip props, PT, unstyled mode and
exact event preservation for a controlled change including cancellation. The
component browser check verifies the Summary/Default contract, rendered star
count and value synchronization at desktop/mobile widths. Alternate icon
functions/nodes, every inherited DOM event, PT callback form, tooltip behavior,
arbitrary children and the imperative ref remain forwarded or source-inspected
but are not exhaustively tested.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: passed; generated output remained scoped to Rating.
- `node --test tests/rating-contract.test.mjs tests/component-generator.test.mjs`: passed, 3 tests.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk and plugin-timing warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:4173 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='Rating: only Summary and Default' tests/component-review.test.mjs`: passed; Summary/Default rendered at desktop/mobile widths.
- Manual Playwright visual inspection at 1280px and 390px: passed; curated examples render without runtime errors or layout clipping. A direct browser interaction also verified selecting the fifth star and clearing it with the cancel control.
- `git diff --check`: passed.

### ScrollTop API inventory — issue #51

Inspected the Button documentation/story reference, the ScrollTop generator
entry and generated files, the Sakai UI Kit `misc` example at
`vendor/sakai-react/app/(main)/uikit/misc/page.tsx`, and the installed
PrimeReact `scrolltop.d.ts` and implementation. This inventory records
source-inspection evidence; it is not exhaustive behavioral testing.

| Native API surface | Treatment |
| --- | --- |
| `target`, `threshold`, `icon`, `behavior` | Exposed through Default Controls and passed through unchanged. The playground defaults to `target="parent"` so its local overflow panel is usable; changing the target remains supported. The Summary covers custom icon, automatic behavior, and threshold variations. |
| `className`, `style` | Exposed through Default Controls and passed through unchanged for positioning and custom styling. |
| `transitionOptions`, `pt`, `ptOptions`, `unstyled` | Passed through unchanged through `{...args}`; intentionally outside the curated Controls. Native transition and pass-through sections (`root`, `icon`, `transition`, and `hooks`) remain available. |
| `onShow`, `onHide` | Passed through unchanged. The story does not intercept these lifecycle callbacks because no wrapper feedback is needed. |
| `children`, inherited DOM attributes/events and ref methods | Passed through by the native component contract or remain native-only; intentionally outside curated examples and Controls. ScrollTop has no item model, selection/value mode, or render-template API. `getElement()` remains available through a native ref. |

The focused contract test verifies representative native props, inherited
attributes, PT configuration, children and callback identity remain on the
ScrollTop element inside the local playground. The component browser check
verifies returning the parent scroll container to the top, Summary variations,
Summary/Default structure, copyable sources, Controls placement, and desktop /
mobile rendering. Window-target behavior, custom transition/PT callback forms,
all inherited DOM events, lifecycle timing, refs, and every native prop
combination remain source-inspected or forwarded but are not exhaustively
tested.

### ScrollPanel API inventory — issue #50

Inspected the Button documentation/story reference, the ScrollPanel generator
entry and generated files, the Sakai UI Kit `misc` example at
`vendor/sakai-react/app/(main)/uikit/misc/page.tsx`, and the installed
PrimeReact `scrollpanel.d.ts` and implementation. This inventory records
source-inspection evidence; it is not exhaustive behavioral testing.

| Native API surface | Treatment |
| --- | --- |
| `children` | Passed through unchanged when supplied. The playground provides its own vertical overflow content only when `children` is `undefined`; caller content is preserved by the fallback. |
| `id`, `className`, `style`, `title`, `tabIndex`, ARIA/data attributes and inherited `HTMLAttributes<HTMLDivElement>` | Passed through unchanged through `{...args}`. The Default Control exposes `style` for the common viewport size; other inherited attributes and DOM handlers remain available through native story args and are outside curated Controls. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged. Native `root`, `wrapper`, `content`, `barX`, `barY` and lifecycle-hook pass-through sections remain available; the story supplies no PT defaults that replace user entries. |
| Native DOM events, including `onScroll`, `onFocus`, `onBlur`, keyboard, pointer, mouse, touch, drag, clipboard, animation and transition handlers | Passed through unchanged. ScrollPanel's internal content scroll handler remains native and no callback is intercepted by the playground. |
| Templates, nested models, selection/value modes and component-specific events | Not applicable. ScrollPanel has no item collection, value/selection model, render-template API or component-specific callback contract beyond inherited DOM events. |
| Imperative methods | Native `getElement()`, `getContent()`, `getXBar()` and `getYBar()` ref methods remain available and are outside Controls. |

The focused contract test verifies representative native attributes, children,
DOM callback identity, PT configuration and the default constrained viewport.
The component browser check verifies vertical scrolling, horizontal overflow in
the Summary variation, Summary/Default structure, copyable sources and absence
of Summary Controls at the existing desktop/mobile review widths. Alternate
PT callback forms, every inherited DOM event, custom ref usage and all native
attribute combinations remain forwarded but are not exhaustively tested.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: passed; generated output remained scoped to ScrollPanel.
- `node --test tests/scrollpanel-contract.test.mjs tests/component-generator.test.mjs`: passed, 3 tests.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk and plugin-timing warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:4173 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='scroll containers' tests/component-review.test.mjs`: passed; vertical and horizontal scrolling assertions passed against the static build.
- `STORYBOOK_URL=http://127.0.0.1:4173 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='ScrollPanel: only Summary and Default' tests/component-review.test.mjs`: passed; Summary/Default rendered at 1280px and 390px.
- `git diff --check`: passed.

### ProgressBar API inventory — issue #47

The inventory below is based on the installed PrimeReact `ProgressBarProps` declaration and implementation, plus the Sakai UI Kit `misc` and `table` examples. It records the native contract reviewed for this issue; it is not an exhaustive interaction test.

| API surface | Treatment |
| --- | --- |
| `value` (`string \| number \| null \| undefined`) | Exposed as a numeric Default Control for the common 0–100 playground range and passed through unchanged; the native string, null and out-of-range forms remain available through `ExampleArgs` and are not silently normalized. |
| `showValue`, `unit`, `mode` (`determinate \| indeterminate`), `color` | Exposed through focused Default Controls and passed through unchanged. Determinate, indeterminate, hidden-label, custom-unit and custom-color compositions are curated in Summary. |
| `displayValueTemplate` | Passed through unchanged and intentionally outside Controls because it accepts a render function; the native custom label contract is source-inspected, not represented by a text-only Control. |
| `id`, `className`, `style`, ARIA/data attributes, DOM event handlers and other inherited `HTMLAttributes<HTMLDivElement>` | Forwarded unchanged through `{...args}`; the playground only supplies its responsive outer width wrapper. Native root attributes remain available through story args and are outside curated Controls. |
| `pt`, `ptOptions`, `unstyled`, `children` | Forwarded unchanged; root, container, value, label and lifecycle pass-through sections remain available. No wrapper pass-through defaults replace user customizations. `children` is accepted by the native contract but is not rendered by the current PrimeReact implementation. |
| Templates, nested models, selection/value modes and imperative methods | Not applicable or native-only. ProgressBar has no option collection, selection model, item template or events that change component state; its `getElement()` ref method remains outside Controls. |

The API inventory is source inspection, not exhaustive behavioral testing. The focused browser check verifies the curated Summary modes, label visibility, Default Controls synchronization, copyable source, and desktop rendering; the generic component check also verifies mobile rendering and runtime safety. Supplied display-template functions, pass-through callbacks, inherited DOM events, arbitrary native attributes, string/null values, custom children and ref methods remain forwarded or native-supported but are not exhaustively tested.

### PanelMenu API inventory — issue #44

The inventory below is based on the installed PrimeReact `PanelMenuProps`, `MenuItem`, pass-through declarations and implementation, plus the Sakai UI Kit menu source. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `model` (`MenuItem[]`, including nested items) | Exposed as an object Control and adapted only to decorate leaf commands with local feedback. The recursive adapter preserves every item property, nested structure and each supplied `item.command` before reporting the selected label. |
| `expandedKeys` / `onExpandedKeysChange` | Passed through unchanged for native controlled expansion. They are outside the curated Controls because the playground does not synthesize a key map or narrow the native value. |
| `multiple` | Exposed as a boolean Control and passed through unchanged; the Summary demonstrates multiple top-level panels remaining open. |
| `expandIcon`, `collapseIcon`, `transitionOptions` | Passed through unchanged and intentionally outside the curated Controls because icon values support strings, React nodes and functions, while transition options are a native configuration object. Custom string icons are shown in Summary. |
| `onOpen`, `onClose`, `onExpandedKeysChange`, inherited `HTMLAttributes<HTMLDivElement>` (`onFocus`, `onBlur`, `onKeyDown`, ARIA/data attributes, `id`, `className`, `style`, and other DOM attributes) | Forwarded unchanged through `{...args}`. Supplied callbacks and DOM attributes remain available; the wrapper does not replace them. |
| `pt`, `ptOptions`, `unstyled`, `children` | Forwarded unchanged. Native root, panel, header, action, icon, label, menu, menuitem, transition and lifecycle pass-through sections remain available; no wrapper PT defaults replace caller values. |
| Templates, selection/value modes, filtering and imperative methods | Not applicable or native-only. PanelMenu has no component-level selection value or filtering model; `getElement()` remains available through the native ref and outside Controls. `MenuItem.template` remains part of the forwarded model and is not represented in the curated examples. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies prop spreading, recursive command preservation and the Summary/Default structure. The component browser check verifies panel expansion, leaf command feedback, Controls synchronization, copyable sources and desktop/mobile rendering. Every callback form, pass-through callback, transition option, icon function, template, inherited DOM event and ref method remains forwarded but is not exhaustively tested.

### Message API inventory — issue #40

The inventory below is based on the installed PrimeReact `MessageProps` declaration and implementation, plus the Sakai UI Kit message page at `vendor/sakai-react/app/(main)/uikit/message/page.tsx`. It records the native contract reviewed for this issue; it is not an exhaustive interaction test.

| API surface | Treatment |
| --- | --- |
| `severity` (`success`, `info`, `warn`, `error`, `secondary`, `contrast`) | Exposed through the story-only `messageSeverity` Control for the imperative demo payload and passed to `show` unchanged. The Summary curates every supported severity. Messages itself has no severity prop. |
| `summary`, `detail`, `content`, `id`, `closable`, `closeIcon`, `sticky`, `life`, `icon`, `pt`, `ptOptions`, `unstyled` on `MessagesMessage` | Retained in the native imperative message model. The playground exposes the common severity, summary, detail, closable, and sticky fields as story-only Controls, while React-node/function content, custom icons, pass-through values, lifetime tuning, and arbitrary message fields remain available through native `show` calls outside the curated Controls. |
| `children` | Forwarded unchanged through the native props spread; no child composition is required by the component's documented API and it is outside the curated examples. |
| `id`, `className`, `style`, ARIA/data attributes, DOM event handlers and other inherited `HTMLAttributes<HTMLDivElement>` | Forwarded unchanged through `{...args}` and intentionally outside the curated Controls. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged from `Messages` after removing only the five story-only demo fields. Native pass-through sections (`root`, `wrapper`, `icon`, `summary`, `detail`, `button`, `buttonIcon`, `hooks`, `transition`) and unstyled mode remain available through native story args; no wrapper defaults replace user customizations. |
| Nested models, selection/value modes, templates beyond `content`, imperative methods | Not applicable or native-only. Message has no option collection, selection value, or item model; its `getElement()` ref method remains outside the curated Controls. |

The focused browser check verifies the Summary/Default contract, show/clear behavior, Controls placement, copyable sources, runtime safety, and desktop/mobile rendering. The full severity union is source-inspected and represented by the Summary and `messageSeverity` select, but each severity rendering is not independently browser-tested. Supplied `onRemove` and `onClick` callbacks, custom content functions, message-level pass-through callbacks, inherited DOM events, unstyled mode, and the ref methods remain source-inspected and are not exhaustively tested.

Issue #41 validation: `node --test tests/component-generator.test.mjs` passed; `npm run build` and `npm run build-storybook` passed; `STORYBOOK_URL=http://127.0.0.1:6021 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='Messages' tests/component-review.test.mjs` passed (Summary/Default at desktop and mobile plus show/clear feedback). The Default story was visually inspected at 1280px and 390px against the static build; controls and action spacing remained visible without clipping. `git diff --check` passed.

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
| InputMask | [#30](https://github.com/marcosrocha85/primereact-storybook/issues/30) | Masked input formatting and retention; API inventory above; source-inspected callback and passthrough preservation |
| InputNumber | [#31](https://github.com/marcosrocha85/primereact-storybook/issues/31) | Decimal/currency entry and formatting; spinner layouts, validation states, API inventory and callback forwarding |
| InputSwitch | [#32](https://github.com/marcosrocha85/primereact-storybook/issues/32) | Click and Space toggle; disabled |
| InputText | [#33](https://github.com/marcosrocha85/primereact-storybook/issues/33) | Text entry and clearing; API inventory, controlled value synchronization, and callback/passthrough preservation |
| InputTextarea | [#34](https://github.com/marcosrocha85/primereact-storybook/issues/34) | Text entry and clearing |
| Knob | [#35](https://github.com/marcosrocha85/primereact-storybook/issues/35) | Arrow-key value change |
| ListBox | [#36](https://github.com/marcosrocha85/primereact-storybook/issues/36) | Option selection; API inventory, controlled single/multiple values, filtering, and callback/prop forwarding |
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
| SplitButton | [#56](https://github.com/marcosrocha85/primereact-storybook/issues/56) | Primary-action feedback; menu commands wired; native API inventory below |
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

### Tag API audit — issue #61

Inspected the Button documentation/story reference, the Tag generator entry and generated files, the Sakai UI Kit
Tag examples at `vendor/sakai-react/app/(main)/uikit/misc/page.tsx`, and the installed PrimeReact `tag.d.ts` and
implementation. The Summary now curates severity, rounded, and icon compositions. Default remains one native Tag
instance with Controls for value, severity, rounded, and icon.

| Native surface | Treatment |
| --- | --- |
| `value` (`ReactNode`) | Exposed as a text Control for the common label case and forwarded unchanged. Rich React-node values remain available through native args but are outside the curated Control. |
| `severity` (`success`, `info`, `warning`, `danger`, `secondary`, `contrast`, `null`, `undefined`) | Exposed as a select Control with all documented visual values plus the no-severity option; forwarded unchanged. All severity styles are curated in Summary. |
| `rounded` | Exposed as a boolean Control and forwarded unchanged. Rounded severity combinations are curated in Summary. |
| `icon` (`IconType<TagProps>`) | Exposed as the Button-standard select options, including the no-icon option; forwarded unchanged. Native React-node/function icon forms remain available through native args and are outside the curated Control. |
| `children` | Forwarded unchanged. The native child slot remains available for custom content; the curated examples use `value`. |
| `className`, `style`, `id`, `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLSpanElement>`, and DOM events | Forwarded unchanged through `{...args}`. These include focus, keyboard, mouse, pointer, touch, clipboard, animation, transition, and capture handlers; no wrapper event is synthesized. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged. Native root, icon, value, and lifecycle pass-through sections retain their object/function forms; no wrapper defaults replace user values. |
| Templates, nested models, selection/value modes, and imperative API | Tag has no item model, selection mode, or render-template collection. The native `getElement()` ref method remains available outside Controls. `icon` supports native node/function forms but is not exhaustively rendered here. |

This inventory is source inspection, not exhaustive behavioral testing. The focused Tag browser check verifies the
Summary/Default structure, no Summary Controls, copyable sources, all curated severity/rounded/icon compositions,
single-instance Default rendering, Controls synchronization, and desktop rendering; the shared component check also
verifies mobile rendering and runtime safety. Rich `value`/`children` nodes, icon functions, PT callbacks and merge
options, unstyled mode, refs, every inherited DOM event, and all prop combinations remain native and are not
exhaustively tested. Tag has no state-changing callback to intercept, so callback preservation is not applicable.

Issue #61 validation: `node scripts/generate-component-stories.mjs` passed with deterministic output;
`node --test tests/component-generator.test.mjs` passed (1 test); `npm run build` passed;
`npm run build-storybook` passed with the repository's existing large-chunk and plugin-timing warnings;
`STORYBOOK_URL=http://127.0.0.1:6018 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='^(Tag: curated|Tag: only|icon Controls)' tests/component-review.test.mjs`
passed (3 tests), including Summary/Default at desktop/mobile widths, curated Tag Controls, and icon selection/reset;
`git diff --check` passed. The temporary static server on port 6018 was stopped after validation.

### TabMenu API audit — issue #59

Inspected the Button documentation/story reference, the TabMenu generator entry and generated files,
the Sakai UI Kit menu example at `vendor/sakai-react/app/(main)/uikit/menu/page.tsx`, and the installed
PrimeReact `tabmenu.d.ts`, `menuitem.d.ts`, and implementation. The curated Summary covers the base
navigation, icon, disabled-item, and link/active-item compositions. Default remains one native TabMenu
instance with Controls for the model, active index, class name, and style.

| Native surface | Treatment |
| --- | --- |
| `model`, `activeIndex` | `model` is exposed as a `MenuItem[]` object Control and forwarded unchanged. `activeIndex` is exposed and adapted only to synchronize the controlled playground after selection. |
| `MenuItem` fields: `id`, `label`, `icon`, `url`, `items`, `expanded`, `disabled`, `visible`, `target`, `separator`, `style`, `className`, `command`, `template`, `data` | Forwarded unchanged inside `model`. Icons, disabled state, links, and active selection are curated; nested items, commands, templates, arbitrary data, visibility, targets, and custom item styling remain available through native args but outside the curated examples. |
| `onTabChange` | Adapted only to call `updateArgs({ activeIndex: event.index })`, then invokes the supplied callback with the exact original PrimeReact event. |
| `className`, `style`, `id`, `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLDivElement>`, and DOM events | Forwarded unchanged through `{...args}`. This includes focus, blur, keyboard, mouse, pointer, touch, drag, clipboard, animation, transition, and capture handlers. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged. Native root, menu, menuitem, action, icon, label, inkbar, and lifecycle pass-through sections and their callback forms remain available; no wrapper PT defaults replace caller values. |
| `children` and ref/imperative API | Retained by the native props contract; children are not needed by TabMenu's model-driven rendering and are outside the curated examples. The native `getElement()` method remains outside Controls. |
| Templates, nested models, and selection/value modes | TabMenu has a flat `MenuItem[]` model and no alternate controlled value mode. Per-item icon/template/command forms and nested MenuItem fields remain native-supported; no wrapper narrows them. |

This inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies
representative MenuItem fields, inherited attributes, PT, `unstyled`, and supplied `onTabChange` preservation.
The component browser check verifies active-item selection, Summary/Default structure, copyable sources,
Controls placement, runtime safety, and desktop/mobile rendering. Keyboard navigation, URL navigation,
commands/templates, PT callbacks, every inherited DOM event, ref methods, and all MenuItem combinations
remain forwarded but are not exhaustively tested.

### TabView API audit — issue #60

Inspected the Button documentation/story reference, the TabView generator entry and generated files,
the Sakai UI Kit TabView example at `vendor/sakai-react/app/(main)/uikit/panel/page.tsx`, and the installed
PrimeReact `tabview.d.ts` and implementation. The Summary now curates the base, disabled, closable/icon,
and scrollable compositions. Default remains one native TabView instance with editable panel text and
Controls for active selection and rendering behavior.

| Native surface | Treatment |
| --- | --- |
| `activeIndex`, `renderActiveOnly`, `scrollable` | Forwarded unchanged. `activeIndex` is adapted only to synchronize the controlled playground after selection; the native numeric index mode is retained. The common rendering and scrollable header variations are exposed through Controls and Summary. |
| `children` and TabPanel models | Forwarded unchanged. The playground supplies three fallback `TabPanel` children only when `children` is `undefined`; supplied children, including `null`, remain authoritative. Native `TabPanel` fields `closable`, `className`, `contentStyle`, `contentClassName`, `header`, `headerTemplate`, `headerStyle`, `headerClassName`, `leftIcon`, `rightIcon`, `prevButton`, `nextButton`, `closeIcon`, `disabled`, `pt`, `ptOptions`, `style`, `unstyled`, and `visible` remain available. Header icons, disabled state, and closable tabs are curated in Summary. |
| `onBeforeTabChange`, `onBeforeTabClose`, `onTabClose` | Forwarded unchanged. The wrapper does not synthesize, suppress, or alter close/guard callbacks. |
| `onTabChange` | Adapted only to call `updateArgs({ activeIndex: event.index })`, then invokes the supplied callback with the exact original PrimeReact event. This is covered by `tests/tabview-contract.test.mjs`. |
| `id`, `className`, `style`, `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLDivElement>`, and DOM events | Forwarded unchanged through `{...tabViewProps}`. This includes focus, blur, keyboard, mouse, pointer, touch, drag, clipboard, animation, transition, and capture handlers. |
| `panelContainerClassName`, `panelContainerStyle`, `pt`, `ptOptions`, `unstyled` | Forwarded unchanged. Native root, navigation container/content/list, inkbar, scroll buttons/icons, panel container, tab, TabPanel root/header/action/title/content, and lifecycle pass-through value/function forms remain available; no wrapper PT defaults replace caller values. |
| Templates and icons | TabPanel `headerTemplate` and the `leftIcon`, `rightIcon`, `prevButton`, `nextButton`, and `closeIcon` `IconType` values support native React node/function forms. These remain forwarded and are represented only by static string-icon examples where useful. |
| Ref and imperative API | Native `reset()` and `getElement()` remain available through the component ref and outside Controls. TabPanel has no separate selection/value mode or imperative API. |

This inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies
representative native props, explicit children, pass-through values, controlled active-index synchronization,
and supplied `onTabChange` preservation. The component browser check verifies active-tab selection, Summary/Default
structure, copyable sources, Controls placement, runtime safety, and desktop/mobile rendering. Close prevention,
close callbacks, keyboard navigation, scroll-button behavior, custom header/icon/template functions, PT callback
forms, refs, lifecycle hooks, and every inherited DOM event remain forwarded but are not exhaustively tested.

### Sidebar API inventory — issue #53

The inventory below is based on the installed PrimeReact `SidebarProps`, `SidebarPassThroughOptions`, and Sidebar implementation, the Button story/documentation reference, and the Sakai UI Kit overlay example at `vendor/sakai-react/app/(main)/uikit/overlay/page.tsx`. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `visible`, `position` | `visible` is adapted only for controlled Storybook synchronization; `position` is exposed through a select Control with all native values (`left`, `right`, `top`, `bottom`). Both are passed through unchanged otherwise. |
| `dismissable`, `modal`, `showCloseIcon`, `closeOnEscape`, `fullScreen`, `blockScroll` | Exposed through focused Default Controls and passed through unchanged. These cover the primary Sakai overlay compositions and are curated in Summary. |
| `maskStyle`, `maskClassName`, `baseZIndex`, `appendTo`, `transitionOptions`, `className`, `style`, `id`, `children`, inherited HTML attributes and DOM callbacks | Passed through unchanged by `{...args}`; intentionally outside the curated Controls/examples. `children` remains available to callers, while the playground supplies its own demonstration content. |
| `header`, `icons`, `content`, `closeIcon`, `ariaCloseLabel` | Passed through unchanged; intentionally outside the curated Controls because they accept React nodes, callbacks, native `IconType` values, or headless content props. |
| `onHide` | Adapted to set `visible: false`, then invokes the supplied callback with no arguments, preserving the native callback contract. The focused contract test exercises this path. |
| `onShow` | Passed through unchanged; no wrapper callback is synthesized. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged. Root, header, close button/icon, custom icons, content, mask, transition, and lifecycle pass-through sections remain available; no wrapper PT defaults replace user entries. |
| Nested models, alternate value modes, and imperative methods | No option/value model applies. Native `getElement()`, `getMask()`, and `getCloseIcon()` ref methods remain outside Controls and are source-inspected. |

The API inventory is source inspection, not exhaustive behavioral testing. `tests/sidebar-contract.test.mjs` verifies representative inherited attributes, PT options, custom content, visual props, and supplied `onHide` preservation. The browser check verifies open, close, reopen, Summary/Default structure, copyable sources, Controls placement, and desktop/mobile rendering. Header/icon/content callback forms, transition variants, mask behavior for every position, Escape/focus paths, refs, and every native prop combination remain forwarded but are not exhaustively tested.

### SplitButton API inventory — issue #56

The inventory below is based on the installed PrimeReact `SplitButtonProps`, `SplitButtonPassThroughOptions`, `MenuItem`, and implementation, plus the Sakai UI Kit SplitButton example in `vendor/sakai-react/app/(main)/uikit/button/page.tsx`. It records source inspection for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `label`, `icon`, `severity`, `size`, `text`, `rounded`, `raised`, `outlined`, `loading`, `disabled` | Exposed through focused Default Controls and passed through unchanged. The icon select follows the Button contract and includes the no-icon option. All native severity values, including `contrast`, are available in the select. |
| `model` and `MenuItem` fields (`id`, `label`, `icon`, `url`, `items`, `expanded`, `disabled`, `visible`, `target`, `separator`, `style`, `className`, `command`, `template`, `data`) | Used by the playground's default menu and passed through when supplied. The demo adds a feedback command only when a supplied item has no command; supplied commands are preserved. Nested models, links, separators, templates, and item metadata are intentionally outside the curated Controls. |
| `buttonClassName`, `menuStyle`, `menuClassName`, `menuButtonClassName`, `buttonProps`, `menuButtonProps`, `dropdownIcon`, `loadingIcon`, `buttonTemplate` | Passed through unchanged by `{...args}`; intentionally outside Controls because they target nested elements or accept JSX/template values. |
| `appendTo`, `tooltip`, `tooltipOptions`, `transitionOptions`, `visible`, `className`, `style`, `id`, `children`, inherited HTML attributes and DOM callbacks | Passed through unchanged by `{...args}`; not represented as curated visual examples. |
| `onClick`, `onShow`, `onHide` | `onClick` is adapted only to show primary-action feedback, then invokes the supplied callback with the original event. `onShow` and `onHide` are passed through unchanged. The primary callback path and menu command feedback are browser-tested; supplied callback preservation is source-inspected. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged. Root, icon, nested buttons, menu, menu items, tooltip, hooks, and transition pass-through sections remain available; no wrapper defaults replace user entries. |
| Ref methods and state (`getElement`, `getModel`, `getOverlay`, `overlayVisible`) | Native imperative/state surface remains outside Controls and is source-inspected. No value mode or controlled selection model applies. |

The Default playground intentionally supplies fallback menu items for a useful standalone demo. A caller-provided `model` is not narrowed or discarded; its items and commands are preserved, with feedback added only to command-less items. Header/template forms, custom pass-through functions, overlay lifecycle, refs, and every native prop combination remain forwarded but are not exhaustively tested.

### Password API inventory — issue #45

The inventory below is based on the installed PrimeReact `PasswordProps` declaration and implementation, plus the Sakai invalid-state and authentication examples under `vendor/sakai-react`. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `value` (`string \| undefined`) and `defaultValue` | Adapted only for controlled Storybook synchronization; nullish `value` renders as the native empty string and the supplied `onChange` receives the original event. `defaultValue` remains available through native args. |
| `feedback`, `toggleMask`, `invalid`, `variant`, `placeholder`, `disabled`, `readOnly` | Exposed through Default Controls where they represent documented Password behavior and passed through unchanged. Summary curates feedback, mask toggling, invalid, disabled, read-only, and outlined/filled variants. |
| `inputId`, `inputRef`, `inputStyle`, `inputClassName`, `id`, `className`, `style`, `required`, `name`, `type`, `size`, `maxLength`, `tabIndex`, `autoFocus`, `keyfilter`, `tooltip`, `tooltipOptions` | Passed through unchanged; the input-specific and inherited HTML input properties remain available through native story args and are outside the curated Controls. |
| `promptLabel`, `weakLabel`, `mediumLabel`, `strongLabel`, `mediumRegex`, `strongRegex` | Passed through unchanged; feedback labels and strength thresholds remain native configuration and are outside the curated examples. |
| `showIcon`, `hideIcon`, `icon`, `header`, `content`, `footer`, `appendTo`, `panelStyle`, `panelClassName`, `transitionOptions` | Passed through unchanged. These template, overlay, icon, and transition APIs are native-only and intentionally outside the curated Controls. |
| `pt`, `ptOptions`, `unstyled`, `children` | Passed through unchanged. Native root, input, panel, meter, label, icon, transition, and lifecycle pass-through sections remain available; no wrapper defaults replace user customizations. |
| Inherited input attributes and DOM events | Forwarded unchanged through `{...args}`, including ARIA/data attributes, form attributes, focus, blur, keyboard, composition, clipboard, drag, touch, and selection events. The wrapper only intercepts `onChange` for value synchronization. |
| `onChange` | Adapted to update the controlled value, then invokes the supplied callback with the exact original event; covered by `tests/password-contract.test.mjs`. |
| `onInput`, `onShow`, `onHide` | Passed through unchanged. The wrapper does not replace these callbacks; their runtime behavior is native and not exhaustively tested here. |
| Imperative methods | Native-only: `focus`, `toggleMask`, `getElement`, `getOverlay`, and `getInput` remain available through the native ref and outside Controls. |

The focused contract test verifies representative native attributes, pass-through objects, intercepted value synchronization, and supplied callback preservation. The component browser check verifies text entry and clearing plus the shared Summary/Default, Controls, source, and desktop/mobile checks. Strength calculations, mask toggle keyboard behavior, templates, overlay lifecycle callbacks, PT callback forms, refs, and every inherited DOM attribute combination remain source-inspected or forwarded but are not exhaustively tested.

### InputText API inventory — issue #33

The inventory below is based on the installed PrimeReact `InputTextProps` declaration and implementation, plus the Sakai input, invalid-state, and variant examples. It records the native contract reviewed for this issue; it is not exhaustive interaction testing.

| API surface | Treatment |
| --- | --- |
| `value` (`string \| null \| undefined`) | Adapted only for controlled Storybook synchronization; nullish values render as the native empty string and the supplied `onChange` receives the original event. |
| `invalid`, `disabled`, `readOnly`, `variant`, `placeholder` | Exposed through Default Controls where they represent useful documented states and passed through unchanged. Summary curates disabled, read-only, invalid, outlined, and filled examples. |
| `keyfilter`, `validateOnly`, `required`, `name`, `id`, `type`, `size`, `maxLength`, `tabIndex`, `autoFocus`, `className`, `style`, `tooltip`, `tooltipOptions`, `unstyled`, `pt`, `ptOptions`, `children` | Passed through unchanged; common validation controls are exposed while the complete native and pass-through surface remains available through `args` outside the curated Controls. |
| Inherited `React.InputHTMLAttributes<HTMLInputElement>` properties and DOM events | Passed through unchanged, including standard input attributes, `aria-*`/`data-*`, form attributes, mouse, keyboard, composition, drag, touch, focus, selection, and clipboard events. The wrapper only intercepts `onChange` for value synchronization. |
| `onChange` | Adapted to update the controlled value, then preserved with the exact supplied event; callback forwarding is covered by `tests/inputtext-contract.test.mjs`. |
| `onInput`, `onBeforeInput`, `onKeyDown`, `onPaste`, `onFocus`, `onBlur` | Passed through unchanged. The wrapper does not replace these callbacks; representative identity preservation is covered by the focused contract test. |
| Templates, nested models, alternate value/selection modes, imperative methods | Not applicable or native-only. InputText has no option collection, item model, template, or alternate selection value; its ref and DOM methods remain outside the curated Controls. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies representative native attributes, pass-through objects, intercepted value synchronization, and supplied callback preservation. The component browser check verifies text entry and clearing plus the shared Summary/Default, Controls, source, and desktop/mobile checks. Keyfilter behavior, tooltip rendering, PT callback forms, refs, and every inherited DOM attribute combination remain forwarded but are not exhaustively tested.

### InputTextarea API inventory — issue #34

Inspected the Button docs/story reference, the InputTextarea generator entry and generated files, the Sakai UI Kit input, invalid-state, and float-label examples under `vendor/sakai-react`, and the installed PrimeReact `inputtextarea.d.ts` and implementation. The Summary now uses local static examples with copyable sources for states, variants, auto-resize, and form composition. Default remains one controlled textarea and synchronizes its value through `useArgs` while preserving the supplied `onChange` callback.

| API surface | Treatment |
| --- | --- |
| `value` (`string \| undefined`) | Adapted only for controlled Storybook synchronization; nullish values render as the native empty string and the supplied `onChange` receives the original event. |
| `autoResize`, `invalid`, `variant`, `keyfilter`, `tooltip`, `tooltipOptions` | Forwarded unchanged. Auto-resize, invalid, and outlined/filled states are curated in Summary or Default Controls; key filtering and tooltip configuration remain native args outside the curated Controls. |
| Native textarea attributes and events | Forwarded unchanged through `{...args}`, including `rows`, `cols`, `placeholder`, `required`, `name`, `id`, `maxLength`, `tabIndex`, `readOnly`, `disabled`, `className`, `style`, `aria-*`, `data-*`, form attributes, focus, blur, input, keyboard, paste, composition, drag, touch, and clipboard handlers. |
| `onChange` | Adapted to update the controlled value, then invokes the supplied callback with the exact original event. This is covered by `tests/inputtextarea-contract.test.mjs`. |
| `pt`, `ptOptions`, `unstyled`, `children` | Forwarded unchanged; root, tooltip, lifecycle hooks, pass-through value/function forms, explicit children, and unstyled behavior remain available outside curated Controls. No wrapper PT defaults replace user customizations. |
| Templates, nested models, alternate value/selection modes, imperative methods | Not applicable or native-only. InputTextarea has no option collection, item model, render-template, or alternate selection value; its textarea ref and DOM methods remain outside the curated Controls. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies representative textarea attributes, pass-through values, inherited callbacks, and intercepted value synchronization. The component browser check verifies text entry and clearing, Summary/Default structure, copyable sources, Controls placement, runtime errors, and desktop/mobile rendering. Keyfilter enforcement, auto-resize height changes, tooltip rendering, PT callback forms, refs, and every inherited DOM attribute combination remain forwarded but are not exhaustively tested.

### ListBox API inventory — issue #36

Inspected the Button documentation/story reference, the ListBox generator entry and generated files, the Sakai UI Kit input example at `vendor/sakai-react/app/(main)/uikit/input/page.tsx`, and the installed PrimeReact `listbox.d.ts` and implementation. The Sakai example uses controlled object selection, `optionLabel`, and filtering. Summary now curates filterable, multiple-selection, invalid/disabled, and filter-match-mode examples; Default remains one controlled ListBox.

| Native surface | Treatment |
| --- | --- |
| `value`, `options`, `optionLabel`, `optionValue`, `dataKey` | `options`, labels, keys, and arbitrary option values are forwarded unchanged. `value` is adapted only to synchronize Storybook args after `onChange`; the native single value and array value modes remain available. |
| Selection behavior: `multiple`, `metaKeySelection`, `optionDisabled`, `autoOptionFocus`, `selectOnFocus`, `focusOnHover` | Forwarded unchanged. The curated Default exposes the common selection/focus controls; multiple selection is demonstrated in Summary with an array value. |
| Filtering: `filter`, `filterBy`, `filterLocale`, `filterMatchMode`, `filterPlaceholder`, `filterValue`, `filterInputProps`, `filterTemplate`, `onFilterValueChange` | Forwarded unchanged. Filter visibility, placeholder, and match mode are exposed; custom filter templates, locale, controlled filter values, input props, and callbacks remain native args outside the curated Controls. |
| Templates and empty states: `itemTemplate`, `optionGroupTemplate`, `optionGroupChildren`, `optionGroupLabel`, `emptyMessage`, `emptyFilterMessage` | Forwarded unchanged, including React-node/function template forms and grouped option models. These are intentionally outside the curated static examples except for the native option composition. |
| Presentation and DOM contract: `invalid`, `disabled`, `listClassName`, `listStyle`, `tooltip`, `tooltipOptions`, `unstyled`, `children`, inherited `HTMLAttributes<HTMLDivElement>` | Forwarded unchanged through `{...args}`. Invalid/disabled states are curated; IDs, classes, styles, ARIA/data attributes, DOM events, tooltip settings, children, and unstyled behavior remain available through native props. |
| `pt`, `ptOptions` | Forwarded unchanged. Root, header, filter, wrapper, virtual scroller, list, item/group, empty-message, tooltip, and lifecycle-hook pass-through sections retain their native value/function forms; no wrapper PT defaults replace user customizations. |
| `onChange` | Adapted only to call `updateArgs({ value: event.value })`, then invokes the supplied callback with the exact original event. This is covered by `tests/listbox-contract.test.mjs`. |
| Ref and imperative API | PrimeReact `focus()`, `getElement()`, and `getVirtualScroller()` remain native and are not exposed as Controls. |
| Nested models, alternate selection/value modes, and supported templates | Option objects, `SelectItem` values, grouped options, single values, array values, and template node/function forms are supported by the native type. No wrapper narrows these modes; the curated playground intentionally demonstrates only the common object-option and single/multiple selection compositions. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies representative option/value modes, filtering, templates, inherited attributes, PT configuration, and supplied `onChange` preservation. The shared browser check verifies native selection with PrimeReact's default `metaKeySelection={false}`. The exposed `metaKeySelection={true}` combination remains untested because PrimeReact 10.9.7's installed click path passes the browser event directly from `ListBoxItem` but then reads `event.originalEvent` in `onOptionSelect`, producing `Cannot read properties of undefined (reading 'metaKey')` before `onChange` is reached. No wrapper workaround was added because it would alter the native event contract. Summary/Default structure, copyable sources, Controls placement, and responsive rendering pass the focused browser checks. Grouped options, custom templates, virtual scrolling, filter callbacks, PT callback forms, refs, and every inherited DOM attribute combination remain forwarded but are not exhaustively tested.

### MultiSelect review — issue #42

Inspected the Button documentation/story reference, the MultiSelect generator entry and generated files, the Sakai UI Kit input, float-label, invalid-state, and table examples under `vendor/sakai-react`, and the installed PrimeReact `MultiSelectProps` declaration and implementation. Summary now curates filterable, filled/invalid, clearable, and disabled compositions. Default remains one controlled MultiSelect and synchronizes its selected value through `useArgs` while preserving the supplied `onChange` callback.

#### API inventory

| Native surface | Treatment |
| --- | --- |
| `value`, `options`, `optionLabel`, `optionValue`, `dataKey`, `optionDisabled`, `optionGroupLabel`, `optionGroupChildren` | Forwarded unchanged. The curated example uses object options and labels; native primitive/object values, grouped options, and disabled-option modes remain supported and are not narrowed by the playground. `value` is adapted only for controlled synchronization. |
| Display and selection: `display`, `maxSelectedLabels`, `selectedItemsLabel`, `selectionLimit`, `showClear`, `showSelectAll`, `selectAll`, `selectAllLabel`, `useOptionAsValue` | Forwarded unchanged. `display`, max labels, and clearable behavior are exposed as useful Controls or Summary examples; the remaining native selection modes remain available through args outside the curated Controls. |
| Filtering: `filter`, `filterBy`, `filterDelay`, `filterInputAutoFocus`, `filterLocale`, `filterMatchMode`, `filterPlaceholder`, `filterTemplate`, `emptyFilterMessage`, `resetFilterOnHide` | Forwarded unchanged. Filtering is exposed and documented; custom templates, locale, messages, and timing remain native args outside curated Controls. |
| State, presentation, and overlay: `placeholder`, `variant`, `invalid`, `disabled`, `loading`, `inline`, `flex`, `fixedPlaceholder`, `scrollHeight`, `overlayVisible`, `appendTo`, `panelClassName`, `panelStyle`, `transitionOptions`, `tooltip`, `tooltipOptions` | Forwarded unchanged. Common filled/invalid/disabled and overlay-independent states are curated; native overlay targets, inline modes, loading, tooltip, and transition configuration remain available through args. |
| Accessibility and inherited element attributes: `ariaLabelledBy`, `id`, `name`, `inputId`, `inputRef`, `tabIndex`, `className`, `style`, `itemClassName`, plus inherited `HTMLAttributes<HTMLDivElement>` | Forwarded unchanged through the native spread. IDs, labels, refs, ARIA/data attributes, DOM events, styling, and form-related attributes remain available even when outside curated Controls. |
| Focus, empty states, and loading details: `selectOnFocus`, `focusOnHover`, `autoOptionFocus`, `emptyMessage`, `loading`, `loadingIcon` | Forwarded unchanged; these native focus, empty-state, and loading modes are outside the curated Controls except for the documented disabled/filter compositions. |
| Templates and icons: `itemTemplate`, `optionGroupTemplate`, `selectedItemTemplate`, `panelHeaderTemplate`, `panelFooterTemplate`, `checkboxIcon`, `itemCheckboxIcon`, `dropdownIcon`, `filterIcon`, `clearIcon`, `closeIcon`, `loadingIcon`, `removeIcon`, `children` | Forwarded unchanged, preserving React-node/function forms. These are intentionally outside the curated examples except for the native option composition. |
| `onChange` | Adapted only to call `updateArgs({ value: event.value ?? [] })`, then invokes the supplied callback with the exact original event. This is covered by `tests/multiselect-contract.test.mjs`. |
| `onFilter`, `onFocus`, `onBlur`, `onShow`, `onHide`, `onRemove`, `onSelectAll` | Forwarded unchanged. The contract test verifies representative callback identity; the wrapper does not synthesize or suppress lifecycle, filter, chip-removal, or select-all events. |
| `pt`, `ptOptions`, `unstyled`, inherited `HTMLAttributes<HTMLDivElement>`, `id`, `className`, `style`, `tabIndex`, ARIA/data attributes | Forwarded unchanged through `{...args}`; no wrapper PT defaults replace caller customization. |
| Imperative ref API and nested/alternate models | Native `focus`, `getElement`, `getInput`, and `getVirtualScroller` methods remain outside Controls. Option groups, virtual scrolling, and all native value/template models remain available; they are source-inspected rather than exhaustively tested. |

This inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies representative option/value, filtering, templates, state, inherited attributes, PT, lifecycle callback identity, and supplied `onChange` preservation. The component browser check verifies option selection, selected chip retention after Escape, Summary/Default structure, Controls placement, copyable sources, runtime errors, and desktop/mobile rendering. Grouped options, custom templates, virtual scrolling, all callback invocation paths, PT callback forms, imperative methods, and every inherited DOM attribute combination remain forwarded but are not exhaustively tested.

### Fieldset review — issue #27

Inspected the Button docs/story reference, the Fieldset generator entry and generated files, the Sakai UI Kit panel example at `vendor/sakai-react/app/(main)/uikit/panel/page.tsx`, and the installed PrimeReact `fieldset.d.ts` and implementation. The Summary now documents static, toggleable, initially collapsed, and custom-icon compositions. Default exposes one controlled Fieldset and synchronizes `collapsed` through `useArgs` while preserving the supplied `onToggle` callback.

| Native surface | Treatment |
| --- | --- |
| `legend`, `toggleable`, `collapsed`, `expandIcon`, `collapseIcon` | Forwarded unchanged; the curated Default exposes these as text, boolean, and select Controls. `collapsed` and icon Controls are shown only when `toggleable` is enabled. Icon string options are curated examples; native React-node/function icon values remain supported through props. |
| `children` | Forwarded unchanged, including explicit `null`. The story-only `contentText` fallback is used only when `children` is `undefined`, so native content remains authoritative. |
| `onToggle` | Adapted only to synchronize the controlled `collapsed` arg, then invokes the supplied callback with the original event. `onExpand`, `onCollapse`, and `onClick` are forwarded unchanged. |
| `transitionOptions`, `unstyled`, `className`, `style`, inherited `HTMLAttributes<HTMLFieldSetElement>` | Forwarded unchanged and outside the curated Controls. This includes `id`, `role`, `aria-*`, `data-*`, DOM event handlers, and native style/class attributes. |
| `pt`, `ptOptions` | Forwarded unchanged. Root, legend, toggler, toggler icon, legend title, toggleable content, content, hooks, and transition pass-through value/function forms remain available; no wrapper PT defaults replace user entries. |
| Ref API (`getElement`, `getContent`) | Source-inspected and retained by PrimeReact; not exposed as a Control or independently exercised in this focused review. |

The inventory is based on source inspection and does not claim exhaustive behavioral testing. The focused contract test verifies native children including explicit `null`, inherited attributes, PT values, fallback content, and the supplied `onToggle` callback. The component browser check verifies collapse/expand at desktop and mobile widths. Icon functions, transition lifecycle configuration, all PT callback forms, ref methods, and every inherited DOM event remain forwarded but are not exhaustively exercised.

### Galleria review — issue #29

Inspected the Button docs/story reference, the Galleria generator entry and generated files, the Sakai UI Kit media source at `vendor/sakai-react/app/(main)/uikit/media/page.tsx`, and the installed PrimeReact `galleria.d.ts` and implementation. The Summary now contains local image-gallery examples for indicators/captions, thumbnail positioning, responsive thumbnails, and fullscreen viewing. Default exposes one gallery instance with controlled active-index synchronization; image paths remain relative to the Storybook base path.

| Native surface | Treatment |
| --- | --- |
| `value`, `activeIndex`, `responsiveOptions`, `numVisible` | Forwarded unchanged. The curated Default exposes these values; `activeIndex` is synchronized through `onItemChange` when controlled. |
| Item rendering: `item`, `thumbnail`, `indicator`, `caption`, `header`, `footer`, `children` | Forwarded. The default image templates are supplied only when `item`/`thumbnail` are `undefined`; explicit values, including `null`, are preserved. Other template slots remain available through native args and are demonstrated in Summary where relevant. |
| Navigation/display: `showItemNavigators`, `showThumbnailNavigators`, `showItemNavigatorsOnHover`, `changeItemOnIndicatorHover`, `circular`, `showThumbnails`, `thumbnailsPosition`, `showIndicators`, `showIndicatorsOnItem`, `indicatorsPosition` | Forwarded unchanged. Relevant layout and navigation properties are exposed as Controls; all supported positions remain available. |
| Fullscreen/slideshow: `fullScreen`, `autoPlay`, `transitionInterval`, `baseZIndex`, `transitionOptions` | Forwarded unchanged. Fullscreen and autoplay are curated Controls; transition configuration and layering remain native but outside the curated Controls. |
| Icons: `closeIcon`, `itemNextIcon`, `itemPrevIcon`, `nextThumbnailIcon`, `prevThumbnailIcon` | Forwarded unchanged, including native `IconType` function/node value modes; not exposed as free-text Controls. |
| Lifecycle: `onItemChange`, `onShow`, `onHide` | `onItemChange` is wrapped only when `activeIndex` is controlled to synchronize the playground, then invokes the supplied callback with the original event. Lifecycle callbacks are forwarded unchanged. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged. Root, item, thumbnail, navigation, indicator, caption, fullscreen mask, transition and lifecycle pass-through sections retain their native object/function forms; no wrapper PT defaults replace user entries. |
| Inherited `HTMLAttributes<HTMLDivElement>` and component-base values | Forwarded by `{...args}`, including `id`, `className`, `style`, `role`, `aria-*`, `data-*`, DOM events and `ref`; no native value mode is narrowed. |
| Imperative ref API | `show`, `hide`, `isAutoPlayActive`, `startSlideShow`, `stopSlideShow`, `getElement`, and `getMask` remain native and outside the curated Controls. |

The API inventory is source inspection, not exhaustive behavioral testing. The focused contract test verifies arbitrary gallery models, templates, explicit `null` templates, inherited attributes, PT values, lifecycle/event callbacks, and controlled versus uncontrolled `activeIndex`. The shared browser check verifies Summary/Default structure, copyable sources, desktop/mobile rendering, loaded image assets, and next-image navigation. Responsive breakpoints, fullscreen/slideshow gestures, every icon/template/PT callback form, imperative methods, transition configuration, and all inherited DOM events remain forwarded but are not exhaustively exercised.

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

## Dialog review — issue #24

Inspected the Button docs/story reference, the Dialog generator entry and generated files, the Sakai UI Kit overlay examples at `vendor/sakai-react/app/(main)/uikit/overlay/page.tsx`, and the installed PrimeReact `dialog.d.ts` and implementation. The Summary now contains local, stateful examples for the base dialog, a confirmation footer, maximization, positioning, and dismissable modal mask. Default exposes one controlled Dialog instance with an explicit open trigger and synchronizes visibility through `useArgs`.

### API inventory

| Native surface | Treatment |
| --- | --- |
| `visible`, `onHide`, `onShow` | `visible` is exposed as a Control. The playground adapts `onHide` only to set `visible: false`, then invokes the supplied callback; `onShow` is forwarded through a wrapper that invokes the supplied callback. |
| `header`, `footer`, `children`, `content`, `icons` | Forwarded unchanged. The default child content is used only when `args.children` is absent; React node and function template modes remain available through native args. |
| `modal`, `dismissableMask`, `closeOnEscape`, `closable`, `showCloseIcon`, `focusOnShow`, `draggable`, `resizable`, `keepInViewport`, `blockScroll`, `position`, `maximizable`, `maximized`, `minX`, `minY` | Forwarded unchanged. The core modal, dismissal, close, maximization, and position options are exposed in the curated Controls; the remaining behavior is available through native args but not independently demonstrated. |
| `style`, `className`, `headerClassName`, `headerStyle`, `contentClassName`, `contentStyle`, `maskClassName`, `maskStyle`, `id`, `rtl` | Forwarded unchanged; only `style` is exposed as a generic object Control. |
| `appendTo`, `baseZIndex`, `transitionOptions`, `unstyled`, `pt`, `ptOptions` | Forwarded unchanged, preserving the native value modes, transition configuration, styling boundary, and pass-through customization. No wrapper PT defaults replace user entries. |
| `ariaCloseIconLabel`, `closeIcon`, `maximizeIcon`, `minimizeIcon` | Forwarded unchanged; icon value/function modes and accessible close-label customization are outside the curated Controls. |
| `onClick`, `onMaskClick`, `onMaximize`, `onDrag`, `onDragStart`, `onDragEnd`, `onResize`, `onResizeStart`, `onResizeEnd` | Forwarded unchanged. The story does not intercept these callbacks. |
| Inherited DOM attributes and component-base props | Forwarded by `{...args}`, including `data-*`, `aria-*`, `role`, `tabIndex`, DOM handlers, and other supported native attributes. |

The inventory is source inspection, not exhaustive behavioral testing. Focused browser coverage verifies open, close, reopen, Summary structure, Controls placement, copyable source, and desktop/mobile rendering. The contract test verifies native props, child/template values, pass-through objects, inherited attributes, and supplied callbacks across the intercepted `onHide` path. Dragging, resizing, every template function, transition/append targets, PT callbacks, imperative methods, and all inherited DOM events remain forwarded but are not exhaustively tested.

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

### FileUpload API audit — issue #28

Inspected the Button reference, the Sakai file UI kit source at
`vendor/sakai-react/app/(main)/uikit/file/page.tsx`, and the installed PrimeReact
`fileupload/fileupload.d.ts` and implementation. The Summary now covers basic,
advanced, multiple, automatic-local-upload, and disabled compositions. The Default
keeps one FileUpload instance and uses the local custom-upload handler by default so
the documented playground does not issue a POST request.

| Native surface | Treatment |
| --- | --- |
| `mode`, `name`, `url`, `multiple`, `accept`, `removeIcon`, `disabled`, `auto`, `maxFileSize`, `invalidFileSizeMessageSummary`, `invalidFileSizeMessageDetail`, `style`, `className`, `withCredentials`, `previewWidth`, `chooseLabel`, `selectedFileLabel`, `uploadLabel`, `cancelLabel`, `chooseOptions`, `uploadOptions`, `cancelOptions`, `customUpload`, `headerClassName`, `headerStyle`, `contentClassName`, `contentStyle` | Forwarded unchanged by the native props spread. The Default exposes the common mode, labels, file filter, size limit, multiple, auto, custom-upload, and disabled controls; the remaining layout and transport options remain available through native story args. `customUpload` is not forced: setting it to `false` restores native PrimeReact upload behavior. |
| `headerTemplate`, `itemTemplate`, `emptyTemplate`, `progressBarTemplate`, `children` | Forwarded unchanged. React nodes and function-valued templates are source-inspected and intentionally outside the JSON/text Controls. |
| `onBeforeUpload`, `onBeforeSend`, `onBeforeDrop`, `onBeforeSelect`, `onUpload`, `onError`, `onSelect`, `onProgress`, `onValidationFail`, `onRemove` | Passed through unchanged, including event objects and return behavior. These callbacks are source-inspected; the local browser check exercises selection, removal, and successful simulated upload. |
| `uploadHandler` | Adapted only while `customUpload` is enabled: the local handler updates observable status, clears the queue, then invokes the supplied callback with the original event. When `customUpload` is `false`, the supplied handler is passed through unchanged. |
| `onClear` | Adapted only to reset the local status, then invokes the supplied callback unchanged. |
| `pt`, `ptOptions`, `unstyled` | Forwarded with local accessibility defaults for upload/cancel/remove controls. User PT sections are retained and section objects are shallow-merged so unrelated entries do not remove those defaults; function-valued PT entries remain native and are source-inspected. Native sections include root, input, buttonbar, choose/upload/cancel/remove controls and icons, content, progress, message, file details, badge, actions, label, and hooks. |
| `ref`, `upload`, `clear`, `formatSize`, `onFileSelect`, `getElement`, `getInput`, `getFiles`, `setFiles`, `getUploadedFiles`, `setUploadedFiles` | Native imperative API remains available through the forwarded ref; the story only uses the ref to retain the component's native instance contract and does not replace its methods. |
| Value/selection model | Not applicable as a controlled prop. File selection and queue state are managed internally by PrimeReact; the story observes upload status without narrowing accepted `File` values. |

The API inventory is source inspection, not exhaustive behavioral testing of every
inherited DOM attribute, template, PT callback, transport option, or imperative method.
The focused browser assertion verifies local file selection, upload completion, no POST
request, responsive Summary/Default structure, and copyable source behavior.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: passed; generated output remained scoped to FileUpload and preserved the five manual components.
- `node --test tests/component-generator.test.mjs`: passed.
- `STORYBOOK_URL=http://127.0.0.1:4173 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='FileUpload' tests/component-review.test.mjs`: passed; Summary/Default structure, desktop/mobile rendering, local file selection, simulated completion, and no POST request.
- Playwright screenshot inspection at 390px: passed; upload controls wrap cleanly and status text remains readable without clipping.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk and plugin-timing warnings remain.
- `git diff --check`: passed.

## Dropdown review — issue #26

Inspected the Button documentation/story reference, the Dropdown generator entry and generated files, the Sakai UI Kit Dropdown uses in form layout, input, float-label, invalid-state, list, and table examples, and the installed PrimeReact `dropdown.d.ts` and implementation. The Summary now uses local stateful examples for filtering, filled/invalid, editable/clearable, and disabled states. Default keeps one controlled Dropdown instance and synchronizes its selected value through `useArgs`.

### API inventory

| Native surface | Treatment |
| --- | --- |
| `value`, `options`, `optionLabel`, `optionValue`, `optionDisabled`, `dataKey`, `optionGroupLabel`, `optionGroupChildren` | Forwarded unchanged. The curated example uses object options and `optionLabel`; the native value remains unrestricted (`any`) and primitive, object, null, and other supported modes are intentionally outside the curated Controls. |
| `onChange` | Wrapped only to synchronize `value` through `useArgs`/local Summary state, then invokes the supplied callback with the original event. |
| Filtering: `filter`, `filterBy`, `filterDelay`, `filterInputAutoFocus`, `filterLocale`, `filterMatchMode`, `filterPlaceholder`, `filterTemplate`, `showFilterClear`, `filterIcon`, `filterClearIcon`, `emptyFilterMessage` | Forwarded unchanged. `filter` is exposed as a Control and the Summary demonstrates filtering; custom filter templates, locales, icons, and messages remain native args outside the curated Controls. |
| Display and states: `placeholder`, `variant`, `invalid`, `disabled`, `editable`, `checkmark`, `highlightOnSelect`, `selectOnFocus`, `focusOnHover`, `autoOptionFocus`, `showClear`, `showOnFocus`, `loading`, `loadingIcon`, `resetFilterOnHide`, `scrollHeight`, `required`, `maxLength` | Forwarded unchanged. The Default exposes the documented variant/state subset; the remaining native options are intentionally outside the curated Controls. |
| Templates: `itemTemplate`, `optionGroupTemplate`, `valueTemplate`, `panelFooterTemplate`, `children` | Forwarded unchanged. The story does not replace supplied templates or children; they are source-inspected and outside the curated examples. |
| Overlay and icons: `appendTo`, `dropdownIcon`, `collapseIcon`, `clearIcon`, `panelClassName`, `panelStyle`, `transitionOptions`, `tooltip`, `tooltipOptions`, `virtualScrollerOptions` | Forwarded unchanged, preserving native element/function/object value modes and overlay configuration. |
| `onFocus`, `onBlur`, `onMouseDown`, `onContextMenu`, `onShow`, `onHide`, `onFilter` | Forwarded unchanged. The supplied callback contract is tested for the intercepted `onChange` path; the remaining callbacks are source-inspected and not independently exercised. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged. Native pass-through sections and user PT entries are not replaced by playground defaults. |
| Inherited `HTMLAttributes<HTMLDivElement>` | Forwarded by `{...args}`, including `id`, `className`, `style`, `tabIndex`, `aria-*`, `data-*`, and inherited DOM event attributes. |
| Imperative ref API | Native `focus`, `clear`, `show`, `hide`, `getElement`, `getOverlay`, and `getInput` methods remain available through the PrimeReact ref and are not adapted by the story. |

This inventory is based on source inspection and is not exhaustive behavioral testing. The focused contract test verifies native props, object value handling, templates, pass-through objects, inherited attributes, and preservation of the supplied `onChange` callback. The component browser test verifies option selection at desktop and mobile widths plus the shared Summary/Default, Controls, source-panel, and runtime checks. Filtering, editable input, templates, virtual scrolling, overlay targets, PT callback forms, imperative methods, and every inherited DOM event remain forwarded but are not exhaustively tested.

Validation for issue #26:
- `node scripts/generate-component-stories.mjs`: passed; output remained scoped to Dropdown and preserved the five manual components.
- `node --test tests/dropdown-contract.test.mjs tests/component-generator.test.mjs`: passed.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk and plugin-timing warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:6017 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='Dropdown' tests/component-review.test.mjs`: passed at 1280px and 390px; covers option selection, Summary/Default navigation, Controls placement, copyable source, responsive rendering, and runtime exceptions.
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

### Divider API audit — issue #25

Inspected Button, the installed PrimeReact `divider/divider.d.ts` and
`divider/divider.esm.js`, and the Sakai UI Kit miscellaneous source. The current upstream
miscellaneous page does not contain a Divider example; the curated examples therefore follow
PrimeReact's documented contract and the component's native visual modes.

| Native surface | Treatment |
| --- | --- |
| `layout` | Exposed as a radio Control for `horizontal` and `vertical`; forwarded unchanged. |
| `align` | Exposed as a select Control with the native union (`left`, `center`, `right`, `top`, `bottom`); forwarded unchanged. Horizontal alignment uses left/center/right and vertical alignment uses top/center/bottom as defined by PrimeReact. |
| `type` | Exposed as a radio Control for the native `solid`, `dashed`, and `dotted` modes; forwarded unchanged. Summary shows all three styles. |
| `children` | Exposed as a text Control for the common text-label composition; forwarded through the native props spread. Other React node values remain supported when supplied through native story args but are outside the curated text Control. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged and intentionally outside the curated Controls. Native PT sections are `root`, `content`, and `hooks`; user pass-through entries are not replaced by playground defaults. |
| `className`, `style`, `id`, `title`, `tabIndex`, `aria-*`, `data-*` and inherited HTML attributes/events | Forwarded unchanged by `{...args}` as part of PrimeReact's inherited `HTMLAttributes<HTMLDivElement>` contract. |
| `ref` / `getElement()` | Native ref and imperative element lookup remain available through the PrimeReact component; the story does not adapt them. |
| State, value modes, templates and component callbacks | Not applicable to Divider. It is presentation-only; there are no component events, value/selection models, or render templates beyond `children` and PT methods. |

The Default playground keeps one Divider instance and adapts only its surrounding layout so
vertical mode has a visible height. No native prop is dropped or narrowed by the playground.
Summary examples cover the documented solid/dashed/dotted styles, horizontal alignment, and
vertical alignment at desktop and mobile widths. These checks do not exhaustively exercise
arbitrary React children, inherited attributes, PT callback forms, unstyled rendering, or
imperative methods; those surfaces are source-inspected and forwarded.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: executed; generated output remained scoped to Divider and preserved the five manual components.
- `node --test tests/component-generator.test.mjs`: passed.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk and plugin-timing warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:4173 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='Divider' tests/component-review.test.mjs`: passed at 1280px and 390px. Covers Summary/Default indexing, no Summary Controls, copyable source, responsive rendering, and no runtime exceptions.
- Playwright screenshots inspected at 1280px and 390px: passed; styles, alignment examples, vertical composition, source blocks, and mobile wrapping are visible without clipping.
- `git diff --check`: passed.

### Slider API audit — issue #55

Inspected the Button documentation/story reference, the Slider generator entry and generated
files, the Sakai UI Kit input and table examples at `vendor/sakai-react/app/(main)/uikit`, and
the installed PrimeReact `slider/slider.d.ts` and implementation. This inventory records the
native contract reviewed for this issue; it is source inspection, not exhaustive interaction
testing.

| Native surface | Treatment |
| --- | --- |
| `value`, `min`, `max`, `step` | Exposed in Default Controls. Both native value modes are retained: a number for one handle and a two-number tuple for `range`; the wrapper only synchronizes the emitted value. |
| `orientation`, `range`, `disabled`, `ariaLabelledBy` | Exposed with all native orientation and boolean modes, and passed through unchanged. Summary covers range, vertical, and disabled compositions. |
| `onChange` | Adapted only to update the controlled Storybook value, then invokes the supplied callback with the original PrimeReact event. |
| `onSlideEnd` | Passed through unchanged; no wrapper callback replaces it. |
| `pt`, `ptOptions`, `unstyled` | Passed through unchanged and intentionally outside curated Controls. Native root, range, handle, and lifecycle-hook pass-through sections remain available; no wrapper PT defaults replace user entries. |
| `children`, `className`, `style`, `id`, `tabIndex`, `aria-*`, `data-*` and inherited `HTMLDivElement` attributes/events | Passed through unchanged by `{...args}`. The playground changes only its outer sizing container for vertical orientation; it does not alter Slider props. |
| Nested models, templates, selection modes, and imperative methods | Not applicable beyond the native numeric/tuple value mode and `children` slot. Slider has no item model or render-template API; its native `getElement()` remains available through a ref and is not adapted by the story. |

The focused contract test verifies representative numeric and tuple values, orientation/range
props, inherited attributes, PT configuration, `onSlideEnd`, and preservation of the supplied
`onChange` callback while synchronizing the value. The browser check verifies ArrowRight value
change and the shared Summary/Default, Controls, copyable-source, runtime, and responsive
rendering behavior. Mouse/touch dragging, Home/End/Page keys, every inherited DOM event, PT
callback/hook forms, refs, and every native prop combination remain source-inspected and are
not exhaustively tested.

Validation for this revision:
- `node scripts/generate-component-stories.mjs`: passed; generated output remained scoped to Slider.
- `node --test tests/slider-contract.test.mjs tests/component-generator.test.mjs`: passed, 3 tests.
- `npm run build`: passed.
- `npm run build-storybook`: passed; existing large-chunk and plugin-timing warnings remain.
- `STORYBOOK_URL=http://127.0.0.1:4173 LD_LIBRARY_PATH=/tmp/sakai-browser-libs/usr/lib/x86_64-linux-gnu node --test --test-name-pattern='Slider, Knob, Rating and ColorPicker' tests/component-review.test.mjs`: passed, 1 test against the static build.
- Playwright screenshots inspected at 1280px and 390px for Summary and Default; passed without component clipping. The initial browser run against the Vite landing build was invalid for Storybook and was not counted; the static Storybook rerun passed.
- `git diff --check`: passed.

### Knob API audit — issue #35

Inspected the Button documentation/story reference, the Knob generator entry and generated
files, the Sakai UI Kit input example at `vendor/sakai-react/app/(main)/uikit/input/page.tsx`,
and the installed PrimeReact `knob/knob.d.ts` and implementation. The Sakai example uses a
controlled value, a `-50` to `50` range, step `10`, a percentage value template, and the native
`onChange` callback. The curated Summary covers that percentage range, size/stroke, value
display, read-only, and disabled variations.

| Native surface | Treatment |
| --- | --- |
| `value`, `min`, `max`, `step` | Exposed as numeric Controls and forwarded unchanged. The numeric value model is retained; the playground adapts only `onChange` to synchronize the controlled value. |
| `size`, `strokeWidth`, `showValue`, `valueTemplate` | Exposed as Controls and forwarded unchanged. Summary demonstrates size/stroke and value-display/template variations. |
| `disabled`, `readOnly` | Exposed as boolean Controls and forwarded unchanged. Summary demonstrates both non-editable states. PrimeReact disables the slider role's tab stop for either state. |
| `name`, `valueColor`, `rangeColor`, `textColor`, `id`, `className`, `style`, `tabIndex` | Exposed where useful or forwarded unchanged through `{...args}`. Color strings, custom identifiers, styling, and keyboard tab order are not transformed. |
| `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLDivElement>` and DOM events | Forwarded unchanged through the native props spread. This includes accessible slider attributes, focus/keyboard/mouse/pointer/touch/drag/clipboard/animation/transition handlers, and other inherited attributes. |
| `onChange` | Wrapped only to call `updateArgs({ value: event.value })`, then invokes the supplied callback with the original event. No callback is dropped or synthesized. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged. Native PT sections are `root`, `svg`, `range`, `value`, `label`, and `hooks`; user entries are not replaced by wrapper defaults. |
| `children` | Forwarded unchanged as part of the native contract; Knob's rendered SVG remains controlled by PrimeReact. |
| Templates, nested models, selection modes, and value modes | No nested item model, selection mode, or render-template API exists. `valueTemplate` is a string token template; `value` is numeric only. |
| Ref and imperative API | The native ref and `getElement()` remain available through PrimeReact; the story does not adapt them. |

The inventory is source inspection, not exhaustive behavioral testing. The focused contract test
verifies representative native props, PT configuration, inherited callbacks, original-event
callback forwarding, and value synchronization. The existing browser test verifies keyboard
ArrowRight value change. Mouse/touch dragging, Home/End/PageUp/PageDown, every inherited DOM
event, PT callback/hook forms, imperative methods, and all visual color combinations remain
forwarded but are not exhaustively tested.

### Menubar API audit — issue #39

Inspected the Button documentation/story reference, the Menubar generator entry and generated
files, the Sakai UI Kit Menubar example at `vendor/sakai-react/app/(main)/uikit/menu/page.tsx`,
and the installed PrimeReact `menubar.d.ts`, `menuitem.d.ts`, and implementation. The curated
Summary covers nested navigation, separators, disabled items, start/end content, and custom menu
icons. Default remains one Menubar instance with Controls for the model and presentation/accessibility
props. Command feedback is demo-only and preserves supplied item commands.

| Native surface | Treatment |
| --- | --- |
| `model` | Exposed as an object Control and forwarded with its `MenuItem[]` shape. The story recursively decorates leaf commands for observable feedback and preserves existing commands; nested `MenuItem[]` and `MenuItem[][]` models retain their grouping. |
| `MenuItem` fields: `id`, `label`, `icon`, `url`, `items`, `expanded`, `disabled`, `visible`, `target`, `separator`, `style`, `className`, `command`, `template`, `data` | Forwarded unchanged except for the demo command wrapper. The Summary demonstrates nested items, icons, separators, and disabled state; URLs, targets, templates, arbitrary data, and custom styles remain available through the model but are outside the curated examples. |
| `start`, `end` | Forwarded unchanged. Both React-node and function template forms remain native; the Summary demonstrates node content. |
| `menuIcon`, `submenuIcon` | Exposed as select Controls with documented string examples; PrimeReact's icon function/React-node value forms remain available programmatically. |
| `ariaLabel`, `ariaLabelledBy`, `className`, `style`, `unstyled` | Exposed or forwarded unchanged. |
| `pt`, `ptOptions` | Forwarded unchanged with no wrapper PT defaults. Native root/menu/menuitem/content/action/icon/label/submenu/submenuIcon/separator/button/popupIcon/start/end/hooks sections and their callback forms remain available. |
| `onFocus`, `onBlur`, inherited `HTMLAttributes<HTMLDivElement>` and DOM events | Forwarded through `{...args}` unchanged, including `id`, `role`, `data-*`, `aria-*`, keyboard, focus, pointer, mouse, touch, drag, clipboard, animation, transition, and capture handlers. |
| Ref and imperative API | Native ref methods `getElement()`, `getRootMenu()`, and `getMenuButton()` remain available; the story does not adapt or expose them as Controls. |
| Selection/value modes and nested component models | Menubar has no controlled selection/value API. Its nested model is the `MenuItem` structure above; no separate selection adapter is introduced. |

This inventory is source inspection, not exhaustive behavioral testing. The focused browser check
verifies nested leaf command feedback, Summary structure, copyable sources, and no Summary Controls.
The command helper's source preserves supplied command callbacks; PT callbacks, function templates,
URLs/navigation, mobile menu interaction, inherited events, imperative methods, and every MenuItem
value combination remain forwarded but are not exhaustively browser-tested.

### OrderList API audit — issue #43

Inspected the Button documentation/story reference, the OrderList generator entry and generated
files, the Sakai UI Kit list example at `vendor/sakai-react/app/(main)/uikit/list/page.tsx`, and
the installed PrimeReact `orderlist.d.ts` and implementation. The Sakai example uses a controlled
object collection, `dataKey`, a custom item template, responsive styling, and the native reorder
callback. The curated Summary covers the default list, filtering, drag-and-drop, and responsive
breakpoint compositions. Default remains one controlled OrderList instance.

| Native surface | Treatment |
| --- | --- |
| `value`, `dataKey`, `itemTemplate` | `value` is adapted only to synchronize the controlled story after reorder; `dataKey` is forwarded unchanged. The default template is used only when no native `itemTemplate` is supplied, so custom React-node/function templates remain supported. |
| `header`, `listStyle`, `breakpoint`, `dragdrop`, `filter`, `filterBy`, `filterMatchMode`, `filterPlaceholder`, `filterLocale` | Forwarded unchanged. Header, filtering, match modes, drag-and-drop, and responsive breakpoint are exposed through focused Controls or Summary examples; list styling, locale, and custom placeholder remain available through native args. |
| `autoOptionFocus`, `focusOnHover`, `tabIndex`, `ariaLabel`, `ariaLabelledBy` | Exposed or forwarded unchanged. Focus behavior is represented by Controls; listbox keyboard navigation and accessible naming remain native. |
| `moveUpIcon`, `moveTopIcon`, `moveDownIcon`, `moveBottomIcon`, `filterIcon` | Forwarded unchanged, including PrimeReact `IconType` string, node, and function forms. Icon customization is outside the curated Controls. |
| `filterTemplate` and filter callbacks | `filterTemplate` is forwarded unchanged, including its native `filter` and `reset` options. The installed `OrderListProps` declaration exposes no separate typed filter callback; filtering remains native/internal and the playground does not synthesize one. |
| `onChange` | Adapted only to call `updateArgs({ value: event.value })`, then invokes the supplied callback with the original PrimeReact reorder event. The Code panel and focused browser check verify the preserved callback path and selected-item reordering. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged. Native root, controls, button, container, header, list, item, droppoint, icon, filter input/icon/container, and lifecycle-hook pass-through sections retain their value/function forms; no wrapper PT defaults replace caller entries. |
| `children`, inherited `HTMLAttributes<HTMLDivElement>`, `id`, `className`, `style`, `title`, `data-*`, `aria-*`, and DOM events | Forwarded unchanged through the native props spread. These include focus, blur, keyboard, mouse, pointer, touch, drag, clipboard, animation, transition, and capture event handlers. |
| Nested models, selection/value modes, templates, and imperative API | The component has an object-array `value` model and an `itemTemplate`; it has no separate nested option model or alternate selection/value mode. The native `getElement()` ref method remains available and is outside Controls. |

This inventory is source inspection, not exhaustive behavioral testing. The focused browser check
verifies moving a selected item upward, filtering, Summary/Default structure, copyable sources,
Controls placement, responsive rendering, and no runtime exceptions. Custom item templates, drag
pointer sequences, filter templates/locales, icon function forms, PT callbacks, inherited DOM
events, keyboard multi-selection, and the imperative ref method remain forwarded but are not
exhaustively tested.

### Splitter API audit — issue #57

Inspected the Button documentation/story reference, the Splitter generator entry and generated
files, the Sakai UI Kit panel example at `vendor/sakai-react/app/(main)/uikit/panel/page.tsx`, and
the installed PrimeReact `splitter.d.ts` and implementation. The curated Summary covers panel
sizes/minimum sizes, vertical orientation, nested panels, and keyboard resize steps. Default
remains one native Splitter instance and preserves caller-supplied children when provided.

| Native surface | Treatment |
| --- | --- |
| `layout`, `gutterSize`, `step` | Exposed through focused Default Controls and passed through unchanged. Horizontal/vertical orientation, gutter width, and keyboard resize increments are documented or represented in the playground. |
| `children` and `SplitterPanel` (`size`, `minSize`, `children`) | Passed through unchanged. The playground supplies a two-panel fallback only when `args.children` is absent; nested Splitter compositions remain supported through native children. |
| `stateKey`, `stateStorage` | Passed through unchanged and intentionally outside the curated Controls. Stateful session/local persistence remains available through native args without adding persistent state to the default example. |
| `onResizeEnd` | Passed through unchanged. PrimeReact's native event contains `originalEvent` and the resulting numeric `sizes` array; the story does not replace or coerce it. Pointer resizing is covered by the component browser check. |
| `className`, `style`, `id`, `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLDivElement>`, and DOM events | Forwarded unchanged through `{...args}`. This includes focus, blur, keyboard, mouse, pointer, touch, drag, clipboard, animation, transition, and capture handlers. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged; no wrapper PT defaults replace caller values. Native root, gutter, gutter handler, panel root, and lifecycle pass-through sections remain available. `unstyled` is exposed as a focused visual Control. |
| Templates, selection/value modes, and imperative API | Not applicable to Splitter. It has no item/template or controlled selection/value model; the native `getElement()` ref method remains available but outside Controls. |

This inventory is source inspection, not exhaustive behavioral testing. The focused component
browser check verifies pointer resizing, Summary/Default structure, copyable sources, Controls
placement, and desktop/mobile rendering. Stateful persistence, keyboard and touch resize paths,
custom panel templates/children, every inherited DOM event, PT callback form, callback invocation,
and the imperative ref method remain forwarded or source-inspected but are not exhaustively tested.

### Steps API audit — issue #58

Inspected the Button documentation/story reference, the Steps generator entry and generated files,
the installed PrimeReact `steps.d.ts`, `menuitem.d.ts`, and implementation. The curated Summary
covers the default workflow, icon-bearing steps, a disabled step, and the read-only progress state.
Default remains one native Steps instance with Controls for the model, active index, read-only
state, class name, and style.

| Native surface | Treatment |
| --- | --- |
| `model`, `activeIndex`, `readOnly` | Exposed through focused Controls and forwarded unchanged. The model retains the native `MenuItem[]` shape and the playground adapts only selection to synchronize `activeIndex`. |
| `MenuItem` fields: `id`, `label`, `icon`, `url`, `items`, `expanded`, `disabled`, `visible`, `target`, `separator`, `style`, `className`, `command`, `template`, `data` | Forwarded unchanged inside `model`; icons and disabled state are curated in Summary. Nested menu fields, URLs/targets, commands, templates, arbitrary data, and custom item styling remain available programmatically but are outside the curated examples. |
| `onSelect` | Adapted and preserved. The wrapper calls `updateArgs({ activeIndex: event.index })`, then invokes the supplied callback with the exact original PrimeReact event. |
| `className`, `style`, `id`, `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLDivElement>`, and DOM events | Forwarded unchanged through `{...args}`. This includes focus, blur, keyboard, mouse, pointer, touch, drag, clipboard, animation, transition, and capture handlers. |
| `pt`, `ptOptions`, `unstyled` | Forwarded unchanged; no wrapper PT defaults replace caller values. Native root/menu/menuitem/action/step/label/icon pass-through sections and their callback forms remain available. |
| `children` and ref/imperative API | Forwarded as part of the native contract; `children` is not used by the curated examples. The native `getElement()` method remains outside Controls. |
| Templates, nested models, selection/value modes, and alternate value modes | Steps has a `MenuItem[]` model and per-item `template`, but no separate controlled selection/value mode or nested rendered component collection. Native template and command behavior remain available without a story adapter. |

This inventory is source inspection, not exhaustive behavioral testing. The focused contract test
verifies representative model fields, inherited attributes, PT, `unstyled`, and the original
supplied callback path. The component browser check verifies selection retention, Summary/Default
structure, copyable sources, Controls placement, and desktop/mobile rendering. Keyboard navigation,
URL navigation, item commands/templates, PT callbacks, every inherited DOM event, ref methods, and
all MenuItem combinations remain forwarded but are not exhaustively tested.

### ToggleButton API audit — issue #64

Inspected the Button documentation/story reference, the ToggleButton generator entry and
generated files, the Sakai UI Kit ToggleButton usages at
`vendor/sakai-react/app/(main)/uikit/input/page.tsx` and
`vendor/sakai-react/app/(main)/uikit/table/page.tsx`, and the installed PrimeReact
`togglebutton.d.ts` and implementation. The curated Summary covers labels, paired icons,
icon position, invalid state, and disabled state. Default remains one native ToggleButton
instance and synchronizes only the controlled `checked` value.

| Native surface | Treatment |
| --- | --- |
| `checked`, `onLabel`, `offLabel`, `onIcon`, `offIcon`, `iconPos`, `invalid`, `disabled`, `readonly`, `tooltip` | Exposed through focused Controls and forwarded unchanged. Icon Controls use the standard select options including the no-icon option; native icon node/function forms remain available through args. |
| `tooltipOptions`, `unstyled` | Forwarded unchanged and intentionally outside the focused Controls; tooltip configuration and the unstyled boundary remain available through native args. |
| `onChange` | Adapted only to call `updateArgs({ checked: event.value })`, then invokes the supplied callback with the original PrimeReact change event. Click and Space behavior are covered by the shared boolean-input browser check. |
| `onFocus`, `onBlur` | Forwarded unchanged through the native props spread. The wrapper does not replace these callbacks. |
| `children` | Forwarded unchanged. ToggleButton's native implementation renders labels/icons and does not use children in the curated examples; custom child values remain outside the visual playground. |
| `pt`, `ptOptions` | Forwarded unchanged. Native root, input, box, icon, label, tooltip, and lifecycle pass-through sections retain their object/function forms; no wrapper defaults replace caller values. |
| `className`, `style`, `id`, `name`, `tabIndex`, `autoFocus`, `aria-*`, `data-*`, inherited `HTMLAttributes<HTMLDivElement>`, and DOM events | Forwarded unchanged through `{...args}`. This includes focus, blur, keyboard, mouse, pointer, touch, clipboard, animation, transition, and capture handlers. The default accessible label is an ordinary default arg and can be replaced by the caller. |
| `inputId` implementation hook and imperative `focus()`/`getElement()` API | Source-inspected native behavior; `inputId` is used by the installed implementation but is not declared in the installed `ToggleButtonProps`. The ref methods are outside Controls and remain available on the native component. |
| Nested models, selection/value modes, templates, and alternate value modes | Not applicable. ToggleButton has one boolean value, no item model, no collection/template API, and no alternate selection mode. |

This inventory is source inspection, not exhaustive behavioral testing. The focused ToggleButton
browser check verifies the Summary/Default structure, no Summary Controls, copyable sources,
single-instance Default rendering, icon-position and invalid Controls, and desktop rendering.
The shared boolean-input check verifies click, Space, and disabled behavior. Mobile rendering,
custom icon node/function forms, tooltip options, PT callbacks, inherited DOM events, supplied
focus/change callbacks, `inputId`, unstyled mode, and ref methods remain forwarded or
source-inspected but are not exhaustively tested.
