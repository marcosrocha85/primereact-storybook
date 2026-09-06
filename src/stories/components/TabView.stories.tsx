import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { TabView } from 'primereact/tabview';
import { defaultArgs, Playground, type ExampleArgs } from './TabView.examples';
import exampleSource from './TabView.examples.tsx?raw';

const meta = {
  title: 'Components/TabView',
  component: TabView,
  parameters: {
    layout: 'centered',
    controls: { include: ["activeIndex"] },
    docs: { description: { component: 'Tabbed navigation.' }, source: { code: exampleSource } }
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
