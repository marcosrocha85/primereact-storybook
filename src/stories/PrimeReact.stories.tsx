import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';

const meta = {
  title: 'Componentes/PrimeReact Preview',
  parameters: {
    layout: 'centered'
  }
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const ControlesBasicos: Story = {
  render: () => (
    <section className="component-stage" style={{ width: 'min(760px, 92vw)' }}>
      <p className="eyebrow">PrimeReact</p>
      <h2 style={{ marginTop: 0 }}>Controles base</h2>
      <div className="flex flex-column gap-3">
        <div className="flex gap-2 flex-wrap">
          <Button label="Salvar" icon="pi pi-check" />
          <Button label="Cancelar" severity="secondary" outlined />
          <Button label="Remover" severity="danger" text />
        </div>
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText placeholder="Buscar componentes" style={{ width: '100%' }} />
        </span>
        <div className="flex gap-2 flex-wrap">
          <Tag value="Documentado" severity="success" />
          <Tag value="Acessibilidade pendente" severity="warning" />
          <Tag value="Sakai" />
        </div>
      </div>
    </section>
  )
};
