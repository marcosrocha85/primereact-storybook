import type { Meta, StoryObj } from '@storybook/react-vite';

import ChartsDemo from '../../vendor/sakai-react/app/(main)/uikit/charts/page';
import chartsSource from '../../vendor/sakai-react/app/(main)/uikit/charts/page.tsx?raw';
import FileDemo from '../../vendor/sakai-react/app/(main)/uikit/file/page';
import fileSource from '../../vendor/sakai-react/app/(main)/uikit/file/page.tsx?raw';
import MediaDemo from '../../vendor/sakai-react/app/(main)/uikit/media/page';
import mediaSource from '../../vendor/sakai-react/app/(main)/uikit/media/page.tsx?raw';
import MiscDemo from '../../vendor/sakai-react/app/(main)/uikit/misc/page';
import miscSource from '../../vendor/sakai-react/app/(main)/uikit/misc/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from './sakaiStoryHelpers';

const meta = {
  title: 'Sakai React/Media, Charts, File e Misc',
  parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;

type Story = StoryObj;

const media = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={MediaDemo} section={name} />,
  parameters: sourceParameters(mediaSource, name, components)
});

const chart = (name: string) => ({
  render: () => <SakaiSectionDemo Component={ChartsDemo} section={name} />,
  parameters: sourceParameters(chartsSource, name, 'Chart')
});

const file = (name: string) => ({
  render: () => <SakaiSectionDemo Component={FileDemo} section={name} />,
  parameters: sourceParameters(fileSource, name, 'FileUpload')
});

const misc = (name: string, components = name) => ({
  render: () => <SakaiSectionDemo Component={MiscDemo} section={name} />,
  parameters: sourceParameters(miscSource, name, components)
});

export const Carousel: Story = media('Carousel');
export const Image: Story = media('Image');
export const Galleria: Story = media('Galleria');
export const LinearChart: Story = { name: 'Linear Chart', ...chart('Linear Chart') };
export const BarChart: Story = { name: 'Bar Chart', ...chart('Bar Chart') };
export const PieChart: Story = { name: 'Pie Chart', ...chart('Pie Chart') };
export const DoughnutChart: Story = { name: 'Doughnut Chart', ...chart('Doughnut Chart') };
export const PolarAreaChart: Story = { name: 'Polar Area Chart', ...chart('Polar Area Chart') };
export const RadarChart: Story = { name: 'Radar Chart', ...chart('Radar Chart') };
export const FileAdvanced: Story = { name: 'File / Advanced', ...file('Advanced') };
export const FileBasic: Story = { name: 'File / Basic', ...file('Basic') };
export const ProgressBar: Story = misc('ProgressBar');
export const Numbers: Story = misc('Numbers', 'Badge');
export const PositionedBadge: Story = { name: 'Positioned Badge', ...misc('Positioned Badge', 'Badge') };
export const ButtonBadge: Story = { name: 'Button Badge', ...misc('Button Badge', 'Badge') };
export const Sizes: Story = misc('Sizes', 'Badge');
export const AvatarGroup: Story = { name: 'Avatar Group', ...misc('Avatar Group') };
export const LabelCircle: Story = { name: 'Label - Circle', ...misc('Label - Circle', 'Avatar') };
export const IconBadge: Story = { name: 'Icon - Badge', ...misc('Icon - Badge', 'Avatar') };
export const Tags: Story = misc('Tags', 'Tag');
export const Pills: Story = misc('Pills', 'Tag');
export const Icons: Story = misc('Icons', 'Tag');
export const Basic: Story = misc('Basic', 'Chip');
export const Icon: Story = misc('Icon', 'Chip');
export const MiscImage: Story = { name: 'Image', ...misc('Image', 'Chip') };
export const Styling: Story = misc('Styling', 'Skeleton, ScrollPanel, ScrollTop');
