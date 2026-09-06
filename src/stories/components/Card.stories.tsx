import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Card } from 'primereact/card';
import { defaultArgs, Playground, type ExampleArgs } from './Card.examples';
import exampleSource from './Card.examples.tsx?raw';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    controls: { include: ["title","subTitle"] },
    docs: { description: { component: 'Content container with title, subtitle, and footer areas.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { title: { control: 'text' }, subTitle: { control: 'text' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
