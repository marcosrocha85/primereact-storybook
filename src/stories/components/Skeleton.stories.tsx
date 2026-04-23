import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from 'primereact/skeleton';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Loading placeholder.'
      }
    }
  },
  args: { width: '10rem', height: '2rem', borderRadius: '16px' },
  argTypes: { width: { control: 'text' }, height: { control: 'text' }, borderRadius: { control: 'text' }, shape: { control: 'select', options: [undefined, 'circle'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Skeleton {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Skeleton width="10rem" height="2rem" />`
      }
    }
  }
};

export const SakaiStyling: Story = {
  name: 'Sakai / Styling',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Styling" />,
  parameters: sourceParameters(miscSource, 'Styling', 'Skeleton')
};
