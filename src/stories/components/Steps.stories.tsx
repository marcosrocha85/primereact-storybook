import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Steps } from 'primereact/steps';
import { defaultArgs, Playground, type ExampleArgs } from './Steps.examples';
import exampleSource from './Steps.examples.tsx?raw';

const meta = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'centered',
    controls: { include: ["activeIndex"] },
    docs: { description: { component: 'Step-based flow.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { activeIndex: { control: 'number' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
