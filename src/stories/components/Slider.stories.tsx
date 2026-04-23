import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from 'primereact/slider';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Controle de valor por intervalo.'
      }
    }
  },
  args: { value: 50, min: 0, max: 100, step: 1 },
  argTypes: { value: { control: 'number' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <div style={{ width: '18rem' }}><Slider {...args} /></div>,
  parameters: {
    docs: {
      source: {
        code: `<Slider value={sliderValue} onChange={(event) => setSliderValue(event.value)} />`
      }
    }
  }
};

export const SakaiSlider: Story = {
  name: 'Sakai / Slider',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Slider" />,
  parameters: sourceParameters(inputSource, 'Slider', 'Slider')
};
