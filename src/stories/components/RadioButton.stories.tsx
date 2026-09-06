import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { RadioButton } from 'primereact/radiobutton';
import { defaultArgs, Playground, type ExampleArgs } from './RadioButton.examples';
import exampleSource from './RadioButton.examples.tsx?raw';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    controls: { include: ["checked","disabled"] },
    docs: { description: { component: 'Single option within a group.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { checked: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
