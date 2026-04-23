import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from 'primereact/menu';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Update', icon: 'pi pi-refresh' }];

const meta = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Menu vertical simples ou popup.'
      }
    }
  },
  args: { model: items },
  argTypes: { popup: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Menu {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Menu model={items} />`
      }
    }
  }
};

export const SakaiPlainMenu: Story = {
  name: 'Sakai / Plain Menu',
  render: () => <SakaiSectionDemo Component={menuDemo} section="Plain Menu" />,
  parameters: sourceParameters(menuSource, 'Plain Menu', 'Menu')
};

export const SakaiOverlayMenu: Story = {
  name: 'Sakai / Overlay Menu',
  render: () => <SakaiSectionDemo Component={menuDemo} section="Overlay Menu" />,
  parameters: sourceParameters(menuSource, 'Overlay Menu', 'Menu')
};
