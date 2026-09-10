import { useState, type ComponentProps } from 'react';
import { Menubar } from 'primereact/menubar';
import type { MenuItem } from 'primereact/menuitem';
import { menuWithActions } from '../menuExamples';

const menuItems: MenuItem[] = [
  { label: 'File', icon: 'pi pi-fw pi-file', items: [{ label: 'New', icon: 'pi pi-plus' }, { label: 'Open', icon: 'pi pi-folder-open' }] },
  { label: 'Edit', icon: 'pi pi-fw pi-pencil', items: [{ label: 'Undo', icon: 'pi pi-undo' }, { label: 'Redo', icon: 'pi pi-refresh' }] },
  { label: 'Help', icon: 'pi pi-fw pi-question-circle' }
];

export type ExampleArgs = ComponentProps<typeof Menubar>;
export const defaultArgs: ExampleArgs = { model: menuItems, ariaLabel: 'Main navigation', className: '', style: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<div style={{ width: '100%', minWidth: 0 }}><Menubar {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
