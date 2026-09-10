import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Splitter } from 'primereact/splitter';
import { defaultArgs, Playground, type ExampleArgs } from './Splitter.examples';
import exampleSource from './Splitter.examples.tsx?raw';

const meta = {
  title: 'Components/Splitter',
  component: Splitter,
  parameters: {
    layout: 'centered',
    controls: { include: ["layout","gutterSize","step","className","style","unstyled"] },
    docs: { description: { component: 'Resizable panel layout.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    gutterSize: { control: 'number' },
    step: { control: 'number' },
    className: { control: 'text' },
    style: { control: 'object' },
    unstyled: { control: 'boolean' }
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
