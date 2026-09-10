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
    controls: { include: ["model","popup","popupAlignment","closeOnEscape","autoZIndex","baseZIndex","tabIndex","aria-label","className","style"] },
    docs: { description: { component: 'Vertical navigation and command menu with inline and popup layouts.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    model: { control: 'object', description: 'MenuItem[] model. Edit labels, icons, separators, disabled/visible states, nested items, URLs, and command data.' },
    popup: { control: 'boolean', description: 'Render the menu as an overlay opened by the supplied trigger.' },
    popupAlignment: { control: 'inline-radio', options: ['left', 'right'] },
    closeOnEscape: { control: 'boolean' },
    autoZIndex: { control: 'boolean' },
    baseZIndex: { control: 'number' },
    tabIndex: { control: 'number' },
    'aria-label': { control: 'text' },
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
