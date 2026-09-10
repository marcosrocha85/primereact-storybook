import { useState, useRef, type ComponentProps } from 'react';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { menuWithActions } from '../menuExamples';

const items = [{ label: 'Customers', icon: 'pi pi-fw pi-users', items: [{ label: 'New customer', icon: 'pi pi-fw pi-user-plus' }, { label: 'Directory', icon: 'pi pi-fw pi-list' }] }, { label: 'Orders', icon: 'pi pi-fw pi-shopping-cart' }];

export type ExampleArgs = ComponentProps<typeof TieredMenu>;
export const defaultArgs: ExampleArgs = { model: items, popup: false, autoZIndex: true, breakpoint: undefined, scrollHeight: '400px', baseZIndex: 0, tabIndex: 0 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<TieredMenu>(null);
  const [action, setAction] = useState('No action yet');
  return (<div style={{ width: 'min(32rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0 }}><>{args.popup && <Button label="Open menu" onClick={(event) => ref.current?.toggle(event)} />}<TieredMenu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /></><p role="status">{action}</p></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
