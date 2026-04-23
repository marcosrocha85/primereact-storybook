import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from 'primereact/badge';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Numeric marker or status indicator.'
      }
    }
  },
  args: { value: '2', severity: 'info', size: undefined },
  argTypes: { value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, size: { control: 'select', options: [undefined, 'large', 'xlarge'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Badge {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Badge value="2" severity="info" />`
      }
    }
  }
};

export const SakaiNumbers: Story = {
  name: 'Sakai / Numbers',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Numbers" />,
  parameters: sourceParameters(miscSource, 'Numbers', 'Badge')
};

export const SakaiPositionedBadge: Story = {
  name: 'Sakai / Positioned Badge',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Positioned Badge" />,
  parameters: sourceParameters(miscSource, 'Positioned Badge', 'Badge')
};

export const SakaiButtonBadge: Story = {
  name: 'Sakai / Button Badge',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Button Badge" />,
  parameters: sourceParameters(miscSource, 'Button Badge', 'Badge')
};

export const SakaiSizes: Story = {
  name: 'Sakai / Sizes',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Sizes" />,
  parameters: sourceParameters(miscSource, 'Sizes', 'Badge')
};
