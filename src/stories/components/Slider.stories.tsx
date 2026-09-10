import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Slider } from 'primereact/slider';
import { defaultArgs, Playground, type ExampleArgs } from './Slider.examples';
import exampleSource from './Slider.examples.tsx?raw';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","min","max","step","orientation","range","disabled","ariaLabelledBy"] },
    docs: { description: { component: 'Bounded numeric control with single-value, range, horizontal, vertical, and disabled states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object', description: 'Number for a single handle or a two-number tuple when range is enabled.' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, range: { control: 'boolean' }, disabled: { control: 'boolean' }, ariaLabelledBy: { control: 'text' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
