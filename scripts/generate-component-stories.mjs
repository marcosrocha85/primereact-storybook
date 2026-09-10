import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'src/stories/components');

const commonArgTypes = `{
    className: { control: 'text' },
    disabled: { control: 'boolean' }
  }`;

const components = [
  {
    name: 'SplitButton',
    prime: 'splitbutton',
    importName: 'SplitButton',
    hooks: `const [action, setAction] = useState('No action yet');`,
    description: 'Split action button with a primary action and an options menu.',
    args: `{ label: 'Save', icon: 'pi pi-check', severity: 'secondary' }`,
    argTypes: `{
    label: { control: 'text' },
    icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] },
    severity: { control: 'select', options: [undefined, 'secondary', 'success', 'info', 'warning', 'help', 'danger'] },
    disabled: { control: 'boolean' }
  }`,
    renderPrefix: `const splitItems = [
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { label: 'Home', icon: 'pi pi-home' }
];`,
    playground: `<><SplitButton {...args} onClick={(event) => { setAction('Save selected'); args.onClick?.(event); }} model={splitItems.map((item) => ({ ...item, command: () => setAction(item.label + ' selected') }))} /><p role="status">{action}</p></>`,
  },
  {
    name: 'InputText',
    prime: 'inputtext',
    importName: 'InputText',
    description: 'Base text field used in forms, filters, and search inputs, with validation and variant states.',
    args: `{ value: '', placeholder: 'Search', disabled: false, invalid: false, readOnly: false, variant: undefined, validateOnly: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] },
    validateOnly: { control: 'boolean' }
  }`,
    docsImports: `import { InputText } from 'primereact/inputtext';`,
    docsVariations: [
      {
        title: 'States',
        code: `<InputText placeholder="Default" />
<InputText placeholder="Disabled" disabled />
<InputText placeholder="Read-only" value="Read-only value" readOnly />
<InputText placeholder="Invalid" invalid />`
      },
      {
        title: 'Variants',
        code: `<InputText placeholder="Outlined" variant="outlined" />
<InputText placeholder="Filled" variant="filled" />`
      },
      {
        title: 'Form composition',
        code: `<div className="flex flex-column gap-2">
  <label htmlFor="email">Email</label>
  <InputText id="email" type="email" placeholder="you@example.com" />
</div>`
      },
      {
        title: 'Icons',
        code: `<span className="p-input-icon-left">
  <i className="pi pi-user" />
  <InputText placeholder="Username" />
</span>
<span className="p-input-icon-right">
  <InputText placeholder="Search" />
  <i className="pi pi-search" />
</span>`
      },
      {
        title: 'Float label',
        code: `<span className="p-float-label">
  <InputText id="username" />
  <label htmlFor="username">Username</label>
</span>`
      }
    ],
    playground: `<InputText {...args} value={args.value ?? ''} onChange={(event) => { updateArgs({ value: event.target.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'InputTextarea',
    prime: 'inputtextarea',
    importName: 'InputTextarea',
    description: 'Multi-line text field for messages, descriptions, and longer form input, with validation and resize states.',
    args: `{ value: '', placeholder: 'Your Message', rows: 5, cols: 30, autoResize: false, disabled: false, invalid: false, readOnly: false, variant: undefined }`,
    argTypes: `{
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    autoResize: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] }
  }`,
    docsImports: `import { InputTextarea } from 'primereact/inputtextarea';`,
    docsVariations: [
      {
        title: 'States',
        code: `<InputTextarea placeholder="Default" rows={4} />
<InputTextarea placeholder="Disabled" rows={4} disabled />
<InputTextarea value="Read-only value" rows={4} readOnly />
<InputTextarea placeholder="Invalid" rows={4} invalid />`
      },
      {
        title: 'Variants',
        code: `<InputTextarea placeholder="Outlined" rows={4} variant="outlined" />
<InputTextarea placeholder="Filled" rows={4} variant="filled" />`
      },
      {
        title: 'Auto resize',
        code: `<InputTextarea
  value="This textarea grows as its content changes."
  autoResize
  rows={2}
/>`
      },
      {
        title: 'Form composition',
        code: `<div className="flex flex-column gap-2">
  <label htmlFor="description">Description</label>
  <InputTextarea id="description" rows={4} placeholder="Describe the request" />
</div>`
      }
    ],
    playground: `<InputTextarea {...args} value={args.value ?? ''} onChange={(event) => { updateArgs({ value: event.target.value }); args.onChange?.(event); } } />`,
  },

  {
    name: 'Calendar',
    prime: 'calendar',
    importName: 'Calendar',
    extraImports: `import type { CalendarProps } from 'primereact/calendar';`,
    description: 'Single date picker used in Sakai forms, with a popup, Today/Clear actions, floating labels, and validation states.',
    exampleType: `Omit<CalendarProps, 'value'> & {
  value: number | null;
  label: string;
  floatLabel: boolean;
}`,
    args: `{ value: null, label: 'Date', floatLabel: false, placeholder: 'Select date', dateFormat: 'mm/dd/yy', showIcon: true, showButtonBar: true, invalid: false, disabled: false, className: 'w-full' }`,
    argTypes: `{
    value: { control: 'date', description: 'Selected date. Controls store a timestamp; the example converts it to a Date for Calendar.' },
    label: { control: 'text' },
    floatLabel: { control: 'boolean' },
    placeholder: { control: 'text', if: { arg: 'floatLabel', truthy: false } },
    dateFormat: { control: 'select', options: ['mm/dd/yy', 'dd/mm/yy', 'yy-mm-dd'] },
    showIcon: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    hooks: `const { value, label, floatLabel, inputId, ...calendarProps } = args;
  const generatedId = useId();
  const id = inputId ?? generatedId;
  const date = value == null ? null : new Date(value);
  const selectedDate = date && !Number.isNaN(date.getTime()) ? date : null;`,
    playground: `<div style={{ width: '20rem', maxWidth: '100%' }}>
    <div className={floatLabel ? 'p-float-label' : 'flex flex-column gap-2'}>
      {!floatLabel && <label htmlFor={id}>{label}</label>}
      <Calendar
        pt={{ input: { root: { 'aria-invalid': calendarProps.invalid } } }}
        {...calendarProps}
        inputId={id}
        value={selectedDate}
        placeholder={floatLabel ? undefined : calendarProps.placeholder}
        onChange={(event) => {
          updateArgs({ value: event.value?.getTime() ?? null });
          calendarProps.onChange?.(event);
        }}
      />
      {floatLabel && <label htmlFor={id}>{label}</label>}
    </div>
  </div>`,
    docsVariations: [
      {
        title: 'Floating label',
        code: `<Example initialArgs={{ floatLabel: true, showIcon: false, showButtonBar: false }} />`,
        source: `exampleSource + '\\n// Render a floating label:\\n<Example initialArgs={{ floatLabel: true, showIcon: false, showButtonBar: false }} />'`
      },
      {
        title: 'Invalid state',
        code: `<Example initialArgs={{ invalid: true }} />`,
        source: `exampleSource + '\\n// Render validation styling:\\n<Example initialArgs={{ invalid: true }} />'`
      },
      {
        title: 'Disabled',
        code: `<Example initialArgs={{ disabled: true }} />`,
        source: `exampleSource + '\\n// Render a disabled field:\\n<Example initialArgs={{ disabled: true }} />'`
      }
    ],
  },
  {
    name: 'Checkbox',
    prime: 'checkbox',
    importName: 'Checkbox',
    description: 'Labeled checkbox for a boolean choice or an option in an application-managed selection.',
    exampleType: "ComponentProps<typeof Checkbox> & { label?: string }",
    args: `{ checked: true, label: 'Chicago', disabled: false, readOnly: false, invalid: false, variant: 'outlined', icon: undefined }`,
    argTypes: `{
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
    icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }
  }`,
    hooks: `const generatedId = useId();
  const { label, ...checkboxProps } = args;
  const inputId = args.inputId ?? generatedId;`,
    playground: `<div className="flex align-items-center gap-2">
    <Checkbox aria-label={label ? undefined : 'Checkbox'} {...checkboxProps} inputId={inputId}
      onChange={(event) => { updateArgs({ checked: event.checked }); args.onChange?.(event); }} />
    {label && <label htmlFor={inputId}>{label}</label>}
  </div>`,
    docsVariations: [
      ...[
        ['Unchecked', '{ checked: false }'],
        ['Disabled', '{ disabled: true }'],
        ['Read only', '{ readOnly: true }'],
        ['Invalid', '{ invalid: true, checked: false }'],
        ['Filled', "{ variant: 'filled', checked: false }"],
        ['Custom icon', "{ icon: 'pi pi-star-fill' }"]
      ].map(([title, args]) => ({
        title,
        code: `<Example initialArgs={${args}} />`,
        source: 'exampleSource + ' + JSON.stringify('\n// Render this variation:\n<Example initialArgs={' + args + '} />')
      }))
    ],
  },
  {
    name: 'Chips',
    prime: 'chips',
    importName: 'Chips',
    description: 'Multi-value input rendered as chips.',
    args: `{ value: [], placeholder: 'Add item', separator: ',' }`,
    argTypes: `{
    placeholder: { control: 'text' },
    separator: { control: 'text' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: {
      control: 'inline-radio',
      options: [undefined, 'outlined', 'filled']
    },
    removable: { control: 'boolean' },
    allowDuplicate: { control: 'boolean' },
    addOnBlur: { control: 'boolean' },
    max: { control: 'number' }
  }`,
    docsVariations: [
      ...[
        ['Disabled', '{ disabled: true }'],
        ['Read only', "{ value: ['Chicago', 'New York'], readOnly: true }"],
        ['Invalid', "{ value: ['Invalid'], invalid: true }"],
        ['Filled', "{ value: ['Piano', 'Keyboard'], variant: 'filled' }"]
      ].map(([title, args]) => ({
        title,
        code: `<Example initialArgs={${args}} />`,
        source: 'exampleSource + ' + JSON.stringify('\n// Render this variation:\n<Example initialArgs={' + args + '} />')
      }))
    ],
    playground: `<Chips {...args} onChange={(event) => { updateArgs({ value: event.value ?? [] }); args.onChange?.(event); } } />`,
  },
  {
    name: 'ColorPicker',
    prime: 'colorpicker',
    importName: 'ColorPicker',
    description: 'Color input used in Sakai forms, with hex, RGB, HSB, inline, disabled, and overlay variations.',
    args: `{ value: '1976D2', format: 'hex', inline: false, defaultColor: 'ff0000', disabled: false, style: { width: '2rem' } }`,
    argTypes: `{
    value: { control: 'object', description: 'Hex string or RGB/HSB object, matching the native ColorPicker value modes.' },
    format: { control: 'inline-radio', options: ['hex', 'rgb', 'hsb'] },
    inline: { control: 'boolean' },
    defaultColor: { control: 'text' },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    inputId: { control: 'text' },
    inputClassName: { control: 'text' },
    panelClassName: { control: 'text' },
    style: { control: 'object' }
  }`,
    playground: `<ColorPicker {...args} onChange={(event) => { updateArgs({ value: event.value ?? undefined }); args.onChange?.(event); } } />`,
    docsVariations: [
      { title: 'Inline', code: `<Example initialArgs={{ inline: true, style: undefined }} />` },
      { title: 'RGB value', code: `<Example initialArgs={{ value: { r: 25, g: 118, b: 210 }, format: 'rgb' }} />` },
      { title: 'HSB value', code: `<Example initialArgs={{ value: { h: 210, s: 88, b: 82 }, format: 'hsb' }} />` },
      { title: 'Disabled', code: `<Example initialArgs={{ disabled: true }} />` }
    ],
  },
  {
    name: 'Dropdown',
    prime: 'dropdown',
    importName: 'Dropdown',
    extraImports: `import type { DropdownProps } from 'primereact/dropdown';`,
    exampleType: 'DropdownProps',
    description: 'Select one option from a collection, with filtering, validation, editable input, and clearable states.',
    renderPrefix: `const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];`,
    args: `{ value: null, placeholder: 'Select a city', optionLabel: 'name', options: cityOptions, filter: false, disabled: false, invalid: false, variant: 'outlined', showClear: false, editable: false, checkmark: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    filter: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
    showClear: { control: 'boolean' },
    editable: { control: 'boolean' },
    checkmark: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<Dropdown {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
    docsVariations: [
      { title: 'Filterable options', code: `<Example initialArgs={{ filter: true, filterPlaceholder: 'Search cities' }} />` },
      { title: 'Filled and invalid states', code: `<div className="flex flex-column gap-3" style={{ maxWidth: '20rem' }}>
  <Example initialArgs={{ variant: 'filled' }} />
  <Example initialArgs={{ invalid: true }} />
</div>` },
      { title: 'Editable and clearable', code: `<Example initialArgs={{ value: { name: 'Rome', code: 'RM' }, editable: true, showClear: true, placeholder: 'Type or select a city' }} />` },
      { title: 'Disabled', code: `<Example initialArgs={{ disabled: true }} />` }
    ],
  },
  {
    name: 'InputMask',
    prime: 'inputmask',
    importName: 'InputMask',
    extraImports: `import type { InputMaskProps } from 'primereact/inputmask';`,
    description: 'Masked text field for dates, phone numbers, identifiers, and other structured input.',
    exampleType: `InputMaskProps & {
  label?: string;
  floatLabel?: boolean;
}`,
    args: `{ value: '', mask: '99/99/9999', placeholder: 'MM/DD/YYYY', label: 'Date', floatLabel: false, slotChar: '_', autoClear: true, unmask: false, invalid: false, disabled: false, readOnly: false }`,
    argTypes: `{
    label: { control: 'text' },
    floatLabel: { control: 'boolean' },
    mask: { control: 'text' },
    placeholder: { control: 'text' },
    slotChar: { control: 'text' },
    autoClear: { control: 'boolean' },
    unmask: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] }
  }`,
    hooks: `const generatedId = useId();
  const { label, floatLabel, ...inputMaskProps } = args;
  const inputId = inputMaskProps.id ?? generatedId;`,
    playground: `<div style={{ width: '20rem', maxWidth: '100%' }}>
    <div className={floatLabel ? 'p-float-label' : 'flex flex-column gap-2'}>
      {!floatLabel && label && <label htmlFor={inputId}>{label}</label>}
      <InputMask {...inputMaskProps} id={inputId} value={inputMaskProps.value ?? ''}
        onChange={(event) => { updateArgs({ value: event.value ?? '' }); inputMaskProps.onChange?.(event); }} />
      {floatLabel && label && <label htmlFor={inputId}>{label}</label>}
    </div>
  </div>`,
    docsVariations: [
      { title: 'Date mask', code: `<Example initialArgs={{ mask: '99/99/9999', placeholder: 'MM/DD/YYYY' }} />` },
      { title: 'Phone mask', code: `<Example initialArgs={{ mask: '(999) 999-9999', placeholder: '(555) 555-5555' }} />` },
      { title: 'Unmasked value', code: `<Example initialArgs={{ mask: '99/99/9999', unmask: true }} />` },
      { title: 'Floating label', code: `<Example initialArgs={{ floatLabel: true, placeholder: undefined }} />` },
      { title: 'Invalid and read-only states', code: `<div className="flex flex-column gap-3">
  <Example initialArgs={{ invalid: true }} />
  <Example initialArgs={{ readOnly: true, value: '09/06/2026' }} />
