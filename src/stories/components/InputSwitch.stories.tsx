import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { InputSwitch } from 'primereact/inputswitch';
import { defaultArgs, Playground, type ExampleArgs } from './InputSwitch.examples';
import exampleSource from './InputSwitch.examples.tsx?raw';

const meta = {
  title: 'Components/InputSwitch',
  component: InputSwitch,
  parameters: {
    layout: 'centered',
    controls: { include: ["checked","disabled"] },
    docs: { description: { component: 'Boolean toggle switch.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { checked: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
