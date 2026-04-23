import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputTextarea } from 'primereact/inputtextarea';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/InputTextarea',
  component: InputTextarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Campo de texto multilinha.'
      }
    }
  },
  args: { placeholder: 'Your Message', rows: 5, cols: 30, autoResize: false },
  argTypes: {
    placeholder: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    autoResize: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <InputTextarea {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<InputTextarea placeholder="Your Message" rows={5} cols={30} />`
      }
    }
  }
};

export const SakaiTextarea: Story = {
  name: 'Sakai / Textarea',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Textarea" />,
  parameters: sourceParameters(inputSource, 'Textarea', 'InputTextarea')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'InputTextarea')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'InputTextarea')
};
