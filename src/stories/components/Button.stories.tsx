import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ButtonProps } from 'primereact/button';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';

type ButtonStoryArgs = ButtonProps & {
  label?: string;
};

const severities: ButtonProps['severity'][] = [undefined, 'secondary', 'success', 'info', 'warning', 'help', 'danger'];

const severityLabels = ['Primary', 'Secondary', 'Success', 'Info', 'Warning', 'Help', 'Danger'];

const splitItems = [
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { label: 'Home', icon: 'pi pi-home' }
];

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Botao do PrimeReact usado pelo Sakai. Os exemplos abaixo foram separados a partir das secoes do UI Kit original.'
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
      options: [undefined, 'secondary', 'success', 'info', 'warning', 'help', 'danger']
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
  parameters: {
    docs: {
      source: {
        code: `<Button label="Submit" />`
      }
    }
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true
  },
  parameters: {
    docs: {
      source: {
        code: `<Button label="Disabled" disabled />`
      }
    }
  }
};

export const Link: Story = {
  args: {
    label: 'Link',
    link: true
  },
  parameters: {
    docs: {
      source: {
        code: `<Button label="Link" link />`
      }
    }
  }
};

export const Severities: Story = {
  args: {
    label: 'Button'
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {severities.map((severity, index) => (
        <Button key={severity ?? 'primary'} {...args} label={severityLabels[index]} severity={severity} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `<Button label="Primary" />
<Button label="Secondary" severity="secondary" />
<Button label="Success" severity="success" />
<Button label="Info" severity="info" />
<Button label="Warning" severity="warning" />
<Button label="Help" severity="help" />
<Button label="Danger" severity="danger" />`
      }
    }
  }
};

export const Text: Story = {
  args: {
    label: 'Button',
    text: true
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {severities.map((severity, index) => (
        <Button key={severity ?? 'primary'} {...args} label={severityLabels[index]} severity={severity} />
      ))}
      <Button {...args} label="Plain" className="p-button-plain" />
    </div>
  )
};

export const Outlined: Story = {
  args: {
    label: 'Button',
    outlined: true
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {severities.map((severity, index) => (
        <Button key={severity ?? 'primary'} {...args} label={severityLabels[index]} severity={severity} />
      ))}
    </div>
  )
};

export const Icons: Story = {
  args: {
    label: 'Bookmark',
    icon: 'pi pi-bookmark'
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      <Button icon="pi pi-star-fill" />
      <Button {...args} />
      <Button {...args} iconPos="right" />
    </div>
  )
};

export const Rounded: Story = {
  args: {
    label: 'Button',
    rounded: true
  },
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {severities.map((severity, index) => (
        <Button key={severity ?? 'primary'} {...args} label={severityLabels[index]} severity={severity} />
      ))}
    </div>
  )
};

export const Loading: Story = {
  args: {
    label: 'Search',
    icon: 'pi pi-search',
    loading: true
  }
};

export const SplitButtonStory: Story = {
  name: 'SplitButton',
  render: () => (
    <div className="flex flex-wrap gap-2">
      <SplitButton label="Save" icon="pi pi-check" model={splitItems} severity="secondary" />
      <SplitButton label="Save" icon="pi pi-check" model={splitItems} severity="success" />
      <SplitButton label="Save" icon="pi pi-check" model={splitItems} severity="info" />
      <SplitButton label="Save" icon="pi pi-check" model={splitItems} severity="warning" />
      <SplitButton label="Save" icon="pi pi-check" model={splitItems} severity="danger" />
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      source: {
        code: `<SplitButton label="Save" icon="pi pi-check" model={items} severity="secondary" />`
      }
    }
  }
};
