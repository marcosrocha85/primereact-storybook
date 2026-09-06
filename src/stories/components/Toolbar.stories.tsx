import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Toolbar } from 'primereact/toolbar';
import { defaultArgs, Playground, type ExampleArgs } from './Toolbar.examples';
import exampleSource from './Toolbar.examples.tsx?raw';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
    controls: { include: ["className","style"] },
    docs: { description: { component: 'Action toolbar.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
