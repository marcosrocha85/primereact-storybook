import type { Meta, StoryObj } from '@storybook/react-vite';

import MenuDemo from '../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import MessageDemo from '../../vendor/sakai-react/app/(main)/uikit/message/page';
import messageSource from '../../vendor/sakai-react/app/(main)/uikit/message/page.tsx?raw';
import OverlayDemo from '../../vendor/sakai-react/app/(main)/uikit/overlay/page';
import overlaySource from '../../vendor/sakai-react/app/(main)/uikit/overlay/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from './sakaiStoryHelpers';

const meta = {
  title: 'Sakai React/Overlay, Menu e Message',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const menu = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={MenuDemo} section={name} />,
  parameters: sourceParameters(menuSource, name, components)
});

const overlay = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={OverlayDemo} section={name} />,
  parameters: sourceParameters(overlaySource, name, components)
});

const message = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={MessageDemo} section={name} />,
  parameters: sourceParameters(messageSource, name, components)
});

export const Menubar: Story = menu('Menubar');
export const Breadcrumb: Story = menu('Breadcrumb', 'BreadCrumb');
export const Steps: Story = menu('Steps');
export const TabMenu: Story = menu('TabMenu');
export const TieredMenu: Story = { name: 'Tiered Menu', ...menu('Tiered Menu') };
export const PlainMenu: Story = { name: 'Plain Menu', ...menu('Plain Menu', 'Menu') };
export const OverlayMenu: Story = { name: 'Overlay Menu', ...menu('Overlay Menu', 'Menu popup') };
export const ContextMenu: Story = menu('ContextMenu');
export const MegaMenuHorizontal: Story = { name: 'MegaMenu - Horizontal', ...menu('MegaMenu - Horizontal') };
export const MegaMenuVertical: Story = { name: 'MegaMenu - Vertical', ...menu('MegaMenu - Vertical') };
export const PanelMenu: Story = menu('PanelMenu');
export const Dialog: Story = overlay('Dialog');
export const OverlayPanel: Story = { name: 'Overlay Panel', ...overlay('Overlay Panel') };
export const Confirmation: Story = overlay('Confirmation');
export const Sidebar: Story = overlay('Sidebar');
export const Tooltip: Story = overlay('Tooltip');
export const ConfirmPopup: Story = overlay('ConfirmPopup');
export const Toast: Story = message('Toast');
export const Messages: Story = message('Messages');
export const Inline: Story = message('Inline');
export const HelpText: Story = { name: 'Help Text', ...message('Help Text') };
