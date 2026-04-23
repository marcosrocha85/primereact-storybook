import type { Meta, StoryObj } from '@storybook/react-vite';
import { DataView } from 'primereact/dataview';
import listDemo from '../../../vendor/sakai-react/app/(main)/uikit/list/page';
import listSource from '../../../vendor/sakai-react/app/(main)/uikit/list/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const items = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];

const meta = {
  title: 'Components/DataView',
  component: DataView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Visualizacao de colecoes em lista ou grid.'
      }
    }
  },
  args: { value: items },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <DataView {...args} itemTemplate={(item) => <div className="p-3">{item.name}</div>} />,
  parameters: {
    docs: {
      source: {
        code: `<DataView value={products} itemTemplate={itemTemplate} />`
      }
    }
  }
};

export const SakaiDataView: Story = {
  name: 'Sakai / DataView',
  render: () => <SakaiSectionDemo Component={listDemo} section="DataView" />,
  parameters: sourceParameters(listSource, 'DataView', 'DataView')
};
