import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { TieredMenu } from 'primereact/tieredmenu';
import { defaultArgs, Playground, type ExampleArgs } from './TieredMenu.examples';
import exampleSource from './TieredMenu.examples.tsx?raw';

const meta = {
  title: 'Components/TieredMenu',
  component: TieredMenu,
  parameters: {
    layout: 'centered',
    controls: { include: ["popup"] },
    docs: { description: { component: 'Hierarchical menu.' }, source: { code: exampleSource } }
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
