import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ScrollPanel } from 'primereact/scrollpanel';
import { defaultArgs, Playground, type ExampleArgs } from './ScrollPanel.examples';
import exampleSource from './ScrollPanel.examples.tsx?raw';

const meta = {
  title: 'Components/ScrollPanel',
  component: ScrollPanel,
  parameters: {
    layout: 'centered',
    controls: { include: ["style"] },
    docs: { description: { component: 'Area with custom scrolling.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
