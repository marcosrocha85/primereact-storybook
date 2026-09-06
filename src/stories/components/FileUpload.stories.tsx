import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { FileUpload } from 'primereact/fileupload';
import { defaultArgs, Playground, type ExampleArgs } from './FileUpload.examples';
import exampleSource from './FileUpload.examples.tsx?raw';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    controls: { include: ["mode","chooseLabel","auto","multiple"] },
    docs: { description: { component: 'Basic or advanced file upload.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { mode: { control: 'inline-radio', options: ['basic', 'advanced'] }, chooseLabel: { control: 'text' }, auto: { control: 'boolean' }, multiple: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
