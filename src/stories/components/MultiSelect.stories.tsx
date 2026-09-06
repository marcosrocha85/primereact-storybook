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
    controls: { include: ["value","placeholder","display","filter","disabled"] },
    docs: { description: { component: 'Multiple-option selector.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' }, placeholder: { control: 'text' }, display: { control: 'select', options: ['comma', 'chip'] }, filter: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
