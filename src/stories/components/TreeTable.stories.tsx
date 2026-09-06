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
    controls: { include: ["showGridlines","expandedKeys","selectionKeys"] },
    docs: { description: { component: 'Hierarchical table.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { showGridlines: { control: 'boolean' }, expandedKeys: { control: 'object' }, selectionKeys: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
