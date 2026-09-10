import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Tooltip } from 'primereact/tooltip';
import { defaultArgs, Playground, type ExampleArgs } from './Tooltip.examples';
import exampleSource from './Tooltip.examples.tsx?raw';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    controls: { include: ["content","position","event","disabled","showOnDisabled","mouseTrack","mouseTrackLeft","mouseTrackTop","showDelay","hideDelay","closeOnEscape","autoHide"] },
    docs: { description: { component: 'Contextual hint attached to a target element, with hover, focus, placement, and timing options.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    content: { control: 'text' },
    position: { control: 'select', options: ['top', 'bottom', 'left', 'right', 'mouse'] },
    event: { control: 'inline-radio', options: ['hover', 'focus', 'both'] },
    disabled: { control: 'boolean' },
    showOnDisabled: { control: 'boolean' },
    mouseTrack: { control: 'boolean' },
    mouseTrackLeft: { control: { type: 'number', min: 0, step: 1 } },
    mouseTrackTop: { control: { type: 'number', min: 0, step: 1 } },
    showDelay: { control: { type: 'number', min: 0, step: 100 } },
    hideDelay: { control: { type: 'number', min: 0, step: 100 } },
    closeOnEscape: { control: 'boolean' },
    autoHide: { control: 'boolean' }
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
