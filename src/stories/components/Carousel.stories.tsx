import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Carousel } from 'primereact/carousel';
import { defaultArgs, Playground, type ExampleArgs } from './Carousel.examples';
import exampleSource from './Carousel.examples.tsx?raw';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    controls: { include: ["page","numVisible","numScroll","responsiveOptions","orientation","verticalViewPortHeight","circular","showIndicators","showNavigators","autoplayInterval","header","footer"] },
    docs: { description: { component: 'Sakai product carousel with responsive paging, circular navigation and vertical layout. Page is a zero-based page index. Responsive options override item counts at their breakpoints; use positive counts with numScroll no greater than numVisible. Autoplay implies circular navigation. Circular and autoplay examples use native paging: page must stay zero and onPageChange is unsupported in these modes in PrimeReact 10.9.7. Normal paging synchronizes Controls. Invalid count/page combinations display guidance instead of rendering a broken carousel.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { page: { description: 'Zero-based page in normal mode. Keep zero for circular/autoplay.', control: { type: 'number', min: 0, max: 2, step: 1 } }, numVisible: { control: { type: 'number', min: 1, max: 3, step: 1 } }, numScroll: { control: { type: 'number', min: 1, max: 3, step: 1 } }, responsiveOptions: { control: 'object' }, orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, verticalViewPortHeight: { control: 'text' }, circular: { control: 'boolean' }, showIndicators: { control: 'boolean' }, showNavigators: { control: 'boolean' }, autoplayInterval: { control: { type: 'number', min: 0, step: 1000 } }, header: { control: 'text' }, footer: { control: 'text' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
