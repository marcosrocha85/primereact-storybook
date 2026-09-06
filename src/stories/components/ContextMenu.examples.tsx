import { useState, useRef, type ComponentProps } from 'react';
import { ContextMenu } from 'primereact/contextmenu';
import { Button } from 'primereact/button';
import { menuWithActions } from '../menuExamples';

const items = [{ label: 'Save', icon: 'pi pi-save' }, { label: 'Delete', icon: 'pi pi-times' }];

export type ExampleArgs = ComponentProps<typeof ContextMenu>;
export const defaultArgs: ExampleArgs = { model: items };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<ContextMenu>(null);
  const [action, setAction] = useState('No action yet');
  return (<><><ContextMenu {...args} model={menuWithActions(args.model ?? [], setAction)} ref={ref} /><div tabIndex={0} className="p-4 border-1 border-round" onContextMenu={(event) => ref.current?.show(event)} onKeyDown={(event) => { if (event.key === 'ContextMenu' || (event.shiftKey && event.key === 'F10')) { event.preventDefault(); ref.current?.show(event); } }}>Right click or press Shift+F10 here</div></><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
