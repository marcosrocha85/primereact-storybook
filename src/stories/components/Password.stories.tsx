import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Password } from 'primereact/password';
import { defaultArgs, Playground, type ExampleArgs } from './Password.examples';
import exampleSource from './Password.examples.tsx?raw';

const meta = {
  title: 'Components/Password',
  component: Password,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","feedback","toggleMask","disabled","invalid","readOnly","variant"] },
    docs: { description: { component: 'Password input with feedback.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text' }, placeholder: { control: 'text' }, feedback: { control: 'boolean' }, toggleMask: { control: 'boolean' }, disabled: { control: 'boolean' }, invalid: { control: 'boolean' }, readOnly: { control: 'boolean' }, variant: { control: 'inline-radio', options: [undefined, 'outlined', 'filled'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
