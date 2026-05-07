import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonProps } from 'primereact/button';
import { Button } from 'primereact/button';

type ButtonStoryArgs = ButtonProps & {
  label?: string;
};

const severityOptions: ButtonProps['severity'][] = [
  undefined,
  'secondary',
  'success',
  'info',
  'warning',
  'help',
  'danger'
];

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'PrimeReact button used by Sakai for actions, links, severity states, icons, and loading feedback.'
      }
    }
  },
  args: {
    label: 'Submit',
    icon: undefined,
    iconPos: 'left',
    severity: undefined,
    size: undefined,
    disabled: false,
    loading: false,
    raised: false,
    rounded: false,
    text: false,
    outlined: false,
    link: false
  },
  argTypes: {
    label: { control: 'text' },
    icon: {
      control: 'select',
      options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill']
    },
    iconPos: {
      control: 'inline-radio',
      options: ['left', 'right', 'top', 'bottom']
    },
    severity: {
      control: 'select',
      options: severityOptions
    },
    size: {
      control: 'inline-radio',
      options: [undefined, 'small', 'large']
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    raised: { control: 'boolean' },
    rounded: { control: 'boolean' },
    text: { control: 'boolean' },
    outlined: { control: 'boolean' },
    link: { control: 'boolean' }
  }
} satisfies Meta<ButtonStoryArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Submit'
  },
  render: (args) => <Button {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Button label="Submit" />`
      }
    }
  }
};
