import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Dropdown } from 'primereact/dropdown';
import { defaultArgs, Playground, type ExampleArgs } from './Dropdown.examples';
import exampleSource from './Dropdown.examples.tsx?raw';

const meta = {
  title: 'Components/Dropdown',
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","filter","invalid","variant","showClear","editable","checkmark","disabled"] },
    docs: { description: { component: 'Select one option from a collection, with filtering, validation, editable input, and clearable states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' },
    placeholder: { control: 'text' },
    filter: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
    showClear: { control: 'boolean' },
    editable: { control: 'boolean' },
    checkmark: { control: 'boolean' },
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
