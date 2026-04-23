import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollTop } from 'primereact/scrolltop';
import miscDemo from '../../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/ScrollTop',
  component: ScrollTop,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Shortcut to scroll back to the top.'
      }
    }
  },
  args: { threshold: 100, behavior: 'smooth' },
  argTypes: { threshold: { control: 'number' }, behavior: { control: 'inline-radio', options: ['smooth', 'auto'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <div style={{ height: '12rem', overflow: 'auto', position: 'relative' }}><div style={{ height: '30rem', padding: '1rem' }}>Scroll down inside this panel.</div><ScrollTop {...args} target="parent" /></div>,
  parameters: {
    docs: {
      source: {
        code: `<ScrollTop target="parent" threshold={100} />`
      }
    }
  }
};

export const SakaiStyling: Story = {
  name: 'Sakai / Styling',
  render: () => <SakaiSectionDemo Component={miscDemo} section="Styling" />,
  parameters: sourceParameters(miscSource, 'Styling', 'ScrollTop')
};
