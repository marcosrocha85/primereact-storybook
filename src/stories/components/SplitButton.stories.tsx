import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { SplitButton } from 'primereact/splitbutton';
import { defaultArgs, Playground, type ExampleArgs } from './SplitButton.examples';
import exampleSource from './SplitButton.examples.tsx?raw';

const meta = {
  title: 'Components/SplitButton',
  component: SplitButton,
  parameters: {
    layout: 'centered',
    controls: { include: ["label","icon","severity","size","text","rounded","raised","outlined","loading","disabled"] },
    docs: { description: { component: 'Split action button with a primary action and an options menu.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    label: { control: 'text' },
    icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] },
    severity: { control: 'select', options: [undefined, 'secondary', 'success', 'info', 'warning', 'help', 'danger', 'contrast'] },
    size: { control: 'inline-radio', options: [undefined, 'small', 'large'] },
    text: { control: 'boolean' },
    rounded: { control: 'boolean' },
    raised: { control: 'boolean' },
    outlined: { control: 'boolean' },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' }
  }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
