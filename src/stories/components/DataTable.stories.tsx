import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { DataTable } from 'primereact/datatable';
import { defaultArgs, Playground, type ExampleArgs } from './DataTable.examples';
import exampleSource from './DataTable.examples.tsx?raw';

const meta = {
  title: 'Components/DataTable',
  parameters: {
    layout: 'centered',
    controls: { include: ["paginator","stripedRows","showGridlines","rows"] },
    docs: { description: { component: 'Data table with sorting, filtering, pagination, and single-row selection.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { paginator: { control: 'boolean' }, stripedRows: { control: 'boolean' }, showGridlines: { control: 'boolean' }, rows: { control: 'number' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
