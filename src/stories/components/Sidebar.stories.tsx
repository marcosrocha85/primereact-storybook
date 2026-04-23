import type { Meta, StoryObj } from '@storybook/react-vite';
import { Sidebar } from 'primereact/sidebar';
import overlayDemo from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page';
import overlaySource from '../../../vendor/sakai-react/app/(main)/uikit/overlay/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Painel lateral.'
      }
    }
  },
  args: { visible: true, position: 'right' },
  argTypes: { visible: { control: 'boolean' }, position: { control: 'select', options: ['left', 'right', 'top', 'bottom'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Sidebar {...args} onHide={() => undefined}><p>Sidebar content.</p></Sidebar>,
  parameters: {
    docs: {
      source: {
        code: `<Sidebar visible={visible} position="right" onHide={() => setVisible(false)}>Content</Sidebar>`
      }
    }
  }
};

export const SakaiSidebar: Story = {
  name: 'Sakai / Sidebar',
  render: () => <SakaiSectionDemo Component={overlayDemo} section="Sidebar" />,
  parameters: sourceParameters(overlaySource, 'Sidebar', 'Sidebar')
};
