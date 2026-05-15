# Component Review TODO

Review every component story set and align it with the Button documentation pattern.

## Review Standard

- Use `Button` as the reference-quality template for component documentation and story structure.
- Each component should have only:
  - `Summary`: the MDX overview page.
  - `Default`: the interactive story/playground.
- Do not create one story per visual state, variation, or Sakai example.
- Use `Summary` to show curated static examples of important variations such as severities, sizes, icons, states, and common styles.
- Do not render Storybook Controls in `Summary`; controls are allowed only on the `Default` story page.
- Keep `Default` focused on a single component instance that users can explore through Controls and editable attributes.
- Keep user-facing documentation text in English.
- Keep each component under `Components/<Component>`.
- Preserve Storybook `Show code` behavior by keeping docs Canvas `sourceState="hidden"`.
- Merge related Sakai variations into the closest base component instead of creating duplicate component pages.

## Components

- [x] Accordion
- [x] AutoComplete
- [ ] Avatar
- [ ] AvatarGroup
- [ ] Badge
- [ ] BreadCrumb
- [x] Button
- [ ] Calendar
- [ ] Card
- [ ] Carousel
- [ ] Chart
- [ ] Checkbox
- [ ] Chip
- [ ] Chips
- [ ] ColorPicker
- [ ] ConfirmPopup
- [ ] ContextMenu
- [ ] DataTable
- [ ] DataView
- [ ] Dialog
- [ ] Divider
- [ ] Dropdown
- [ ] Fieldset
- [ ] FileUpload
- [ ] Galleria
- [ ] Image
- [ ] InputMask
- [ ] InputNumber
- [ ] InputSwitch
- [ ] InputText
- [ ] InputTextarea
- [ ] Knob
- [ ] ListBox
- [ ] MegaMenu
- [ ] Menu
- [ ] Menubar
- [ ] Message
- [ ] Messages
- [ ] MultiSelect
- [ ] OrderList
- [x] OverlayPanel
- [x] Panel
- [ ] PanelMenu
- [ ] Password
- [ ] PickList
- [ ] ProgressBar
- [ ] RadioButton
- [ ] Rating
- [ ] ScrollPanel
- [ ] ScrollTop
- [ ] SelectButton
- [ ] Sidebar
- [ ] Skeleton
- [ ] Slider
- [ ] SplitButton
- [ ] Splitter
- [ ] Steps
- [ ] TabMenu
- [ ] TabView
- [ ] Tag
- [ ] TieredMenu
- [ ] Toast
- [ ] ToggleButton
- [ ] Toolbar
- [ ] Tooltip
- [ ] Tree
- [ ] TreeTable
