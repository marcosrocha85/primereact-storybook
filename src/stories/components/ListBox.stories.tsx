import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ListBox } from 'primereact/listbox';
import { defaultArgs, Playground, type ExampleArgs } from './ListBox.examples';
import exampleSource from './ListBox.examples.tsx?raw';

const meta = {
  title: 'Components/ListBox',
  component: ListBox,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","disabled","filter"] },
    docs: { description: { component: 'Selection list.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' }, disabled: { control: 'boolean' }, filter: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
