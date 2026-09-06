import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { OverlayPanel } from 'primereact/overlaypanel';
import { defaultArgs, Playground, type ExampleArgs } from './OverlayPanel.examples';
import exampleSource from './OverlayPanel.examples.tsx?raw';

const meta = {
  title: 'Components/OverlayPanel',
  component: OverlayPanel,
  parameters: {
    layout: 'centered',
    controls: { include: ["showCloseIcon","dismissable"] },
    docs: { description: { component: 'Floating panel triggered by an event.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { showCloseIcon: { control: 'boolean' }, dismissable: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
