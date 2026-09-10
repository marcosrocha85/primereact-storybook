import { useState, useRef, type ComponentProps } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import { menuWithActions } from '../menuExamples';

const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Update', icon: 'pi pi-refresh' }];

export type ExampleArgs = ComponentProps<typeof Menu>;
export const defaultArgs: ExampleArgs = { model: items, popup: false, popupAlignment: 'left', closeOnEscape: true, autoZIndex: true, baseZIndex: 0, tabIndex: 0 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<Menu>(null);
  const [action, setAction] = useState('No action yet');
  return (<><>{args.popup && <Button label="Open menu" onClick={(event) => ref.current?.toggle(event)} />}<Menu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /></><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
