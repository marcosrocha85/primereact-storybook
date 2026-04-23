import { Button } from 'primereact/button';

export function App() {
  return (
    <main className="landing-shell">
      <section className="landing-hero">
        <div className="landing-hero__content">
          <p className="eyebrow">PrimeFaces Sakai React</p>
          <h1>Sakai Storybook</h1>
          <p>
            Uma base local para documentar componentes, padroes de layout e decisoes visuais do
            template Sakai com PrimeReact.
          </p>
          <div className="landing-actions">
            <Button label="Abrir Storybook" icon="pi pi-book" onClick={() => window.open('http://localhost:6006', '_blank')} />
            <Button label="Sincronizar Sakai" icon="pi pi-github" outlined />
          </div>
        </div>
        <div className="landing-orbit" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </section>
    </main>
  );
}
