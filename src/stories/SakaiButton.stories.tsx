import type { Meta, StoryObj } from '@storybook/react-vite';

import ButtonDemo from '../../vendor/sakai-react/app/(main)/uikit/button/page';
import buttonSource from '../../vendor/sakai-react/app/(main)/uikit/button/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from './sakaiStoryHelpers';

const meta = {
  title: 'Sakai React/Button',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const section = (name: string, components = 'Button') => ({
  render: () => <SakaiSectionDemo Component={ButtonDemo} section={name} />,
  parameters: sourceParameters(buttonSource, name, components)
});

export const Default: Story = section('Default');
export const Severities: Story = section('Severities');
export const Text: Story = section('Text');
export const Outlined: Story = section('Outlined');
export const ButtonGroup: Story = { name: 'Button Group', ...section('Button Group') };
export const SplitButton: Story = section('SplitButton', 'SplitButton');
export const Template: Story = section('Template');
export const Icons: Story = section('Icons');
export const Raised: Story = section('Raised');
export const Rounded: Story = section('Rounded');
export const RoundedIcons: Story = { name: 'Rounded Icons', ...section('Rounded Icons') };
export const RoundedText: Story = { name: 'Rounded Text', ...section('Rounded Text') };
export const RoundedOutlined: Story = { name: 'Rounded Outlined', ...section('Rounded Outlined') };
export const Loading: Story = section('Loading');
