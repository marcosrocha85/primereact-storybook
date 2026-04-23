import type { Meta, StoryObj } from '@storybook/react-vite';
import { SplitButton } from 'primereact/splitbutton';
import buttonDemo from '../../../vendor/sakai-react/app/(main)/uikit/button/page';
import buttonSource from '../../../vendor/sakai-react/app/(main)/uikit/button/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const splitItems = [
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { label: 'Home', icon: 'pi pi-home' }
];

const meta = {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botao dividido com acao principal e menu de opcoes.'
      }
    }
  },
  args: { label: 'Save', icon: 'pi pi-check', severity: 'secondary' },
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'text' },
    severity: { control: 'select', options: [undefined, 'secondary', 'success', 'info', 'warning', 'help', 'danger'] },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <SplitButton {...args} model={splitItems} />,
  parameters: {
    docs: {
      source: {
        code: `<SplitButton label="Save" icon="pi pi-check" model={items} severity="secondary" />`
      }
    }
  }
};

export const SakaiSplitButton: Story = {
  name: 'Sakai / SplitButton',
  render: () => <SakaiSectionDemo Component={buttonDemo} section="SplitButton" />,
  parameters: sourceParameters(buttonSource, 'SplitButton', 'SplitButton')
};
