import type { Meta, StoryObj } from '@storybook/react-vite';
import { BreadCrumb } from 'primereact/breadcrumb';
import menuDemo from '../../../vendor/sakai-react/app/(main)/uikit/menu/page';
import menuSource from '../../../vendor/sakai-react/app/(main)/uikit/menu/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const home = { icon: 'pi pi-home', url: '/' }; const items = [{ label: 'Computer' }, { label: 'Notebook' }];

const meta = {
  title: 'Components/BreadCrumb',
  component: BreadCrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Navigation breadcrumb.'
      }
    }
  },
  args: { home, model: items },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <BreadCrumb {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<BreadCrumb home={home} model={items} />`
      }
    }
  }
};

export const SakaiBreadcrumb: Story = {
  name: 'Sakai / Breadcrumb',
  render: () => <SakaiSectionDemo Component={menuDemo} section="Breadcrumb" />,
  parameters: sourceParameters(menuSource, 'Breadcrumb', 'BreadCrumb')
};
