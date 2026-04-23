import type { Meta, StoryObj } from '@storybook/react-vite';
import { Steps } from 'primereact/steps';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ label: 'Personal' }, { label: 'Seat' }, { label: 'Payment' }];

const meta = {
  title: 'Components/Steps',
  component: Steps,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Fluxo por etapas.'
      }
    }
  },
  args: { model: items, activeIndex: 0 },
  argTypes: { activeIndex: { control: 'number' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Steps {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Steps model={items} activeIndex={activeIndex} />`
      }
    }
  }
};

export const SakaiSteps: Story = {
  name: 'Sakai / Steps',
  render: () => <SakaiSectionDemo Component={menuDemo} section="Steps" />,
  parameters: sourceParameters(menuSource, 'Steps', 'Steps')
};
