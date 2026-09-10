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
    controls: { include: ["sourceHeader","targetHeader","filter","filterMatchMode","showSourceControls","showTargetControls","metaKeySelection","breakpoint"] },
    docs: { description: { component: 'Transfer items between source and target lists with filtering, selection, and responsive controls.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    sourceHeader: { control: 'text' },
    targetHeader: { control: 'text' },
    filter: { control: 'boolean' },
    filterMatchMode: { control: 'select', options: ['contains', 'startsWith', 'endsWith', 'equals', 'notEquals'] },
    showSourceControls: { control: 'boolean' },
    showTargetControls: { control: 'boolean' },
    metaKeySelection: { control: 'boolean' },
    breakpoint: { control: 'text' }
  }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
