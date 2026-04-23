import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menubar } from 'primereact/menubar';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const menuItems = [{ label: 'File', icon: 'pi pi-fw pi-file' }, { label: 'Edit', icon: 'pi pi-fw pi-pencil' }];

const meta = {
  title: 'Components/Menubar',
  component: Menubar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Primary horizontal menu.'
      }
    }
  },
  args: { model: menuItems },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Menubar {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Menubar model={items} />`
      }
    }
  }
};

export const SakaiMenubar: Story = {
  name: 'Sakai / Menubar',
  render: () => <SakaiSectionDemo Component={menuDemo} section="Menubar" />,
  parameters: sourceParameters(menuSource, 'Menubar', 'Menubar')
};
