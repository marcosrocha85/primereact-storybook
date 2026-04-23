import type { Meta, StoryObj } from '@storybook/react-vite';
import { PickList } from 'primereact/picklist';
import listDemo from '../../../vendor/sakai-react/app/(main)/uikit/list/page';
import listSource from '../../../vendor/sakai-react/app/(main)/uikit/list/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const source = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];

const meta = {
  title: 'Components/PickList',
  component: PickList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Transferencia entre listas.'
      }
    }
  },
  args: { source, target: [], sourceHeader: 'Available', targetHeader: 'Selected' },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <PickList {...args} itemTemplate={(item) => <span>{item.name}</span>} onChange={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<PickList source={source} target={target} itemTemplate={itemTemplate} onChange={onChange} />`
      }
    }
  }
};

export const SakaiPickList: Story = {
  name: 'Sakai / PickList',
  render: () => <SakaiSectionDemo Component={listDemo} section="PickList" />,
  parameters: sourceParameters(listSource, 'PickList', 'PickList')
};
