import type { Meta, StoryObj } from '@storybook/react-vite';
import { AutoComplete } from 'primereact/autocomplete';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const countries = [{ name: 'Brazil' }, { name: 'United States' }, { name: 'Germany' }, { name: 'Japan' }];

const meta = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Input field with suggestions and autocomplete behavior.'
      }
    }
  },
  args: { placeholder: 'Search', dropdown: true, field: 'name', suggestions: countries },
  argTypes: {
    placeholder: { control: 'text' },
    dropdown: { control: 'boolean' },
    multiple: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <AutoComplete {...args} completeMethod={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<AutoComplete placeholder="Search" dropdown suggestions={countries} field="name" completeMethod={searchCountry} />`
      }
    }
  }
};

export const SakaiAutoComplete: Story = {
  name: 'Sakai / AutoComplete',
  render: () => <SakaiSectionDemo Component={inputDemo} section="AutoComplete" />,
  parameters: sourceParameters(inputSource, 'AutoComplete', 'AutoComplete')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'AutoComplete')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'AutoComplete')
};
