import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { defaultArgs, Playground, type ExampleArgs } from './ConfirmPopup.examples';
import exampleSource from './ConfirmPopup.examples.tsx?raw';

const meta = {
  title: 'Components/ConfirmPopup',
  component: ConfirmPopup,
  parameters: {
    layout: 'centered',
    controls: { include: ["message"] },
    docs: { description: { component: 'Contextual confirmation.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { message: { control: 'text' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
