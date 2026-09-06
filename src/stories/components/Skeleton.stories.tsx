import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Skeleton } from 'primereact/skeleton';
import { defaultArgs, Playground, type ExampleArgs } from './Skeleton.examples';
import exampleSource from './Skeleton.examples.tsx?raw';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    controls: { include: ["width","height","borderRadius","shape"] },
    docs: { description: { component: 'Loading placeholder.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { width: { control: 'text' }, height: { control: 'text' }, borderRadius: { control: 'text' }, shape: { control: 'select', options: [undefined, 'circle'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
