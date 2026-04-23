import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chip } from 'primereact/chip';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Chip textual, com icone ou imagem.'
      }
    }
  },
  args: { label: 'Action', icon: undefined, removable: false },
  argTypes: { label: { control: 'text' }, icon: { control: 'text' }, removable: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Chip {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Chip label="Action" />`
      }
    }
  }
};

export const SakaiBasic: Story = {
  name: 'Sakai / Basic',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Basic" />,
  parameters: sourceParameters(miscSource, 'Basic', 'Chip')
};

export const SakaiIcon: Story = {
  name: 'Sakai / Icon',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Icon" />,
  parameters: sourceParameters(miscSource, 'Icon', 'Chip')
};

export const SakaiImage: Story = {
  name: 'Sakai / Image',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Image" />,
  parameters: sourceParameters(miscSource, 'Image', 'Chip')
};
