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
    controls: { include: ["layout","align"] },
    docs: { description: { component: 'Visual separator.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, align: { control: 'select', options: ['left', 'center', 'right', 'top', 'bottom'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
