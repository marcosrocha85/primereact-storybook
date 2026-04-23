import type { Meta, StoryObj } from '@storybook/react-vite';
import { Knob } from 'primereact/knob';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Knob',
  component: Knob,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Controle circular numerico.'
      }
    }
  },
  args: { value: 20, min: 0, max: 100, step: 1 },
  argTypes: { value: { control: 'number' }, min: { control: 'number' }, max: { control: 'number' }, step: { control: 'number' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Knob {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Knob value={knobValue} onChange={(event) => setKnobValue(event.value)} />`
      }
    }
  }
};

export const SakaiKnob: Story = {
  name: 'Sakai / Knob',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Knob" />,
  parameters: sourceParameters(inputSource, 'Knob', 'Knob')
};
