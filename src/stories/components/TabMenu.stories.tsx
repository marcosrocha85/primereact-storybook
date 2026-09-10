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
    controls: { include: ["model","activeIndex","className","style"] },
    docs: { description: { component: 'Tabbed menu for navigation and command items, with active, disabled, icon, and link states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { model: { control: 'object', description: 'MenuItem[] used to render the tab headers.' }, activeIndex: { control: 'number' }, className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
