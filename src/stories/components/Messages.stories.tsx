import type { Meta, StoryObj } from '@storybook/react-vite';
import { Messages } from 'primereact/messages';
import messageDemo from '../../../vendor/sakai-react/app/(main)/uikit/message/page';
import messageSource from '../../../vendor/sakai-react/app/(main)/uikit/message/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Messages',
  component: Messages,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Programmatic message list.'
      }
    }
  },
  args: {},
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Messages />,
  parameters: {
    docs: {
      source: {
        code: `<Messages ref={messages} />`
      }
    }
  }
};

export const SakaiMessages: Story = {
  name: 'Sakai / Messages',
  render: () => <SakaiSectionDemo Component={messageDemo} section="Messages" />,
  parameters: sourceParameters(messageSource, 'Messages', 'Messages')
};
