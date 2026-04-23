import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollPanel } from 'primereact/scrollpanel';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/ScrollPanel',
  component: ScrollPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Area with custom scrolling.'
      }
    }
  },
  args: { style: { width: '24rem', height: '160px' } },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <ScrollPanel {...args}><p style={{ lineHeight: 1.7 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel posuere ipsum. Integer porta sem vitae lectus interdum, a dictum dolor tempor.</p></ScrollPanel>,
  parameters: {
    docs: {
      source: {
        code: `<ScrollPanel style={{ width: '100%', height: '200px' }}>Content</ScrollPanel>`
      }
    }
  }
};

export const SakaiStyling: Story = {
  name: 'Sakai / Styling',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Styling" />,
  parameters: sourceParameters(miscSource, 'Styling', 'ScrollPanel')
};
