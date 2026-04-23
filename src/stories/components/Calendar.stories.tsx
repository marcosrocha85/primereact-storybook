import type { Meta, StoryObj } from '@storybook/react-vite';
import { Calendar } from 'primereact/calendar';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Selecionador de data.'
      }
    }
  },
  args: { placeholder: 'Select date', showIcon: true, showButtonBar: true },
  argTypes: {
    placeholder: { control: 'text' },
    showIcon: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Calendar {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Calendar showIcon showButtonBar />`
      }
    }
  }
};

export const SakaiCalendar: Story = {
  name: 'Sakai / Calendar',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Calendar" />,
  parameters: sourceParameters(inputSource, 'Calendar', 'Calendar')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'Calendar')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'Calendar')
};
