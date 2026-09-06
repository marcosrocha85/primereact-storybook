import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { MegaMenu } from 'primereact/megamenu';
import { defaultArgs, Playground, type ExampleArgs } from './MegaMenu.examples';
import exampleSource from './MegaMenu.examples.tsx?raw';

const meta = {
  title: 'Components/MegaMenu',
  component: MegaMenu,
  parameters: {
    layout: 'centered',
    controls: { include: ["orientation"] },
    docs: { description: { component: 'Large grouped menu.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
