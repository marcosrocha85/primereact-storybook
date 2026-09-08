import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Calendar } from 'primereact/calendar';
import { defaultArgs, Playground, type ExampleArgs } from './Calendar.examples';
import exampleSource from './Calendar.examples.tsx?raw';

const meta = {
  title: 'Components/Calendar',
  parameters: {
    layout: 'centered',
    controls: { include: ["value","label","floatLabel","placeholder","dateFormat","showIcon","showButtonBar","invalid","disabled"] },
    docs: { description: { component: 'Single date picker used in Sakai forms, with a popup, Today/Clear actions, floating labels, and validation states.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    value: { control: 'date', description: 'Selected date. Controls store a timestamp; the example converts it to a Date for Calendar.' },
    label: { control: 'text' },
    floatLabel: { control: 'boolean' },
    placeholder: { control: 'text', if: { arg: 'floatLabel', truthy: false } },
    dateFormat: { control: 'select', options: ['mm/dd/yy', 'dd/mm/yy', 'yy-mm-dd'] },
    showIcon: { control: 'boolean' },
    showButtonBar: { control: 'boolean' },
    invalid: { control: 'boolean' },
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
