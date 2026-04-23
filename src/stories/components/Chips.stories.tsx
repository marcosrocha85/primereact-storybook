import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chips } from 'primereact/chips';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import floatlabelDemo from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page';
import floatlabelSource from '../../../vendor/sakai-react/app/(main)/uikit/floatlabel/page.tsx?raw';
import invalidstateDemo from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page';
import invalidstateSource from '../../../vendor/sakai-react/app/(main)/uikit/invalidstate/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multi-value input rendered as chips.'
      }
    }
  },
  args: { placeholder: 'Add item', separator: ',' },
  argTypes: {
    placeholder: { control: 'text' },
    separator: { control: 'text' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Chips {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Chips value={chipsValue} onChange={(event) => setChipsValue(event.value ?? [])} />`
      }
    }
  }
};

export const SakaiChips: Story = {
  name: 'Sakai / Chips',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Chips" />,
  parameters: sourceParameters(inputSource, 'Chips', 'Chips')
};

export const FloatLabelVariants: Story = {
  name: 'Sakai / Float Label',
  render: () => <SakaiSectionDemo Component={floatlabelDemo} section="Float Label" />,
  parameters: sourceParameters(floatlabelSource, 'Float Label', 'Chips')
};

export const InvalidStateVariants: Story = {
  name: 'Sakai / Invalid State',
  render: () => <SakaiSectionDemo Component={invalidstateDemo} section="Invalid State" />,
  parameters: sourceParameters(invalidstateSource, 'Invalid State', 'Chips')
};
