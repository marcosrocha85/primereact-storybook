import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { OrderList } from 'primereact/orderlist';
import { defaultArgs, Playground, type ExampleArgs } from './OrderList.examples';
import exampleSource from './OrderList.examples.tsx?raw';

const meta = {
  title: 'Components/OrderList',
  component: OrderList,
  parameters: {
    layout: 'centered',
    controls: { include: ["header","filter"] },
    docs: { description: { component: 'Orderable list.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { header: { control: 'text' }, filter: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
