import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { InputTextarea } from 'primereact/inputtextarea';
import { defaultArgs, Playground, type ExampleArgs } from './InputTextarea.examples';
import exampleSource from './InputTextarea.examples.tsx?raw';

const meta = {
  title: 'Components/InputTextarea',
  component: InputTextarea,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","rows","cols","autoResize","disabled","invalid","readOnly","variant"] },
    docs: { description: { component: 'Multi-line text field for messages, descriptions, and longer form input, with validation and resize states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text' },
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    autoResize: { control: 'boolean' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] }
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
