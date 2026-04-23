import type { Meta, StoryObj } from '@storybook/react-vite';

import ListDemo from '../../vendor/sakai-react/app/(main)/uikit/list/page';
import listSource from '../../vendor/sakai-react/app/(main)/uikit/list/page.tsx?raw';
import TableDemo from '../../vendor/sakai-react/app/(main)/uikit/table/page';
import tableSource from '../../vendor/sakai-react/app/(main)/uikit/table/page.tsx?raw';
import TreeDemo from '../../vendor/sakai-react/app/(main)/uikit/tree/page';
import treeSource from '../../vendor/sakai-react/app/(main)/uikit/tree/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from './sakaiStoryHelpers';

const meta = {
  title: 'Sakai React/Data',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const list = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={ListDemo} section={name} />,
  parameters: sourceParameters(listSource, name, components)
});

const table = (name: string, components = 'DataTable') => ({
  render: () => <SakaiSectionDemo Component={TableDemo} section={name} />,
  parameters: sourceParameters(tableSource, name, components)
});

const tree = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={TreeDemo} section={name} />,
  parameters: sourceParameters(treeSource, name, components)
});

export const DataView: Story = list('DataView');
export const PickList: Story = list('PickList');
export const OrderList: Story = list('OrderList');
export const FilterMenu: Story = { name: 'Table / Filter Menu', ...table('Filter Menu') };
export const FrozenColumns: Story = { name: 'Table / Frozen Columns', ...table('Frozen Columns') };
export const RowExpand: Story = { name: 'Table / Row Expand', ...table('Row Expand') };
export const SubheaderGrouping: Story = { name: 'Table / Subheader Grouping', ...table('Subheader Grouping') };
export const Tree: Story = tree('Tree');
export const TreeTable: Story = tree('TreeTable');