</div>` },
      { title: 'Disabled', code: `<Example initialArgs={{ disabled: true }} />` }
    ],
  },
  {
    name: 'InputNumber',
    prime: 'inputnumber',
    importName: 'InputNumber',
    description: 'Numeric input with decimal and currency formatting, optional spinner buttons, and validation states.',
    args: `{ value: null, placeholder: 'Number', mode: 'decimal', currency: 'USD', showButtons: true, buttonLayout: 'stacked', format: true, useGrouping: true, step: 1, min: undefined, max: undefined, invalid: false, disabled: false, readOnly: false, variant: undefined }`,
    argTypes: `{
    value: { control: 'number' },
    placeholder: { control: 'text' },
    format: { control: 'boolean' },
    showButtons: { control: 'boolean' },
    buttonLayout: { control: 'select', options: ['stacked', 'horizontal', 'vertical'] },
    mode: { control: 'select', options: ['decimal', 'currency'] },
    currency: { control: 'text' },
    currencyDisplay: { control: 'select', options: ['symbol', 'code', 'name'] },
    locale: { control: 'text' },
    useGrouping: { control: 'boolean' },
    minFractionDigits: { control: 'number' },
    maxFractionDigits: { control: 'number' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    step: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] }
  }`,
    playground: `<div style={{ width: '20rem', maxWidth: '100%' }}><InputNumber {...args} onValueChange={(event) => { updateArgs({ value: event.value }); args.onValueChange?.(event); }} /></div>`,
    docsVariations: [
      { title: 'Decimal input', code: `<Example initialArgs={{ mode: 'decimal', value: 123456.789 }} />` },
      { title: 'Currency input', code: `<Example initialArgs={{ mode: 'currency', currency: 'USD', value: 1250.5 }} />` },
      { title: 'Spinner layouts', code: `<div className="flex flex-wrap align-items-center gap-3">
  <Example initialArgs={{ showButtons: true, buttonLayout: 'stacked' }} />
  <Example initialArgs={{ showButtons: true, buttonLayout: 'horizontal' }} />
</div>` },
      { title: 'Prefix and suffix', code: `<div className="flex flex-wrap align-items-center gap-3">
  <Example initialArgs={{ prefix: '$ ', minFractionDigits: 2, maxFractionDigits: 2 }} />
  <Example initialArgs={{ suffix: ' kg', showButtons: false }} />
</div>` },
      { title: 'Invalid and read-only states', code: `<div className="flex flex-column gap-3">
  <Example initialArgs={{ invalid: true }} />
  <Example initialArgs={{ readOnly: true, value: 42 }} />
</div>` },
      { title: 'Disabled', code: `<Example initialArgs={{ disabled: true }} />` }
    ],
  },
  {
    name: 'InputSwitch',
    prime: 'inputswitch',
    importName: 'InputSwitch',
    description: 'Boolean toggle switch.',
    args: `{ checked: true, disabled: false, invalid: false }`,
    argTypes: `{ checked: { control: 'boolean' }, disabled: { control: 'boolean' }, invalid: { control: 'boolean' } }`,
    hooks: `const { onChange, ...inputSwitchArgs } = args;
  const ariaLabel = inputSwitchArgs['aria-label'] ?? 'InputSwitch';
