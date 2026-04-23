import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from 'primereact/divider';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Separador visual.'
      }
    }
  },
  args: { layout: 'horizontal', align: 'center' },
  argTypes: { layout: { control: 'inline-radio', options: ['horizontal', 'vertical'] }, align: { control: 'select', options: ['left', 'center', 'right', 'top', 'bottom'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <div style={{ width: '24rem' }}><span>Before</span><Divider {...args}>Divider</Divider><span>After</span></div>,
  parameters: {
    docs: {
      source: {
        code: `<Divider align="center">Divider</Divider>`
      }
    }
  }
};

export const SakaiDivider: Story = {
  name: 'Sakai / Divider',
  render: () => <SakaiSectionDemo Component={panelDemo} section="Divider" />,
  parameters: sourceParameters(panelSource, 'Divider', 'Divider')
};
