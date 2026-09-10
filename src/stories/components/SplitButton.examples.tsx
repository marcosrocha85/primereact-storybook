import { useState, type ComponentProps } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import type { MenuItem } from 'primereact/menuitem';

const splitItems: MenuItem[] = [
  { label: 'Update', icon: 'pi pi-refresh' },
  { label: 'Delete', icon: 'pi pi-times' },
  { label: 'Home', icon: 'pi pi-home' }
];

export type ExampleArgs = ComponentProps<typeof SplitButton>;
export const defaultArgs: ExampleArgs = { label: 'Save', icon: 'pi pi-check', severity: 'secondary', size: undefined, text: false, rounded: false, raised: false, outlined: false, loading: false, disabled: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<><SplitButton {...args} onClick={(event) => { setAction('Save selected'); args.onClick?.(event); }} model={(args.model ?? splitItems).map((item) => ({ ...item, command: item.command ?? (() => setAction(item.label + ' selected')) }))} /><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
