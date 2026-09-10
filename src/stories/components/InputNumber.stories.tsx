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
    controls: { include: ["value","placeholder","format","showButtons","buttonLayout","mode","currency","currencyDisplay","locale","useGrouping","minFractionDigits","maxFractionDigits","prefix","suffix","step","min","max","invalid","disabled","readOnly","variant"] },
    docs: { description: { component: 'Numeric input with decimal and currency formatting, optional spinner buttons, and validation states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    value: { control: 'number' },
    placeholder: { control: 'text' },
    format: { control: 'boolean' },
    showButtons: { control: 'boolean' },
    buttonLayout: { control: 'select', options: ['stacked', 'horizontal', 'vertical'] },
    mode: { control: 'select', options: ['decimal', 'currency'] },
    currency: { control: 'text' },
    currencyDisplay: { control: 'select', options: ['symbol', 'code', 'name'] },
    locale: { control: 'text' },
    useGrouping: { control: 'boolean' },
    minFractionDigits: { control: 'number' },
    maxFractionDigits: { control: 'number' },
    prefix: { control: 'text' },
    suffix: { control: 'text' },
    step: { control: 'number' },
    min: { control: 'number' },
    max: { control: 'number' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] }
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
