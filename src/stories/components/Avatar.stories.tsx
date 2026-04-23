import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from 'primereact/avatar';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Representacao visual de usuario ou entidade.'
      }
    }
  },
  args: { label: 'P', shape: 'circle', size: 'large' },
  argTypes: { label: { control: 'text' }, icon: { control: 'text' }, shape: { control: 'inline-radio', options: ['square', 'circle'] }, size: { control: 'select', options: ['normal', 'large', 'xlarge'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Avatar {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Avatar label="P" shape="circle" size="large" />`
      }
    }
  }
};

export const SakaiLabelCircle: Story = {
  name: 'Sakai / Label - Circle',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Label - Circle" />,
  parameters: sourceParameters(miscSource, 'Label - Circle', 'Avatar')
};

export const SakaiIconBadge: Story = {
  name: 'Sakai / Icon - Badge',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Icon - Badge" />,
  parameters: sourceParameters(miscSource, 'Icon - Badge', 'Avatar')
};

export const SakaiImage: Story = {
  name: 'Sakai / Image',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Image" />,
  parameters: sourceParameters(miscSource, 'Image', 'Avatar')
};
