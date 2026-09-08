import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Checkbox } from 'primereact/checkbox';
import { defaultArgs, Playground, type ExampleArgs } from './Checkbox.examples';
import exampleSource from './Checkbox.examples.tsx?raw';

const meta = {
  title: 'Components/Checkbox',
  parameters: {
    layout: 'centered',
    controls: { include: ["label","checked","disabled","readOnly","invalid","variant","icon"] },
    docs: { description: { component: 'Labeled checkbox for a boolean choice or an option in an application-managed selection.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    invalid: { control: 'boolean' },
    variant: { control: 'inline-radio', options: ['outlined', 'filled'] },
    icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }
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
