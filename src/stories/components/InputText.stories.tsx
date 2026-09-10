import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { InputText } from 'primereact/inputtext';
import { defaultArgs, Playground, type ExampleArgs } from './InputText.examples';
import exampleSource from './InputText.examples.tsx?raw';

const meta = {
  title: 'Components/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","disabled","invalid","readOnly","variant","validateOnly"] },
    docs: { description: { component: 'Base text field used in forms, filters, and search inputs, with validation and variant states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] },
    validateOnly: { control: 'boolean' }
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
