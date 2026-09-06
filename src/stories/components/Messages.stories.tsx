import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Messages } from 'primereact/messages';
import { defaultArgs, Playground, type ExampleArgs } from './Messages.examples';
import exampleSource from './Messages.examples.tsx?raw';

const meta = {
  title: 'Components/Messages',
  component: Messages,
  parameters: {
    layout: 'centered',
    controls: { include: ["className","style"] },
    docs: { description: { component: 'Programmatic message list.' }, source: { code: exampleSource } }
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
