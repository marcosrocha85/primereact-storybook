import type { Meta, StoryObj } from '@storybook/react-vite';

import { TokenSwatch } from '../components/TokenSwatch';

const meta = {
  title: 'Fundamentos/Tokens',
  parameters: {
    layout: 'padded'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const Cores: Story = {
  render: () => (
    <section className="token-grid">
      <TokenSwatch label="Primary" value="#0f766e" usage="Acoes principais, selecao e estados positivos." />
      <TokenSwatch label="Accent" value="#2563eb" usage="Links, informacao e realces secundarios." />
      <TokenSwatch label="Warm" value="#f59e0b" usage="Avisos, progresso parcial e pontos de atencao." />
      <TokenSwatch label="Ink" value="#17212f" usage="Texto principal e contraste em superficies claras." />
    </section>
  )
};
