import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { PickList } from 'primereact/picklist';
import { defaultArgs, Playground, type ExampleArgs } from './PickList.examples';
import exampleSource from './PickList.examples.tsx?raw';

const meta = {
  title: 'Components/PickList',
  component: PickList,
  parameters: {
    layout: 'centered',
    controls: { include: ["sourceHeader","targetHeader","filter"] },
    docs: { description: { component: 'Transfer items between lists.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { sourceHeader: { control: 'text' }, targetHeader: { control: 'text' }, filter: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
