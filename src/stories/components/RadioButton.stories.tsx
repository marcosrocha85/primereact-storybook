import type { Meta, StoryObj } from '@storybook/react-vite';
import { RadioButton } from 'primereact/radiobutton';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/RadioButton',
  component: RadioButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Opcao unica em grupo.'
      }
    }
  },
  args: { checked: true, value: 'Option 1' },
  argTypes: { checked: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <RadioButton {...args} onChange={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<RadioButton value="Option 1" checked={radioValue === 'Option 1'} onChange={(event) => setRadioValue(event.value)} />`
      }
    }
  }
};

export const SakaiRadioButton: Story = {
  name: 'Sakai / RadioButton',
  render: () => <SakaiSectionDemo Component={inputDemo} section="RadioButton" />,
  parameters: sourceParameters(inputSource, 'RadioButton', 'RadioButton')
};
