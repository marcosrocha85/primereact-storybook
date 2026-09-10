import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ProgressBar } from 'primereact/progressbar';
import { defaultArgs, Playground, type ExampleArgs } from './ProgressBar.examples';
import exampleSource from './ProgressBar.examples.tsx?raw';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","showValue","unit","mode","color"] },
    docs: { description: { component: 'Progress indicator for determinate completion values and indeterminate activity.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    value: { control: 'number', description: 'Determinate progress from 0 to 100.' },
    showValue: { control: 'boolean' },
    unit: { control: 'text' },
    mode: { control: 'select', options: ['determinate', 'indeterminate'] },
    color: { control: 'text' }
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
