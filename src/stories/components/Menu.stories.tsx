import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Menu } from 'primereact/menu';
import { defaultArgs, Playground, type ExampleArgs } from './Menu.examples';
import exampleSource from './Menu.examples.tsx?raw';

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    controls: { include: ["popup"] },
    docs: { description: { component: 'Simple vertical menu or popup menu.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { popup: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
