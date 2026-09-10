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
    controls: { include: ["mode","chooseLabel","uploadLabel","cancelLabel","accept","maxFileSize","multiple","auto","customUpload","disabled"] },
    docs: { description: { component: 'File selection and upload queue with basic and advanced modes. The default playground simulates completion locally without a network request.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { mode: { control: 'inline-radio', options: ['basic', 'advanced'] }, chooseLabel: { control: 'text' }, uploadLabel: { control: 'text' }, cancelLabel: { control: 'text' }, accept: { control: 'text' }, maxFileSize: { control: 'number' }, multiple: { control: 'boolean' }, auto: { control: 'boolean' }, customUpload: { control: 'boolean', description: 'Use the local simulated handler by default. Disable to use PrimeReact native upload behavior.' }, disabled: { control: 'boolean' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
