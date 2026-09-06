import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Tree } from 'primereact/tree';
import { defaultArgs, Playground, type ExampleArgs } from './Tree.examples';
import exampleSource from './Tree.examples.tsx?raw';

const meta = {
  title: 'Components/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
    controls: { include: ["filter","expandedKeys","selectionKeys"] },
    docs: { description: { component: 'Expandable hierarchical structure.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { filter: { control: 'boolean' }, expandedKeys: { control: 'object' }, selectionKeys: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
