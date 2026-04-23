import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputMask } from 'primereact/inputmask';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/InputMask',
  component: InputMask,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Campo de texto com mascara.'
      }
    }
  },
  args: { mask: '99/99/9999', placeholder: '99/99/9999' },
  argTypes: {
    mask: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <InputMask {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<InputMask mask="99/99/9999" placeholder="99/99/9999" />`
      }
    }
  }
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'InputMask')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'InputMask')
};
