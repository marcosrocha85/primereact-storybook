import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Fieldset } from 'primereact/fieldset';
import { defaultArgs, Playground, type ExampleArgs } from './Fieldset.examples';
import exampleSource from './Fieldset.examples.tsx?raw';

const meta = {
  title: 'Components/Fieldset',
  parameters: {
    layout: 'centered',
    controls: { include: ["legend","toggleable","collapsed","expandIcon","collapseIcon","contentText"] },
    docs: { description: { component: 'Semantic grouping container with an optional legend and collapsible content.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { legend: { control: 'text' }, toggleable: { control: 'boolean' }, collapsed: { control: 'boolean', if: { arg: 'toggleable', truthy: true } }, expandIcon: { control: 'select', options: [undefined, 'pi pi-plus', 'pi pi-chevron-down', 'pi pi-angle-down', 'pi pi-caret-down'], if: { arg: 'toggleable', truthy: true } }, collapseIcon: { control: 'select', options: [undefined, 'pi pi-minus', 'pi pi-chevron-up', 'pi pi-angle-up', 'pi pi-caret-up'], if: { arg: 'toggleable', truthy: true } }, contentText: { control: 'text', description: 'Fallback content. Native children take precedence, including null.' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
