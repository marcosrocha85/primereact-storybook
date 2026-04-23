import type { Meta, StoryObj } from '@storybook/react-vite';
import { Carousel } from 'primereact/carousel';
import mediaDemo from '../../../vendor/sakai-react/app/(main)/uikit/media/page';
import mediaSource from '../../../vendor/sakai-react/app/(main)/uikit/media/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }, { name: 'Blue Band' }];

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Item carousel.'
      }
    }
  },
  args: { value: products, numVisible: 3, numScroll: 1, circular: false },
  argTypes: { numVisible: { control: 'number' }, numScroll: { control: 'number' }, circular: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Carousel {...args} itemTemplate={(item) => <div className="p-3 text-center">{item.name}</div>} />,
  parameters: {
    docs: {
      source: {
        code: `<Carousel value={products} numVisible={3} numScroll={1} itemTemplate={productTemplate} />`
      }
    }
  }
};

export const SakaiCarousel: Story = {
  name: 'Sakai / Carousel',
  render: () => <SakaiSectionDemo Component={mediaDemo} section="Carousel" />,
  parameters: sourceParameters(mediaSource, 'Carousel', 'Carousel')
};
