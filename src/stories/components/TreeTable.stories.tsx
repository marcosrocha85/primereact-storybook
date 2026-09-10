import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { TreeTable } from 'primereact/treetable';
import { defaultArgs, Playground, type ExampleArgs } from './TreeTable.examples';
import exampleSource from './TreeTable.examples.tsx?raw';

const meta = {
  title: 'Components/TreeTable',
  component: TreeTable,
  parameters: {
    layout: 'centered',
    controls: { include: ["selectionMode","expandedKeys","selectionKeys","showGridlines","stripedRows","rowHover","paginator","rows","filterMode","loading","resizableColumns","reorderableColumns"] },
    docs: { description: { component: 'Hierarchical data displayed in columns, with expansion, selection, filtering, sorting, and pagination support.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    selectionMode: { control: 'inline-radio', options: [undefined, 'single', 'multiple', 'checkbox'] },
    expandedKeys: { control: 'object', description: 'Keys of expanded nodes.' },
    selectionKeys: { control: 'object', description: 'Selection state. The native string/object/array value modes remain supported.' },
    showGridlines: { control: 'boolean' },
    stripedRows: { control: 'boolean' },
    rowHover: { control: 'boolean' },
    paginator: { control: 'boolean' },
    rows: { control: 'number' },
    filterMode: { control: 'inline-radio', options: ['lenient', 'strict'] },
    loading: { control: 'boolean' },
    resizableColumns: { control: 'boolean' },
    reorderableColumns: { control: 'boolean' }
  }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
