import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Sidebar } from 'primereact/sidebar';
import { defaultArgs, Playground, type ExampleArgs } from './Sidebar.examples';
import exampleSource from './Sidebar.examples.tsx?raw';

const meta = {
  title: 'Components/Sidebar',
  parameters: {
    layout: 'centered',
    controls: { include: ["visible","position"] },
    docs: { description: { component: 'Side panel.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { visible: { control: 'boolean' }, position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
