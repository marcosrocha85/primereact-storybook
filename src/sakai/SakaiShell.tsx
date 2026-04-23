import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';

const navItems = [
  ['pi pi-home', 'Dashboard'],
  ['pi pi-th-large', 'Componentes'],
  ['pi pi-palette', 'Temas'],
  ['pi pi-book', 'Documentacao']
];

export function SakaiShell() {
  return (
    <div className="sakai-shell">
      <aside className="sakai-sidebar">
        <div className="sakai-logo">
          <span className="sakai-logo__mark">S</span>
          <span>Sakai</span>
        </div>

        <nav className="sakai-nav" aria-label="Sakai navigation">
          {navItems.map(([icon, label], index) => (
            <a className={index === 0 ? 'is-active' : undefined} href="/" key={label} onClick={(event) => event.preventDefault()}>
              <i className={icon} />
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <section className="sakai-workspace">
        <header className="sakai-topbar">
          <div>
            <p className="eyebrow">Workspace</p>
            <h2 style={{ margin: 0 }}>Visao geral</h2>
          </div>
          <Avatar label="MR" shape="circle" />
        </header>

        <div className="sakai-kpis">
          <div className="sakai-kpi">
            <span>Componentes mapeados</span>
            <strong>24</strong>
            <Tag value="Base inicial" severity="success" />
          </div>
          <div className="sakai-kpi">
            <span>Stories prioritarios</span>
            <strong>08</strong>
            <Tag value="Sakai layout" />
          </div>
          <div className="sakai-kpi">
            <span>Cobertura visual</span>
            <strong>62%</strong>
            <Tag value="Em progresso" severity="warning" />
          </div>
        </div>

        <div className="sakai-panel">
          <div className="flex justify-content-between align-items-center gap-3 flex-wrap">
            <div>
              <h3 style={{ margin: '0 0 .35rem' }}>Primeiro fluxo documentado</h3>
              <p style={{ margin: 0, color: 'var(--sakai-muted)' }}>
                Layout shell, navegacao, tokens visuais e componentes PrimeReact.
              </p>
            </div>
            <Button label="Adicionar story" icon="pi pi-plus" />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <ProgressBar value={62} />
          </div>
        </div>
      </section>
    </div>
  );
}
