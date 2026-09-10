import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ToggleButton } from 'primereact/togglebutton';
import { defaultArgs, Playground, type ExampleArgs } from './ToggleButton.examples';
import exampleSource from './ToggleButton.examples.tsx?raw';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    controls: { include: ["checked","onLabel","offLabel","onIcon","offIcon","iconPos","invalid","disabled","readonly","tooltip","aria-label"] },
    docs: { description: { component: 'On/off toggle button with labels, icons, and disabled or invalid states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { checked: { control: 'boolean' }, onLabel: { control: 'text' }, offLabel: { control: 'text' }, onIcon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, offIcon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, iconPos: { control: 'inline-radio', options: ['left', 'right'] }, invalid: { control: 'boolean' }, disabled: { control: 'boolean' }, readonly: { control: 'boolean' }, tooltip: { control: 'text' }, 'aria-label': { control: 'text' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
