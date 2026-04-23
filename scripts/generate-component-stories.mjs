import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const outDir = path.join(root, 'src/stories/components');

const sourcePath = {
  button: '../../../vendor/sakai-react/app/(main)/uikit/button/page',
  charts: '../../../vendor/sakai-react/app/(main)/uikit/charts/page',
  file: '../../../vendor/sakai-react/app/(main)/uikit/file/page',
  floatlabel: '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page',
  input: '../../../vendor/sakai-react/app/(main)/uikit/input/page',
  invalidstate: '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page',
  list: '../../../vendor/sakai-react/app/(main)/uikit/list/page',
  media: '../../../vendor/sakai-react/app/(main)/uikit/media/page',
  menu: '../../../vendor/sakai-react/app/(main)/uikit/menu/page',
  message: '../../../vendor/sakai-react/app/(main)/uikit/message/page',
  misc: '../../../vendor/sakai-react/app/(main)/uikit/misc/page',
  overlay: '../../../vendor/sakai-react/app/(main)/uikit/overlay/page',
  panel: '../../../vendor/sakai-react/app/(main)/uikit/panel/page',
  table: '../../../vendor/sakai-react/app/(main)/uikit/table/page',
  tree: '../../../vendor/sakai-react/app/(main)/uikit/tree/page'
};

const commonArgTypes = `{
    className: { control: 'text' },
    disabled: { control: 'boolean' }
  }`;

