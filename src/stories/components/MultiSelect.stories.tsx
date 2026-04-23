import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from 'primereact/multiselect';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const countryOptions = [{ name: 'Australia', code: 'AU' }, { name: 'Brazil', code: 'BR' }, { name: 'Germany', code: 'DE' }];

const meta = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multiple-option selector.'
      }
    }
  },
  args: { placeholder: 'Select Countries', options: countryOptions, optionLabel: 'name', display: 'chip' },
  argTypes: { placeholder: { control: 'text' }, display: { control: 'select', options: ['comma', 'chip'] }, filter: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <MultiSelect {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<MultiSelect value={multiselectValue} onChange={(event) => setMultiselectValue(event.value)} options={countries} optionLabel="name" placeholder="Select Countries" />`
      }
    }
  }
};

export const SakaiMultiSelect: Story = {
  name: 'Sakai / MultiSelect',
  render: () => <SakaiSectionDemo Component={inputDemo} section="MultiSelect" />,
  parameters: sourceParameters(inputSource, 'MultiSelect', 'MultiSelect')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'MultiSelect')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'MultiSelect')
};
