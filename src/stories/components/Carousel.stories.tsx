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
    controls: { include: ["numVisible","numScroll","circular"] },
    docs: { description: { component: 'Item carousel.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { numVisible: { control: 'number' }, numScroll: { control: 'number' }, circular: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
