import { useState, type ComponentProps } from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { menuWithActions } from '../menuExamples';

const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }, { label: 'Directory', icon: 'pi pi-fw pi-list' }] }, { label: 'Orders', icon: 'pi pi-fw pi-shopping-cart', items: [{ label: 'Recent orders', icon: 'pi pi-fw pi-clock' }] }];

export type ExampleArgs = ComponentProps<typeof PanelMenu>;
export const defaultArgs: ExampleArgs = { model: items, style: { width: '20rem' } };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<><PanelMenu {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
