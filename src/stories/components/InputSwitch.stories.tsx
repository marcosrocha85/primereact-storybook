import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputSwitch } from 'primereact/inputswitch';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/InputSwitch',
  component: InputSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Alternador booleano.'
      }
    }
  },
  args: { checked: true },
  argTypes: { checked: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <InputSwitch {...args} onChange={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<InputSwitch checked={switchValue} onChange={(event) => setSwitchValue(event.value)} />`
      }
    }
  }
};

export const SakaiInputSwitch: Story = {
  name: 'Sakai / Input Switch',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Input Switch" />,
  parameters: sourceParameters(inputSource, 'Input Switch', 'InputSwitch')
};
