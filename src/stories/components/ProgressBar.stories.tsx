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
    controls: { include: ["value","showValue","mode"] },
    docs: { description: { component: 'Progress indicator.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'number' }, showValue: { control: 'boolean' }, mode: { control: 'select', options: ['determinate', 'indeterminate'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
