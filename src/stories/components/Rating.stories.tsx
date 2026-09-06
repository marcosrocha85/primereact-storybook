import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Rating } from 'primereact/rating';
import { defaultArgs, Playground, type ExampleArgs } from './Rating.examples';
import exampleSource from './Rating.examples.tsx?raw';

const meta = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","stars","cancel","disabled"] },
    docs: { description: { component: 'Star rating control.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'number' }, stars: { control: 'number' }, cancel: { control: 'boolean' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
