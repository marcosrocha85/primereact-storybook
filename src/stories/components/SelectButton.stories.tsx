import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectButton } from 'primereact/selectbutton';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const selectOptions = [{ name: 'Option 1', code: 'O1' }, { name: 'Option 2', code: 'O2' }, { name: 'Option 3', code: 'O3' }];

const meta = {
  title: 'Components/SelectButton',
  component: SelectButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Button-based selection control.'
      }
    }
  },
  args: { options: selectOptions, optionLabel: 'name', multiple: false },
  argTypes: { multiple: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <SelectButton {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<SelectButton value={value} onChange={(event) => setValue(event.value)} options={options} optionLabel="name" />`
      }
    }
  }
};

export const SakaiSelectButton: Story = {
  name: 'Sakai / SelectButton',
  render: () => <SakaiSectionDemo Component={inputDemo} section="SelectButton" />,
  parameters: sourceParameters(inputSource, 'SelectButton', 'SelectButton')
};

export const Multiple: Story = {
  name: 'Sakai / SelectButton - Multiple',
  render: () => <SakaiSectionDemo Component={inputDemo} section="SelectButton - Multiple" />,
  parameters: sourceParameters(inputSource, 'SelectButton - Multiple', 'SelectButton')
};
