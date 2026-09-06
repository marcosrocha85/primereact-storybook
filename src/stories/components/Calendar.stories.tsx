import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Calendar } from 'primereact/calendar';
import { defaultArgs, Playground, type ExampleArgs } from './Calendar.examples';
import exampleSource from './Calendar.examples.tsx?raw';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","placeholder","showIcon","showButtonBar","disabled"] },
    docs: { description: { component: 'Date picker input.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' },
    placeholder: { control: 'text' },
    showIcon: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
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
