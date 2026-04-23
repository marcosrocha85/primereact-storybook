import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputNumber } from 'primereact/inputnumber';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/InputNumber',
  component: InputNumber,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Entrada numerica com formatacao.'
      }
    }
  },
  args: { placeholder: 'Number', mode: 'decimal', showButtons: true },
  argTypes: {
    placeholder: { control: 'text' },
    showButtons: { control: 'boolean' },
    mode: { control: 'select', options: ['decimal', 'currency'] },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <InputNumber {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<InputNumber value={inputNumberValue} onValueChange={(event) => setInputNumberValue(event.value)} />`
      }
    }
  }
};

export const SakaiInputNumber: Story = {
  name: 'Sakai / InputNumber',
  render: () => <SakaiSectionDemo Component={inputDemo} section="InputNumber" />,
  parameters: sourceParameters(inputSource, 'InputNumber', 'InputNumber')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'InputNumber')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'InputNumber')
};