`,
    playground: `<InputSwitch {...inputSwitchArgs} aria-label={ariaLabel} onChange={(event) => { updateArgs({ checked: event.value }); onChange?.(event); }} />`,
    docsVariations: [
      { title: 'Unchecked', code: `<Example initialArgs={{ checked: false }} />` },
      { title: 'Invalid', code: `<Example initialArgs={{ invalid: true }} />` },
      { title: 'Disabled', code: `<Example initialArgs={{ disabled: true }} />` }
    ],
  },
  {
    name: 'Knob',
    prime: 'knob',
    importName: 'Knob',
    description: 'Circular numeric control for bounded values, keyboard input, and read-only or disabled states.',
    args: `{ value: 20, min: 0, max: 100, step: 1, size: 100, disabled: false, readOnly: false, showValue: true, strokeWidth: 14, valueTemplate: '{value}' }`,
    argTypes: `{
    value: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    size: { control: 'number' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    showValue: { control: 'boolean' },
    strokeWidth: { control: 'number' },
    valueTemplate: { control: 'text' },
    name: { control: 'text' },
    tabIndex: { control: 'number' },
    valueColor: { control: 'text' },
    rangeColor: { control: 'text' },
    textColor: { control: 'text' }
  }`,
    playground: `<Knob {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
    docsVariations: [
      { title: 'Percentage range', code: `<Example initialArgs={{ value: 20, min: -50, max: 50, step: 10, valueTemplate: '{value}%' }} />` },
      { title: 'Size and stroke', code: `<div className="flex flex-wrap align-items-center gap-3">
  <Example initialArgs={{ size: 80, strokeWidth: 8 }} />
  <Example initialArgs={{ size: 120, strokeWidth: 18 }} />
</div>` },
      { title: 'Value display', code: `<div className="flex flex-wrap align-items-center gap-3">
  <Example initialArgs={{ showValue: false }} />
  <Example initialArgs={{ valueTemplate: '{value}%' }} />
</div>` },
      { title: 'Read-only', code: `<Example initialArgs={{ value: 42, readOnly: true }} />` },
      { title: 'Disabled', code: `<Example initialArgs={{ disabled: true }} />` }
    ],
  },
  {
    name: 'ListBox',
    prime: 'listbox',
    importName: 'ListBox',
    extraImports: `import type { ListBoxProps } from 'primereact/listbox';`,
    exampleType: 'ListBoxProps',
    description: 'Select one or more values from a list, with filtering, validation, templates, and grouped options.',
    renderPrefix: `const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];`,
    args: `{ value: null, options: cityOptions, optionLabel: 'name', multiple: false, filter: false, invalid: false, disabled: false }`,
    argTypes: `{
    multiple: { control: 'boolean' },
    filter: { control: 'boolean' },
    filterPlaceholder: { control: 'text' },
    filterMatchMode: { control: 'inline-radio', options: ['contains', 'startsWith', 'endsWith', 'equals', 'notEquals'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    metaKeySelection: { control: 'boolean' },
    autoOptionFocus: { control: 'boolean' },
    selectOnFocus: { control: 'boolean' },
    focusOnHover: { control: 'boolean' }
  }`,
    playground: `<ListBox {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
    docsVariations: [
      { title: 'Filterable options', code: `<Example initialArgs={{ filter: true, filterPlaceholder: 'Search cities' }} />` },
      { title: 'Multiple selection', code: `<Example initialArgs={{ multiple: true, value: [] }} />` },
      { title: 'Invalid and disabled states', code: `<div className="flex flex-column gap-3" style={{ maxWidth: '20rem' }}>
  <Example initialArgs={{ invalid: true }} />
  <Example initialArgs={{ disabled: true }} />
</div>` },
      { title: 'Filter matching', code: `<Example initialArgs={{ filter: true, filterMatchMode: 'startsWith' }} />` }
    ],
  },
  {
    name: 'MultiSelect',
    prime: 'multiselect',
    importName: 'MultiSelect',
    description: 'Select multiple options from a collection, with filtering, chips, validation, and disabled states.',
    renderPrefix: `const countryOptions = [{ name: 'Australia', code: 'AU' }, { name: 'Brazil', code: 'BR' }, { name: 'Germany', code: 'DE' }];`,
    args: `{ value: [], placeholder: 'Select countries', options: countryOptions, optionLabel: 'name', display: 'chip', filter: false, invalid: false, disabled: false, variant: 'outlined', showClear: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    display: { control: 'inline-radio', options: ['comma', 'chip'] },
    filter: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
    showClear: { control: 'boolean' },
    maxSelectedLabels: { control: 'number' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<MultiSelect {...args} onChange={(event) => { updateArgs({ value: event.value ?? [] }); args.onChange?.(event); } } />`,
    docsVariations: [
      { title: 'Filterable options', code: `<Example initialArgs={{ filter: true, filterPlaceholder: 'Search countries' }} />` },
      { title: 'Filled and invalid states', code: `<div className="flex flex-column gap-3" style={{ maxWidth: '20rem' }}>
  <Example initialArgs={{ variant: 'filled', value: [{ name: 'Australia', code: 'AU' }] }} />
  <Example initialArgs={{ invalid: true }} />
</div>` },
      { title: 'Clearable selection', code: `<Example initialArgs={{ showClear: true, value: [{ name: 'Brazil', code: 'BR' }] }} />` },
      { title: 'Disabled', code: `<Example initialArgs={{ disabled: true, value: [{ name: 'Germany', code: 'DE' }] }} />` }
    ],
  },
  {
    name: 'Password',
    prime: 'password',
    importName: 'Password',
    description: 'Password input with feedback.',
    args: `{ value: '', placeholder: 'Password', feedback: true, toggleMask: true }`,
    argTypes: `{ placeholder: { control: 'text' }, feedback: { control: 'boolean' }, toggleMask: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<Password {...args} value={args.value ?? ''} onChange={(event) => { updateArgs({ value: event.target.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'RadioButton',
    prime: 'radiobutton',
    importName: 'RadioButton',
    description: 'Single option within a group.',
    args: `{ checked: false, value: 'Option 1' }`,
    argTypes: `{ checked: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<RadioButton {...args} aria-label="RadioButton" onChange={(event) => { updateArgs({ checked: event.checked ?? false }); args.onChange?.(event); } } />`,
  },
  {
    name: 'Rating',
    prime: 'rating',
    importName: 'Rating',
    description: 'Star rating control.',
    args: `{ value: 3, stars: 5, cancel: false }`,
    argTypes: `{ value: { control: 'number' }, stars: { control: 'number' }, cancel: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<Rating {...args} onChange={(event) => { updateArgs({ value: event.value ?? undefined }); args.onChange?.(event); } } />`,
  },
  {
    name: 'SelectButton',
    prime: 'selectbutton',
    importName: 'SelectButton',
    description: 'Button-based selection control.',
    renderPrefix: `const selectOptions = [{ name: 'Option 1', code: 'O1' }, { name: 'Option 2', code: 'O2' }, { name: 'Option 3', code: 'O3' }];`,
    args: `{ value: null, options: selectOptions, optionLabel: 'name', multiple: false }`,
    argTypes: `{ multiple: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<SelectButton {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'Slider',
    prime: 'slider',
    importName: 'Slider',
    description: 'Range value control.',
    args: `{ value: 50, min: 0, max: 100, step: 1 }`,
    argTypes: `{ value: { control: 'number' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, disabled: { control: 'boolean' } }`,
    playground: `<div style={{ width: '18rem', maxWidth: '100%' }}><Slider {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } /></div>`,
  },
  {
    name: 'ToggleButton',
    prime: 'togglebutton',
    importName: 'ToggleButton',
    description: 'On/off toggle button.',
    args: `{ checked: true, onLabel: 'Yes', offLabel: 'No', onIcon: 'pi pi-check', offIcon: 'pi pi-times' }`,
    argTypes: `{ checked: { control: 'boolean' }, onLabel: { control: 'text' }, offLabel: { control: 'text' }, disabled: { control: 'boolean' } }`,
    playground: `<ToggleButton {...args} aria-label="ToggleButton" onChange={(event) => { updateArgs({ checked: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'DataTable',
    prime: 'datatable',
    importName: 'DataTable',
    extraImports: `import { Column } from 'primereact/column';`,
    docsImports: `import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { products } from "./DataTable.examples";`,
    description: 'Data table with sorting, filtering, pagination, and single-row selection.',
    renderPrefix: `export const products = [
  { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 },
  { id: '1002', name: 'Blue Band', category: 'Fitness', price: 79 },
  { id: '1003', name: 'Blue T-Shirt', category: 'Clothing', price: 29 }
];`,
    args: `{ value: products, dataKey: 'id', paginator: true, rows: 1, stripedRows: false, showGridlines: false, selectionMode: 'single', selection: null }`,
    argTypes: `{ paginator: { control: 'boolean' }, stripedRows: { control: 'boolean' }, showGridlines: { control: 'boolean' }, rows: { control: 'number' }, size: { control: 'inline-radio', options: [undefined, 'small', 'normal', 'large'] }, responsiveLayout: { control: 'inline-radio', options: ['scroll', 'stack'] } }`,
    docsVariations: [
      { title: 'Sorting and pagination', code: `<DataTable value={products} dataKey="id" paginator rows={2} sortField="price" sortOrder={-1}>
  <Column field="name" header="Name" sortable />
  <Column field="price" header="Price" sortable />
</DataTable>` },
      { title: 'Filtering', code: `<DataTable value={products} dataKey="id" filterDisplay="row">
  <Column field="name" header="Name" filter filterPlaceholder="Search by name" />
  <Column field="category" header="Category" filter filterPlaceholder="Search by category" />
</DataTable>` },
      { title: 'Selection and density', code: `<DataTable value={products} dataKey="id" selectionMode="single" size="small" stripedRows>
  <Column field="name" header="Name" />
  <Column field="category" header="Category" />
  <Column field="price" header="Price" />
</DataTable>` }
    ],
    playground: `<DataTable {...args} onSelectionChange={(event) => { updateArgs({ selection: event.value }); args.onSelectionChange?.(event); }}><Column field="name" header="Name" sortable filter /><Column field="category" header="Category" sortable /><Column field="price" header="Price" sortable /></DataTable>`,
  },
  {
    name: 'DataView',
    prime: 'dataview',
    importName: 'DataView',
    description: 'Collection view used by Sakai for paginated list and grid layouts.',
    renderPrefix: `export const products = [
  { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 },
  { id: '1002', name: 'Blue Band', category: 'Fitness', price: 79 },
  { id: '1003', name: 'Blue T-Shirt', category: 'Clothing', price: 29 }
];

function productTemplate(product: (typeof products)[number], layout?: string) {
  return <div className={layout === 'grid' ? 'col-12 md:col-4 p-3' : 'col-12 p-3'}>
    <div className="border-1 surface-border border-round p-3">
      <div className="font-medium">{product.name}</div>
      <div className="text-sm text-color-secondary">{product.category}</div>
      <div className="mt-2">\${product.price}</div>
    </div>
  </div>;
}`,
    args: `{ value: products, dataKey: 'id', layout: 'list', paginator: true, rows: 1 }`,
    argTypes: `{ layout: { control: 'inline-radio', options: ['list', 'grid'] }, paginator: { control: 'boolean' }, rows: { control: { type: 'number', min: 1, max: 4, step: 1 } } }`,
    playground: `<DataView {...args} itemTemplate={args.itemTemplate ?? productTemplate} />`,
    docsVariations: [
      { title: 'List layout', code: `<Example initialArgs={{ layout: 'list', paginator: true, rows: 1 }} />` },
      { title: 'Grid layout', code: `<Example initialArgs={{ layout: 'grid', paginator: false }} />` },
      { title: 'Pagination', code: `<Example initialArgs={{ layout: 'list', paginator: true, rows: 2 }} />` }
    ],
  },
  {
    name: 'PickList',
    prime: 'picklist',
    importName: 'PickList',
    description: 'Transfer items between lists.',
    renderPrefix: `const source = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];`,
    args: `{ dataKey: 'name', filterBy: 'name', source, target: [], sourceHeader: 'Available', targetHeader: 'Selected' }`,
    argTypes: `{ sourceHeader: { control: 'text' }, targetHeader: { control: 'text' }, filter: { control: 'boolean' } }`,
    playground: `<PickList {...args} itemTemplate={(item: { name: string }) => <span>{item.name}</span>} onChange={(event) => { updateArgs({ source: event.source, target: event.target }); args.onChange?.(event); }} />`,
  },
  {
    name: 'OrderList',
    prime: 'orderlist',
    importName: 'OrderList',
    description: 'Orderable list used by Sakai for reordering, filtering, and drag-and-drop collections.',
    renderPrefix: `type Product = { name: string; category: string };

const products: Product[] = [
  { name: 'Bamboo Watch', category: 'Accessories' },
  { name: 'Black Watch', category: 'Accessories' },
  { name: 'Blue Band', category: 'Fitness' },
  { name: 'Blue T-Shirt', category: 'Clothing' }
];

function productTemplate(product: Product) {
  return <div><div className="font-medium">{product.name}</div><div className="text-sm text-color-secondary">{product.category}</div></div>;
}`,
    args: `{ dataKey: 'name', filterBy: 'name', value: products, header: 'Products', filter: false, dragdrop: false, filterMatchMode: 'contains' }`,
    argTypes: `{
    header: { control: 'text' },
    filter: { control: 'boolean' },
    filterMatchMode: { control: 'select', options: ['contains', 'startsWith', 'endsWith', 'equals', 'notEquals'] },
    dragdrop: { control: 'boolean' },
    autoOptionFocus: { control: 'boolean' },
    focusOnHover: { control: 'boolean' }
  }`,
    playground: `<OrderList {...args} itemTemplate={args.itemTemplate ?? productTemplate} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); }} />`,
    docsVariations: [
      { title: 'Filtering', code: `<Example initialArgs={{ filter: true, filterPlaceholder: 'Search products' }} />` },
      { title: 'Drag and drop', code: `<Example initialArgs={{ dragdrop: true }} />` },
      { title: 'Responsive list', code: `<Example initialArgs={{ breakpoint: '640px', className: 'w-full' }} />` }
    ],
  },
  {
    name: 'Tree',
    prime: 'tree',
    importName: 'Tree',
    description: 'Expandable hierarchical structure.',
    renderPrefix: `const nodes = [{ key: '0', label: 'Documents', children: [{ key: '0-0', label: 'Work' }] }];`,
    args: `{ value: nodes, selectionMode: 'checkbox', selectionKeys: {}, expandedKeys: {} }`,
    argTypes: `{ filter: { control: 'boolean' }, expandedKeys: { control: 'object' }, selectionKeys: { control: 'object' } }`,
    playground: `<Tree {...args} onToggle={(event) => { updateArgs({ expandedKeys: event.value }); args.onToggle?.(event); }} onSelectionChange={(event) => { updateArgs({ selectionKeys: event.value }); args.onSelectionChange?.(event); }} />`,
  },
  {
    name: 'TreeTable',
    prime: 'treetable',
    importName: 'TreeTable',
    extraImports: `import { Column } from 'primereact/column';`,
    description: 'Hierarchical table.',
    renderPrefix: `const nodes = [{ key: '0', data: { name: 'Applications', size: '100kb', type: 'Folder' }, children: [{ key: '0-0', data: { name: 'React', size: '25kb', type: 'Folder' } }] }];`,
    args: `{ value: nodes, selectionMode: 'checkbox', selectionKeys: {}, expandedKeys: {} }`,
    argTypes: `{ showGridlines: { control: 'boolean' }, expandedKeys: { control: 'object' }, selectionKeys: { control: 'object' } }`,
    playground: `<TreeTable {...args} onToggle={(event) => { updateArgs({ expandedKeys: event.value }); args.onToggle?.(event); }} onSelectionChange={(event) => { updateArgs({ selectionKeys: typeof event.value === 'string' ? { [event.value]: true } : event.value }); args.onSelectionChange?.(event); }}><Column field="name" header="Name" expander /><Column field="size" header="Size" /><Column field="type" header="Type" /></TreeTable>`,
  },
  {
    name: 'Toolbar',
    prime: 'toolbar',
    importName: 'Toolbar',
    extraImports: `import { Button } from 'primereact/button';`,
    hooks: `const [action, setAction] = useState('No action yet');`,
    description: 'Action toolbar.',
    args: `{}`,
    argTypes: `{ className: { control: 'text' }, style: { control: 'object' } }`,
    playground: `<><Toolbar {...args} start={<Button label="New" icon="pi pi-plus" onClick={() => setAction('New selected')} />} end={<Button label="Save" icon="pi pi-check" onClick={() => setAction('Save selected')} />} /><p role="status">{action}</p></>`,
  },

  {
    name: 'TabView',
    prime: 'tabview',
    importName: 'TabView',
    extraImports: `import { TabPanel } from 'primereact/tabview';`,
    description: 'Tabbed navigation.',
    args: `{ activeIndex: 0 }`,
    argTypes: `{ activeIndex: { control: 'number' } }`,
    playground: `<TabView {...args} onTabChange={(event) => { updateArgs({ activeIndex: event.index }); args.onTabChange?.(event); } }><TabPanel header="Header I"><p>Content I</p></TabPanel><TabPanel header="Header II"><p>Content II</p></TabPanel></TabView>`,
  },

  {
    name: 'Fieldset',
    prime: 'fieldset',
    importName: 'Fieldset',
    description: 'Semantic grouping container with an optional legend and collapsible content.',
    exampleType: `ComponentProps<typeof Fieldset> & {
  contentText?: string;
}`,
    args: `{ legend: 'Legend', toggleable: true, collapsed: false, expandIcon: undefined, collapseIcon: undefined, contentText: 'Fieldset content.' }`,
    argTypes: `{ legend: { control: 'text' }, toggleable: { control: 'boolean' }, collapsed: { control: 'boolean', if: { arg: 'toggleable', truthy: true } }, expandIcon: { control: 'select', options: [undefined, 'pi pi-plus', 'pi pi-chevron-down', 'pi pi-angle-down', 'pi pi-caret-down'], if: { arg: 'toggleable', truthy: true } }, collapseIcon: { control: 'select', options: [undefined, 'pi pi-minus', 'pi pi-chevron-up', 'pi pi-angle-up', 'pi pi-caret-up'], if: { arg: 'toggleable', truthy: true } }, contentText: { control: 'text', description: 'Fallback content. Native children take precedence, including null.' } }`,
    hooks: `const { contentText, children, ...fieldsetProps } = args;`,
    playground: `<Fieldset {...fieldsetProps} onToggle={(event) => { updateArgs({ collapsed: event.value }); args.onToggle?.(event); }}>{children !== undefined ? children : <p className="m-0 line-height-3">{contentText}</p>}</Fieldset>`,
    docsVariations: [
      { title: 'Static fieldset', code: `<Example initialArgs={{ toggleable: false, legend: 'Account details' }} />`, source: 'exampleSource + ' + JSON.stringify("\n// Render a static fieldset:\n<Example initialArgs={{ toggleable: false, legend: 'Account details' }} />") },
      { title: 'Toggleable', code: `<Example initialArgs={{ toggleable: true, legend: 'Preferences' }} />`, source: 'exampleSource + ' + JSON.stringify("\n// Render a toggleable fieldset:\n<Example initialArgs={{ toggleable: true, legend: 'Preferences' }} />") },
      { title: 'Collapsed by default', code: `<Example initialArgs={{ toggleable: true, collapsed: true, legend: 'Advanced settings' }} />`, source: 'exampleSource + ' + JSON.stringify("\n// Render a collapsed fieldset:\n<Example initialArgs={{ toggleable: true, collapsed: true, legend: 'Advanced settings' }} />") },
      { title: 'Custom toggle icons', code: `<Example initialArgs={{ toggleable: true, expandIcon: 'pi pi-chevron-down', collapseIcon: 'pi pi-chevron-up', legend: 'Notifications' }} />`, source: 'exampleSource + ' + JSON.stringify("\n// Render custom toggle icons:\n<Example initialArgs={{ toggleable: true, expandIcon: 'pi pi-chevron-down', collapseIcon: 'pi pi-chevron-up', legend: 'Notifications' }} />") }
    ],
  },
  {
    name: 'Card',
    prime: 'card',
    importName: 'Card',
    description: 'Content container with optional title, subtitle, header, and footer. Text controls provide curated compositions; native React nodes and slot functions remain supported through props. Card has no selection, disabled, or severity state.',
    exampleType: `ComponentProps<typeof Card> & {
  contentText?: string;
  headerText?: string;
  footerText?: string;
}`,
    args: `{ title: 'Card', subTitle: 'Subtitle', contentText: 'Card content.', headerText: '', footerText: '', className: '', style: {} }`,
    argTypes: `{ title: { control: 'text' }, subTitle: { control: 'text' }, contentText: { control: 'text', description: 'Fallback body text. Native children take precedence, including null.' }, headerText: { control: 'text', description: 'Optional padded heading. Native header takes precedence.' }, footerText: { control: 'text', description: 'Optional footer text. Native footer takes precedence.' }, className: { control: 'text' }, style: { control: 'object' } }`,
    hooks: `const { contentText, headerText, footerText, children, header, footer, ...cardProps } = args;`,
    playground: `<div style={{ width: 'min(24rem, calc(100vw - 2rem))', maxWidth: '100%' }}>
    <Card {...cardProps}
      header={header !== undefined ? header : headerText ? <h5 className="m-0 p-3 pb-0">{headerText}</h5> : undefined}
      footer={footer !== undefined ? footer : footerText || undefined}
    >
      {children !== undefined ? children : contentText ? <p className="m-0 line-height-3">{contentText}</p> : undefined}
    </Card>
  </div>`,
    docsImports: `import { Card } from "primereact/card";`,
    docsVariations: [
      { title: 'Content only', code: `<Card style={{ width: '24rem', maxWidth: '100%' }}>
  <p className="m-0 line-height-3">A simple content container without a title or subtitle.</p>
</Card>` },
      { title: 'Custom header', code: `<Card header={<h5 className="m-0 p-3 pb-0">Card header</h5>} style={{ width: '24rem', maxWidth: '100%' }}>
  <p className="m-0 line-height-3">A padded heading follows the Sakai panel example. Application menu actions are outside this curated Card example.</p>
</Card>` },
      { title: 'Title, subtitle, and footer', code: `<Card title="Card" subTitle="Subtitle" footer="Additional information" style={{ width: '24rem', maxWidth: '100%' }}>
  <p className="m-0 line-height-3">Header and footer accept React nodes or functions receiving Card props. Children accept React nodes.</p>
</Card>` },
    ],
  },
  {
    name: 'Divider',
    prime: 'divider',
    importName: 'Divider',
    description: 'Visual separator for dividing content into related sections.',
    args: `{ layout: 'horizontal', align: 'center', type: 'solid', children: 'Divider' }`,
    argTypes: `{ children: { control: 'text' }, layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, align: { control: 'select', options: ['left', 'center', 'right', 'top', 'bottom'] }, type: { control: 'inline-radio', options: ['solid', 'dashed', 'dotted'] } }`,
    playground: `<div style={{ width: '24rem', maxWidth: '100%', height: args.layout === 'vertical' ? '8rem' : undefined, display: args.layout === 'vertical' ? 'flex' : 'block', alignItems: 'center' }}><span>Before</span><Divider {...args} /><span>After</span></div>`,
    docsVariations: [
      { title: 'Border styles', code: `<Divider type="solid">Solid</Divider>
<Divider type="dashed">Dashed</Divider>
<Divider type="dotted">Dotted</Divider>` },
      { title: 'Horizontal alignment', code: `<Example initialArgs={{ align: 'left', children: 'Left' }} />
<Example initialArgs={{ align: 'center', children: 'Center' }} />
<Example initialArgs={{ align: 'right', children: 'Right' }} />` },
      { title: 'Vertical layout', code: `<Example initialArgs={{ layout: 'vertical', align: 'top', children: 'Top' }} />
<Example initialArgs={{ layout: 'vertical', align: 'center', children: 'Center' }} />
<Example initialArgs={{ layout: 'vertical', align: 'bottom', children: 'Bottom' }} />` }
    ],
    docsImports: `import { Divider } from "primereact/divider";`,
  },
  {
    name: 'Splitter',
    prime: 'splitter',
    importName: 'Splitter',
    extraImports: `import { SplitterPanel } from 'primereact/splitter';`,
    description: 'Resizable panel layout.',
    args: `{ style: { height: '180px', width: '30rem', maxWidth: '100%' } }`,
    argTypes: `{ layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, gutterSize: { control: 'number' } }`,
    playground: `<Splitter {...args}><SplitterPanel className="flex align-items-center justify-content-center">Panel 1</SplitterPanel><SplitterPanel className="flex align-items-center justify-content-center">Panel 2</SplitterPanel></Splitter>`,
  },
  {
    name: 'Dialog',
    prime: 'dialog',
    importName: 'Dialog',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Modal window for focused content, confirmation flows, and forms.',
    docsImports: `import { Button } from "primereact/button";`,
    args: `{ header: 'Dialog', modal: true, visible: false, closable: true, closeOnEscape: true, dismissableMask: false, maximizable: false, position: 'center', style: { width: '32rem', maxWidth: '90vw' } }`,
    argTypes: `{
    header: { control: 'text' },
    modal: { control: 'boolean' },
    visible: { control: 'boolean' },
    closable: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    dismissableMask: { control: 'boolean' },
    maximizable: { control: 'boolean' },
    position: { control: 'select', options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] },
    style: { control: 'object' }
  }`,
    playground: `<><Button label="Open Dialog" onClick={() => updateArgs({ visible: true })} /><Dialog {...args} onShow={() => { args.onShow?.(); }} onHide={() => { updateArgs({ visible: false }); args.onHide?.(); }}>{args.children ?? <p>Dialog content.</p>}</Dialog></>`,
    docsVariations: [
      { title: 'Confirmation footer', code: `<Example initialArgs={{ header: 'Confirmation', footer: <div className="flex justify-content-end gap-2"><Button label="Cancel" text /><Button label="Confirm" /></div> }} />` },
      { title: 'Maximizable', code: `<Example initialArgs={{ maximizable: true }} />` },
      { title: 'Position', code: `<Example initialArgs={{ position: 'top-right' }} />` },
      { title: 'Dismissable mask', code: `<Example initialArgs={{ dismissableMask: true }} />` }
    ],
  },
  {
    name: 'OverlayPanel',
    prime: 'overlaypanel',
    importName: 'OverlayPanel',
    extraImports: `import { Button } from 'primereact/button';`,
    hooks: `const ref = useRef<OverlayPanel>(null);`,
    description: 'Floating panel triggered by an event.',
    args: `{ showCloseIcon: true, dismissable: true }`,
    argTypes: `{ showCloseIcon: { control: 'boolean' }, dismissable: { control: 'boolean' } }`,
    playground: `<><Button label="Show overlay" onClick={(event) => ref.current?.toggle(event)} /><OverlayPanel {...args} ref={ref}><p>Overlay content.</p></OverlayPanel></>`,
  },
  {
    name: 'Sidebar',
    prime: 'sidebar',
    importName: 'Sidebar',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Side panel.',
    args: `{ visible: false, position: 'right' }`,
    argTypes: `{ visible: { control: 'boolean' }, position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] } }`,
    playground: `<><Button label="Open Sidebar" onClick={() => updateArgs({ visible: true })} /><Sidebar {...args} onHide={() => { updateArgs({ visible: false }); args.onHide?.(); } }><p>Sidebar content.</p></Sidebar></>`,
  },
  {
    name: 'ConfirmPopup',
    prime: 'confirmpopup',
    importName: 'ConfirmPopup',
    extraImports: `import { Button } from 'primereact/button';`,
    hooks: `const [target, setTarget] = useState<HTMLElement | null>(null);
  const [result, setResult] = useState('No decision yet');`,
    description: 'Contextual confirmation displayed relative to a target.',
    args: `{ message: 'Are you sure?', visible: false, dismissable: true, closeOnEscape: true }`,
    argTypes: `{
    message: { control: 'text' },
    acceptLabel: { control: 'text' },
    rejectLabel: { control: 'text' },
    defaultFocus: { control: 'inline-radio', options: ['accept', 'reject'] },
    dismissable: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] },
    acceptIcon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] },
    rejectIcon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }
  }`,
    playground: `<><Button label="Confirm" onClick={(event) => { setTarget(event.currentTarget); updateArgs({ visible: true }); }} /><ConfirmPopup {...args} target={target ?? undefined} onHide={(result) => { updateArgs({ visible: false }); args.onHide?.(result); }} accept={() => { setResult('Accepted'); args.accept?.(); }} reject={() => { setResult('Rejected'); args.reject?.(); }} /><p role="status">{result}</p></>`,
    docsVariations: [
      { title: 'Custom labels', code: `<Example initialArgs={{ acceptLabel: 'Delete', rejectLabel: 'Keep item' }} />` },
      { title: 'Icons', code: `<Example initialArgs={{ icon: 'pi pi-exclamation-triangle', acceptIcon: 'pi pi-check', rejectIcon: 'pi pi-times' }} />` },
      { title: 'Reject-focused', code: `<Example initialArgs={{ defaultFocus: 'reject', acceptLabel: 'Continue', rejectLabel: 'Cancel' }} />` },
      { title: 'Non-dismissible', code: `<Example initialArgs={{ dismissable: false, closeOnEscape: false }} />` }
    ],
  },
  {
    name: 'Tooltip',
    prime: 'tooltip',
    importName: 'Tooltip',
    extraImports: `import { Button } from 'primereact/button';`,
    hooks: `const id = useId();`,
    description: 'Contextual hint.',
    args: `{ content: 'Tooltip content', event: 'both' }`,
    argTypes: `{ content: { control: 'text' }, position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } }`,
    playground: `<><Tooltip {...args} pt={{ root: { 'aria-hidden': false }, ...args.pt }} target={'[id="' + id + '"]'} /><Button id={id} label="Hover or focus me" /></>`,
  },
  {
    name: 'Menubar',
    prime: 'menubar',
    importName: 'Menubar',
    hooks: `const [action, setAction] = useState('No action yet');`,
    extraImports: `import type { MenuItem } from 'primereact/menuitem';
import { menuWithActions } from '../menuExamples';`,
    description: 'Primary horizontal navigation with nested menu items and command feedback. Native menu item commands, templates, URLs, pass-through props, and inherited attributes remain available through the component props.',
    renderPrefix: `const menuItems: MenuItem[] = [
  { label: 'File', icon: 'pi pi-fw pi-file', items: [{ label: 'New', icon: 'pi pi-plus' }, { label: 'Open', icon: 'pi pi-folder-open' }] },
  { label: 'Edit', icon: 'pi pi-fw pi-pencil', items: [{ label: 'Undo', icon: 'pi pi-undo' }, { label: 'Redo', icon: 'pi pi-refresh' }] },
  { label: 'Help', icon: 'pi pi-fw pi-question-circle' }
];`,
    args: `{ model: menuItems, ariaLabel: 'Main navigation', className: '', style: {} }`,
    argTypes: `{
    model: { control: 'object', description: 'MenuItem[] model. Edit labels, icons, nested items, separators, disabled/visible states, URLs, templates, and command data.' },
    menuIcon: { control: 'select', options: [undefined, 'pi pi-bars', 'pi pi-list'] },
    submenuIcon: { control: 'select', options: [undefined, 'pi pi-angle-down', 'pi pi-chevron-down', 'pi pi-angle-right'] },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' },
    unstyled: { control: 'boolean' }
  }`,
    playground: `<div style={{ width: '100%', minWidth: 0 }}><Menubar {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></div>`,
    docsImports: `import { Menubar } from "primereact/menubar";`,
    docsVariations: [
      { title: 'Nested navigation', code: `<Example initialArgs={{ model: [{ label: 'Products', icon: 'pi pi-box', items: [{ label: 'New product' }, { label: 'Catalog' }] }, { label: 'Orders', icon: 'pi pi-shopping-cart' }] }} />` },
      { title: 'Separators and disabled items', code: `<Example initialArgs={{ model: [{ label: 'Save', icon: 'pi pi-save' }, { separator: true }, { label: 'Delete', icon: 'pi pi-trash', disabled: true }] }} />` },
      { title: 'Start and end content', code: `<Example initialArgs={{ start: <strong className="mr-3">Acme</strong>, end: <span className="text-color-secondary">Signed in</span> }} />` },
      { title: 'Custom menu icons', code: `<Example initialArgs={{ menuIcon: 'pi pi-bars', submenuIcon: 'pi pi-chevron-down' }} />` }
    ],
  },
  {
    name: 'BreadCrumb',
    prime: 'breadcrumb',
    importName: 'BreadCrumb',
    extraImports: `import type { MenuItem } from 'primereact/menuitem';`,
    description: 'Contextual navigation through the Sakai page hierarchy. Demo commands report the selected destination; supply menu item URLs or commands for application navigation.',
    exampleType: `ComponentProps<typeof BreadCrumb> & { showHome: boolean }`,
    renderPrefix: `const home: MenuItem = { icon: 'pi pi-home', label: 'Home' };
const items: MenuItem[] = [
  { label: 'Computer' },
  { label: 'Notebook' },
  { label: 'Accessories' },
  { label: 'Backpacks' },
  { label: 'Item' }
];`,
    args: `{ home, model: items, showHome: true, className: '', style: {} }`,
    argTypes: `{
    model: { control: 'object', description: 'Ordered path items, excluding Home. Edit labels, add or remove levels, or set disabled on an item.' },
    showHome: { control: 'boolean', description: 'Show the configured Home item before the path.' },
    home: { control: 'object', description: 'Home menu item configuration. Its label names the home link; URLs and commands are preserved.' },
    className: { control: 'text' },
    style: { control: 'object' }
  }`,
    hooks: `const { showHome, home, model, ...breadcrumbProps } = args;
  const [action, setAction] = useState('No action yet');
  const withAction = (item: MenuItem): MenuItem => ({
    ...item,
    command: (event) => {
      item.command?.(event);
      setAction((item.label ?? 'Home') + ' selected');
    }
  });`,
    playground: `<div style={{ width: '100%', minWidth: 0 }}>
    <BreadCrumb
      aria-label="Breadcrumb"
      pt={{ icon: { 'aria-hidden': true }, action: { className: 'gap-2' } }}
      {...breadcrumbProps}
      home={showHome && home ? withAction(home) : undefined}
      model={model?.map(withAction)}
    />
    <p role="status">{action}</p>
  </div>`,
    docsVariations: [
      {
        title: 'Without Home',
        code: `<Example initialArgs={{ showHome: false }} />`,
        source: `exampleSource + '\\n// Render without the Home item:\\n<Example initialArgs={{ showHome: false }} />'`
      },
      {
        title: 'Disabled item',
        code: `<Example initialArgs={{ model: [{ label: 'Computer' }, { label: 'Notebook', disabled: true }, { label: 'Item' }] }} />`,
        source: `exampleSource + "\\n// Disable an unavailable destination:\\n<Example initialArgs={{ model: [{ label: 'Computer' }, { label: 'Notebook', disabled: true }, { label: 'Item' }] }} />"`
      }
    ],
  },
  {
    name: 'Steps',
    prime: 'steps',
    importName: 'Steps',
    description: 'Step-based flow.',
    renderPrefix: `const items = [{ label: 'Personal' }, { label: 'Seat' }, { label: 'Payment' }];`,
    args: `{ model: items, activeIndex: 0, readOnly: false }`,
    argTypes: `{ activeIndex: { control: 'number' } }`,
    playground: `<Steps {...args} onSelect={(event) => { updateArgs({ activeIndex: event.index }); args.onSelect?.(event); } } />`,
  },
  {
    name: 'TabMenu',
    prime: 'tabmenu',
    importName: 'TabMenu',
    description: 'Tabbed menu.',
    renderPrefix: `const items = [{ label: 'Home', icon: 'pi pi-fw pi-home' }, { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }];`,
    args: `{ model: items, activeIndex: 0 }`,
    argTypes: `{ activeIndex: { control: 'number' } }`,
    playground: `<TabMenu {...args} onTabChange={(event) => { updateArgs({ activeIndex: event.index }); args.onTabChange?.(event); } } />`,
  },
  {
    name: 'TieredMenu',
    prime: 'tieredmenu',
    importName: 'TieredMenu',
    hooks: `const ref = useRef<TieredMenu>(null);
  const [action, setAction] = useState('No action yet');`,
    extraImports: `import { Button } from 'primereact/button';
import { menuWithActions } from '../menuExamples';`,
    description: 'Hierarchical menu.',
    renderPrefix: `const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }] }];`,
    args: `{ model: items }`,
    argTypes: `{ popup: { control: 'boolean' } }`,
    playground: `<><>{args.popup && <Button label="Open menu" onClick={(event) => ref.current?.toggle(event)} />}<TieredMenu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /></><p role="status">{action}</p></>`,
  },
  {
    name: 'Menu',
    prime: 'menu',
    importName: 'Menu',
    hooks: `const ref = useRef<Menu>(null);
  const [action, setAction] = useState('No action yet');`,
    extraImports: `import { Button } from 'primereact/button';
import { menuWithActions } from '../menuExamples';`,
    description: 'Vertical navigation and command menu with inline and popup layouts.',
    renderPrefix: `const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Update', icon: 'pi pi-refresh' }];`,
    args: `{ model: items, popup: false, popupAlignment: 'left', closeOnEscape: true, autoZIndex: true, baseZIndex: 0, tabIndex: 0 }`,
    argTypes: `{
    model: { control: 'object', description: 'MenuItem[] model. Edit labels, icons, separators, disabled/visible states, nested items, URLs, and command data.' },
    popup: { control: 'boolean', description: 'Render the menu as an overlay opened by the supplied trigger.' },
    popupAlignment: { control: 'inline-radio', options: ['left', 'right'] },
    closeOnEscape: { control: 'boolean' },
    autoZIndex: { control: 'boolean' },
    baseZIndex: { control: 'number' },
    tabIndex: { control: 'number' },
    'aria-label': { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' }
  }`,
    docsImports: `import { Menu } from "primereact/menu";`,
    docsVariations: [
      { title: 'Nested navigation', code: `<Menu model={[{
  label: 'Customers',
  icon: 'pi pi-users',
  items: [{ label: 'New customer', icon: 'pi pi-user-plus' }, { label: 'Directory', icon: 'pi pi-list' }]
}, { label: 'Orders', icon: 'pi pi-shopping-cart' }]} />` },
      { title: 'Separators and disabled items', code: `<Menu model={[{ label: 'Save', icon: 'pi pi-save' }, { separator: true }, { label: 'Delete', icon: 'pi pi-trash', disabled: true }]} />` },
      { title: 'Popup menu', code: `<Example initialArgs={{ popup: true, popupAlignment: 'right' }} />` }
    ],
    playground: `<><>{args.popup && <Button label="Open menu" onClick={(event) => ref.current?.toggle(event)} />}<Menu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /></><p role="status">{action}</p></>`,
  },
  {
    name: 'ContextMenu',
    prime: 'contextmenu',
    importName: 'ContextMenu',
    hooks: `const ref = useRef<ContextMenu>(null);
  const [action, setAction] = useState('No action yet');`,
    extraImports: `import { menuWithActions } from '../menuExamples';`,
    description: 'Popup menu opened by a context click or an equivalent keyboard command.',
    renderPrefix: `const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Delete', icon: 'pi pi-times' }];`,
    args: `{ model: items }`,
    argTypes: `{ model: { control: 'object' }, ariaLabel: { control: 'text' }, global: { control: 'boolean' }, breakpoint: { control: 'text' }, scrollHeight: { control: 'text' }, autoZIndex: { control: 'boolean' } }`,
    playground: `<><ContextMenu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /><div tabIndex={0} className="p-4 border-1 border-round" onContextMenu={(event) => { event.preventDefault(); ref.current?.show(event); }} onKeyDown={(event) => { if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) { event.preventDefault(); ref.current?.show(event); } }}>Right-click or press Shift+F10 here</div><p role="status">{action}</p></>`,
  },
  {
    name: 'MegaMenu',
    prime: 'megamenu',
    importName: 'MegaMenu',
    hooks: `const [action, setAction] = useState('No action yet');`,
    extraImports: `import { menuWithActions } from '../menuExamples';`,
    description: 'Grouped navigation menu that opens multi-column submenus.',
    renderPrefix: `const items = [{ label: 'Videos', icon: 'pi pi-fw pi-video', items: [[{ label: 'Video 1', items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }] }, { label: 'Video 2', items: [{ label: 'Video 2.1' }] }], [{ label: 'Guides', items: [{ label: 'Guide 1' }] }]] }];`,
    args: `{ model: items, orientation: 'horizontal', breakpoint: '767px', scrollHeight: '400px' }`,
    argTypes: `{
    model: { control: 'object', description: 'MenuItem[] with nested MenuItem[][] groups for MegaMenu columns.' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    breakpoint: { control: 'text', description: 'CSS media-query boundary for the responsive menu button.' },
    scrollHeight: { control: 'text', description: 'Maximum responsive panel height.' },
    tabIndex: { control: 'number' }
  }`,
    playground: `<div style={{ width: '100%', maxWidth: '56rem' }}><MegaMenu {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></div>`,
    docsVariations: [
      { title: 'Vertical layout', code: `<Example initialArgs={{ orientation: 'vertical', breakpoint: '767px' }} />` },
      { title: 'Responsive menu', code: `<Example initialArgs={{ breakpoint: '900px', scrollHeight: '240px' }} />` },
      { title: 'Custom submenu icon', code: `<Example initialArgs={{ submenuIcon: 'pi pi-angle-right' }} />` }
    ],
  },
  {
    name: 'PanelMenu',
    prime: 'panelmenu',
    importName: 'PanelMenu',
    hooks: `const [action, setAction] = useState('No action yet');`,
    extraImports: `import { menuWithActions } from '../menuExamples';`,
    description: 'Menu with expandable panels.',
    renderPrefix: `const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }, { label: 'Directory', icon: 'pi pi-fw pi-list' }] }, { label: 'Orders', icon: 'pi pi-fw pi-shopping-cart', items: [{ label: 'Recent orders', icon: 'pi pi-fw pi-clock' }] }];`,
    args: `{ model: items, style: { width: '20rem' } }`,
    argTypes: `{
    model: { control: 'object', description: 'MenuItem[] with nested items for expandable panels and leaf actions.' },
    multiple: { control: 'boolean', description: 'Allow multiple top-level panels to stay expanded.' }
  }`,
    playground: `<><PanelMenu {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>`,
    docsVariations: [
      {
        title: 'Multiple expanded panels',
        code: `<Example initialArgs={{ multiple: true }} />`,
        source: 'exampleSource + ' + JSON.stringify('\n// Allow more than one panel to stay expanded:\n<Example initialArgs={{ multiple: true }} />')
      },
      {
        title: 'Disabled and hidden items',
        code: `<Example initialArgs={{ model: [{ label: 'Customers', icon: 'pi pi-users', items: [{ label: 'Directory', disabled: true }, { label: 'Hidden', visible: false }] }] }} />`,
        source: 'exampleSource + ' + JSON.stringify('\n// Disable or hide individual menu items:\n<Example initialArgs={{ model: [{ label: \'Customers\', icon: \'pi pi-users\', items: [{ label: \'Directory\', disabled: true }, { label: \'Hidden\', visible: false }] }] }} />')
      },
      {
        title: 'Custom submenu icons',
        code: `<Example initialArgs={{ expandIcon: 'pi pi-angle-right', collapseIcon: 'pi pi-angle-down' }} />`,
        source: 'exampleSource + ' + JSON.stringify('\n// Customize collapsed and expanded indicators:\n<Example initialArgs={{ expandIcon: \'pi pi-angle-right\', collapseIcon: \'pi pi-angle-down\' }} />')
      }
    ],
  },
  {
    name: 'Toast',
    prime: 'toast',
    importName: 'Toast',
    extraImports: `import { Button } from 'primereact/button';`,
    hooks: `const ref = useRef<Toast>(null);`,
    description: 'Temporary notification.',
    args: `{ position: 'top-right' }`,
    argTypes: `{ position: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'] } }`,
    playground: `<><Toast {...args} ref={ref} /><Button label="Show toast" onClick={() => ref.current?.show({ severity: 'success', summary: 'Success', detail: 'Action completed', life: 3000 })} /><Button label="Clear" outlined onClick={() => ref.current?.clear()} /></>`,
  },
  {
    name: 'Messages',
    prime: 'messages',
    importName: 'Messages',
    extraImports: `import type { MessagesMessage } from 'primereact/messages';
import { Button } from 'primereact/button';`,
    hooks: `const ref = useRef<Messages>(null);
  const { messageSeverity, messageSummary, messageDetail, messageClosable, messageSticky, ...messagesProps } = args;`,
    exampleType: `ComponentProps<typeof Messages> & {
  messageSeverity: MessagesMessage['severity'];
  messageSummary: string;
  messageDetail: string;
  messageClosable: boolean;
  messageSticky: boolean;
}`,
    description: 'Programmatic list of inline messages with severity, dismissal, and lifetime options.',
    args: `{ messageSeverity: 'success', messageSummary: 'Success', messageDetail: 'Action completed', messageClosable: true, messageSticky: false }`,
    argTypes: `{
    messageSeverity: { control: 'select', options: [undefined, 'success', 'info', 'warn', 'error', 'secondary', 'contrast'], description: 'Severity used by the demo Show button.' },
    messageSummary: { control: 'text', description: 'Summary used by the demo Show button.' },
    messageDetail: { control: 'text', description: 'Detail used by the demo Show button.' },
    messageClosable: { control: 'boolean', description: 'Whether the demo message can be dismissed.' },
    messageSticky: { control: 'boolean', description: 'Whether the demo message remains until cleared.' },
    className: { control: 'text' },
    style: { control: 'object' }
  }`,
    playground: `<><Messages {...messagesProps} ref={ref} /><Button label="Show messages" onClick={() => ref.current?.show({ severity: messageSeverity, summary: messageSummary, detail: messageDetail, closable: messageClosable, sticky: messageSticky, life: messageSticky ? undefined : 3000 })} /><Button label="Clear" outlined onClick={() => ref.current?.clear()} /></>`,
    docsVariations: [
      { title: 'Severities', code: `<div className="flex flex-column gap-2">
  <Example initialArgs={{ messageSeverity: 'success' }} />
  <Example initialArgs={{ messageSeverity: 'info' }} />
  <Example initialArgs={{ messageSeverity: 'warn' }} />
  <Example initialArgs={{ messageSeverity: 'error' }} />
  <Example initialArgs={{ messageSeverity: 'secondary' }} />
  <Example initialArgs={{ messageSeverity: 'contrast' }} />
</div>` },
      { title: 'Dismissible message', code: `<Example initialArgs={{ messageClosable: true, messageSticky: true }} />` },
      { title: 'Automatic dismissal', code: `<Example initialArgs={{ messageClosable: false, messageSticky: false }} />` }
    ],
  },
  {
    name: 'Message',
    prime: 'message',
    importName: 'Message',
    description: 'Inline message used for validation feedback and status information.',
    args: `{ severity: 'info', text: 'Message content', icon: undefined }`,
    argTypes: `{ severity: { control: 'select', options: [undefined, 'success', 'info', 'warn', 'error', 'secondary', 'contrast'] }, text: { control: 'text' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] } }`,
    docsImports: `import { Message } from "primereact/message";`,
    docsVariations: [
      {
        title: 'Severities',
        code: `<div className="flex flex-column gap-2 align-items-start">
  <Message severity="success" text="Success message" />
  <Message severity="info" text="Information message" />
  <Message severity="warn" text="Warning message" />
  <Message severity="error" text="Error message" />
  <Message severity="secondary" text="Secondary message" />
  <Message severity="contrast" text="Contrast message" />
</div>`
      },
      {
        title: 'Icons',
        code: `<div className="flex flex-wrap gap-2">
  <Message severity="success" icon="pi pi-check" text="Custom success icon" />
  <Message severity="info" icon="pi pi-bookmark" text="Custom info icon" />
</div>`
      },
      {
        title: 'Validation feedback',
        code: `<div className="flex flex-column gap-2 align-items-start">
  <Message severity="error" text="Username is required" />
  <Message severity="error" text="Enter a valid email address" />
</div>`
      }
    ],
    playground: `<Message {...args} />`,
  },
  {
    name: 'Carousel',
    prime: 'carousel',
    importName: 'Carousel',
    description: 'Sakai product carousel with responsive paging, circular navigation and vertical layout. Page is a zero-based page index. Responsive options override item counts at their breakpoints; use positive counts with numScroll no greater than numVisible. Autoplay implies circular navigation. Circular and autoplay examples use native paging: page must stay zero and onPageChange is unsupported in these modes in PrimeReact 10.9.7. Normal paging synchronizes Controls. Invalid count/page combinations display guidance instead of rendering a broken carousel.',
    extraImports: "import { useEffect, useSyncExternalStore } from 'react';",
    renderPrefix: `function subscribeViewport(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}
const getViewport = () => window.innerWidth;
const getServerViewport = () => 1024;

const products = [
  { name: 'Bamboo Watch', image: 'bamboo-watch.jpg', price: 65, inventoryStatus: 'INSTOCK' },
  { name: 'Black Watch', image: 'black-watch.jpg', price: 72, inventoryStatus: 'INSTOCK' },
  { name: 'Blue Band', image: 'blue-band.jpg', price: 79, inventoryStatus: 'LOWSTOCK' }
];

function productTemplate(product: (typeof products)[number]) {
  return <div className="border-1 surface-border border-round m-1 text-center p-3">
    <img src={'./demo/images/product/' + product.image} alt={product.name} style={{ width: '6rem', maxWidth: '100%' }} />
    <h4 className="mt-3 mb-2">{product.name}</h4>
    <p className="mt-0 mb-3">\${product.price}</p>
    <span className={'product-badge status-' + product.inventoryStatus.toLowerCase()}>{product.inventoryStatus}</span>
  </div>;
}`,
    args: `{ value: products, itemTemplate: productTemplate, page: 0, numVisible: 1, numScroll: 1, circular: false, orientation: 'horizontal', verticalViewPortHeight: '320px', showIndicators: true, showNavigators: true, autoplayInterval: 0 }`,
    argTypes: `{ page: { description: 'Zero-based page in normal mode. Keep zero for circular/autoplay.', control: { type: 'number', min: 0, max: 2, step: 1 } }, numVisible: { control: { type: 'number', min: 1, max: 3, step: 1 } }, numScroll: { control: { type: 'number', min: 1, max: 3, step: 1 } }, responsiveOptions: { control: 'object' }, orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, verticalViewPortHeight: { control: 'text' }, circular: { control: 'boolean' }, showIndicators: { control: 'boolean' }, showNavigators: { control: 'boolean' }, autoplayInterval: { control: { type: 'number', min: 0, step: 1000 } }, header: { control: 'text' }, footer: { control: 'text' } }`,
    hooks: `const viewportWidth = useSyncExternalStore(subscribeViewport, getViewport, getServerViewport);
  const nativePaging = Boolean(args.circular || args.autoplayInterval);
  const count = args.value?.length ?? 0;
  const numVisible = args.numVisible ?? 1;
  const numScroll = args.numScroll ?? 1;
  const page = args.page ?? 0;
  const validCounts = (visible: number, scroll: number) =>
    Number.isInteger(visible) && visible > 0 && Number.isInteger(scroll) && scroll > 0 &&
    scroll <= visible && (!count || visible <= count);
  const responsiveOptions = Array.isArray(args.responsiveOptions) ? args.responsiveOptions : [];
  const invalidResponsive = (args.responsiveOptions != null && !Array.isArray(args.responsiveOptions)) ||
    responsiveOptions.some((option) => !option || typeof option.breakpoint !== 'string' || !/^\\d+px$/.test(option.breakpoint));
  const configurations = [{ numVisible, numScroll }, ...responsiveOptions.filter(Boolean)];
  const invalidCounts = configurations.some((option) => !validCounts(option.numVisible, option.numScroll));
  const effectiveCounts = [...responsiveOptions].filter((option) => option && parseInt(option.breakpoint, 10) >= viewportWidth)
      .sort((left, right) => parseInt(left.breakpoint, 10) - parseInt(right.breakpoint, 10))[0] ?? { numVisible, numScroll };
  const maxPage = Math.max(0, Math.ceil((count - effectiveCounts.numVisible) / effectiveCounts.numScroll));
  const renderedPage = responsiveOptions.length ? Math.min(page, maxPage) : page;
  useEffect(() => {
    if (Number.isFinite(renderedPage) && renderedPage !== page) updateArgs({ page: renderedPage });
  }, [renderedPage, page, updateArgs]);
  const problem = invalidResponsive ? 'Responsive options must be an array of breakpoint/count objects with pixel breakpoints, for example 560px.'
    : !Number.isInteger(args.autoplayInterval ?? 0) || (args.autoplayInterval ?? 0) < 0 ? 'Autoplay interval must be a nonnegative integer in milliseconds.'
    : invalidCounts ? 'Use positive integer counts with numScroll <= numVisible <= item count, including responsive options.'
    : !Number.isInteger(page) || page < 0 || (!responsiveOptions.length && page > maxPage) ? 'Choose a page available at the current viewport (0 to ' + maxPage + ').'
    : nativePaging && (page !== 0 || args.onPageChange) ? 'Circular/autoplay uses native paging. Set page to 0 and omit onPageChange (PrimeReact 10.9.7 limitation).'
    : undefined;
  if (problem) return <p role="alert">{problem}</p>;`,
    playground: `<div style={{ width: 'min(48rem, calc(100vw - 4rem))', maxWidth: '100%' }}>
    <Carousel key={JSON.stringify([nativePaging, numVisible, numScroll, args.responsiveOptions, args.orientation, args.autoplayInterval, effectiveCounts.numVisible, effectiveCounts.numScroll])} {...args} page={renderedPage} onPageChange={nativePaging ? undefined : (event) => {
      updateArgs({ page: event.page });
      args.onPageChange?.(event);
    }} />
  </div>`,
    docsVariations: [
      { title: 'Responsive product collection', code: `<Example initialArgs={{ numVisible: 3, numScroll: 3, responsiveOptions: [{ breakpoint: '768px', numVisible: 2, numScroll: 2 }, { breakpoint: '560px', numVisible: 1, numScroll: 1 }] }} />`, source: `exampleSource + '\\n<Example initialArgs={{ numVisible: 3, numScroll: 3, responsiveOptions: [{ breakpoint: "768px", numVisible: 2, numScroll: 2 }, { breakpoint: "560px", numVisible: 1, numScroll: 1 }] }} />'` },
      { title: 'Circular navigation', code: `<Example initialArgs={{ circular: true }} />`, source: `exampleSource + '\\n<Example initialArgs={{ circular: true }} />'` },
      { title: 'Vertical layout', code: `<Example initialArgs={{ orientation: 'vertical', verticalViewPortHeight: '320px' }} />`, source: `exampleSource + '\\n<Example initialArgs={{ orientation: "vertical", verticalViewPortHeight: "320px" }} />'` }
    ],
  },

  {
    name: 'Galleria',
    prime: 'galleria',
    importName: 'Galleria',
    description: 'Responsive image gallery with thumbnails, indicators, navigation, captions, and optional fullscreen viewing.',
    renderPrefix: `const images = [1, 2, 3].map((index) => ({ itemImageSrc: './demo/images/galleria/galleria' + index + '.jpg', thumbnailImageSrc: './demo/images/galleria/galleria' + index + 's.jpg', alt: 'Landscape ' + index }));`,
    args: `{ value: images, activeIndex: 0, numVisible: 1, circular: true, showItemNavigators: true, showThumbnails: true, showIndicators: false, fullScreen: false, style: { maxWidth: '420px', width: '100%' } }`,
    argTypes: `{
    activeIndex: { control: { type: 'number', min: 0, max: 2, step: 1 }, description: 'Zero-based active image index.' },
    numVisible: { control: { type: 'number', min: 1, max: 3, step: 1 } },
    responsiveOptions: { control: 'object' },
    circular: { control: 'boolean' },
    showItemNavigators: { control: 'boolean' },
    showItemNavigatorsOnHover: { control: 'boolean' },
    showThumbnails: { control: 'boolean' },
    thumbnailsPosition: { control: 'inline-radio', options: ['bottom', 'top', 'left', 'right'] },
    showIndicators: { control: 'boolean' },
    showIndicatorsOnItem: { control: 'boolean' },
    indicatorsPosition: { control: 'inline-radio', options: ['bottom', 'top', 'left', 'right'] },
    fullScreen: { control: 'boolean' },
    autoPlay: { control: 'boolean' },
    transitionInterval: { control: 'number' }
  }`,
    hooks: `const itemTemplate = (item: (typeof images)[number]) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  const thumbnailTemplate = (item: (typeof images)[number]) => <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  const onItemChange = args.activeIndex === undefined ? args.onItemChange : (event: Parameters<NonNullable<ExampleArgs['onItemChange']>>[0]) => {
    updateArgs({ activeIndex: event.index });
    args.onItemChange?.(event);
  };`,
    playground: `<Galleria {...args} item={args.item === undefined ? itemTemplate : args.item} thumbnail={args.thumbnail === undefined ? thumbnailTemplate : args.thumbnail} onItemChange={onItemChange} />`,
    docsVariations: [
      { title: 'Indicators and captions', code: `<Example initialArgs={{ showIndicators: true, showIndicatorsOnItem: true, caption: (item) => <span>{item.alt}</span> }} />` },
      { title: 'Top thumbnails', code: `<Example initialArgs={{ thumbnailsPosition: 'top', numVisible: 3 }} />` },
      { title: 'Responsive thumbnails', code: `<Example initialArgs={{ numVisible: 3, responsiveOptions: [{ breakpoint: '560px', numVisible: 1 }] }} />` },
      { title: 'Fullscreen viewing', code: `<Example initialArgs={{ fullScreen: true }} />` }
    ],
  },
  {
    name: 'FileUpload',
    prime: 'fileupload',
    importName: 'FileUpload',
    hooks: `const ref = useRef<FileUpload>(null);
  const [result, setResult] = useState('Select a file to simulate an upload. Files stay in this browser.');
  const pt = args.pt;
  const mergedPt = {
    ...pt,
    uploadButton: { root: { 'aria-hidden': false }, ...pt?.uploadButton },
    cancelButton: { root: { 'aria-hidden': false }, ...pt?.cancelButton },
    removeButton: { root: { 'aria-label': 'Remove file' }, ...pt?.removeButton }
  };
  const uploadHandler = args.customUpload === false ? args.uploadHandler : (event: Parameters<NonNullable<ExampleArgs['uploadHandler']>>[0]) => {
    event.options.clear();
    args.uploadHandler?.(event);
    setResult(event.files.length + ' file(s) processed locally.');
  };`,
    description: 'File selection and upload queue with basic and advanced modes. The default playground simulates completion locally without a network request.',
    args: `{ mode: 'advanced', name: 'demo[]', accept: 'image/*', maxFileSize: 1000000, chooseLabel: 'Choose', uploadLabel: 'Upload', cancelLabel: 'Clear', multiple: false, auto: false, customUpload: true, disabled: false }`,
    argTypes: `{ mode: { control: 'inline-radio', options: ['basic', 'advanced'] }, chooseLabel: { control: 'text' }, uploadLabel: { control: 'text' }, cancelLabel: { control: 'text' }, accept: { control: 'text' }, maxFileSize: { control: 'number' }, multiple: { control: 'boolean' }, auto: { control: 'boolean' }, customUpload: { control: 'boolean', description: 'Use the local simulated handler by default. Disable to use PrimeReact native upload behavior.' }, disabled: { control: 'boolean' } }`,
    playground: `<><FileUpload {...args} pt={mergedPt} ref={ref} uploadHandler={uploadHandler} onClear={() => { setResult('Select a file to simulate an upload. Files stay in this browser.'); args.onClear?.(); }} /><p role="status">{result}</p></>`,
    docsVariations: [
      { title: 'Basic mode', code: `<Example initialArgs={{ mode: 'basic', chooseLabel: 'Choose image' }} />` },
      { title: 'Advanced multiple selection', code: `<Example initialArgs={{ mode: 'advanced', multiple: true, chooseLabel: 'Select images' }} />` },
      { title: 'Automatic local upload', code: `<Example initialArgs={{ mode: 'advanced', auto: true, customUpload: true }} />` },
      { title: 'Disabled state', code: `<Example initialArgs={{ disabled: true }} />` }
    ],
  },
  {
    name: 'Chart',
    prime: 'chart',
    importName: 'Chart',
    description: 'Chart.js visualizations used by Sakai for line, bar, pie, doughnut, polar area and radar charts. Edit data and options as Chart.js configuration objects. Type changes reuse the supplied data; custom chart types and plugins remain available through native props.',
    extraImports: `import type { ChartData, ChartOptions } from 'chart.js';`,
    renderPrefix: `const data: ChartData = {
  labels: ['A', 'B', 'C'],
  datasets: [{
    label: 'Sample values',
    data: [12, 19, 3],
    backgroundColor: ['#6366f1', '#a855f7', '#14b8a6'],
    borderColor: '#6366f1',
    borderWidth: 1
  }]
};
const options: ChartOptions = {
  responsive: true,
  plugins: { title: { display: true, text: 'Sample values: A 12, B 19, C 3' } }
};`,
    exampleDefaults: 'structuredClone(defaultArgs)',
    args: `{ type: 'bar', data, options }`,
    argTypes: `{ type: { control: 'select', options: ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar'] }, data: { control: 'object' }, options: { control: 'object' } }`,
    playground: `<div style={{ width: 'min(32rem, calc(100vw - 4rem))', maxWidth: '100%' }}><Chart {...args} /></div>`,
    docsVariations: [
      ...[['Line', 'line'], ['Bar', 'bar'], ['Pie', 'pie'], ['Doughnut', 'doughnut'], ['Polar area', 'polarArea'], ['Radar', 'radar']].map(([title, type]) => ({
        title,
        code: `<Example initialArgs={{ type: '${type}' }} />`,
        source: `exampleSource + ${JSON.stringify(`\n<Example initialArgs={{ type: '${type}' }} />`)}`
      }))
    ],
  },
  {
    name: 'ProgressBar',
    prime: 'progressbar',
    importName: 'ProgressBar',
    description: 'Progress indicator.',
    args: `{ value: 50, showValue: true }`,
    argTypes: `{ value: { control: 'number' }, showValue: { control: 'boolean' }, mode: { control: 'select', options: ['determinate', 'indeterminate'] } }`,
    playground: `<div style={{ width: '24rem', maxWidth: '100%' }}><ProgressBar {...args} /></div>`,
  },
  {
    name: 'Badge',
    prime: 'badge',
    importName: 'Badge',
    description: 'Numeric marker or status indicator, displayed on its own, over an icon, or inside a button.',
    exampleType: `ComponentProps<typeof Badge> & {
  placement: 'standalone' | 'icon' | 'button';
  icon?: string;
  label: string;
}`,
    extraImports: `import { Button } from 'primereact/button';`,
    args: `{ value: '2', severity: undefined, size: undefined, placement: 'standalone', icon: 'pi pi-check', label: 'Notifications' }`,
    argTypes: `{ value: { control: 'text', description: 'Leave empty to display a dot. Text such as 10+ is displayed literally.' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, size: { control: 'select', options: [undefined, 'large', 'xlarge'], if: { arg: 'placement', neq: 'icon' }, description: 'Icon overlays always use the default badge size, as in Sakai.' }, placement: { control: 'select', options: ['standalone', 'icon', 'button'] }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, label: { control: 'text', description: 'Button label and accessible name for the icon composition.' } }`,
    hooks: `const { placement, icon, label, ...badgeProps } = args;
  const [message, setMessage] = useState('');`,
    playground: `<>
    {placement === 'button' ? (
      <Button label={label} icon={icon} onClick={() => setMessage(label + ' opened')}>
        <Badge {...badgeProps} />
      </Button>
    ) : placement === 'icon' && icon ? (
      <span className="p-overlay-badge inline-flex" role="img" aria-label={label + (badgeProps.value ? ': ' + badgeProps.value : ': new activity')}>
        <i className={icon} style={{ fontSize: '2rem' }} aria-hidden="true" />
        <Badge {...badgeProps} size={undefined} />
      </span>
    ) : <Badge {...badgeProps} />}
    {placement === 'button' && <span role="status" className="ml-3">{message}</span>}
  </>`,
    docsImports: `import { Badge } from "primereact/badge";`,
    docsVariations: [
      { title: 'Numbers and severities', code: `<Badge value="2" />
<Badge value="8" severity="success" />
<Badge value="4" severity="info" />
<Badge value="12" severity="warning" />
<Badge value="3" severity="danger" />` },
      { title: 'Positioned badges', code: `<span className="p-overlay-badge inline-flex mr-4" role="img" aria-label="2 notifications">
  <i className="pi pi-bell" style={{ fontSize: '2rem' }} aria-hidden="true" />
  <Badge value="2" />
</span>
<span className="p-overlay-badge inline-flex mr-4" role="img" aria-label="More than 10 events">
  <i className="pi pi-calendar" style={{ fontSize: '2rem' }} aria-hidden="true" />
  <Badge value="10+" severity="danger" />
</span>
<span className="p-overlay-badge inline-flex" role="img" aria-label="New mail">
  <i className="pi pi-envelope" style={{ fontSize: '2rem' }} aria-hidden="true" />
  <Badge severity="danger" />
</span>` },
      { title: 'Button badges', code: `<Example initialArgs={{ placement: 'button', label: 'Emails', icon: undefined, value: '8' }} />
<Example initialArgs={{ placement: 'button', label: 'Messages', icon: 'pi pi-users', value: '8', severity: 'danger' }} />` },
      { title: 'Sizes', code: `<Badge value="2" />
<Badge value="4" size="large" severity="warning" />
<Badge value="6" size="xlarge" severity="success" />` },
    ],
  },
  {
    name: 'Avatar',
    prime: 'avatar',
    importName: 'Avatar',
    description: 'Visual representation of a user or entity.',
    args: `{ label: 'P', shape: 'circle', size: 'large' }`,
    argTypes: `{ label: { control: 'text' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, shape: { control: 'inline-radio', options: ['square', 'circle'] }, size: { control: 'select', options: ['normal', 'large', 'xlarge'] } }`,
    playground: `<Avatar {...args} />`,
    docsImports: `import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";`,
    docsVariations: [
      { title: 'Shapes', code: `<Avatar label="P" shape="square" size="large" />
<Avatar label="P" shape="circle" size="large" />` },
      { title: 'Sizes', code: `<Avatar label="P" shape="circle" />
<Avatar label="P" shape="circle" size="large" />
<Avatar label="P" shape="circle" size="xlarge" />` },
      { title: 'Colors', code: `<Avatar label="V" size="large" shape="circle" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
<Avatar label="U" size="large" shape="circle" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />` },
      { title: 'Icons', code: `<Avatar icon="pi pi-user" size="large" shape="circle" aria-label="User" />` },
      { title: 'Icon with badge', code: `<Avatar className="p-overlay-badge" icon="pi pi-user" size="xlarge" aria-label="User with 4 notifications">
  <Badge value="4" />
</Avatar>` },
    ],
  },
  {
    name: 'AvatarGroup',
    prime: 'avatargroup',
    importName: 'AvatarGroup',
    extraImports: `import { Avatar } from 'primereact/avatar';`,
    description: 'Overlapping avatars representing a team. Explore member count, text, images, mixed content, sizes, shapes, and an optional overflow indicator in Default.',
    exampleType: `ComponentProps<typeof AvatarGroup> & {
  count: 2 | 3 | 4 | 5;
  content: 'text' | 'image' | 'mixed';
  size: ComponentProps<typeof Avatar>['size'];
  shape: ComponentProps<typeof Avatar>['shape'];
  showOverflow: boolean;
}`,
    args: `{ count: 5, content: 'image', size: 'large', shape: 'circle', showOverflow: true, className: '', style: {} }`,
    argTypes: `{ count: { control: 'select', options: [2, 3, 4, 5], description: 'Visible members, excluding the +2 indicator.' }, content: { control: 'select', options: ['text', 'image', 'mixed'] }, size: { control: 'select', options: ['normal', 'large', 'xlarge'] }, shape: { control: 'inline-radio', options: ['square', 'circle'] }, showOverflow: { control: 'boolean' }, className: { control: 'text' }, style: { control: 'object' } }`,
    renderPrefix: `const members = [
  { name: 'Amy Elsner', label: 'AE', image: 'demo/images/avatar/amyelsner.png' },
  { name: 'Asiya Javayant', label: 'AJ', image: 'demo/images/avatar/asiyajavayant.png' },
  { name: 'Onyama Limba', label: 'OL', image: 'demo/images/avatar/onyamalimba.png' },
  { name: 'Ioni Bowcher', label: 'IB', image: 'demo/images/avatar/ionibowcher.png' },
  { name: 'Xuxue Feng', label: 'XF', image: 'demo/images/avatar/xuxuefeng.png' },
];`,
    hooks: `const { count, content, size, shape, showOverflow, ...groupProps } = args;`,
    playground: `<AvatarGroup {...groupProps}>
    {members.slice(0, count).map((member, index) => {
      const useImage = content === 'image' || (content === 'mixed' && index % 2 === 0);
      return <Avatar key={member.name} image={useImage ? member.image : undefined} imageAlt={useImage ? member.name : undefined} label={useImage ? undefined : member.label} aria-label={member.name} size={size} shape={shape} />;
    })}
    {showOverflow && <Avatar label="+2" aria-label="2 additional members" shape={shape} size={size} style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />}
  </AvatarGroup>`,
    docsImports: `import { AvatarGroup } from "primereact/avatargroup";
import { Avatar } from "primereact/avatar";`,
    docsVariations: [
      { title: 'Initials', code: `<AvatarGroup>
  <Avatar label="P" shape="circle" size="large" />
  <Avatar label="V" shape="circle" size="large" style={{ backgroundColor: '#2196F3', color: '#ffffff' }} />
  <Avatar label="U" shape="circle" size="large" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />
</AvatarGroup>` },
      { title: 'Sizes', code: `<AvatarGroup>
  <Avatar label="P" shape="circle" />
  <Avatar label="V" shape="circle" />
  <Avatar label="+2" shape="circle" />
</AvatarGroup>
<AvatarGroup>
  <Avatar label="P" shape="circle" size="xlarge" />
  <Avatar label="V" shape="circle" size="xlarge" />
  <Avatar label="+2" shape="circle" size="xlarge" />
</AvatarGroup>` },
    ],
  },
  {
    name: 'Tag',
    prime: 'tag',
    importName: 'Tag',
    description: 'Status label.',
    args: `{ value: 'Primary', severity: undefined, rounded: false, icon: undefined }`,
    argTypes: `{ value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, rounded: { control: 'boolean' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] } }`,
    playground: `<Tag {...args} />`,
  },
  {
    name: 'Chip',
    prime: 'chip',
    importName: 'Chip',
    description: 'Compact label with optional icon or image and native removal. Images take precedence over icons. Use visible to restore a removed playground chip; returning false from onRemove cancels removal.',
    exampleType: "ComponentProps<typeof Chip> & { visible?: boolean }",
    args: `{ label: 'Action', icon: undefined, image: undefined, imageAlt: 'Amy Elsner', removable: false, visible: true }`,
    argTypes: `{ label: { control: 'text' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, image: { control: 'select', options: [undefined, 'demo/images/avatar/amyelsner.png', 'demo/images/avatar/onyamalimba.png'] }, imageAlt: { control: 'text' }, removable: { control: 'boolean' }, visible: { control: 'boolean', description: 'Story-only visibility. Removal sets false; set true or reset Controls to restore.' }, className: { control: 'text' }, style: { control: 'object' } }`,
    hooks: `const { visible = true, ...chipProps } = args;`,
    playground: `visible ? <Chip {...chipProps} onRemove={(event) => {
    const result = chipProps.onRemove?.(event);
    if (result !== false) updateArgs({ visible: false });
    return result !== false;
  }} /> : null`,
    docsImports: 'import { Chip } from "primereact/chip";',
    docsVariations: [
      { title: 'Labels', code: '<Chip label="Action" />\n<Chip label="Comedy" />' },
      { title: 'Icons', code: '<Chip label="Search" icon="pi pi-search" />\n<Chip label="Bookmark" icon="pi pi-bookmark" />' },
      { title: 'Images', code: '<Chip label="Amy Elsner" image="demo/images/avatar/amyelsner.png" imageAlt="Amy Elsner" />\n<Chip label="Onyama Limba" image="demo/images/avatar/onyamalimba.png" imageAlt="Onyama Limba" />' },
      { title: 'Removable', code: '<Chip label="Thriller" removable />\n<Chip label="Search" icon="pi pi-search" removable />\n<Chip label="Amy Elsner" image="demo/images/avatar/amyelsner.png" imageAlt="Amy Elsner" removable />' },
    ],
  },
  {
    name: 'Skeleton',
    prime: 'skeleton',
    importName: 'Skeleton',
    description: 'Loading placeholder.',
    args: `{ width: '10rem', height: '2rem', borderRadius: '16px' }`,
    argTypes: `{ width: { control: 'text' }, height: { control: 'text' }, borderRadius: { control: 'text' }, shape: { control: 'select', options: [undefined, 'circle'] } }`,
    playground: `<Skeleton {...args} />`,
  },
  {
    name: 'ScrollPanel',
    prime: 'scrollpanel',
    importName: 'ScrollPanel',
    description: 'Area with custom scrolling.',
    args: `{ style: { width: '24rem', maxWidth: '100%', height: '160px' } }`,
    argTypes: `{ style: { control: 'object' } }`,
    playground: `<ScrollPanel {...args}><p style={{ lineHeight: 1.7 }}>{Array.from({ length: 12 }, (_, index) => <span key={index} className="block">Scrollable content line {index + 1}.</span>)}</p></ScrollPanel>`,
  },
  {
    name: 'ScrollTop',
    prime: 'scrolltop',
    importName: 'ScrollTop',
    description: 'Shortcut to scroll back to the top.',
    args: `{ threshold: 100, behavior: 'smooth' }`,
    argTypes: `{ threshold: { control: 'number' }, behavior: { control: 'inline-radio', options: ['smooth', 'auto'] } }`,
    playground: `<div style={{ height: '12rem', overflow: 'auto', position: 'relative' }}><div style={{ height: '30rem', padding: '1rem' }}>Scroll down inside this panel.</div><ScrollTop {...args} target="parent" /></div>`,
  }
];

for (const component of components) {
  if (['InputText', 'InputTextarea', 'Password', 'InputMask', 'Chips', 'Dropdown', 'ListBox', 'MultiSelect', 'SelectButton'].includes(component.name)) {
    const control = ['InputText', 'InputTextarea', 'Password', 'InputMask'].includes(component.name) ? 'text' : component.name === 'InputNumber' ? 'number' : 'object';
    component.argTypes = component.argTypes.replace('{', `{ value: { control: '${control}' },`);
  }
}

const manualComponents = new Set(['Button', 'Accordion', 'AutoComplete', 'Image', 'Panel']);

function createExamples(component) {
  const type = component.exampleType ?? (component.name === 'DataTable' ? 'DataTablePropsSingle<typeof products>' : ['Dialog', 'Sidebar'].includes(component.name) ? `Omit<ComponentProps<typeof ${component.importName}>, 'onHide'> & { onHide?: () => void }` : `ComponentProps<typeof ${component.importName}>`);
  const typeImport = component.name === 'DataTable' ? "import type { DataTablePropsSingle } from 'primereact/datatable';\n" : '';
  return `import { useState${component.hooks?.includes('useRef') ? ', useRef' : ''}${component.hooks?.includes('useId') ? ', useId' : ''}${type.includes('ComponentProps') ? ', type ComponentProps' : ''} } from 'react';
import { ${component.importName} } from 'primereact/${component.prime}';
${typeImport}${component.extraImports ?? ''}

${component.renderPrefix ?? ''}

export type ExampleArgs = ${type};
export const defaultArgs: ExampleArgs = ${component.args};

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
${component.hooks ? '  ' + component.hooks + '\n' : ''}  return (${component.playground});
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...${component.exampleDefaults ?? 'defaultArgs'}, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
`;
}

function createStory(component) {
  return `import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ${component.importName} } from 'primereact/${component.prime}';
import { defaultArgs, Playground, type ExampleArgs } from './${component.name}.examples';
import exampleSource from './${component.name}.examples.tsx?raw';

const meta = {
  title: 'Components/${component.name}',
${component.exampleType || ['DataTable', 'Dialog', 'Sidebar'].includes(component.name) ? '' : `  component: ${component.importName},\n`}  parameters: {
    layout: 'centered',
    controls: { include: ${JSON.stringify(Object.keys(Function(`return (${component.argTypes ?? commonArgTypes})`)()))} },
    docs: { description: { component: '${component.description}' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: ${component.argTypes ?? commonArgTypes}
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
`;
}

function createDocs(component) {
  const argTypes = Function(`return (${component.argTypes ?? commonArgTypes})`)();
  const variations = Object.entries(argTypes).flatMap(([key, config]) => {
    if (config.control === 'boolean' && ['disabled', 'invalid', 'filter', 'popup', 'toggleable', 'rounded', 'outlined'].includes(key)) {
      return [{ title: key[0].toUpperCase() + key.slice(1), args: `{ ${key}: true }` }];
    }
    if (['severity', 'size', 'shape', 'type', 'position', 'orientation', 'mode'].includes(key) && config.options) {
      return config.options.filter((value) => value !== undefined).map((value) => ({ title: String(value), args: `{ ${key}: '${value}' }` }));
    }
    return [];
  }).slice(0,6);
  const examples = component.docsVariations ? component.docsVariations.map(({ title, code, source }) => `### ${title}

<div className="component-example sb-unstyled flex flex-wrap align-items-center gap-2">
${code}
</div>

<Source code={${source ?? JSON.stringify(code)}} language="tsx" />`).join('\n\n') : variations.map(({title,args}) => `### ${title}

<div className="component-example sb-unstyled"><Example initialArgs={${args}} /></div>

<Source code={exampleSource + ${JSON.stringify(`\n// Render this variation:\n<Example initialArgs={${args}} />`)}} language="tsx" />`).join('\n\n');
  return `import { Meta, Source, Subtitle, Title } from "@storybook/addon-docs/blocks";
import { Example } from "./${component.name}.examples";
import exampleSource from "./${component.name}.examples.tsx?raw";${component.docsImports ? '\n' + component.docsImports : ''}

<Meta title="Components/${component.name}/Summary" />

<Title>${component.name}</Title>

<Subtitle>${component.description}</Subtitle>

## Usage

<div className="component-example sb-unstyled"><Example /></div>

<Source code={exampleSource} language="tsx" />

## Variations

${examples || 'The usage example shows the base composition. Use Default to explore the documented properties.'}

## Playground

Open [Default](?path=/story/components-${component.name.toLowerCase()}--default) to change properties with Controls. Examples on this page keep their own state.
`;
}

fs.mkdirSync(outDir, { recursive: true });
let generated = 0;
for (const component of components) {
  if (manualComponents.has(component.name)) continue;
  fs.writeFileSync(path.join(outDir, `${component.name}.examples.tsx`), createExamples(component).replace(/\n{3,}/g, '\n\n'));
  fs.writeFileSync(path.join(outDir, `${component.name}.stories.tsx`), createStory(component));
  fs.writeFileSync(path.join(outDir, `${component.name}.docs.mdx`), createDocs(component));
  generated += 1;
}
console.log(`Generated ${generated} component story sets; preserved ${manualComponents.size} manual components.`);
