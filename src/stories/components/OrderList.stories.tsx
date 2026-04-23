import type { Meta, StoryObj } from '@storybook/react-vite';
import { OrderList } from 'primereact/orderlist';
import listDemo from '../../../vendor/sakai-react/app/(main)/uikit/list/page';
import listSource from '../../../vendor/sakai-react/app/(main)/uikit/list/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];

const meta = {
  title: 'Components/OrderList',
  component: OrderList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Orderable list.'
      }
    }
  },
  args: { value: products, header: 'Products' },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <OrderList {...args} itemTemplate={(item) => <span>{item.name}</span>} onChange={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<OrderList value={products} itemTemplate={itemTemplate} onChange={onChange} />`
      }
    }
  }
};

export const SakaiOrderList: Story = {
  name: 'Sakai / OrderList',
  render: () => <SakaiSectionDemo Component={listDemo} section="OrderList" />,
  parameters: sourceParameters(listSource, 'OrderList', 'OrderList')
};
