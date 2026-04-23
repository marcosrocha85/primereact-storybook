import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fieldset } from 'primereact/fieldset';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Fieldset',
  component: Fieldset,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Agrupador semantico com legenda.'
      }
    }
  },
  args: { legend: 'Legend', toggleable: true },
  argTypes: { legend: { control: 'text' }, toggleable: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Fieldset {...args}><p>Fieldset content.</p></Fieldset>,
  parameters: {
    docs: {
      source: {
        code: `<Fieldset legend="Legend" toggleable>Content</Fieldset>`
      }
    }
  }
};

export const SakaiFieldset: Story = {
  name: 'Sakai / Fieldset',
  render: () => <SakaiSectionDemo Component={panelDemo} section="Fieldset" />,
  parameters: sourceParameters(panelSource, 'Fieldset', 'Fieldset')
};
