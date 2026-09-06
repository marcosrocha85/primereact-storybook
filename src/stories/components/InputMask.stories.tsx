import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { InputMask } from 'primereact/inputmask';
import { defaultArgs, Playground, type ExampleArgs } from './InputMask.examples';
import exampleSource from './InputMask.examples.tsx?raw';

const meta = {
  title: 'Components/InputMask',
  component: InputMask,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","mask","placeholder","disabled"] },
    docs: { description: { component: 'Text field with an input mask.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text' },
    mask: { control: 'text' },
    placeholder: { control: 'text' },
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
