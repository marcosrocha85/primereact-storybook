import type { Meta, StoryObj } from '@storybook/react-vite';

import PanelDemo from '../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from './sakaiStoryHelpers';

const meta = {
  title: 'Sakai React/Panel',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const panel = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={PanelDemo} section={name} />,
  parameters: sourceParameters(panelSource, name, components)
});

export const Toolbar: Story = panel('Toolbar');
export const AccordionPanel: Story = panel('AccordionPanel', 'Accordion, AccordionTab');
export const TabView: Story = panel('TabView', 'TabView, TabPanel');
export const Panel: Story = panel('Panel');
export const Fieldset: Story = panel('Fieldset');
export const Card: Story = panel('Card');
export const Divider: Story = panel('Divider');
export const Splitter: Story = panel('Splitter', 'Splitter, SplitterPanel');
