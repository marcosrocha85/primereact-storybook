import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import messageDemo from '../../../vendor/sakai-react/app/(main)/uikit/message/page';
import messageSource from '../../../vendor/sakai-react/app/(main)/uikit/message/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Temporary notification.'
      }
    }
  },
  args: { position: 'top-right' },
  argTypes: { position: { control: 'select', options: ['top-right', 'top-left', 'bottom-right', 'bottom-left', 'center'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <><Toast {...args} /><Button label="Show toast" /></>,
  parameters: {
    docs: {
      source: {
        code: `<Toast ref={toast} /><Button onClick={() => toast.current?.show({ severity: 'success', summary: 'Success' })} />`
      }
    }
  }
};

export const SakaiToast: Story = {
  name: 'Sakai / Toast',
  render: () => <SakaiSectionDemo Component={messageDemo} section="Toast" />,
  parameters: sourceParameters(messageSource, 'Toast', 'Toast')
};
