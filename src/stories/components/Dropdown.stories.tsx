import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from 'primereact/dropdown';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Single-option selector.'
      }
    }
  },
  args: { placeholder: 'Select', optionLabel: 'name', options: cityOptions, filter: false },
  argTypes: {
    placeholder: { control: 'text' },
    filter: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Dropdown {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Dropdown value={dropdownValue} onChange={(event) => setDropdownValue(event.value)} options={cities} optionLabel="name" placeholder="Select" />`
      }
    }
  }
};

export const SakaiDropdown: Story = {
  name: 'Sakai / Dropdown',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Dropdown" />,
  parameters: sourceParameters(inputSource, 'Dropdown', 'Dropdown')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'Dropdown')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'Dropdown')
};
