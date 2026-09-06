import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Avatar } from 'primereact/avatar';
import { defaultArgs, Playground, type ExampleArgs } from './Avatar.examples';
import exampleSource from './Avatar.examples.tsx?raw';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    controls: { include: ["label","icon","shape","size"] },
    docs: { description: { component: 'Visual representation of a user or entity.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { label: { control: 'text' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, shape: { control: 'inline-radio', options: ['square', 'circle'] }, size: { control: 'select', options: ['normal', 'large', 'xlarge'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
