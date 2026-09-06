import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Chips } from 'primereact/chips';
import { defaultArgs, Playground, type ExampleArgs } from './Chips.examples';
import exampleSource from './Chips.examples.tsx?raw';

const meta = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","separator","disabled"] },
    docs: { description: { component: 'Multi-value input rendered as chips.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' },
    placeholder: { control: 'text' },
    separator: { control: 'text' },
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
