import type { Meta, StoryObj } from '@storybook/react-vite';
import { Splitter } from 'primereact/splitter';
import { SplitterPanel } from 'primereact/splitter';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Splitter',
  component: Splitter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Resizable panel layout.'
      }
    }
  },
  args: { style: { height: '180px', width: '30rem' } },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Splitter {...args}><SplitterPanel className="flex align-items-center justify-content-center">Panel 1</SplitterPanel><SplitterPanel className="flex align-items-center justify-content-center">Panel 2</SplitterPanel></Splitter>,
  parameters: {
    docs: {
      source: {
        code: `<Splitter><SplitterPanel>Panel 1</SplitterPanel><SplitterPanel>Panel 2</SplitterPanel></Splitter>`
      }
    }
  }
};

export const SakaiSplitter: Story = {
  name: 'Sakai / Splitter',
  render: () => <SakaiSectionDemo Component={panelDemo} section="Splitter" />,
  parameters: sourceParameters(panelSource, 'Splitter', 'Splitter')
};
