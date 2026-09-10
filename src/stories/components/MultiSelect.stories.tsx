import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { MultiSelect } from 'primereact/multiselect';
import { defaultArgs, Playground, type ExampleArgs } from './MultiSelect.examples';
import exampleSource from './MultiSelect.examples.tsx?raw';

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","display","filter","invalid","variant","showClear","maxSelectedLabels","disabled"] },
    docs: { description: { component: 'Select multiple options from a collection, with filtering, chips, validation, and disabled states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' },
    placeholder: { control: 'text' },
    display: { control: 'inline-radio', options: ['comma', 'chip'] },
    filter: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
    showClear: { control: 'boolean' },
    maxSelectedLabels: { control: 'number' },
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
