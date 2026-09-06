import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Chart } from 'primereact/chart';
import { defaultArgs, Playground, type ExampleArgs } from './Chart.examples';
import exampleSource from './Chart.examples.tsx?raw';

const meta = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
    controls: { include: ["type"] },
    docs: { description: { component: 'Charts powered by Chart.js.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { type: { control: 'select', options: ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
