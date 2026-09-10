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
    controls: { include: ["model","popup","autoZIndex","breakpoint","scrollHeight","baseZIndex","tabIndex","aria-label","className","style"] },
    docs: { description: { component: 'Hierarchical navigation menu with nested items, command actions, and inline or popup layouts.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    model: { control: 'object', description: 'MenuItem[] model. Edit nested items, icons, separators, disabled/visible states, URLs, templates, and commands.' },
    popup: { control: 'boolean', description: 'Render the menu as an overlay opened by the supplied trigger.' },
    autoZIndex: { control: 'boolean' },
    breakpoint: { control: 'text', description: 'Responsive max-width boundary, such as 767px.' },
    scrollHeight: { control: 'text', description: 'Maximum responsive menu height.' },
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
