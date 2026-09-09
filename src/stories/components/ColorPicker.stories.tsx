import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ColorPicker } from 'primereact/colorpicker';
import { defaultArgs, Playground, type ExampleArgs } from './ColorPicker.examples';
import exampleSource from './ColorPicker.examples.tsx?raw';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","format","inline","defaultColor","disabled","autoFocus","inputId","inputClassName","panelClassName","style"] },
    docs: { description: { component: 'Color input used in Sakai forms, with hex, RGB, HSB, inline, disabled, and overlay variations.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    value: { control: 'object', description: 'Hex string or RGB/HSB object, matching the native ColorPicker value modes.' },
    format: { control: 'inline-radio', options: ['hex', 'rgb', 'hsb'] },
    inline: { control: 'boolean' },
    defaultColor: { control: 'text' },
    disabled: { control: 'boolean' },
    autoFocus: { control: 'boolean' },
    inputId: { control: 'text' },
    inputClassName: { control: 'text' },
    panelClassName: { control: 'text' },
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
