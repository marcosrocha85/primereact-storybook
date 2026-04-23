import type { Meta, StoryObj } from '@storybook/react-vite';
import { Message } from 'primereact/message';
import messageDemo from '../../../vendor/sakai-react/app/(main)/uikit/message/page';
import messageSource from '../../../vendor/sakai-react/app/(main)/uikit/message/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Message',
  component: Message,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Inline message.'
      }
    }
  },
  args: { severity: 'info', text: 'Message content' },
  argTypes: { severity: { control: 'select', options: ['success', 'info', 'warn', 'error'] }, text: { control: 'text' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Message {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Message severity="info" text="Message content" />`
      }
    }
  }
};

export const SakaiInline: Story = {
  name: 'Sakai / Inline',
  render: () => <SakaiSectionDemo Component={messageDemo} section="Inline" />,
  parameters: sourceParameters(messageSource, 'Inline', 'Message')
};

export const SakaiHelpText: Story = {
  name: 'Sakai / Help Text',
  render: () => <SakaiSectionDemo Component={messageDemo} section="Help Text" />,
  parameters: sourceParameters(messageSource, 'Help Text', 'Message')
};
