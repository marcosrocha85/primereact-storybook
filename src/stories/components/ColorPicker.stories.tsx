import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker } from 'primereact/colorpicker';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Selecionador visual de cor.'
      }
    }
  },
  args: { value: '1976D2' },
  argTypes: {
    value: { control: 'text' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <ColorPicker {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<ColorPicker value={colorValue} onChange={(event) => setColorValue(event.value)} />`
      }
    }
  }
};

export const SakaiColorPicker: Story = {
  name: 'Sakai / ColorPicker',
  render: () => <SakaiSectionDemo Component={inputDemo} section="ColorPicker" />,
  parameters: sourceParameters(inputSource, 'ColorPicker', 'ColorPicker')
};
