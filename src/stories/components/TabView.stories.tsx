import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabPanel, TabView } from 'primereact/tabview';

const LOREM_OVERVIEW = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const LOREM_SPECS = `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.`;

const LOREM_REVIEWS = `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est
laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero
tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.`;

const meta = {
  title: 'Components/TabView',
  component: TabView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'TabView organises content into discrete panels separated by labelled tab headers. Only one panel is visible at a time; clicking a header activates its panel. Supports icons, disabled state, closable tabs, and scrollable header navigation.'
      }
    }
  },
  args: {
    activeIndex: 0,
    scrollable: false,
  },
  argTypes: {
    activeIndex: {
      control: 'number',
      description: 'Zero-based index of the initially active tab.'
    },
    scrollable: {
      control: 'boolean',
      description: 'When true, the tab header list scrolls horizontally when it overflows.'
    }
  }
} satisfies Meta<typeof TabView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: '680px' }}>
      <TabView {...args}>
        <TabPanel header="Overview">
          <p className="m-0">{LOREM_OVERVIEW}</p>
        </TabPanel>
        <TabPanel header="Specifications">
          <p className="m-0">{LOREM_SPECS}</p>
        </TabPanel>
        <TabPanel header="Reviews">
          <p className="m-0">{LOREM_REVIEWS}</p>
        </TabPanel>
      </TabView>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<TabView>
  <TabPanel header="Overview">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit…</p>
  </TabPanel>
  <TabPanel header="Specifications">
    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem…</p>
  </TabPanel>
  <TabPanel header="Reviews">
    <p>At vero eos et accusamus et iusto odio dignissimos ducimus…</p>
  </TabPanel>
</TabView>`
      }
    }
  }
};
