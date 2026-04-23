import type { Meta, StoryObj } from '@storybook/react-vite';

import { SakaiShell } from '../sakai/SakaiShell';

const meta = {
  title: 'Layout/Sakai Shell',
  component: SakaiShell,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof SakaiShell>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};
