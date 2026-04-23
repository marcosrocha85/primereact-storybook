import type { Meta, StoryObj } from '@storybook/react-vite';
import { MegaMenu } from 'primereact/megamenu';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ label: 'Videos', icon: 'pi pi-fw pi-video', items: [[{ label: 'Video 1', items: [{ label: 'Video 1.1' }] }]] }];

const meta = {
  title: 'Components/MegaMenu',
  component: MegaMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Menu amplo com agrupamentos.'
      }
    }
  },
  args: { model: items, orientation: 'horizontal' },
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <MegaMenu {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<MegaMenu model={items} orientation="horizontal" />`
      }
    }
  }
};

export const SakaiMegaMenuHorizontal: Story = {
  name: 'Sakai / MegaMenu - Horizontal',
  render: () => <SakaiSectionDemo Component={menuDemo} section="MegaMenu - Horizontal" />,
  parameters: sourceParameters(menuSource, 'MegaMenu - Horizontal', 'MegaMenu')
};

export const SakaiMegaMenuVertical: Story = {
  name: 'Sakai / MegaMenu - Vertical',
  render: () => <SakaiSectionDemo Component={menuDemo} section="MegaMenu - Vertical" />,
  parameters: sourceParameters(menuSource, 'MegaMenu - Vertical', 'MegaMenu')
};
