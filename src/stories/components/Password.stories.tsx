import type { Meta, StoryObj } from '@storybook/react-vite';
import { Password } from 'primereact/password';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Password',
  component: Password,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Entrada de senha com feedback.'
      }
    }
  },
  args: { placeholder: 'Password', feedback: true, toggleMask: true },
  argTypes: { placeholder: { control: 'text' }, feedback: { control: 'boolean' }, toggleMask: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Password {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Password placeholder="Password" feedback toggleMask />`
      }
    }
  }
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'Password')
};
