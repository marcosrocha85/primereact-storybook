import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PanelProps } from 'primereact/panel';
import { Panel } from 'primereact/panel';

type PanelStoryArgs = PanelProps & {
  content?: string;
};

const meta = {
  title: 'Components/Panel',
  component: Panel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'PrimeReact Panel used by Sakai as a container with a header and optional toggle behavior.'
      }
    }
  },
  args: {
    header: 'Panel Header',
    footer: undefined,
    toggleable: false,
    collapsed: false,
    expandIcon: undefined,
    collapseIcon: undefined,
    unstyled: false,
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  argTypes: {
    header: { control: 'text' },
    footer: { control: 'text' },
    toggleable: { control: 'boolean' },
    collapsed: {
      control: 'boolean',
      if: { arg: 'toggleable', truthy: true }
    },
    expandIcon: {
      control: 'select',
      options: [undefined, 'pi pi-chevron-down', 'pi pi-plus', 'pi pi-angle-down', 'pi pi-caret-down'],
      if: { arg: 'toggleable', truthy: true }
    },
    collapseIcon: {
      control: 'select',
      options: [undefined, 'pi pi-chevron-up', 'pi pi-minus', 'pi pi-angle-up', 'pi pi-caret-up'],
      if: { arg: 'toggleable', truthy: true }
    },
    unstyled: { control: 'boolean' },
    content: { control: 'text' }
  }
} satisfies Meta<PanelStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ content, ...args }) => (
    <div style={{ width: '30rem' }}>
      <Panel {...args}>
        <p className="m-0 line-height-3">{content}</p>
      </Panel>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Panel header="Panel Header">
  <p>Lorem ipsum dolor sit amet...</p>
</Panel>`
      }
    }
  }
};
