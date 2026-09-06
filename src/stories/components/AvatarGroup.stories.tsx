import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { AvatarGroup } from 'primereact/avatargroup';
import { defaultArgs, Playground, type ExampleArgs } from './AvatarGroup.examples';
import exampleSource from './AvatarGroup.examples.tsx?raw';

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    controls: { include: ["className","style"] },
    docs: { description: { component: 'Overlapping avatars representing a team, with a final avatar indicating additional members. Configure size and shape on each child Avatar.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
