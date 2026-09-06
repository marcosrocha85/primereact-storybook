import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Message } from 'primereact/message';
import { defaultArgs, Playground, type ExampleArgs } from './Message.examples';
import exampleSource from './Message.examples.tsx?raw';

const meta = {
  title: 'Components/Message',
  component: Message,
  parameters: {
    layout: 'centered',
    controls: { include: ["severity","text"] },
    docs: { description: { component: 'Inline message.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { severity: { control: 'select', options: ['success', 'info', 'warn', 'error'] }, text: { control: 'text' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
