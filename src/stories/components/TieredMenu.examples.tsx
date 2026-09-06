import { useState, useRef, type ComponentProps } from 'react';
import { TieredMenu } from 'primereact/tieredmenu';
import { Button } from 'primereact/button';
import { menuWithActions } from '../menuExamples';

const items = [{ label: 'Customers', icon: 'pi pi-fw pi-table', items: [{ label: 'New', icon: 'pi pi-fw pi-plus' }] }];

export type ExampleArgs = ComponentProps<typeof TieredMenu>;
export const defaultArgs: ExampleArgs = { model: items };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<TieredMenu>(null);
  const [action, setAction] = useState('No action yet');
  return (<><>{args.popup && <Button label="Open menu" onClick={(event) => ref.current?.toggle(event)} />}<TieredMenu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /></><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