const components = [
  {
    name: 'SplitButton',
    prime: 'splitbutton',
    importName: 'SplitButton',
    description: 'Split action button with a primary action and an options menu.',
    args: `{ label: 'Save', icon: 'pi pi-check', severity: 'secondary' }`,
    argTypes: `{
    label: { control: 'text' },
    icon: { control: 'text' },
    severity: { control: 'select', options: [undefined, 'secondary', 'success', 'info', 'warning', 'help', 'danger'] },
    disabled: { control: 'boolean' }
  }`,
    renderPrefix: `const splitItems = [
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { label: 'Home', icon: 'pi pi-home' }
];`,
    playground: `<SplitButton {...args} model={splitItems} />`,
    code: `<SplitButton label="Save" icon="pi pi-check" model={items} severity="secondary" />`,
    demos: [{ page: 'button', section: 'SplitButton', name: 'SakaiSplitButton' }]
  },
  {
    name: 'InputText',
    prime: 'inputtext',
    importName: 'InputText',
    description: 'Base text field used in forms, filters, and search inputs.',
    args: `{ placeholder: 'Default', disabled: false, invalid: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' }
  }`,
    playground: `<InputText {...args} className={args.invalid ? 'p-invalid' : undefined} />`,
    code: `<InputText placeholder="Default" />`,
    demos: [
      { page: 'input', section: 'InputText' },
      { page: 'input', section: 'Icons' },
      { page: 'input', section: 'Float Label' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
  },
  {
    name: 'InputTextarea',
    prime: 'inputtextarea',
    importName: 'InputTextarea',
    description: 'Multi-line text field.',
    args: `{ placeholder: 'Your Message', rows: 5, cols: 30, autoResize: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    autoResize: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<InputTextarea {...args} />`,
    code: `<InputTextarea placeholder="Your Message" rows={5} cols={30} />`,
    demos: [
      { page: 'input', section: 'Textarea' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
  },
  {
    name: 'AutoComplete',
    prime: 'autocomplete',
    importName: 'AutoComplete',
    description: 'Input field with suggestions and autocomplete behavior.',
    renderPrefix: `const countries = [{ name: 'Brazil' }, { name: 'United States' }, { name: 'Germany' }, { name: 'Japan' }];`,
    args: `{ placeholder: 'Search', dropdown: true, field: 'name', suggestions: countries }`,
    argTypes: `{
    placeholder: { control: 'text' },
    dropdown: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<AutoComplete {...args} completeMethod={() => undefined} />`,
    code: `<AutoComplete placeholder="Search" dropdown suggestions={countries} field="name" completeMethod={searchCountry} />`,
    demos: [
      { page: 'input', section: 'AutoComplete' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
  },
  {
    name: 'Calendar',
    prime: 'calendar',
    importName: 'Calendar',
    description: 'Date picker input.',
    args: `{ placeholder: 'Select date', showIcon: true, showButtonBar: true }`,
    argTypes: `{
    placeholder: { control: 'text' },
    showIcon: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<Calendar {...args} />`,
    code: `<Calendar showIcon showButtonBar />`,
    demos: [
      { page: 'input', section: 'Calendar' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
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
    playground: `<Checkbox {...args} onChange={() => undefined} />`,
    code: `<Checkbox checked={checked} onChange={(event) => setChecked(event.checked)} />`,
    demos: [{ page: 'input', section: 'Checkbox' }]
  },
  {
    name: 'Chips',
    prime: 'chips',
    importName: 'Chips',
    description: 'Multi-value input rendered as chips.',
    args: `{ placeholder: 'Add item', separator: ',' }`,
    argTypes: `{
    placeholder: { control: 'text' },
    separator: { control: 'text' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<Chips {...args} />`,
    code: `<Chips value={chipsValue} onChange={(event) => setChipsValue(event.value ?? [])} />`,
    demos: [
      { page: 'input', section: 'Chips' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
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
    playground: `<ColorPicker {...args} />`,
    code: `<ColorPicker value={colorValue} onChange={(event) => setColorValue(event.value)} />`,
    demos: [{ page: 'input', section: 'ColorPicker' }]
  },
  {
    name: 'Dropdown',
    prime: 'dropdown',
    importName: 'Dropdown',
    description: 'Single-option selector.',
    renderPrefix: `const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];`,
    args: `{ placeholder: 'Select', optionLabel: 'name', options: cityOptions, filter: false }`,
    argTypes: `{
    placeholder: { control: 'text' },
    filter: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<Dropdown {...args} />`,
    code: `<Dropdown value={dropdownValue} onChange={(event) => setDropdownValue(event.value)} options={cities} optionLabel="name" placeholder="Select" />`,
    demos: [
      { page: 'input', section: 'Dropdown' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
  },
  {
    name: 'InputMask',
    prime: 'inputmask',
    importName: 'InputMask',
    description: 'Text field with an input mask.',
    args: `{ mask: '99/99/9999', placeholder: '99/99/9999' }`,
    argTypes: `{
    mask: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' }
  }`,
    playground: `<InputMask {...args} />`,
    code: `<InputMask mask="99/99/9999" placeholder="99/99/9999" />`,
    demos: [
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
  },
  {
    name: 'InputNumber',
    prime: 'inputnumber',
    importName: 'InputNumber',
    description: 'Numeric input with formatting.',
    args: `{ placeholder: 'Number', mode: 'decimal', showButtons: true }`,
    argTypes: `{
    placeholder: { control: 'text' },
    showButtons: { control: 'boolean' },
    mode: { control: 'select', options: ['decimal', 'currency'] },
    disabled: { control: 'boolean' }
  }`,
    playground: `<InputNumber {...args} />`,
    code: `<InputNumber value={inputNumberValue} onValueChange={(event) => setInputNumberValue(event.value)} />`,
    demos: [
      { page: 'input', section: 'InputNumber' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
  },
  {
    name: 'InputSwitch',
    prime: 'inputswitch',
    importName: 'InputSwitch',
    description: 'Boolean toggle switch.',
    args: `{ checked: true }`,
    argTypes: `{ checked: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<InputSwitch {...args} onChange={() => undefined} />`,
    code: `<InputSwitch checked={switchValue} onChange={(event) => setSwitchValue(event.value)} />`,
    demos: [{ page: 'input', section: 'Input Switch' }]
  },
  {
    name: 'Knob',
    prime: 'knob',
    importName: 'Knob',
    description: 'Circular numeric control.',
    args: `{ value: 20, min: 0, max: 100, step: 1 }`,
    argTypes: `{ value: { control: 'number' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, disabled: { control: 'boolean' } }`,
    playground: `<Knob {...args} />`,
    code: `<Knob value={knobValue} onChange={(event) => setKnobValue(event.value)} />`,
    demos: [{ page: 'input', section: 'Knob' }]
  },
  {
    name: 'ListBox',
    prime: 'listbox',
    importName: 'ListBox',
    description: 'Selection list.',
    renderPrefix: `const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];`,
    args: `{ options: cityOptions, optionLabel: 'name' }`,
    argTypes: `{ disabled: { control: 'boolean' }, filter: { control: 'boolean' } }`,
    playground: `<ListBox {...args} />`,
    code: `<ListBox value={listboxValue} onChange={(event) => setListboxValue(event.value)} options={cities} optionLabel="name" />`,
    demos: [{ page: 'input', section: 'Listbox' }]
  },
  {
    name: 'MultiSelect',
    prime: 'multiselect',
    importName: 'MultiSelect',
    description: 'Multiple-option selector.',
    renderPrefix: `const countryOptions = [{ name: 'Australia', code: 'AU' }, { name: 'Brazil', code: 'BR' }, { name: 'Germany', code: 'DE' }];`,
    args: `{ placeholder: 'Select Countries', options: countryOptions, optionLabel: 'name', display: 'chip' }`,
    argTypes: `{ placeholder: { control: 'text' }, display: { control: 'select', options: ['comma', 'chip'] }, filter: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<MultiSelect {...args} />`,
    code: `<MultiSelect value={multiselectValue} onChange={(event) => setMultiselectValue(event.value)} options={countries} optionLabel="name" placeholder="Select Countries" />`,
    demos: [
      { page: 'input', section: 'MultiSelect' },
      { page: 'floatlabel', section: 'Float Label', name: 'FloatLabelVariants' },
      { page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }
    ]
  },
  {
    name: 'Password',
    prime: 'password',
    importName: 'Password',
    description: 'Password input with feedback.',
    args: `{ placeholder: 'Password', feedback: true, toggleMask: true }`,
    argTypes: `{ placeholder: { control: 'text' }, feedback: { control: 'boolean' }, toggleMask: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<Password {...args} />`,
    code: `<Password placeholder="Password" feedback toggleMask />`,
    demos: [{ page: 'invalidstate', section: 'Invalid State', name: 'InvalidStateVariants' }]
  },
  {
    name: 'RadioButton',
    prime: 'radiobutton',
    importName: 'RadioButton',
    description: 'Single option within a group.',
    args: `{ checked: true, value: 'Option 1' }`,
    argTypes: `{ checked: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<RadioButton {...args} onChange={() => undefined} />`,
    code: `<RadioButton value="Option 1" checked={radioValue === 'Option 1'} onChange={(event) => setRadioValue(event.value)} />`,
    demos: [{ page: 'input', section: 'RadioButton' }]
  },
  {
    name: 'Rating',
    prime: 'rating',
    importName: 'Rating',
    description: 'Star rating control.',
    args: `{ value: 3, stars: 5, cancel: false }`,
    argTypes: `{ value: { control: 'number' }, stars: { control: 'number' }, cancel: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<Rating {...args} />`,
    code: `<Rating value={ratingValue} onChange={(event) => setRatingValue(event.value)} />`,
    demos: [{ page: 'input', section: 'Rating' }]
  },
  {
    name: 'SelectButton',
    prime: 'selectbutton',
    importName: 'SelectButton',
    description: 'Button-based selection control.',
    renderPrefix: `const selectOptions = [{ name: 'Option 1', code: 'O1' }, { name: 'Option 2', code: 'O2' }, { name: 'Option 3', code: 'O3' }];`,
    args: `{ options: selectOptions, optionLabel: 'name', multiple: false }`,
    argTypes: `{ multiple: { control: 'boolean' }, disabled: { control: 'boolean' } }`,
    playground: `<SelectButton {...args} />`,
    code: `<SelectButton value={value} onChange={(event) => setValue(event.value)} options={options} optionLabel="name" />`,
    demos: [
      { page: 'input', section: 'SelectButton' },
      { page: 'input', section: 'SelectButton - Multiple', name: 'Multiple' }
    ]
  },
  {
    name: 'Slider',
    prime: 'slider',
    importName: 'Slider',
    description: 'Range value control.',
    args: `{ value: 50, min: 0, max: 100, step: 1 }`,
    argTypes: `{ value: { control: 'number' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, disabled: { control: 'boolean' } }`,
    playground: `<div style={{ width: '18rem' }}><Slider {...args} /></div>`,
    code: `<Slider value={sliderValue} onChange={(event) => setSliderValue(event.value)} />`,
    demos: [{ page: 'input', section: 'Slider' }]
  },
  {
    name: 'ToggleButton',
    prime: 'togglebutton',
    importName: 'ToggleButton',
    description: 'On/off toggle button.',
    args: `{ checked: true, onLabel: 'Yes', offLabel: 'No', onIcon: 'pi pi-check', offIcon: 'pi pi-times' }`,
    argTypes: `{ checked: { control: 'boolean' }, onLabel: { control: 'text' }, offLabel: { control: 'text' }, disabled: { control: 'boolean' } }`,
    playground: `<ToggleButton {...args} onChange={() => undefined} />`,
    code: `<ToggleButton checked={toggleValue} onChange={(event) => setToggleValue(event.value)} onLabel="Yes" offLabel="No" />`,
    demos: [{ page: 'input', section: 'ToggleButton' }]
  },
  {
    name: 'DataTable',
    prime: 'datatable',
    importName: 'DataTable',
    extraImports: `import { Column } from 'primereact/column';`,
    description: 'Data table with filtering, selection, expansion, and grouping.',
    renderPrefix: `const products = [
  { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 }
];`,
    args: `{ value: products, paginator: false, rows: 5, stripedRows: false, showGridlines: false }`,
    argTypes: `{ paginator: { control: 'boolean' }, stripedRows: { control: 'boolean' }, showGridlines: { control: 'boolean' }, rows: { control: 'number' } }`,
    playground: `<DataTable {...args}><Column field="name" header="Name" /><Column field="category" header="Category" /><Column field="price" header="Price" /></DataTable>`,
    code: `<DataTable value={products}><Column field="name" header="Name" /></DataTable>`,
    demos: [
      { page: 'table', section: 'Filter Menu' },
      { page: 'table', section: 'Frozen Columns' },
      { page: 'table', section: 'Row Expand' },
      { page: 'table', section: 'Subheader Grouping' }
    ]
  },
  {
    name: 'DataView',
    prime: 'dataview',
    importName: 'DataView',
    description: 'Collection view in list or grid layout.',
    renderPrefix: `const items = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];`,
    args: `{ value: items }`,
    argTypes: `{}`,
    playground: `<DataView {...args} itemTemplate={(item) => <div className="p-3">{item.name}</div>} />`,
    code: `<DataView value={products} itemTemplate={itemTemplate} />`,
    demos: [{ page: 'list', section: 'DataView' }]
  },
  {
    name: 'PickList',
    prime: 'picklist',
    importName: 'PickList',
    description: 'Transfer items between lists.',
    renderPrefix: `const source = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];`,
    args: `{ source, target: [], sourceHeader: 'Available', targetHeader: 'Selected' }`,
    argTypes: `{}`,
    playground: `<PickList {...args} itemTemplate={(item) => <span>{item.name}</span>} onChange={() => undefined} />`,
    code: `<PickList source={source} target={target} itemTemplate={itemTemplate} onChange={onChange} />`,
    demos: [{ page: 'list', section: 'PickList' }]
  },
  {
    name: 'OrderList',
    prime: 'orderlist',
    importName: 'OrderList',
    description: 'Orderable list.',
    renderPrefix: `const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];`,
    args: `{ value: products, header: 'Products' }`,
    argTypes: `{}`,
    playground: `<OrderList {...args} itemTemplate={(item) => <span>{item.name}</span>} onChange={() => undefined} />`,
    code: `<OrderList value={products} itemTemplate={itemTemplate} onChange={onChange} />`,
    demos: [{ page: 'list', section: 'OrderList' }]
  },
  {
    name: 'Tree',
    prime: 'tree',
    importName: 'Tree',
    description: 'Expandable hierarchical structure.',
    renderPrefix: `const nodes = [{ key: '0', label: 'Documents', children: [{ key: '0-0', label: 'Work' }] }];`,
    args: `{ value: nodes }`,
    argTypes: `{}`,
    playground: `<Tree {...args} />`,
    code: `<Tree value={nodes} />`,
    demos: [{ page: 'tree', section: 'Tree' }]
  },
  {
    name: 'TreeTable',
    prime: 'treetable',
    importName: 'TreeTable',
    extraImports: `import { Column } from 'primereact/column';`,
    description: 'Hierarchical table.',
    renderPrefix: `const nodes = [{ key: '0', data: { name: 'Applications', size: '100kb', type: 'Folder' }, children: [{ key: '0-0', data: { name: 'React', size: '25kb', type: 'Folder' } }] }];`,
    args: `{ value: nodes }`,
    argTypes: `{}`,
    playground: `<TreeTable {...args}><Column field="name" header="Name" expander /><Column field="size" header="Size" /><Column field="type" header="Type" /></TreeTable>`,
    code: `<TreeTable value={nodes}><Column field="name" header="Name" expander /></TreeTable>`,
    demos: [{ page: 'tree', section: 'TreeTable' }]
  },
  {
    name: 'Toolbar',
    prime: 'toolbar',
    importName: 'Toolbar',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Action toolbar.',
    args: `{}`,
    argTypes: `{}`,
    playground: `<Toolbar start={<Button label="New" icon="pi pi-plus" />} end={<Button label="Save" icon="pi pi-check" />} />`,
    code: `<Toolbar start={toolbarLeftTemplate} end={toolbarRightTemplate} />`,
    demos: [{ page: 'panel', section: 'Toolbar' }]
  },
  {
    name: 'Accordion',
    prime: 'accordion',
    importName: 'Accordion',
    extraImports: `import { AccordionTab } from 'primereact/accordion';`,
    description: 'Expandable content in vertical panels.',
    args: `{ activeIndex: 0 }`,
    argTypes: `{ activeIndex: { control: 'number' } }`,
    playground: `<Accordion {...args}><AccordionTab header="Header I"><p>Content I</p></AccordionTab><AccordionTab header="Header II"><p>Content II</p></AccordionTab></Accordion>`,
    code: `<Accordion activeIndex={0}><AccordionTab header="Header I">Content</AccordionTab></Accordion>`,
    demos: [{ page: 'panel', section: 'AccordionPanel' }]
  },
  {
    name: 'TabView',
    prime: 'tabview',
    importName: 'TabView',
    extraImports: `import { TabPanel } from 'primereact/tabview';`,
    description: 'Tabbed navigation.',
    args: `{ activeIndex: 0 }`,
    argTypes: `{ activeIndex: { control: 'number' } }`,
    playground: `<TabView {...args}><TabPanel header="Header I"><p>Content I</p></TabPanel><TabPanel header="Header II"><p>Content II</p></TabPanel></TabView>`,
    code: `<TabView><TabPanel header="Header I">Content</TabPanel></TabView>`,
    demos: [{ page: 'panel', section: 'TabView' }]
  },
  {
    name: 'Panel',
    prime: 'panel',
    importName: 'Panel',
    description: 'Container with a header and optional toggle behavior.',
    args: `{ header: 'Header', toggleable: true }`,
    argTypes: `{ header: { control: 'text' }, toggleable: { control: 'boolean' }, collapsed: { control: 'boolean' } }`,
    playground: `<Panel {...args}><p>Panel content.</p></Panel>`,
    code: `<Panel header="Header" toggleable>Content</Panel>`,
    demos: [{ page: 'panel', section: 'Panel' }]
  },
  {
    name: 'Fieldset',
    prime: 'fieldset',
    importName: 'Fieldset',
    description: 'Semantic grouping container with a legend.',
    args: `{ legend: 'Legend', toggleable: true }`,
    argTypes: `{ legend: { control: 'text' }, toggleable: { control: 'boolean' } }`,
    playground: `<Fieldset {...args}><p>Fieldset content.</p></Fieldset>`,
    code: `<Fieldset legend="Legend" toggleable>Content</Fieldset>`,
    demos: [{ page: 'panel', section: 'Fieldset' }]
  },
  {
    name: 'Card',
    prime: 'card',
    importName: 'Card',
    description: 'Content container with title, subtitle, and footer areas.',
    args: `{ title: 'Card', subTitle: 'Subtitle' }`,
    argTypes: `{ title: { control: 'text' }, subTitle: { control: 'text' } }`,
    playground: `<Card {...args}><p className="m-0">Card content.</p></Card>`,
    code: `<Card title="Card"><p>Content</p></Card>`,
    demos: [{ page: 'panel', section: 'Card' }]
  },
  {
    name: 'Divider',
    prime: 'divider',
    importName: 'Divider',
    description: 'Visual separator.',
    args: `{ layout: 'horizontal', align: 'center' }`,
    argTypes: `{ layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, align: { control: 'select', options: ['left', 'center', 'right', 'top', 'bottom'] } }`,
    playground: `<div style={{ width: '24rem' }}><span>Before</span><Divider {...args}>Divider</Divider><span>After</span></div>`,
    code: `<Divider align="center">Divider</Divider>`,
    demos: [{ page: 'panel', section: 'Divider' }]
  },
  {
    name: 'Splitter',
    prime: 'splitter',
    importName: 'Splitter',
    extraImports: `import { SplitterPanel } from 'primereact/splitter';`,
    description: 'Resizable panel layout.',
    args: `{ style: { height: '180px', width: '30rem' } }`,
    argTypes: `{}`,
    playground: `<Splitter {...args}><SplitterPanel className="flex align-items-center justify-content-center">Panel 1</SplitterPanel><SplitterPanel className="flex align-items-center justify-content-center">Panel 2</SplitterPanel></Splitter>`,
    code: `<Splitter><SplitterPanel>Panel 1</SplitterPanel><SplitterPanel>Panel 2</SplitterPanel></Splitter>`,
    demos: [{ page: 'panel', section: 'Splitter' }]
  },
  {
    name: 'Dialog',
    prime: 'dialog',
    importName: 'Dialog',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Modal window.',
    args: `{ header: 'Header', modal: true, visible: true, style: { width: '32rem' } }`,
    argTypes: `{ header: { control: 'text' }, modal: { control: 'boolean' }, visible: { control: 'boolean' } }`,
    playground: `<><Button label="Open" /><Dialog {...args} onHide={() => undefined}><p className="m-0">Dialog content.</p></Dialog></>`,
    code: `<Dialog header="Header" visible={visible} onHide={() => setVisible(false)}>Content</Dialog>`,
    demos: [{ page: 'overlay', section: 'Dialog' }]
  },
  {
    name: 'OverlayPanel',
    prime: 'overlaypanel',
    importName: 'OverlayPanel',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Floating panel triggered by an event.',
    args: `{}`,
    argTypes: `{}`,
    playground: `<><Button label="Show" /><OverlayPanel><p>Overlay content.</p></OverlayPanel></>`,
    code: `<OverlayPanel ref={overlayPanel}>Content</OverlayPanel>`,
    demos: [{ page: 'overlay', section: 'Overlay Panel' }]
  },
  {
    name: 'Sidebar',
    prime: 'sidebar',
    importName: 'Sidebar',
    description: 'Side panel.',
    args: `{ visible: true, position: 'right' }`,
    argTypes: `{ visible: { control: 'boolean' }, position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] } }`,
    playground: `<Sidebar {...args} onHide={() => undefined}><p>Sidebar content.</p></Sidebar>`,
    code: `<Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>Content</Sidebar>`,
    demos: [{ page: 'overlay', section: 'Sidebar' }]
  },
  {
    name: 'ConfirmPopup',
    prime: 'confirmpopup',
    importName: 'ConfirmPopup',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Contextual confirmation.',
    args: `{}`,
    argTypes: `{}`,
    playground: `<><Button label="Confirm" /><ConfirmPopup /></>`,
    code: `<ConfirmPopup /><Button onClick={(event) => confirmPopup({ target: event.currentTarget, message: 'Are you sure?' })} />`,
    demos: [
      { page: 'overlay', section: 'Confirmation' },
      { page: 'overlay', section: 'ConfirmPopup' }
    ]
  },
  {
    name: 'Tooltip',
    prime: 'tooltip',
    importName: 'Tooltip',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Contextual hint.',
    args: `{ target: '.tooltip-target', content: 'Tooltip content' }`,
    argTypes: `{ content: { control: 'text' }, position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } }`,
    playground: `<><Tooltip {...args} /><Button className="tooltip-target" label="Hover me" /></>`,
    code: `<Tooltip target=".tooltip-target" content="Tooltip content" />`,
    demos: [{ page: 'overlay', section: 'Tooltip' }]
  },
  {
    name: 'Menubar',
    prime: 'menubar',
    importName: 'Menubar',
    description: 'Primary horizontal menu.',
    renderPrefix: `const menuItems = [{ label: 'File', icon: 'pi pi-fw pi-file' }, { label: 'Edit', icon: 'pi pi-fw pi-pencil' }];`,
    args: `{ model: menuItems }`,
    argTypes: `{}`,
    playground: `<Menubar {...args} />`,
    code: `<Menubar model={items} />`,
    demos: [{ page: 'menu', section: 'Menubar' }]
  },
  {
    name: 'BreadCrumb',
    prime: 'breadcrumb',
    importName: 'BreadCrumb',
    description: 'Navigation breadcrumb.',
    renderPrefix: `const home = { icon: 'pi pi-home', url: '/' }; const items = [{ label: 'Computer' }, { label: 'Notebook' }];`,
    args: `{ home, model: items }`,
    argTypes: `{}`,
    playground: `<BreadCrumb {...args} />`,
    code: `<BreadCrumb home={home} model={items} />`,
    demos: [{ page: 'menu', section: 'Breadcrumb' }]
  },
  {
    name: 'Steps',
    prime: 'steps',
    importName: 'Steps',
    description: 'Step-based flow.',
    renderPrefix: `const items = [{ label: 'Personal' }, { label: 'Seat' }, { label: 'Payment' }];`,
    args: `{ model: items, activeIndex: 0 }`,
    argTypes: `{ activeIndex: { control: 'number' } }`,
    playground: `<Steps {...args} />`,
    code: `<Steps model={items} activeIndex={activeIndex} />`,
    demos: [{ page: 'menu', section: 'Steps' }]
  },
  {
    name: 'TabMenu',
    prime: 'tabmenu',
    importName: 'TabMenu',
    description: 'Tabbed menu.',
    renderPrefix: `const items = [{ label: 'Home', icon: 'pi pi-fw pi-home' }, { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }];`,
    args: `{ model: items, activeIndex: 0 }`,
    argTypes: `{ activeIndex: { control: 'number' } }`,
    playground: `<TabMenu {...args} />`,
    code: `<TabMenu model={items} activeIndex={activeIndex} />`,
    demos: [{ page: 'menu', section: 'TabMenu' }]
  },
  {
    name: 'TieredMenu',
    prime: 'tieredmenu',
    importName: 'TieredMenu',
    description: 'Hierarchical menu.',
    renderPrefix: `const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }] }];`,
    args: `{ model: items }`,
    argTypes: `{ popup: { control: 'boolean' } }`,
    playground: `<TieredMenu {...args} />`,
    code: `<TieredMenu model={items} />`,
    demos: [{ page: 'menu', section: 'Tiered Menu' }]
  },
  {
    name: 'Menu',
    prime: 'menu',
    importName: 'Menu',
    description: 'Simple vertical menu or popup menu.',
    renderPrefix: `const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Update', icon: 'pi pi-refresh' }];`,
    args: `{ model: items }`,
    argTypes: `{ popup: { control: 'boolean' } }`,
    playground: `<Menu {...args} />`,
    code: `<Menu model={items} />`,
    demos: [
      { page: 'menu', section: 'Plain Menu' },
      { page: 'menu', section: 'Overlay Menu' }
    ]
  },
  {
    name: 'ContextMenu',
    prime: 'contextmenu',
    importName: 'ContextMenu',
    description: 'Context-triggered menu.',
    renderPrefix: `const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Delete', icon: 'pi pi-times' }];`,
    args: `{ model: items }`,
    argTypes: `{}`,
    playground: `<div><ContextMenu {...args} /><div className="p-4 border-1 border-round">Right click area</div></div>`,
    code: `<ContextMenu model={items} ref={contextMenu} />`,
    demos: [{ page: 'menu', section: 'ContextMenu' }]
  },
  {
    name: 'MegaMenu',
    prime: 'megamenu',
    importName: 'MegaMenu',
    description: 'Large grouped menu.',
    renderPrefix: `const items = [{ label: 'Videos', icon: 'pi pi-fw pi-video', items: [[{ label: 'Video 1', items: [{ label: 'Video 1.1' }] }]] }];`,
    args: `{ model: items, orientation: 'horizontal' }`,
    argTypes: `{ orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } }`,
    playground: `<MegaMenu {...args} />`,
    code: `<MegaMenu model={items} orientation="horizontal" />`,
    demos: [
      { page: 'menu', section: 'MegaMenu - Horizontal' },
      { page: 'menu', section: 'MegaMenu - Vertical' }
    ]
  },
  {
    name: 'PanelMenu',
    prime: 'panelmenu',
    importName: 'PanelMenu',
    description: 'Menu with expandable panels.',
    renderPrefix: `const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }] }];`,
    args: `{ model: items, style: { width: '20rem' } }`,
    argTypes: `{}`,
    playground: `<PanelMenu {...args} />`,
    code: `<PanelMenu model={items} />`,
    demos: [{ page: 'menu', section: 'PanelMenu' }]
  },
  {
    name: 'Toast',
    prime: 'toast',
    importName: 'Toast',
    extraImports: `import { Button } from 'primereact/button';`,
    description: 'Temporary notification.',
    args: `{ position: 'top-right' }`,
    argTypes: `{ position: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'] } }`,
    playground: `<><Toast {...args} /><Button label="Show toast" /></>`,
    code: `<Toast ref={toast} /><Button onClick={() => toast.current?.show({ severity: 'success', summary: 'Success' })} />`,
    demos: [{ page: 'message', section: 'Toast' }]
  },
  {
    name: 'Messages',
    prime: 'messages',
    importName: 'Messages',
    description: 'Programmatic message list.',
    args: `{}`,
    argTypes: `{}`,
    playground: `<Messages />`,
    code: `<Messages ref={messages} />`,
    demos: [{ page: 'message', section: 'Messages' }]
  },
  {
    name: 'Message',
    prime: 'message',
    importName: 'Message',
    description: 'Inline message.',
    args: `{ severity: 'info', text: 'Message content' }`,
    argTypes: `{ severity: { control: 'select', options: ['success', 'info', 'warn', 'error'] }, text: { control: 'text' } }`,
    playground: `<Message {...args} />`,
    code: `<Message severity="info" text="Message content" />`,
    demos: [
      { page: 'message', section: 'Inline' },
      { page: 'message', section: 'Help Text' }
    ]
  },
  {
    name: 'Carousel',
    prime: 'carousel',
    importName: 'Carousel',
    description: 'Item carousel.',
    renderPrefix: `const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }, { name: 'Blue Band' }];`,
    args: `{ value: products, numVisible: 3, numScroll: 1, circular: false }`,
    argTypes: `{ numVisible: { control: 'number' }, numScroll: { control: 'number' }, circular: { control: 'boolean' } }`,
    playground: `<Carousel {...args} itemTemplate={(item) => <div className="p-3 text-center">{item.name}</div>} />`,
    code: `<Carousel value={products} numVisible={3} numScroll={1} itemTemplate={productTemplate} />`,
    demos: [{ page: 'media', section: 'Carousel' }]
  },
  {
    name: 'Image',
    prime: 'image',
    importName: 'Image',
    description: 'Image with optional preview.',
    args: `{ src: '/demo/images/galleria/galleria1.jpg', alt: 'Image', width: '250', preview: true }`,
    argTypes: `{ src: { control: 'text' }, alt: { control: 'text' }, width: { control: 'text' }, preview: { control: 'boolean' } }`,
    playground: `<Image {...args} />`,
    code: `<Image src="/demo/images/galleria/galleria1.jpg" alt="Image" width="250" preview />`,
    demos: [{ page: 'media', section: 'Image' }]
  },
  {
    name: 'Galleria',
    prime: 'galleria',
    importName: 'Galleria',
    description: 'Image gallery.',
    renderPrefix: `const images = [{ itemImageSrc: '/demo/images/galleria/galleria1.jpg', thumbnailImageSrc: '/demo/images/galleria/galleria1s.jpg', alt: 'Image' }];`,
    args: `{ value: images, numVisible: 1, circular: true, showItemNavigators: true }`,
    argTypes: `{ numVisible: { control: 'number' }, circular: { control: 'boolean' }, showItemNavigators: { control: 'boolean' } }`,
    playground: `<Galleria {...args} item={(item) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />} thumbnail={(item) => <img src={item.thumbnailImageSrc} alt={item.alt} />} style={{ maxWidth: '420px' }} />`,
    code: `<Galleria value={images} item={itemTemplate} thumbnail={thumbnailTemplate} />`,
    demos: [{ page: 'media', section: 'Galleria' }]
  },
  {
    name: 'FileUpload',
    prime: 'fileupload',
    importName: 'FileUpload',
    description: 'Basic or advanced file upload.',
    args: `{ mode: 'basic', name: 'demo[]', accept: 'image/*', maxFileSize: 1000000, chooseLabel: 'Choose' }`,
    argTypes: `{ mode: { control: 'inline-radio', options: ['basic', 'advanced'] }, chooseLabel: { control: 'text' }, auto: { control: 'boolean' }, multiple: { control: 'boolean' } }`,
    playground: `<FileUpload {...args} />`,
    code: `<FileUpload mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} />`,
    demos: [
      { page: 'file', section: 'Advanced' },
      { page: 'file', section: 'Basic' }
    ]
  },
  {
    name: 'Chart',
    prime: 'chart',
    importName: 'Chart',
    description: 'Charts powered by Chart.js.',
    renderPrefix: `const data = { labels: ['A', 'B', 'C'], datasets: [{ label: 'Dataset', data: [12, 19, 3], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'] }] };`,
    args: `{ type: 'bar', data }`,
    argTypes: `{ type: { control: 'select', options: ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar'] } }`,
    playground: `<div style={{ width: '32rem' }}><Chart {...args} /></div>`,
    code: `<Chart type="bar" data={data} options={options} />`,
    demos: [
      { page: 'charts', section: 'Linear Chart' },
      { page: 'charts', section: 'Bar Chart' },
      { page: 'charts', section: 'Pie Chart' },
      { page: 'charts', section: 'Doughnut Chart' },
      { page: 'charts', section: 'Polar Area Chart' },
      { page: 'charts', section: 'Radar Chart' }
    ]
  },
  {
    name: 'ProgressBar',
    prime: 'progressbar',
    importName: 'ProgressBar',
    description: 'Progress indicator.',
    args: `{ value: 50, showValue: true }`,
    argTypes: `{ value: { control: 'number' }, showValue: { control: 'boolean' }, mode: { control: 'select', options: ['determinate', 'indeterminate'] } }`,
    playground: `<div style={{ width: '24rem' }}><ProgressBar {...args} /></div>`,
    code: `<ProgressBar value={50} />`,
    demos: [{ page: 'misc', section: 'ProgressBar' }]
  },
  {
    name: 'Badge',
    prime: 'badge',
    importName: 'Badge',
    description: 'Numeric marker or status indicator.',
    args: `{ value: '2', severity: 'info', size: undefined }`,
    argTypes: `{ value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, size: { control: 'select', options: [undefined, 'large', 'xlarge'] } }`,
    playground: `<Badge {...args} />`,
    code: `<Badge value="2" severity="info" />`,
    demos: [
      { page: 'misc', section: 'Numbers' },
      { page: 'misc', section: 'Positioned Badge' },
      { page: 'misc', section: 'Button Badge' },
      { page: 'misc', section: 'Sizes' }
    ]
  },
  {
    name: 'Avatar',
    prime: 'avatar',
    importName: 'Avatar',
    description: 'Visual representation of a user or entity.',
    args: `{ label: 'P', shape: 'circle', size: 'large' }`,
    argTypes: `{ label: { control: 'text' }, icon: { control: 'text' }, shape: { control: 'inline-radio', options: ['square', 'circle'] }, size: { control: 'select', options: ['normal', 'large', 'xlarge'] } }`,
    playground: `<Avatar {...args} />`,
    code: `<Avatar label="P" shape="circle" size="large" />`,
    demos: [
      { page: 'misc', section: 'Label - Circle' },
      { page: 'misc', section: 'Icon - Badge' },
      { page: 'misc', section: 'Image' }
    ]
  },
  {
    name: 'AvatarGroup',
    prime: 'avatargroup',
    importName: 'AvatarGroup',
    extraImports: `import { Avatar } from 'primereact/avatar';`,
    description: 'Avatar group.',
    args: `{}`,
    argTypes: `{}`,
    playground: `<AvatarGroup><Avatar label="A" shape="circle" /><Avatar label="B" shape="circle" /><Avatar label="+2" shape="circle" /></AvatarGroup>`,
    code: `<AvatarGroup><Avatar image="..." shape="circle" /></AvatarGroup>`,
    demos: [{ page: 'misc', section: 'Avatar Group' }]
  },
  {
    name: 'Tag',
    prime: 'tag',
    importName: 'Tag',
    description: 'Status label.',
    args: `{ value: 'Primary', severity: undefined, rounded: false, icon: undefined }`,
    argTypes: `{ value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, rounded: { control: 'boolean' }, icon: { control: 'text' } }`,
    playground: `<Tag {...args} />`,
    code: `<Tag value="Primary" />`,
    demos: [
      { page: 'misc', section: 'Tags' },
      { page: 'misc', section: 'Pills' },
      { page: 'misc', section: 'Icons' }
    ]
  },
  {
    name: 'Chip',
    prime: 'chip',
    importName: 'Chip',
    description: 'Text chip with optional icon or image.',
    args: `{ label: 'Action', icon: undefined, removable: false }`,
    argTypes: `{ label: { control: 'text' }, icon: { control: 'text' }, removable: { control: 'boolean' } }`,
    playground: `<Chip {...args} />`,
    code: `<Chip label="Action" />`,
    demos: [
      { page: 'misc', section: 'Basic' },
      { page: 'misc', section: 'Icon' },
      { page: 'misc', section: 'Image' }
    ]
  },
  {
    name: 'Skeleton',
    prime: 'skeleton',
    importName: 'Skeleton',
    description: 'Loading placeholder.',
    args: `{ width: '10rem', height: '2rem', borderRadius: '16px' }`,
    argTypes: `{ width: { control: 'text' }, height: { control: 'text' }, borderRadius: { control: 'text' }, shape: { control: 'select', options: [undefined, 'circle'] } }`,
    playground: `<Skeleton {...args} />`,
    code: `<Skeleton width="10rem" height="2rem" />`,
    demos: [{ page: 'misc', section: 'Styling' }]
  },
  {
    name: 'ScrollPanel',
    prime: 'scrollpanel',
    importName: 'ScrollPanel',
    description: 'Area with custom scrolling.',
    args: `{ style: { width: '24rem', height: '160px' } }`,
    argTypes: `{}`,
    playground: `<ScrollPanel {...args}><p style={{ lineHeight: 1.7 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel posuere ipsum. Integer porta sem vitae lectus interdum, a dictum dolor tempor.</p></ScrollPanel>`,
    code: `<ScrollPanel style={{ width: '100%', height: '200px' }}>Content</ScrollPanel>`,
    demos: [{ page: 'misc', section: 'Styling' }]
  },
  {
    name: 'ScrollTop',
    prime: 'scrolltop',
    importName: 'ScrollTop',
    description: 'Shortcut to scroll back to the top.',
    args: `{ threshold: 100, behavior: 'smooth' }`,
    argTypes: `{ threshold: { control: 'number' }, behavior: { control: 'inline-radio', options: ['smooth', 'auto'] } }`,
    playground: `<div style={{ height: '12rem', overflow: 'auto', position: 'relative' }}><div style={{ height: '30rem', padding: '1rem' }}>Scroll down inside this panel.</div><ScrollTop {...args} target="parent" /></div>`,
    code: `<ScrollTop target="parent" threshold={100} />`,
    demos: [{ page: 'misc', section: 'Styling' }]
  }
];

function pascal(value) {
  return value.replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase());
}

function demoImports(component) {
  const pages = [...new Set(component.demos.map((demo) => demo.page))];
  return pages
    .map((page) => {
      const prefix = pascal(page);
      const base = sourcePath[page];
      return `import ${prefix}Demo from '${base}';\nimport ${prefix}Source from '${base}.tsx?raw';`;
    })
    .join('\n');
}

function demoExportName(demo) {
  return demo.name ?? `Sakai${pascal(demo.section)}`;
}

function createStory(component) {
  const renderPrefix = component.renderPrefix ? `\n${component.renderPrefix}\n` : '';
  const extraImports = component.extraImports ? `${component.extraImports}\n` : '';
  const demoExports = component.demos
    .map((demo) => {
      const pagePrefix = pascal(demo.page);
      const exportName = demoExportName(demo);
      return `export const ${exportName}: Story = {
  name: 'Sakai / ${demo.section}',
  render: () => <SakaiSectionDemo Component={${pagePrefix}Demo} section="${demo.section}" />,
  parameters: sourceParameters(${pagePrefix}Source, '${demo.section}', '${component.name}')
};`;
    })
    .join('\n\n');

  return `import type { Meta, StoryObj } from '@storybook/react-vite';
import { ${component.importName} } from 'primereact/${component.prime}';
${extraImports}${demoImports(component)}
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';
${renderPrefix}
const meta = {
  title: 'Components/${component.name}',
  component: ${component.importName},
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '${component.description}'
      }
    }
  },
  args: ${component.args},
  argTypes: ${component.argTypes ?? commonArgTypes}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => ${component.playground},
  parameters: {
    docs: {
      source: {
        code: \`${component.code.replaceAll('`', '\\`')}\`
      }
    }
  }
};

${demoExports}
`;
}

function createDocs(component) {
  const canvasBlocks = component.demos
    .map((demo) => {
      const exportName = demoExportName(demo);
      return `## Sakai / ${demo.section}\n\n<Canvas of={Stories.${exportName}} sourceState="hidden" />`;
    })
    .join('\n\n');

  return `import { Canvas, Controls, Meta, Subtitle, Title } from '@storybook/addon-docs/blocks';
import * as Stories from './${component.name}.stories';

<Meta title="Components/${component.name}/Summary" />

<Title>${component.name}</Title>

<Subtitle>${component.description}</Subtitle>

## Playground

<Canvas of={Stories.Default} sourceState="hidden" />

<Controls of={Stories.Default} />

${canvasBlocks}
`;
}

fs.mkdirSync(outDir, { recursive: true });

for (const component of components) {
  if (component.name === 'Button') continue;
  fs.writeFileSync(path.join(outDir, `${component.name}.stories.tsx`), createStory(component));
  fs.writeFileSync(path.join(outDir, `${component.name}.docs.mdx`), createDocs(component));
}

console.log(`Generated ${components.length} component story sets.`);
