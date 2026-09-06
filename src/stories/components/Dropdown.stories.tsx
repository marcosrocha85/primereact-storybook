import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Dropdown } from 'primereact/dropdown';
import { defaultArgs, Playground, type ExampleArgs } from './Dropdown.examples';
import exampleSource from './Dropdown.examples.tsx?raw';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","filter","disabled"] },
    docs: { description: { component: 'Single-option selector.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' },
    placeholder: { control: 'text' },
    filter: { control: 'boolean' },
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
