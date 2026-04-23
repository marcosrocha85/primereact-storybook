import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from 'primereact/tag';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Status label.'
      }
    }
  },
  args: { value: 'Primary', severity: undefined, rounded: false, icon: undefined },
  argTypes: { value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, rounded: { control: 'boolean' }, icon: { control: 'text' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Tag {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Tag value="Primary" />`
      }
    }
  }
};

export const SakaiTags: Story = {
  name: 'Sakai / Tags',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Tags" />,
  parameters: sourceParameters(miscSource, 'Tags', 'Tag')
};

export const SakaiPills: Story = {
  name: 'Sakai / Pills',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Pills" />,
  parameters: sourceParameters(miscSource, 'Pills', 'Tag')
};

export const SakaiIcons: Story = {
  name: 'Sakai / Icons',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Icons" />,
  parameters: sourceParameters(miscSource, 'Icons', 'Tag')
};
