import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabMenu } from 'primereact/tabmenu';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ label: 'Home', icon: 'pi pi-fw pi-home' }, { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }];

const meta = {
  title: 'Components/TabMenu',
  component: TabMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tabbed menu.'
      }
    }
  },
  args: { model: items, activeIndex: 0 },
  argTypes: { activeIndex: { control: 'number' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <TabMenu {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<TabMenu model={items} activeIndex={activeIndex} />`
      }
    }
  }
};

export const SakaiTabMenu: Story = {
  name: 'Sakai / TabMenu',
  render: () => <SakaiSectionDemo Component={menuDemo} section="TabMenu" />,
  parameters: sourceParameters(menuSource, 'TabMenu', 'TabMenu')
};
