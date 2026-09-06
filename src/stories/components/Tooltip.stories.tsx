import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Tooltip } from 'primereact/tooltip';
import { defaultArgs, Playground, type ExampleArgs } from './Tooltip.examples';
import exampleSource from './Tooltip.examples.tsx?raw';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    controls: { include: ["content","position"] },
    docs: { description: { component: 'Contextual hint.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { content: { control: 'text' }, position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
