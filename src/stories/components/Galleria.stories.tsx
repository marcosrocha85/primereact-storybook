import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Galleria } from 'primereact/galleria';
import { defaultArgs, Playground, type ExampleArgs } from './Galleria.examples';
import exampleSource from './Galleria.examples.tsx?raw';

const meta = {
  title: 'Components/Galleria',
  component: Galleria,
  parameters: {
    layout: 'centered',
    controls: { include: ["activeIndex","numVisible","responsiveOptions","circular","showItemNavigators","showItemNavigatorsOnHover","showThumbnails","thumbnailsPosition","showIndicators","showIndicatorsOnItem","indicatorsPosition","fullScreen","autoPlay","transitionInterval"] },
    docs: { description: { component: 'Responsive image gallery with thumbnails, indicators, navigation, captions, and optional fullscreen viewing.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    activeIndex: { control: { type: 'number', min: 0, max: 2, step: 1 }, description: 'Zero-based active image index.' },
    numVisible: { control: { type: 'number', min: 1, max: 3, step: 1 } },
    responsiveOptions: { control: 'object' },
    circular: { control: 'boolean' },
    showItemNavigators: { control: 'boolean' },
    showItemNavigatorsOnHover: { control: 'boolean' },
    showThumbnails: { control: 'boolean' },
    thumbnailsPosition: { control: 'inline-radio', options: ['bottom', 'top', 'left', 'right'] },
    showIndicators: { control: 'boolean' },
    showIndicatorsOnItem: { control: 'boolean' },
    indicatorsPosition: { control: 'inline-radio', options: ['bottom', 'top', 'left', 'right'] },
    fullScreen: { control: 'boolean' },
    autoPlay: { control: 'boolean' },
    transitionInterval: { control: 'number' }
  }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
