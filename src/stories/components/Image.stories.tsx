import type { Meta, StoryObj } from '@storybook/react-vite';
import { Image } from 'primereact/image';
import mediaDemo from '../../../vendor/sakai-react/app/(main)/uikit/media/page';
import mediaSource from '../../../vendor/sakai-react/app/(main)/uikit/media/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Image with optional preview.'
      }
    }
  },
  args: { src: '/demo/images/galleria/galleria1.jpg', alt: 'Image', width: '250', preview: true },
  argTypes: { src: { control: 'text' }, alt: { control: 'text' }, width: { control: 'text' }, preview: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Image {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Image src="/demo/images/galleria/galleria1.jpg" alt="Image" width="250" preview />`
      }
    }
  }
};

export const SakaiImage: Story = {
  name: 'Sakai / Image',
  render: () => <SakaiSectionDemo Component={mediaDemo} section="Image" />,
  parameters: sourceParameters(mediaSource, 'Image', 'Image')
};
