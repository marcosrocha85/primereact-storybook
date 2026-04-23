import type { Meta, StoryObj } from '@storybook/react-vite';
import { ProgressBar } from 'primereact/progressbar';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Indicador de progresso.'
      }
    }
  },
  args: { value: 50, showValue: true },
  argTypes: { value: { control: 'number' }, showValue: { control: 'boolean' }, mode: { control: 'select', options: ['determinate', 'indeterminate'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <div style={{ width: '24rem' }}><ProgressBar {...args} /></div>,
  parameters: {
    docs: {
      source: {
        code: `<ProgressBar value={50} />`
      }
    }
  }
};

export const SakaiProgressBar: Story = {
  name: 'Sakai / ProgressBar',
  render: () => <SakaiSectionDemo Component={miscDemo} section="ProgressBar" />,
  parameters: sourceParameters(miscSource, 'ProgressBar', 'ProgressBar')
};
