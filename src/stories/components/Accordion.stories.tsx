import type { Meta, StoryObj } from '@storybook/react-vite';
import type { AccordionProps } from 'primereact/accordion';
import { Accordion, AccordionTab } from 'primereact/accordion';

type AccordionStoryArgs = AccordionProps & {
  firstHeader?: string;
  secondHeader?: string;
  thirdHeader?: string;
};

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'PrimeReact accordion used by Sakai to organize related content in expandable vertical panels.'
      }
    }
  },
  args: {
    activeIndex: 0,
    multiple: false,
    expandIcon: undefined,
    collapseIcon: undefined,
    firstHeader: 'Header I',
    secondHeader: 'Header II',
    thirdHeader: 'Header III'
  },
  argTypes: {
    activeIndex: { control: 'number' },
    multiple: { control: 'boolean' },
    expandIcon: {
      control: 'select',
      options: [undefined, 'pi pi-chevron-right', 'pi pi-plus', 'pi pi-angle-down']
    },
    collapseIcon: {
      control: 'select',
      options: [undefined, 'pi pi-chevron-down', 'pi pi-minus', 'pi pi-angle-up']
    },
    firstHeader: { control: 'text' },
    secondHeader: { control: 'text' },
    thirdHeader: { control: 'text' }
  }
} satisfies Meta<AccordionStoryArgs>;

export default meta;

type Story = StoryObj<AccordionStoryArgs>;

export const Default: Story = {
  render: ({ firstHeader, secondHeader, thirdHeader, ...args }) => (
    <Accordion {...args}>
      <AccordionTab header={firstHeader}>
        <p className="m-0 line-height-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </AccordionTab>
      <AccordionTab header={secondHeader}>
        <p className="m-0 line-height-3">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
        </p>
      </AccordionTab>
      <AccordionTab header={thirdHeader}>
        <p className="m-0 line-height-3">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.
        </p>
      </AccordionTab>
    </Accordion>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Accordion activeIndex={0}>
  <AccordionTab header="Header I">Content</AccordionTab>
  <AccordionTab header="Header II">Content</AccordionTab>
  <AccordionTab header="Header III">Content</AccordionTab>
</Accordion>`
      }
    }
  }
};
