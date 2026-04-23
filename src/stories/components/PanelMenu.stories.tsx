import type { Meta, StoryObj } from '@storybook/react-vite';
import { PanelMenu } from 'primereact/panelmenu';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }] }];

const meta = {
  title: 'Components/PanelMenu',
  component: PanelMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Menu em paineis expansivos.'
      }
    }
  },
  args: { model: items, style: { width: '20rem' } },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <PanelMenu {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<PanelMenu model={items} />`
      }
    }
  }
};

export const SakaiPanelMenu: Story = {
  name: 'Sakai / PanelMenu',
  render: () => <SakaiSectionDemo Component={menuDemo} section="PanelMenu" />,
  parameters: sourceParameters(menuSource, 'PanelMenu', 'PanelMenu')
};
