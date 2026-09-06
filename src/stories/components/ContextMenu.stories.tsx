import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ContextMenu } from 'primereact/contextmenu';
import { defaultArgs, Playground, type ExampleArgs } from './ContextMenu.examples';
import exampleSource from './ContextMenu.examples.tsx?raw';

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    controls: { include: ["model"] },
    docs: { description: { component: 'Context-triggered menu.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { model: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
