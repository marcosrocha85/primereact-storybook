import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from 'primereact/checkbox';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Controle booleano ou selecao multipla.'
      }
    }
  },
  args: { checked: true, disabled: false },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Checkbox {...args} onChange={() => undefined} />,
  parameters: {
    docs: {
      source: {
        code: `<Checkbox checked={checked} onChange={(event) => setChecked(event.checked)} />`
      }
    }
  }
};

export const SakaiCheckbox: Story = {
  name: 'Sakai / Checkbox',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Checkbox" />,
  parameters: sourceParameters(inputSource, 'Checkbox', 'Checkbox')
};
