import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { InputMask } from 'primereact/inputmask';
import { defaultArgs, Playground, type ExampleArgs } from './InputMask.examples';
import exampleSource from './InputMask.examples.tsx?raw';

const meta = {
  title: 'Components/InputMask',
  parameters: {
    layout: 'centered',
    controls: { include: ["value","label","floatLabel","mask","placeholder","slotChar","autoClear","unmask","invalid","disabled","readOnly","variant"] },
    docs: { description: { component: 'Masked text field for dates, phone numbers, identifiers, and other structured input.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text' },
    label: { control: 'text' },
    floatLabel: { control: 'boolean' },
    mask: { control: 'text' },
    placeholder: { control: 'text' },
    slotChar: { control: 'text' },
    autoClear: { control: 'boolean' },
    unmask: { control: 'boolean' },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
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
