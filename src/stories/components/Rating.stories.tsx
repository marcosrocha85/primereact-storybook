import type { Meta, StoryObj } from '@storybook/react-vite';
import { Rating } from 'primereact/rating';
import inputDemo from '../../../vendor/sakai-react/app/(main)/uikit/input/page';
import inputSource from '../../../vendor/sakai-react/app/(main)/uikit/input/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Star rating control.'
      }
    }
  },
  args: { value: 3, stars: 5, cancel: false },
  argTypes: { value: { control: 'number' }, stars: { control: 'number' }, cancel: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <Rating {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<Rating value={ratingValue} onChange={(event) => setRatingValue(event.value)} />`
      }
    }
  }
};

export const SakaiRating: Story = {
  name: 'Sakai / Rating',
  render: () => <SakaiSectionDemo Component={inputDemo} section="Rating" />,
  parameters: sourceParameters(inputSource, 'Rating', 'Rating')
};
