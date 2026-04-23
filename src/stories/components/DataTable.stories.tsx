import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import tableDemo from '../../../vendor/sakai-react/app/(main)/uikit/table/page';
import tableSource from '../../../vendor/sakai-react/app/(main)/uikit/table/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const products = [
  { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 }
];

const meta = {
  title: 'Components/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tabela de dados com filtros, selecao, expansao e agrupamento.'
      }
    }
  },
  args: { value: products, paginator: false, rows: 5, stripedRows: false, showGridlines: false },
  argTypes: { paginator: { control: 'boolean' }, stripedRows: { control: 'boolean' }, showGridlines: { control: 'boolean' }, rows: { control: 'number' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <DataTable {...args}><Column field="name" header="Name" /><Column field="category" header="Category" /><Column field="price" header="Price" /></DataTable>,
  parameters: {
    docs: {
      source: {
        code: `<DataTable value={products}><Column field="name" header="Name" /></DataTable>`
      }
    }
  }
};

export const SakaiFilterMenu: Story = {
  name: 'Sakai / Filter Menu',
  render: () => <SakaiSectionDemo Component={tableDemo} section="Filter Menu" />,
  parameters: sourceParameters(tableSource, 'Filter Menu', 'DataTable')
};

export const SakaiFrozenColumns: Story = {
  name: 'Sakai / Frozen Columns',
  render: () => <SakaiSectionDemo Component={tableDemo} section="Frozen Columns" />,
  parameters: sourceParameters(tableSource, 'Frozen Columns', 'DataTable')
};

export const SakaiRowExpand: Story = {
  name: 'Sakai / Row Expand',
  render: () => <SakaiSectionDemo Component={tableDemo} section="Row Expand" />,
  parameters: sourceParameters(tableSource, 'Row Expand', 'DataTable')
};

export const SakaiSubheaderGrouping: Story = {
  name: 'Sakai / Subheader Grouping',
  render: () => <SakaiSectionDemo Component={tableDemo} section="Subheader Grouping" />,
  parameters: sourceParameters(tableSource, 'Subheader Grouping', 'DataTable')
};
