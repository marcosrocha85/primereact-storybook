import type { Meta, StoryObj } from '@storybook/react-vite';
import { Chart } from 'primereact/chart';
import chartsDemo from '../../../vendor/sakai-react/app/(main)/uikit/charts/page';
import chartsSource from '../../../vendor/sakai-react/app/(main)/uikit/charts/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const data = { labels: ['A', 'B', 'C'], datasets: [{ label: 'Dataset', data: [12, 19, 3], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'] }] };

const meta = {
  title: 'Components/Chart',
  component: Chart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Charts powered by Chart.js.'
      }
    }
  },
  args: { type: 'bar', data },
  argTypes: { type: { control: 'select', options: ['line', 'bar', 'pie', 'doughnut', 'polarArea', 'radar'] } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <div style={{ width: '32rem' }}><Chart {...args} /></div>,
  parameters: {
    docs: {
      source: {
        code: `<Chart type="bar" data={data} options={options} />`
      }
    }
  }
};

export const SakaiLinearChart: Story = {
  name: 'Sakai / Linear Chart',
  render: () => <SakaiSectionDemo Component={chartsDemo} section="Linear Chart" />,
  parameters: sourceParameters(chartsSource, 'Linear Chart', 'Chart')
};

export const SakaiBarChart: Story = {
  name: 'Sakai / Bar Chart',
  render: () => <SakaiSectionDemo Component={chartsDemo} section="Bar Chart" />,
  parameters: sourceParameters(chartsSource, 'Bar Chart', 'Chart')
};

export const SakaiPieChart: Story = {
  name: 'Sakai / Pie Chart',
  render: () => <SakaiSectionDemo Component={chartsDemo} section="Pie Chart" />,
  parameters: sourceParameters(chartsSource, 'Pie Chart', 'Chart')
};

export const SakaiDoughnutChart: Story = {
  name: 'Sakai / Doughnut Chart',
  render: () => <SakaiSectionDemo Component={chartsDemo} section="Doughnut Chart" />,
  parameters: sourceParameters(chartsSource, 'Doughnut Chart', 'Chart')
};

export const SakaiPolarAreaChart: Story = {
  name: 'Sakai / Polar Area Chart',
  render: () => <SakaiSectionDemo Component={chartsDemo} section="Polar Area Chart" />,
  parameters: sourceParameters(chartsSource, 'Polar Area Chart', 'Chart')
};

export const SakaiRadarChart: Story = {
  name: 'Sakai / Radar Chart',
  render: () => <SakaiSectionDemo Component={chartsDemo} section="Radar Chart" />,
  parameters: sourceParameters(chartsSource, 'Radar Chart', 'Chart')
};
