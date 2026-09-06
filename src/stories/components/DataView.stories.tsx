import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { DataView } from 'primereact/dataview';
import { defaultArgs, Playground, type ExampleArgs } from './DataView.examples';
import exampleSource from './DataView.examples.tsx?raw';

const meta = {
  title: 'Components/DataView',
  component: DataView,
  parameters: {
    layout: 'centered',
    controls: { include: ["layout","paginator","rows"] },
    docs: { description: { component: 'Collection view in list or grid layout.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { layout: { control: 'inline-radio', options: ['list', 'grid'] }, paginator: { control: 'boolean' }, rows: { control: 'number' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
