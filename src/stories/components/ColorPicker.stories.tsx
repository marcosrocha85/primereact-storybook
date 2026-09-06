import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ColorPicker } from 'primereact/colorpicker';
import { defaultArgs, Playground, type ExampleArgs } from './ColorPicker.examples';
import exampleSource from './ColorPicker.examples.tsx?raw';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","disabled"] },
    docs: { description: { component: 'Visual color picker.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' }
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
