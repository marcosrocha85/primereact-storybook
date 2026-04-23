import type { Meta, StoryObj } from '@storybook/react-vite';
import { FileUpload } from 'primereact/fileupload';
import fileDemo from '../../../vendor/sakai-react/app/(main)/uikit/file/page';
import fileSource from '../../../vendor/sakai-react/app/(main)/uikit/file/page.tsx?raw';
import { SakaiSectionDemo, sourceParameters } from '../sakaiStoryHelpers';

const meta = {
  title: 'Components/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Upload de arquivos basico ou avancado.'
      }
    }
  },
  args: { mode: 'basic', name: 'demo[]', accept: 'image/*', maxFileSize: 1000000, chooseLabel: 'Choose' },
  argTypes: { mode: { control: 'inline-radio', options: ['basic', 'advanced'] }, chooseLabel: { control: 'text' }, auto: { control: 'boolean' }, multiple: { control: 'boolean' } }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Default: Story = {
  render: (args: any) => <FileUpload {...args} />,
  parameters: {
    docs: {
      source: {
        code: `<FileUpload mode="basic" name="demo[]" accept="image/*" maxFileSize={1000000} />`
      }
    }
  }
};

export const SakaiAdvanced: Story = {
  name: 'Sakai / Advanced',
  render: () => <SakaiSectionDemo Component={fileDemo} section="Advanced" />,
  parameters: sourceParameters(fileSource, 'Advanced', 'FileUpload')
};

export const SakaiBasic: Story = {
  name: 'Sakai / Basic',
  render: () => <SakaiSectionDemo Component={fileDemo} section="Basic" />,
  parameters: sourceParameters(fileSource, 'Basic', 'FileUpload')
};
