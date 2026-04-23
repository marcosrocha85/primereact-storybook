import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleButton } from 'primereact/togglebutton';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Botao liga/desliga.'
      }
    }
  },
  args: { checked: true, onLabel: 'Yes', offLabel: 'No', onIcon: 'pi pi-check', offIcon: 'pi pi-times' },
  argTypes: { checked: { control: 'boolean' }, onLabel: { control: 'text' }, offLabel: { control: 'text' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <ToggleButton {...args} onChange={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<ToggleButton checked={toggleValue} onChange={(event) => setToggleValue(event.value)} onLabel="Yes" offLabel="No" />`
      }
    }
  }
};

export const SakaiToggleButton: Story = {
  name: 'Sakai / ToggleButton',
  render: () => <SakaiSectionDemo Component={inputDemo} section="ToggleButton" />,
  parameters: sourceParameters(inputSource, 'ToggleButton', 'ToggleButton')
};
