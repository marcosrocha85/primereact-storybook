import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Dialog } from 'primereact/dialog';
import { defaultArgs, Playground, type ExampleArgs } from './Dialog.examples';
import exampleSource from './Dialog.examples.tsx?raw';

const meta = {
  title: 'Components/Dialog',
  parameters: {
    layout: 'centered',
    controls: { include: ["header","modal","visible","closable","closeOnEscape","dismissableMask","maximizable","position","style"] },
    docs: { description: { component: 'Modal window for focused content, confirmation flows, and forms.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    header: { control: 'text' },
    modal: { control: 'boolean' },
    visible: { control: 'boolean' },
    closable: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    dismissableMask: { control: 'boolean' },
    maximizable: { control: 'boolean' },
    position: { control: 'select', options: ['center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] },
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
