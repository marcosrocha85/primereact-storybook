import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { SelectButton } from 'primereact/selectbutton';
import { defaultArgs, Playground, type ExampleArgs } from './SelectButton.examples';
import exampleSource from './SelectButton.examples.tsx?raw';

const meta = {
  title: 'Components/SelectButton',
  component: SelectButton,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","multiple","allowEmpty","invalid","disabled"] },
    docs: { description: { component: 'Button-based selection control.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' }, multiple: { control: 'boolean' }, allowEmpty: { control: 'boolean' }, invalid: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
