import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Chip } from 'primereact/chip';
import { defaultArgs, Playground, type ExampleArgs } from './Chip.examples';
import exampleSource from './Chip.examples.tsx?raw';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    controls: { include: ["label","icon","removable"] },
    docs: { description: { component: 'Text chip with optional icon or image.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { label: { control: 'text' }, icon: { control: 'text' }, removable: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
