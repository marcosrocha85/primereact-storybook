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
    controls: { include: ["type","data","options"] },
    docs: { description: { component: 'Chart.js visualizations used by Sakai for line, bar, pie, doughnut, polar area and radar charts. Edit data and options as Chart.js configuration objects. Type changes reuse the supplied data; custom chart types and plugins remain available through native props.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { type: { control: 'select', options: ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar'] }, data: { control: 'object' }, options: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
