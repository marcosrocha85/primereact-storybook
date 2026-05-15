import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ImageProps } from 'primereact/image';
import { Image } from 'primereact/image';

type ImageStoryArgs = ImageProps;

const meta = {
  title: 'Components/Image',
  component: Image,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PrimeReact image display used by Sakai for media thumbnails with optional preview overlays.'
      }
    }
  },
  args: {
    src: '/demo/images/galleria/galleria10.jpg',
    alt: 'Sakai gallery image',
    width: '250',
    preview: true
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'text' },
    preview: { control: 'boolean' },
    imageClassName: { control: 'text' }
  }
} satisfies Meta<ImageStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Image {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Image src="/demo/images/galleria/galleria10.jpg" alt="Sakai gallery image" width="250" preview />`
      }
    }
  }
};
