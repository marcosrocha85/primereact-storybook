import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabView } from 'primereact/tabview';
import { TabPanel } from 'primereact/tabview';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/TabView',
  component: TabView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navegacao por abas.'
      }
    }
  },
  args: { activeIndex: 0 },
  argTypes: { activeIndex: { control: 'number' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <TabView {...args}><TabPanel header="Header I"><p>Content I</p></TabPanel><TabPanel header="Header II"><p>Content II</p></TabPanel></TabView>,
  parameters: {
    docs: {
      source: {
        code: `<TabView><TabPanel header="Header I">Content</TabPanel></TabView>`
      }
    }
  }
};

export const SakaiTabView: Story = {
  name: 'Sakai / TabView',
  render: () => <SakaiSectionDemo Component={panelDemo} section="TabView" />,
  parameters: sourceParameters(panelSource, 'TabView', 'TabView')
};
