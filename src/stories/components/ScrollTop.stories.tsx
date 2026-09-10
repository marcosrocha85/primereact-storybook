import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ScrollTop } from 'primereact/scrolltop';
import { defaultArgs, Playground, type ExampleArgs } from './ScrollTop.examples';
import exampleSource from './ScrollTop.examples.tsx?raw';

const meta = {
  title: 'Components/ScrollTop',
  component: ScrollTop,
  parameters: {
    layout: 'centered',
    controls: { include: ["target","threshold","icon","behavior","className","style"] },
    docs: { description: { component: 'Shortcut to scroll back to the top.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { target: { control: 'inline-radio', options: ['window', 'parent'] }, threshold: { control: 'number' }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, behavior: { control: 'inline-radio', options: ['smooth', 'auto'] }, className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
