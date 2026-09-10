import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Divider } from 'primereact/divider';
import { defaultArgs, Playground, type ExampleArgs } from './Divider.examples';
import exampleSource from './Divider.examples.tsx?raw';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    controls: { include: ["children","layout","align","type"] },
    docs: { description: { component: 'Visual separator for dividing content into related sections.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { children: { control: 'text' }, layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, align: { control: 'select', options: ['left', 'center', 'right', 'top', 'bottom'] }, type: { control: 'inline-radio', options: ['solid', 'dashed', 'dotted'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
