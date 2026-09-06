import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { AvatarGroup } from 'primereact/avatargroup';
import { defaultArgs, Playground, type ExampleArgs } from './AvatarGroup.examples';
import exampleSource from './AvatarGroup.examples.tsx?raw';

const meta = {
  title: 'Components/AvatarGroup',
  parameters: {
    layout: 'centered',
    controls: { include: ["count","content","size","shape","showOverflow","className","style"] },
    docs: { description: { component: 'Overlapping avatars representing a team. Explore member count, text, images, mixed content, sizes, shapes, and an optional overflow indicator in Default.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { count: { control: 'select', options: [2, 3, 4, 5], description: 'Visible members, excluding the +2 indicator.' }, content: { control: 'select', options: ['text', 'image', 'mixed'] }, size: { control: 'select', options: ['normal', 'large', 'xlarge'] }, shape: { control: 'inline-radio', options: ['square', 'circle'] }, showOverflow: { control: 'boolean' }, className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
