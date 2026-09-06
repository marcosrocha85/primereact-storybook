import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Galleria } from 'primereact/galleria';
import { defaultArgs, Playground, type ExampleArgs } from './Galleria.examples';
import exampleSource from './Galleria.examples.tsx?raw';

const meta = {
  title: 'Components/Galleria',
  component: Galleria,
  parameters: {
    layout: 'centered',
    controls: { include: ["numVisible","circular","showItemNavigators"] },
    docs: { description: { component: 'Image gallery.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { numVisible: { control: 'number' }, circular: { control: 'boolean' }, showItemNavigators: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
