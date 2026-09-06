import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Fieldset } from 'primereact/fieldset';
import { defaultArgs, Playground, type ExampleArgs } from './Fieldset.examples';
import exampleSource from './Fieldset.examples.tsx?raw';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  parameters: {
    layout: 'centered',
    controls: { include: ["legend","toggleable"] },
    docs: { description: { component: 'Semantic grouping container with a legend.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { legend: { control: 'text' }, toggleable: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
