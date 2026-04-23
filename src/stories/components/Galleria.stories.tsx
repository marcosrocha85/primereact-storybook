import type { Meta, StoryObj } from '@storybook/react-vite';
import { Galleria } from 'primereact/galleria';
import mediaDemo from '../../../vendor/sakai-react/app/(main)/uikit/media/page';
import mediaSource from '../../../vendor/sakai-react/app/(main)/uikit/media/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const images = [{ itemImageSrc: '/demo/images/galleria/galleria1.jpg', thumbnailImageSrc: '/demo/images/galleria/galleria1s.jpg', alt: 'Image' }];

const meta = {
  title: 'Components/Galleria',
  component: Galleria,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Image gallery.'
      }
    }
  },
  args: { value: images, numVisible: 1, circular: true, showItemNavigators: true },
  argTypes: { numVisible: { control: 'number' }, circular: { control: 'boolean' }, showItemNavigators: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Galleria {...args} item={(item) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />} thumbnail={(item) => <img src={item.thumbnailImageSrc} alt={item.alt} />} style={{ maxWidth: '420px' }} />,
  parameters: {
    docs: {
      source: {
        code: `<Galleria value={images} item={itemTemplate} thumbnail={thumbnailTemplate} />`
      }
    }
  }
};

export const SakaiGalleria: Story = {
  name: 'Sakai / Galleria',
  render: () => <SakaiSectionDemo Component={mediaDemo} section="Galleria" />,
  parameters: sourceParameters(mediaSource, 'Galleria', 'Galleria')
};
