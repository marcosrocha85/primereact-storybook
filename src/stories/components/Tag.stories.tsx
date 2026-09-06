import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Tag } from 'primereact/tag';
import { defaultArgs, Playground, type ExampleArgs } from './Tag.examples';
import exampleSource from './Tag.examples.tsx?raw';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    controls: { include: ["value","severity","rounded","icon"] },
    docs: { description: { component: 'Status label.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, rounded: { control: 'boolean' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
