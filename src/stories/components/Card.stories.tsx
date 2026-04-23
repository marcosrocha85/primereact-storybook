import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from 'primereact/card';
import panelDemo from '../../../vendor/sakai-react/app/(main)/uikit/panel/page';
import panelSource from '../../../vendor/sakai-react/app/(main)/uikit/panel/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Container de conteudo com titulo, subtitulo e footer.'
      }
    }
  },
  args: { title: 'Card', subTitle: 'Subtitle' },
  argTypes: { title: { control: 'text' }, subTitle: { control: 'text' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Card {...args}><p className="m-0">Card content.</p></Card>,
  parameters: {
    docs: {
      source: {
        code: `<Card title="Card"><p>Content</p></Card>`
      }
    }
  }
};

export const SakaiCard: Story = {
  name: 'Sakai / Card',
  render: () => <SakaiSectionDemo Component={panelDemo} section="Card" />,
  parameters: sourceParameters(panelSource, 'Card', 'Card')
};
