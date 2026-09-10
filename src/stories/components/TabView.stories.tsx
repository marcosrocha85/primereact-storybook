import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { TabView } from 'primereact/tabview';
import { defaultArgs, Playground, type ExampleArgs } from './TabView.examples';
import exampleSource from './TabView.examples.tsx?raw';

const meta = {
  title: 'Components/TabView',
  parameters: {
    layout: 'centered',
    controls: { include: ["activeIndex","renderActiveOnly","scrollable","firstHeader","secondHeader","thirdHeader","firstContent","secondContent","thirdContent"] },
    docs: { description: { component: 'Tabbed navigation for organizing related content into panels.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { activeIndex: { control: 'number' }, renderActiveOnly: { control: 'boolean' }, scrollable: { control: 'boolean' }, firstHeader: { control: 'text' }, secondHeader: { control: 'text' }, thirdHeader: { control: 'text' }, firstContent: { control: 'text' }, secondContent: { control: 'text' }, thirdContent: { control: 'text' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
