import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { ProgressBar } from 'primereact/progressbar';
import { Tag } from 'primereact/tag';

const navItems = [
  ['pi pi-home', 'Dashboard'],
  ['pi pi-th-large', 'Components'],
  ['pi pi-palette', 'Themes'],
  ['pi pi-book', 'Documentation']
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
            <h2 style={{ margin: 0 }}>Overview</h2>
          </div>
          <Avatar label="MR" shape="circle" />
        </header>

        <div className="sakai-kpis">
          <div className="sakai-kpi">
            <span>Mapped components</span>
            <strong>24</strong>
            <Tag value="Initial base" severity="success" />
          </div>
          <div className="sakai-kpi">
            <span>Priority stories</span>
            <strong>08</strong>
            <Tag value="Sakai layout" />
          </div>
          <div className="sakai-kpi">
            <span>Visual coverage</span>
            <strong>62%</strong>
            <Tag value="In progress" severity="warning" />
          </div>
        </div>

        <div className="sakai-panel">
          <div className="flex justify-content-between align-items-center gap-3 flex-wrap">
            <div>
              <h3 style={{ margin: '0 0 .35rem' }}>First documented flow</h3>
              <p style={{ margin: 0, color: 'var(--sakai-muted)' }}>
                Layout shell, navigation, visual tokens, and PrimeReact components.
              </p>
            </div>
            <Button label="Add story" icon="pi pi-plus" />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <ProgressBar value={62} />
          </div>
        </div>
      </section>
    </div>
  );
}
