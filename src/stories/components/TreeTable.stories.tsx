import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';
import treeDemo from '../../../vendor/sakai-react/app/(main)/uikit/tree/page';
import treeSource from '../../../vendor/sakai-react/app/(main)/uikit/tree/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const nodes = [{ key: '0', data: { name: 'Applications', size: '100kb', type: 'Folder' }, children: [{ key: '0-0', data: { name: 'React', size: '25kb', type: 'Folder' } }] }];

const meta = {
  title: 'Components/TreeTable',
  component: TreeTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tabela hierarquica.'
      }
    }
  },
  args: { value: nodes },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <TreeTable {...args}><Column field="name" header="Name" expander /><Column field="size" header="Size" /><Column field="type" header="Type" /></TreeTable>,
  parameters: {
    docs: {
      source: {
        code: `<TreeTable value={nodes}><Column field="name" header="Name" expander /></TreeTable>`
      }
    }
  }
};

export const SakaiTreeTable: Story = {
  name: 'Sakai / TreeTable',
  render: () => <SakaiSectionDemo Component={treeDemo} section="TreeTable" />,
  parameters: sourceParameters(treeSource, 'TreeTable', 'TreeTable')
};
