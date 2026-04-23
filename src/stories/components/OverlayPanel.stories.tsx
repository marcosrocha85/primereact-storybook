import type { Meta, StoryObj } from '@storybook/react-vite';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';
import overlayDemo from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page';
import overlaySource from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/OverlayPanel',
  component: OverlayPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Painel flutuante acionado por evento.'
      }
    }
  },
  args: {},
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <><Button label="Show" /><OverlayPanel><p>Overlay content.</p></OverlayPanel></>,
  parameters: {
    docs: {
      source: {
        code: `<OverlayPanel ref={overlayPanel}>Content</OverlayPanel>`
      }
    }
  }
};

export const SakaiOverlayPanel: Story = {
  name: 'Sakai / Overlay Panel',
  render: () => <SakaiSectionDemo Component={overlayDemo} section="Overlay Panel" />,
  parameters: sourceParameters(overlaySource, 'Overlay Panel', 'OverlayPanel')
};
