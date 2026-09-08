import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { Card } from 'primereact/card';
import { defaultArgs, Playground, type ExampleArgs } from './Card.examples';
import exampleSource from './Card.examples.tsx?raw';

const meta = {
  title: 'Components/Card',
  parameters: {
    layout: 'centered',
    controls: { include: ["title","subTitle","contentText","headerText","footerText","className","style"] },
    docs: { description: { component: 'Content container with optional title, subtitle, header, and footer. Text controls provide curated compositions; native React nodes and slot functions remain supported through props. Card has no selection, disabled, or severity state.' }, source: { code: exampleSource } }
  },
  args: defaultArgs,
  argTypes: { title: { control: 'text' }, subTitle: { control: 'text' }, contentText: { control: 'text', description: 'Fallback body text. Native children take precedence, including null.' }, headerText: { control: 'text', description: 'Optional padded heading. Native header takes precedence.' }, footerText: { control: 'text', description: 'Optional footer text. Native footer takes precedence.' }, className: { control: 'text' }, style: { control: 'object' } }
} satisfies Meta<ExampleArgs>;

export default meta;
type Story = StoryObj<ExampleArgs>;

export const Default: Story = {
  render: function Render() {
    const [args, updateArgs] = useArgs<ExampleArgs>();
    return <Playground args={args} updateArgs={updateArgs} />;
  }
};
