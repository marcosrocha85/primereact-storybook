import type { Meta, StoryObj } from '@storybook/react-vite';

import FloatLabelDemo from '../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatLabelSource from '../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import FormLayoutDemo from '../../vendor/sakai-react/app/(main)/uikit/formlayout/page';
import formLayoutSource from '../../vendor/sakai-react/app/(main)/uikit/formlayout/page.tsx?raw';
import InputDemo from '../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import InvalidStateDemo from '../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidStateSource from '../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from './sakaiStoryHelpers';

const meta = {
  title: 'Sakai React/Input',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const input = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={InputDemo} section={name} />,
  parameters: sourceParameters(inputSource, name, components)
});

const floatLabel = (name: string) => ({
  render: () => <SakaiSectionDemo Component={FloatLabelDemo} section={name} />,
  parameters: sourceParameters(floatLabelSource, name, 'Float label variants')
});

const invalid = (name: string) => ({
  render: () => <SakaiSectionDemo Component={InvalidStateDemo} section={name} />,
  parameters: sourceParameters(invalidStateSource, name, 'Invalid state variants')
});

const form = (name: string) => ({
  render: () => <SakaiSectionDemo Component={FormLayoutDemo} section={name} />,
  parameters: sourceParameters(formLayoutSource, name, 'Form layout')
});

export const InputText: Story = input('InputText');
export const Icons: Story = input('Icons', 'InputText com icones');
export const FloatLabelInline: Story = { name: 'Float Label', ...input('Float Label') };
export const Textarea: Story = input('Textarea', 'InputTextarea');
export const AutoComplete: Story = input('AutoComplete');
export const Calendar: Story = input('Calendar');
export const InputNumber: Story = input('InputNumber');
export const Chips: Story = input('Chips');
export const Slider: Story = input('Slider');
export const Rating: Story = input('Rating');
export const ColorPicker: Story = input('ColorPicker');
export const Knob: Story = input('Knob');
export const RadioButton: Story = input('RadioButton');
export const Checkbox: Story = input('Checkbox');
export const InputSwitch: Story = { name: 'Input Switch', ...input('Input Switch') };
export const Listbox: Story = input('Listbox');
export const Dropdown: Story = input('Dropdown');
export const MultiSelect: Story = input('MultiSelect');
export const ToggleButton: Story = input('ToggleButton');
export const SelectButton: Story = input('SelectButton');
export const SelectButtonMultiple: Story = { name: 'SelectButton - Multiple', ...input('SelectButton - Multiple') };
export const InputGroups: Story = { name: 'Input Groups', ...input('Input Groups') };
export const FloatLabelAll: Story = { name: 'Float Label Page', ...floatLabel('Float Label') };
export const InvalidState: Story = invalid('Invalid State');
export const FormVertical: Story = { name: 'Form / Vertical', ...form('Vertical') };
export const FormVerticalGrid: Story = { name: 'Form / Vertical Grid', ...form('Vertical Grid') };
export const FormHorizontal: Story = { name: 'Form / Horizontal', ...form('Horizontal') };
export const FormInline: Story = { name: 'Form / Inline', ...form('Inline') };
export const FormHelpText: Story = { name: 'Form / Help Text', ...form('Help Text') };
export const FormAdvanced: Story = { name: 'Form / Advanced', ...form('Advanced') };
