import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { MegaMenu } from 'primereact/megamenu';
import { defaultArgs, Playground, type ExampleArgs } from './MegaMenu.examples';
import exampleSource from './MegaMenu.examples.tsx?raw';

const meta = {
  title: 'Components/MegaMenu',
  component: MegaMenu,
  parameters: {
    layout: 'centered',
    controls: { include: ["model","orientation","breakpoint","scrollHeight","tabIndex"] },
    docs: { description: { component: 'Grouped navigation menu that opens multi-column submenus.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    model: { control: 'object', description: 'MenuItem[] with nested MenuItem[][] groups for MegaMenu columns.' },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    breakpoint: { control: 'text', description: 'CSS media-query boundary for the responsive menu button.' },
    scrollHeight: { control: 'text', description: 'Maximum responsive panel height.' },
    tabIndex: { control: 'number' }
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
