import type { Meta, StoryObj } from '@storybook/react-vite';
import { AvatarGroup } from 'primereact/avatargroup';
import { Avatar } from 'primereact/avatar';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Avatar group.'
      }
    }
  },
  args: {},
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <AvatarGroup><Avatar label="A" shape="circle" /><Avatar label="B" shape="circle" /><Avatar label="+2" shape="circle" /></AvatarGroup>,
  parameters: {
    docs: {
      source: {
        code: `<AvatarGroup><Avatar image="..." shape="circle" /></AvatarGroup>`
      }
    }
  }
};

export const SakaiAvatarGroup: Story = {
  name: 'Sakai / Avatar Group',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Avatar Group" />,
  parameters: sourceParameters(miscSource, 'Avatar Group', 'AvatarGroup')
};
