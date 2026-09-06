import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { TabMenu } from 'primereact/tabmenu';
import { defaultArgs, Playground, type ExampleArgs } from './TabMenu.examples';
import exampleSource from './TabMenu.examples.tsx?raw';

const meta = {
  title: 'Components/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'centered',
    controls: { include: ["activeIndex"] },
    docs: { description: { component: 'Tabbed menu.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { activeIndex: { control: 'number' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
