import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ToggleButton } from 'primereact/togglebutton';
import { defaultArgs, Playground, type ExampleArgs } from './ToggleButton.examples';
import exampleSource from './ToggleButton.examples.tsx?raw';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    controls: { include: ["checked","onLabel","offLabel","disabled"] },
    docs: { description: { component: 'On/off toggle button.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { checked: { control: 'boolean' }, onLabel: { control: 'text' }, offLabel: { control: 'text' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
