import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Messages } from 'primereact/messages';
import { defaultArgs, Playground, type ExampleArgs } from './Messages.examples';
import exampleSource from './Messages.examples.tsx?raw';

const meta = {
  title: 'Components/Messages',
  parameters: {
    layout: 'centered',
    controls: { include: ["messageSeverity","messageSummary","messageDetail","messageClosable","messageSticky","className","style"] },
    docs: { description: { component: 'Programmatic list of inline messages with severity, dismissal, and lifetime options.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    messageSeverity: { control: 'select', options: [undefined, 'success', 'info', 'warn', 'error', 'secondary', 'contrast'], description: 'Severity used by the demo Show button.' },
    messageSummary: { control: 'text', description: 'Summary used by the demo Show button.' },
    messageDetail: { control: 'text', description: 'Detail used by the demo Show button.' },
    messageClosable: { control: 'boolean', description: 'Whether the demo message can be dismissed.' },
    messageSticky: { control: 'boolean', description: 'Whether the demo message remains until cleared.' },
    className: { control: 'text' },
    style: { control: 'object' }
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
