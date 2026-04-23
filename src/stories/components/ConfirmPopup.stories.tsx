import type { Meta, StoryObj } from '@storybook/react-vite';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';
import overlayDemo from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page';
import overlaySource from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/ConfirmPopup',
  component: ConfirmPopup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Contextual confirmation.'
      }
    }
  },
  args: {},
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <><Button label="Confirm" /><ConfirmPopup /></>,
  parameters: {
    docs: {
      source: {
        code: `<ConfirmPopup /><Button onClick={(event) => confirmPopup({ target: event.currentTarget, message: 'Are you sure?' })} />`
      }
    }
  }
};

export const SakaiConfirmation: Story = {
  name: 'Sakai / Confirmation',
  render: () => <SakaiSectionDemo Component={overlayDemo} section="Confirmation" />,
  parameters: sourceParameters(overlaySource, 'Confirmation', 'ConfirmPopup')
};

export const SakaiConfirmPopup: Story = {
  name: 'Sakai / ConfirmPopup',
  render: () => <SakaiSectionDemo Component={overlayDemo} section="ConfirmPopup" />,
  parameters: sourceParameters(overlaySource, 'ConfirmPopup', 'ConfirmPopup')
};
