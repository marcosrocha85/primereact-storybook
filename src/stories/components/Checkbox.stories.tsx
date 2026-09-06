import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Checkbox } from 'primereact/checkbox';
import { defaultArgs, Playground, type ExampleArgs } from './Checkbox.examples';
import exampleSource from './Checkbox.examples.tsx?raw';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    controls: { include: ["checked","disabled"] },
    docs: { description: { component: 'Boolean control or multi-selection option.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    checked: { control: 'boolean' },
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
