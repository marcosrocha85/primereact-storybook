import type { Meta, StoryObj } from '@storybook/react-vite';
import { Panel } from 'primereact/panel';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container with a header and optional toggle behavior.'
      }
    }
  },
  args: { header: 'Header', toggleable: true },
  argTypes: { header: { control: 'text' }, toggleable: { control: 'boolean' }, collapsed: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Panel {...args}><p>Panel content.</p></Panel>,
  parameters: {
    docs: {
      source: {
        code: `<Panel header="Header" toggleable>Content</Panel>`
      }
    }
  }
};

export const SakaiPanel: Story = {
  name: 'Sakai / Panel',
  render: () => <SakaiSectionDemo Component={panelDemo} section="Panel" />,
  parameters: sourceParameters(panelSource, 'Panel', 'Panel')
};
