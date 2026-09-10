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
    controls: { include: ["selectionMode","filter","filterMode","disabled","loading","showHeader","expandedKeys","selectionKeys"] },
    docs: { description: { component: 'Hierarchical data with expansion, selection, filtering, and drag-and-drop states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    selectionMode: { control: 'inline-radio', options: [undefined, 'single', 'multiple', 'checkbox'] },
    filter: { control: 'boolean' },
    filterMode: { control: 'inline-radio', options: ['lenient', 'strict'] },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    showHeader: { control: 'boolean' },
    expandedKeys: { control: 'object' },
    selectionKeys: { control: 'object' }
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
