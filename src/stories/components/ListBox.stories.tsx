import type { Meta, StoryObj } from '@storybook/react-vite';
import { ListBox } from 'primereact/listbox';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];

const meta = {
  title: 'Components/ListBox',
  component: ListBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Lista de selecao.'
      }
    }
  },
  args: { options: cityOptions, optionLabel: 'name' },
  argTypes: { disabled: { control: 'boolean' }, filter: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <ListBox {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<ListBox value={listboxValue} onChange={(event) => setListboxValue(event.value)} options={cities} optionLabel="name" />`
      }
    }
  }
};

export const SakaiListbox: Story = {
  name: 'Sakai / Listbox',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Listbox" />,
  parameters: sourceParameters(inputSource, 'Listbox', 'ListBox')
};
