import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ListBox } from 'primereact/listbox';
import { defaultArgs, Playground, type ExampleArgs } from './ListBox.examples';
import exampleSource from './ListBox.examples.tsx?raw';

const meta = {
  title: 'Components/ListBox',
  parameters: {
    layout: 'centered',
    controls: { include: ["value","multiple","filter","filterPlaceholder","filterMatchMode","invalid","disabled","metaKeySelection","autoOptionFocus","selectOnFocus","focusOnHover"] },
    docs: { description: { component: 'Select one or more values from a list, with filtering, validation, templates, and grouped options.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { value: { control: 'object' },
    multiple: { control: 'boolean' },
    filter: { control: 'boolean' },
    filterPlaceholder: { control: 'text' },
    filterMatchMode: { control: 'inline-radio', options: ['contains', 'startsWith', 'endsWith', 'equals', 'notEquals'] },
    invalid: { control: 'boolean' },
    disabled: { control: 'boolean' },
    metaKeySelection: { control: 'boolean' },
    autoOptionFocus: { control: 'boolean' },
    selectOnFocus: { control: 'boolean' },
    focusOnHover: { control: 'boolean' }
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
