import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Toast } from 'primereact/toast';
import { defaultArgs, Playground, type ExampleArgs } from './Toast.examples';
import exampleSource from './Toast.examples.tsx?raw';

const meta = {
  title: 'Components/Toast',
  parameters: {
    layout: 'centered',
    controls: { include: ["position","messageSeverity","messageSummary","messageDetail","messageClosable","messageSticky","messageLife","className","style"] },
    docs: { description: { component: 'Temporary notification displayed in an overlay with severity, dismissal, and lifetime options.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    position: { control: 'select', options: ['center', 'top-center', 'top-left', 'top-right', 'bottom-center', 'bottom-left', 'bottom-right'] },
    messageSeverity: { control: 'select', options: ['success', 'info', 'warn', 'error', 'secondary', 'contrast'], description: 'Severity used by the demo Show toast button.' },
    messageSummary: { control: 'text', description: 'Summary used by the demo Show toast button.' },
    messageDetail: { control: 'text', description: 'Detail used by the demo Show toast button.' },
    messageClosable: { control: 'boolean', description: 'Whether the toast message can be dismissed manually.' },
    messageSticky: { control: 'boolean', description: 'Whether the toast message remains until cleared.' },
    messageLife: { control: 'number', description: 'Automatic dismissal delay in milliseconds when the message is not sticky.' },
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
