import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContextMenu } from 'primereact/contextmenu';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Delete', icon: 'pi pi-times' }];

const meta = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Menu acionado por contexto.'
      }
    }
  },
  args: { model: items },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <div><ContextMenu {...args} /><div className="p-4 border-1 border-round">Right click area</div></div>,
  parameters: {
    docs: {
      source: {
        code: `<ContextMenu model={items} ref={contextMenu} />`
      }
    }
  }
};

export const SakaiContextMenu: Story = {
  name: 'Sakai / ContextMenu',
  render: () => <SakaiSectionDemo Component={menuDemo} section="ContextMenu" />,
  parameters: sourceParameters(menuSource, 'ContextMenu', 'ContextMenu')
};
