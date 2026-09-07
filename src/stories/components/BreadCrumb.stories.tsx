import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { defaultArgs, Playground, type ExampleArgs } from './BreadCrumb.examples';
import exampleSource from './BreadCrumb.examples.tsx?raw';

const meta = {
  title: 'Components/BreadCrumb',
  parameters: {
    layout: 'centered',
    controls: { include: ["model","showHome","home","className","style"] },
    docs: { description: { component: 'Contextual navigation through the Sakai page hierarchy. Demo commands report the selected destination; supply menu item URLs or commands for application navigation.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    model: { control: 'object', description: 'Ordered path items, excluding Home. Edit labels, add or remove levels, or set disabled on an item.' },
    showHome: { control: 'boolean', description: 'Show the configured Home item before the path.' },
    home: { control: 'object', description: 'Home menu item configuration. Its label names the home link; URLs and commands are preserved.' },
    className: { control: 'text' },
    style: { control: 'object' }
  }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
