import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Toast } from 'primereact/toast';
import { defaultArgs, Playground, type ExampleArgs } from './Toast.examples';
import exampleSource from './Toast.examples.tsx?raw';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    controls: { include: ["position"] },
    docs: { description: { component: 'Temporary notification.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { position: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
