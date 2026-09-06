import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { PanelMenu } from 'primereact/panelmenu';
import { defaultArgs, Playground, type ExampleArgs } from './PanelMenu.examples';
import exampleSource from './PanelMenu.examples.tsx?raw';

const meta = {
  title: 'Components/PanelMenu',
  component: PanelMenu,
  parameters: {
    layout: 'centered',
    controls: { include: ["multiple"] },
    docs: { description: { component: 'Menu with expandable panels.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { multiple: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
