import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Menubar } from 'primereact/menubar';
import { defaultArgs, Playground, type ExampleArgs } from './Menubar.examples';
import exampleSource from './Menubar.examples.tsx?raw';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
    controls: { include: ["style","model"] },
    docs: { description: { component: 'Primary horizontal menu.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { style: { control: 'object' }, model: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
