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
    controls: { include: ["model","activeIndex","readOnly","className","style"] },
    docs: { description: { component: 'Workflow step indicator with selectable, disabled, icon, and read-only states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { model: { control: 'object', description: 'MenuItem[] used to render the workflow steps.' }, activeIndex: { control: 'number' }, readOnly: { control: 'boolean' }, className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
