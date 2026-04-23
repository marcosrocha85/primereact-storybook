import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Barra de acoes.'
      }
    }
  },
  args: {},
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Toolbar start={<Button label="New" icon="pi pi-plus" />} end={<Button label="Save" icon="pi pi-check" />} />,
  parameters: {
    docs: {
      source: {
        code: `<Toolbar start={toolbarLeftTemplate} end={toolbarRightTemplate} />`
      }
    }
  }
};

export const SakaiToolbar: Story = {
  name: 'Sakai / Toolbar',
  render: () => <SakaiSectionDemo Component={panelDemo} section="Toolbar" />,
  parameters: sourceParameters(panelSource, 'Toolbar', 'Toolbar')
};
