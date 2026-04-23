import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import overlayDemo from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page';
import overlaySource from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Janela modal.'
      }
    }
  },
  args: { header: 'Header', modal: true, visible: true, style: { width: '32rem' } },
  argTypes: { header: { control: 'text' }, modal: { control: 'boolean' }, visible: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <><Button label="Open" /><Dialog {...args} onHide={() => undefined}><p className="m-0">Dialog content.</p></Dialog></>,
  parameters: {
    docs: {
      source: {
        code: `<Dialog header="Header" visible={visible} onHide={() => setVisible(false)}>Content</Dialog>`
      }
    }
  }
};

export const SakaiDialog: Story = {
  name: 'Sakai / Dialog',
  render: () => <SakaiSectionDemo Component={overlayDemo} section="Dialog" />,
  parameters: sourceParameters(overlaySource, 'Dialog', 'Dialog')
};
