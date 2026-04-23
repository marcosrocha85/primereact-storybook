import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tree } from 'primereact/tree';
import treeDemo from '../../../vendor/sakai-react/app/(main)/uikit/tree/page';
import treeSource from '../../../vendor/sakai-react/app/(main)/uikit/tree/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const nodes = [{ key: '0', label: 'Documents', children: [{ key: '0-0', label: 'Work' }] }];

const meta = {
  title: 'Components/Tree',
  component: Tree,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Expandable hierarchical structure.'
      }
    }
  },
  args: { value: nodes },
  argTypes: {}
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Tree {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Tree value={nodes} />`
      }
    }
  }
};

export const SakaiTree: Story = {
  name: 'Sakai / Tree',
  render: () => <SakaiSectionDemo Component={treeDemo} section="Tree" />,
  parameters: sourceParameters(treeSource, 'Tree', 'Tree')
};
