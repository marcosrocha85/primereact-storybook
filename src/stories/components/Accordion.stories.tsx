import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from 'primereact/accordion';
import { AccordionTab } from 'primereact/accordion';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Expandable content in vertical panels.'
      }
    }
  },
  args: { activeIndex: 0 },
  argTypes: { activeIndex: { control: 'number' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Accordion {...args}><AccordionTab header="Header I"><p>Content I</p></AccordionTab><AccordionTab header="Header II"><p>Content II</p></AccordionTab></Accordion>,
  parameters: {
    docs: {
      source: {
        code: `<Accordion activeIndex={0}><AccordionTab header="Header I">Content</AccordionTab></Accordion>`
      }
    }
  }
};

export const SakaiAccordionPanel: Story = {
  name: 'Sakai / AccordionPanel',
  render: () => <SakaiSectionDemo Component={panelDemo} section="AccordionPanel" />,
  parameters: sourceParameters(panelSource, 'AccordionPanel', 'Accordion')
};
