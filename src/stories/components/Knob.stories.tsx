import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Knob } from 'primereact/knob';
import { defaultArgs, Playground, type ExampleArgs } from './Knob.examples';
import exampleSource from './Knob.examples.tsx?raw';

const meta = {
  title: 'Components/Knob',
  component: Knob,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","min","max","step","disabled"] },
    docs: { description: { component: 'Circular numeric control.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'number' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
