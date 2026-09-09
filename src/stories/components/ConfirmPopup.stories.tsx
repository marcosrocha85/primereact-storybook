import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { defaultArgs, Playground, type ExampleArgs } from './ConfirmPopup.examples';
import exampleSource from './ConfirmPopup.examples.tsx?raw';

const meta = {
  title: 'Components/ConfirmPopup',
  component: ConfirmPopup,
  parameters: {
    layout: 'centered',
    controls: { include: ["message","acceptLabel","rejectLabel","defaultFocus","dismissable","closeOnEscape","icon","acceptIcon","rejectIcon"] },
    docs: { description: { component: 'Contextual confirmation displayed relative to a target.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: {
    message: { control: 'text' },
    acceptLabel: { control: 'text' },
    rejectLabel: { control: 'text' },
    defaultFocus: { control: 'inline-radio', options: ['accept', 'reject'] },
    dismissable: { control: 'boolean' },
    closeOnEscape: { control: 'boolean' },
    icon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] },
    acceptIcon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] },
    rejectIcon: { control: 'select', options: [undefined, 'pi pi-check', 'pi pi-search', 'pi pi-bookmark', 'pi pi-star-fill'] }
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
