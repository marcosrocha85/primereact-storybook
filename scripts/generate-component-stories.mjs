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
    description: 'Base text field used in forms, filters, and search inputs.',
    args: `{ value: '', placeholder: 'Default', disabled: false, invalid: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' }
  }`,
    playground: `<InputText {...args} value={args.value ?? ''} onChange={(event) => { updateArgs({ value: event.target.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'InputTextarea',
    prime: 'inputtextarea',
    importName: 'InputTextarea',
    description: 'Multi-line text field.',
    args: `{ value: '', placeholder: 'Your Message', rows: 5, cols: 30, autoResize: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    autoResize: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<InputTextarea {...args} value={args.value ?? ''} onChange={(event) => { updateArgs({ value: event.target.value }); args.onChange?.(event); } } />`,
  },

  {
    name: 'Calendar',
    prime: 'calendar',
    importName: 'Calendar',
    description: 'Date picker input.',
    args: `{ value: null, placeholder: 'Select date', showIcon: true, showButtonBar: true }`,
    argTypes: `{
    placeholder: { control: 'text' },
    showIcon: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<Calendar {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'Checkbox',
    prime: 'checkbox',
    importName: 'Checkbox',
    description: 'Boolean control or multi-selection option.',
    args: `{ checked: true, disabled: false }`,
    argTypes: `{
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<Checkbox {...args} aria-label="Checkbox" onChange={(event) => { updateArgs({ checked: event.checked ?? false }); args.onChange?.(event); } } />`,
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
    disabled: { control: 'boolean' }
  }`,
    playground: `<Chips {...args} onChange={(event) => { updateArgs({ value: event.value ?? [] }); args.onChange?.(event); } } />`,
  },
  {
    name: 'ColorPicker',
    prime: 'colorpicker',
    importName: 'ColorPicker',
    description: 'Visual color picker.',
    args: `{ value: '1976D2' }`,
    argTypes: `{
    value: { control: 'text' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<ColorPicker {...args} onChange={(event) => { updateArgs({ value: event.value ?? undefined }); args.onChange?.(event); } } />`,
  },
  {
    name: 'Dropdown',
    prime: 'dropdown',
    importName: 'Dropdown',
    description: 'Single-option selector.',
    renderPrefix: `const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];`,
    args: `{ value: null, placeholder: 'Select', optionLabel: 'name', options: cityOptions, filter: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    filter: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<Dropdown {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'InputMask',
    prime: 'inputmask',
    importName: 'InputMask',
    description: 'Text field with an input mask.',
    args: `{ value: '', mask: '99/99/9999', placeholder: '99/99/9999' }`,
    argTypes: `{
    mask: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<InputMask {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'InputNumber',
    prime: 'inputnumber',
    importName: 'InputNumber',
    description: 'Numeric input with formatting.',
    args: `{ value: null, placeholder: 'Number', mode: 'decimal', currency: 'USD', showButtons: true }`,
    argTypes: `{
    placeholder: { control: 'text' },
    showButtons: { control: 'boolean' },
    mode: { control: 'select', options: ['decimal', 'currency'] },
    disabled: { control: 'boolean' }
  }`,
    playground: `<InputNumber {...args} currency={args.currency ?? 'USD'} onValueChange={(event) => { updateArgs({ value: event.value }); args.onValueChange?.(event); }} />`,
  },
  {
    name: 'InputSwitch',
    prime: 'inputswitch',
    importName: 'InputSwitch',
    description: 'Boolean toggle switch.',
    args: `{ checked: true }`,
    argTypes: `{ checked: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<InputSwitch {...args} aria-label="InputSwitch" onChange={(event) => { updateArgs({ checked: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'Knob',
    prime: 'knob',
    importName: 'Knob',
    description: 'Circular numeric control.',
    args: `{ value: 20, min: 0, max: 100, step: 1 }`,
    argTypes: `{ value: { control: 'number' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, disabled: { control: 'boolean' } }`,
    playground: `<Knob {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'ListBox',
    prime: 'listbox',
    importName: 'ListBox',
    description: 'Selection list.',
    renderPrefix: `const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];`,
    args: `{ value: null, options: cityOptions, optionLabel: 'name' }`,
    argTypes: `{ disabled: { control: 'boolean' }, filter: { control: 'boolean' } }`,
    playground: `<ListBox {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />`,
  },
  {
    name: 'MultiSelect',
    prime: 'multiselect',
    importName: 'MultiSelect',
    description: 'Multiple-option selector.',
    renderPrefix: `const countryOptions = [{ name: 'Australia', code: 'AU' }, { name: 'Brazil', code: 'BR' }, { name: 'Germany', code: 'DE' }];`,
    args: `{ value: [], placeholder: 'Select Countries', options: countryOptions, optionLabel: 'name', display: 'chip' }`,
    argTypes: `{ placeholder: { control: 'text' }, display: { control: 'select', options: ['comma', 'chip'] }, filter: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<MultiSelect {...args} onChange={(event) => { updateArgs({ value: event.value ?? [] }); args.onChange?.(event); } } />`,
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
    description: 'Data table with sorting, filtering, pagination, and single-row selection.',
    renderPrefix: `const products = [
  { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 }
];`,
    args: `{ value: products, dataKey: 'id', paginator: true, rows: 1, stripedRows: false, showGridlines: false, selectionMode: 'single', selection: null }`,
    argTypes: `{ paginator: { control: 'boolean' }, stripedRows: { control: 'boolean' }, showGridlines: { control: 'boolean' }, rows: { control: 'number' } }`,
    playground: `<DataTable {...args} onSelectionChange={(event) => { updateArgs({ selection: event.value }); args.onSelectionChange?.(event); }}><Column field="name" header="Name" sortable filter /><Column field="category" header="Category" sortable /><Column field="price" header="Price" sortable /></DataTable>`,
  },
  {
    name: 'DataView',
    prime: 'dataview',
    importName: 'DataView',
    description: 'Collection view in list or grid layout.',
    renderPrefix: `const items = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];`,
    args: `{ value: items, layout: 'list', paginator: true, rows: 1 }`,
    argTypes: `{ layout: { control: 'inline-radio', options: ['list', 'grid'] }, paginator: { control: 'boolean' }, rows: { control: 'number' } }`,
    playground: `<DataView {...args} itemTemplate={(item: { name: string }, layout) => <div className={layout === 'grid' ? 'col-12 md:col-4 p-3' : 'col-12 p-3'}>{item.name}</div>} />`,
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
    description: 'Orderable list.',
    renderPrefix: `const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];`,
    args: `{ dataKey: 'name', filterBy: 'name', value: products, header: 'Products' }`,
    argTypes: `{ header: { control: 'text' }, filter: { control: 'boolean' } }`,
    playground: `<OrderList {...args} itemTemplate={(item: { name: string }) => <span>{item.name}</span>} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); }} />`,
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
    description: 'Semantic grouping container with a legend.',
    args: `{ legend: 'Legend', toggleable: true, collapsed: false }`,
    argTypes: `{ legend: { control: 'text' }, toggleable: { control: 'boolean' } }`,
    playground: `<Fieldset {...args} onToggle={(event) => { updateArgs({ collapsed: event.value }); args.onToggle?.(event); }}><p>Fieldset content.</p></Fieldset>`,
  },
  {
    name: 'Card',
    prime: 'card',
    importName: 'Card',
    description: 'Content container with title, subtitle, and footer areas.',
    args: `{ title: 'Card', subTitle: 'Subtitle' }`,
    argTypes: `{ title: { control: 'text' }, subTitle: { control: 'text' } }`,
    playground: `<Card {...args}><p className="m-0">Card content.</p></Card>`,
  },
  {
    name: 'Divider',
    prime: 'divider',
    importName: 'Divider',
    description: 'Visual separator.',
    args: `{ layout: 'horizontal', align: 'center' }`,
    argTypes: `{ layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, align: { control: 'select', options: ['left', 'center', 'right', 'top', 'bottom'] } }`,
    playground: `<div style={{ width: '24rem', maxWidth: '100%', display: args.layout === 'vertical' ? 'flex' : 'block' }}><span>Before</span><Divider {...args}>Divider</Divider><span>After</span></div>`,
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
    description: 'Modal window.',
    args: `{ header: 'Dialog', modal: true, visible: false, style: { width: '32rem', maxWidth: '90vw' } }`,
    argTypes: `{ header: { control: 'text' }, modal: { control: 'boolean' }, visible: { control: 'boolean' } }`,
    playground: `<><Button label="Open Dialog" onClick={() => updateArgs({ visible: true })} /><Dialog {...args} onHide={() => { updateArgs({ visible: false }); args.onHide?.(); } }><p>Dialog content.</p></Dialog></>`,
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
    description: 'Contextual confirmation.',
    args: `{ message: 'Are you sure?', visible: false }`,
    argTypes: `{ message: { control: 'text' } }`,
    playground: `<><Button label="Confirm" onClick={(event) => { setTarget(event.currentTarget); updateArgs({ visible: true }); }} /><ConfirmPopup {...args} target={target ?? undefined} onHide={() => updateArgs({ visible: false })} accept={() => { setResult('Accepted'); args.accept?.(); }} reject={() => { setResult('Rejected'); args.reject?.(); }} /><p role="status">{result}</p></>`,
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
    extraImports: `import { menuWithActions } from '../menuExamples';`,
    description: 'Primary horizontal menu.',
    renderPrefix: `const menuItems = [{ label: 'File', icon: 'pi pi-fw pi-file' }, { label: 'Edit', icon: 'pi pi-fw pi-pencil' }];`,
    args: `{ model: menuItems }`,
    argTypes: `{ style: { control: 'object' }, model: { control: 'object' } }`,
    playground: `<><Menubar {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>`,
  },
  {
    name: 'BreadCrumb',
    prime: 'breadcrumb',
    importName: 'BreadCrumb',
    hooks: `const [action, setAction] = useState('No action yet');`,
    extraImports: `import { menuWithActions } from '../menuExamples';`,
    description: 'Navigation breadcrumb.',
    renderPrefix: `const home = { icon: 'pi pi-home', url: '/' }; const items = [{ label: 'Computer' }, { label: 'Notebook' }];`,
    args: `{ home, model: items }`,
    argTypes: `{ model: { control: 'object' } }`,
    playground: `<><BreadCrumb {...args} home={{ icon: 'pi pi-home', command: () => setAction('Home selected') }} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>`,
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
    description: 'Simple vertical menu or popup menu.',
    renderPrefix: `const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Update', icon: 'pi pi-refresh' }];`,
    args: `{ model: items }`,
    argTypes: `{ popup: { control: 'boolean' } }`,
    playground: `<><>{args.popup && <Button label="Open menu" onClick={(event) => ref.current?.toggle(event)} />}<Menu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /></><p role="status">{action}</p></>`,
  },
  {
    name: 'ContextMenu',
    prime: 'contextmenu',
    importName: 'ContextMenu',
    hooks: `const ref = useRef<ContextMenu>(null);
  const [action, setAction] = useState('No action yet');`,
    extraImports: `import { Button } from 'primereact/button';
import { menuWithActions } from '../menuExamples';`,
    description: 'Context-triggered menu.',
    renderPrefix: `const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Delete', icon: 'pi pi-times' }];`,
    args: `{ model: items }`,
    argTypes: `{ model: { control: 'object' } }`,
    playground: `<><><ContextMenu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /><div tabIndex={0} className="p-4 border-1 border-round" onContextMenu={(event) => ref.current?.show(event)} onKeyDown={(event) => { if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) { event.preventDefault(); ref.current?.show(event); } }}>Right click or press Shift+F10 here</div></><p role="status">{action}</p></>`,
  },
  {
    name: 'MegaMenu',
    prime: 'megamenu',
    importName: 'MegaMenu',
    hooks: `const [action, setAction] = useState('No action yet');`,
    extraImports: `import { menuWithActions } from '../menuExamples';`,
    description: 'Large grouped menu.',
    renderPrefix: `const items = [{ label: 'Videos', icon: 'pi pi-fw pi-video', items: [[{ label: 'Video 1', items: [{ label: 'Video 1.1' }] }]] }];`,
    args: `{ model: items, orientation: 'horizontal' }`,
    argTypes: `{ orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } }`,
    playground: `<><MegaMenu {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>`,
  },
  {
    name: 'PanelMenu',
    prime: 'panelmenu',
    importName: 'PanelMenu',
    hooks: `const [action, setAction] = useState('No action yet');`,
    extraImports: `import { menuWithActions } from '../menuExamples';`,
    description: 'Menu with expandable panels.',
    renderPrefix: `const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }] }];`,
    args: `{ model: items, style: { width: '20rem' } }`,
    argTypes: `{ multiple: { control: 'boolean' } }`,
    playground: `<><PanelMenu {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>`,
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
    hooks: `const ref = useRef<Messages>(null);`,
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Programmatic message list.',
    args: `{}`,
    argTypes: `{ className: { control: 'text' }, style: { control: 'object' } }`,
    playground: `<><Messages {...args} ref={ref} /><Button label="Show messages" onClick={() => ref.current?.show({ severity: 'success', summary: 'Success', detail: 'Action completed', life: 3000 })} /><Button label="Clear" outlined onClick={() => ref.current?.clear()} /></>`,
  },
  {
    name: 'Message',
    prime: 'message',
    importName: 'Message',
    description: 'Inline message.',
    args: `{ severity: 'info', text: 'Message content' }`,
    argTypes: `{ severity: { control: 'select', options: ['success', 'info', 'warn', 'error'] }, text: { control: 'text' } }`,
    playground: `<Message {...args} />`,
  },
  {
    name: 'Carousel',
    prime: 'carousel',
    importName: 'Carousel',
    description: 'Item carousel.',
    renderPrefix: `const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }, { name: 'Blue Band' }];`,
    args: `{ value: products, numVisible: 1, numScroll: 1, circular: false }`,
    argTypes: `{ numVisible: { control: 'number' }, numScroll: { control: 'number' }, circular: { control: 'boolean' } }`,
    playground: `<Carousel {...args} itemTemplate={(item: { name: string }) => <div className="p-3 text-center">{item.name}</div>} />`,
  },

  {
    name: 'Galleria',
    prime: 'galleria',
    importName: 'Galleria',
    description: 'Image gallery.',
    renderPrefix: `const images = [1, 2, 3].map((index) => ({ itemImageSrc: './demo/images/galleria/galleria' + index + '.jpg', thumbnailImageSrc: './demo/images/galleria/galleria' + index + 's.jpg', alt: 'Landscape ' + index }));`,
    args: `{ value: images, numVisible: 1, circular: true, showItemNavigators: true }`,
    argTypes: `{ numVisible: { control: 'number' }, circular: { control: 'boolean' }, showItemNavigators: { control: 'boolean' } }`,
    playground: `<Galleria {...args} item={(item: (typeof images)[number]) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />} thumbnail={(item: (typeof images)[number]) => <img src={item.thumbnailImageSrc} alt={item.alt} />} style={{ maxWidth: '420px' }} />`,
  },
  {
    name: 'FileUpload',
    prime: 'fileupload',
    importName: 'FileUpload',
    hooks: `const ref = useRef<FileUpload>(null);
  const [result, setResult] = useState('Select a file to simulate an upload. Files stay in this browser.');`,
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Basic or advanced file upload.',
    args: `{ mode: 'basic', name: 'demo[]', accept: 'image/*', maxFileSize: 1000000, chooseLabel: 'Choose' }`,
    argTypes: `{ mode: { control: 'inline-radio', options: ['basic', 'advanced'] }, chooseLabel: { control: 'text' }, auto: { control: 'boolean' }, multiple: { control: 'boolean' } }`,
    playground: `<><FileUpload {...args} pt={{ uploadButton: { root: { 'aria-hidden': false } }, cancelButton: { root: { 'aria-hidden': false } }, removeButton: { root: { 'aria-label': 'Remove file' } }, ...args.pt }} ref={ref} customUpload uploadHandler={(event) => { setResult(event.files.length + ' file(s) processed locally.'); event.options.clear(); args.uploadHandler?.(event); }} onClear={() => { args.onClear?.(); }} /><p role="status">{result}</p></>`,
  },
  {
    name: 'Chart',
    prime: 'chart',
    importName: 'Chart',
    description: 'Charts powered by Chart.js.',
    renderPrefix: `const data = { labels: ['A', 'B', 'C'], datasets: [{ label: 'Dataset', data: [12, 19, 3], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'] }] };`,
    args: `{ type: 'bar', data }`,
    argTypes: `{ type: { control: 'select', options: ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar'] } }`,
    playground: `<div style={{ width: '32rem', maxWidth: '100%' }}><Chart {...args} /></div>`,
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
    description: 'Numeric marker or status indicator.',
    args: `{ value: '2', severity: 'info', size: undefined }`,
    argTypes: `{ value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, size: { control: 'select', options: [undefined, 'large', 'xlarge'] } }`,
    playground: `<Badge {...args} />`,
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
    description: 'Avatar group.',
    args: `{}`,
    argTypes: `{ className: { control: 'text' }, style: { control: 'object' } }`,
    playground: `<AvatarGroup {...args}><Avatar label="A" shape="circle" /><Avatar label="B" shape="circle" /><Avatar label="+2" shape="circle" /></AvatarGroup>`,
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
    description: 'Text chip with optional icon or image.',
    args: `{ label: 'Action', icon: undefined, removable: false }`,
    argTypes: `{ label: { control: 'text' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, removable: { control: 'boolean' } }`,
    playground: `<Chip {...args} />`,
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
  if (['InputText', 'InputTextarea', 'Password', 'InputMask', 'Calendar', 'Chips', 'Dropdown', 'ListBox', 'MultiSelect', 'SelectButton', 'InputNumber'].includes(component.name)) {
    const control = ['InputText', 'InputTextarea', 'Password', 'InputMask'].includes(component.name) ? 'text' : component.name === 'InputNumber' ? 'number' : 'object';
    component.argTypes = component.argTypes.replace('{', `{ value: { control: '${control}' },`);
  }
}

const manualComponents = new Set(['Button', 'Accordion', 'AutoComplete', 'Image', 'Panel']);

function createExamples(component) {
  const type = component.name === 'DataTable' ? 'DataTablePropsSingle<typeof products>' : ['Dialog', 'Sidebar'].includes(component.name) ? `Omit<ComponentProps<typeof ${component.importName}>, 'onHide'> & { onHide?: () => void }` : `ComponentProps<typeof ${component.importName}>`;
  const typeImport = component.name === 'DataTable' ? "import type { DataTablePropsSingle } from 'primereact/datatable';\n" : '';
  return `import { useState${component.hooks?.includes('useRef') ? ', useRef' : ''}${component.hooks?.includes('useId') ? ', useId' : ''}${component.name === 'DataTable' ? '' : ', type ComponentProps'} } from 'react';
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
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
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
${['DataTable', 'Dialog', 'Sidebar'].includes(component.name) ? '' : `  component: ${component.importName},\n`}  parameters: {
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
  const examples = component.docsVariations ? component.docsVariations.map(({ title, code }) => `### ${title}

<div className="component-example sb-unstyled flex flex-wrap align-items-center gap-2">
${code}
</div>

<Source code={${JSON.stringify(code)}} language="tsx" />`).join('\n\n') : variations.map(({title,args}) => `### ${title}

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
