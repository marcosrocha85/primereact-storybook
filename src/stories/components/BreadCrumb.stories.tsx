import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { BreadCrumb } from 'primereact/breadcrumb';
import { defaultArgs, Playground, type ExampleArgs } from './BreadCrumb.examples';
import exampleSource from './BreadCrumb.examples.tsx?raw';

const meta = {
  title: 'Components/BreadCrumb',
  component: BreadCrumb,
  parameters: {
    layout: 'centered',
    controls: { include: ["model"] },
    docs: { description: { component: 'Navigation breadcrumb.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { model: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
