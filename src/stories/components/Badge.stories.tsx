import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Badge } from 'primereact/badge';
import { defaultArgs, Playground, type ExampleArgs } from './Badge.examples';
import exampleSource from './Badge.examples.tsx?raw';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","severity","size"] },
    docs: { description: { component: 'Numeric marker or status indicator.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, size: { control: 'select', options: [undefined, 'large', 'xlarge'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
