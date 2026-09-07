import { useState, type ComponentProps } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import type { MenuItem } from 'primereact/menuitem';

const home: MenuItem = { icon: 'pi pi-home', label: 'Home' };
const items: MenuItem[] = [
  { label: 'Computer' },
  { label: 'Notebook' },
  { label: 'Accessories' },
  { label: 'Backpacks' },
  { label: 'Item' }
];

export type ExampleArgs = ComponentProps<typeof BreadCrumb> & { showHome: boolean };
export const defaultArgs: ExampleArgs = { home, model: items, showHome: true, className: '', style: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { showHome, home, model, ...breadcrumbProps } = args;
  const [action, setAction] = useState('No action yet');
  const withAction = (item: MenuItem): MenuItem => ({
    ...item,
    command: (event) => {
      item.command?.(event);
      setAction((item.label ?? 'Home') + ' selected');
    }
  });
  return (<div style={{ width: '100%', minWidth: 0 }}>
    <BreadCrumb
      aria-label="Breadcrumb"
      pt={{ icon: { 'aria-hidden': true } }}
      {...breadcrumbProps}
      home={showHome && home ? withAction(home) : undefined}
      model={model?.map(withAction)}
    />
    <p role="status">{action}</p>
  </div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
