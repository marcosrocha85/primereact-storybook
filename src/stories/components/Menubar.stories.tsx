import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Menubar } from 'primereact/menubar';
import { defaultArgs, Playground, type ExampleArgs } from './Menubar.examples';
import exampleSource from './Menubar.examples.tsx?raw';

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
    controls: { include: ["model","menuIcon","submenuIcon","ariaLabel","ariaLabelledBy","className","style","unstyled"] },
    docs: { description: { component: 'Primary horizontal navigation with nested menu items and command feedback. Native menu item commands, templates, URLs, pass-through props, and inherited attributes remain available through the component props.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    model: { control: 'object', description: 'MenuItem[] model. Edit labels, icons, nested items, separators, disabled/visible states, URLs, templates, and command data.' },
    menuIcon: { control: 'select', options: [undefined, 'pi pi-bars', 'pi pi-list'] },
    submenuIcon: { control: 'select', options: [undefined, 'pi pi-angle-down', 'pi pi-chevron-down', 'pi pi-angle-right'] },
    ariaLabel: { control: 'text' },
    ariaLabelledBy: { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' },
    unstyled: { control: 'boolean' }
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
