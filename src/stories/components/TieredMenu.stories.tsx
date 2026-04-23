import type { Meta, StoryObj } from '@storybook/react-vite';
import { TieredMenu } from 'primereact/tieredmenu';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }] }];

const meta = {
  title: 'Components/TieredMenu',
  component: TieredMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Hierarchical menu.'
      }
    }
  },
  args: { model: items },
  argTypes: { popup: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <TieredMenu {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<TieredMenu model={items} />`
      }
    }
  }
};

export const SakaiTieredMenu: Story = {
  name: 'Sakai / Tiered Menu',
  render: () => <SakaiSectionDemo Component={menuDemo} section="Tiered Menu" />,
  parameters: sourceParameters(menuSource, 'Tiered Menu', 'TieredMenu')
};
