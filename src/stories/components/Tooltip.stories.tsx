import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import overlayDemo from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page';
import overlaySource from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Contextual hint.'
      }
    }
  },
  args: { target: '.tooltip-target', content: 'Tooltip content' },
  argTypes: { content: { control: 'text' }, position: { control: 'select', options: ['top', 'bottom', 'left', 'right'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <><Tooltip {...args} /><Button className="tooltip-target" label="Hover me" /></>,
  parameters: {
    docs: {
      source: {
        code: `<Tooltip target=".tooltip-target" content="Tooltip content" />`
      }
    }
  }
};

export const SakaiTooltip: Story = {
  name: 'Sakai / Tooltip',
  render: () => <SakaiSectionDemo Component={overlayDemo} section="Tooltip" />,
  parameters: sourceParameters(overlaySource, 'Tooltip', 'Tooltip')
};
