import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Badge } from 'primereact/badge';
import { defaultArgs, Playground, type ExampleArgs } from './Badge.examples';
import exampleSource from './Badge.examples.tsx?raw';

const meta = {
  title: 'Components/Badge',
  parameters: {
    layout: 'centered',
    controls: { include: ["value","severity","size","placement","icon","label"] },
    docs: { description: { component: 'Numeric marker or status indicator, displayed on its own, over an icon, or inside a button.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'text', description: 'Leave empty to display a dot. Text such as 10+ is displayed literally.' }, severity: { control: 'select', options: [undefined, 'success', 'info', 'warning', 'danger'] }, size: { control: 'select', options: [undefined, 'large', 'xlarge'] }, placement: { control: 'select', options: ['standalone', 'icon', 'button'] }, icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }, label: { control: 'text', description: 'Button label and accessible name for the icon composition.' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
