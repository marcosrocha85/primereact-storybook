import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { InputNumber } from 'primereact/inputnumber';
import { defaultArgs, Playground, type ExampleArgs } from './InputNumber.examples';
import exampleSource from './InputNumber.examples.tsx?raw';

const meta = {
  title: 'Components/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","showButtons","mode","disabled"] },
    docs: { description: { component: 'Numeric input with formatting.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'number' },
    placeholder: { control: 'text' },
    showButtons: { control: 'boolean' },
    mode: { control: 'select', options: ['decimal', 'currency'] },
    disabled: { control: 'boolean' }
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
