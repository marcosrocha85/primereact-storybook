import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Chip } from 'primereact/chip';
import { defaultArgs, Playground, type ExampleArgs } from './Chip.examples';
import exampleSource from './Chip.examples.tsx?raw';

const meta = {
  title: 'Components/Chip',
  parameters: {
    layout: 'centered',
    controls: { include: ["label","icon","image","imageAlt","removable","visible","className","style"] },
    docs: { description: { component: 'Compact label with optional icon or image and native removal. Images take precedence over icons. Use visible to restore a removed playground chip; returning false from onRemove cancels removal.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { label: { control: 'text' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, image: { control: 'select', options: [undefined, 'demo/images/avatar/amyelsner.png', 'demo/images/avatar/onyamalimba.png'] }, imageAlt: { control: 'text' }, removable: { control: 'boolean' }, visible: { control: 'boolean', description: 'Story-only visibility. Removal sets false; set true or reset Controls to restore.' }, className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
