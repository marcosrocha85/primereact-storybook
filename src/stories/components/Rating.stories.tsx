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
    controls: { include: ["value","stars","cancel","disabled","readOnly"] },
    docs: { description: { component: 'Star rating control for selecting or displaying a numeric score.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    value: { control: 'number', description: 'Selected star value. Use null or undefined for no selection.' },
    stars: { control: 'number', description: 'Number of stars rendered by the rating.' },
    cancel: { control: 'boolean', description: 'Show the cancel control for clearing the selection.' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' }
  }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
