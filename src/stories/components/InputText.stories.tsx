import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputText } from 'primereact/inputtext';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/InputText',
  component: InputText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Base text field used in forms, filters, and search inputs.'
      }
    }
  },
  args: { placeholder: 'Default', disabled: false, invalid: false },
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    invalid: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <InputText {...args} className={args.invalid ? 'p-invalid' : undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<InputText placeholder="Default" />`
      }
    }
  }
};

export const SakaiInputText: Story = {
  name: 'Sakai / InputText',
  render: () => <SakaiSectionDemo Component={inputDemo} section="InputText" />,
  parameters: sourceParameters(inputSource, 'InputText', 'InputText')
};

export const SakaiIcons: Story = {
  name: 'Sakai / Icons',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Icons" />,
  parameters: sourceParameters(inputSource, 'Icons', 'InputText')
};

export const SakaiFloatLabel: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Float Label" />,
  parameters: sourceParameters(inputSource, 'Float Label', 'InputText')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'InputText')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'InputText')
};
