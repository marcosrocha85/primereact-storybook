import { useState, type ComponentProps } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

const nodes = [{ key: '0', data: { name: 'Applications', size: '100kb', type: 'Folder' }, children: [{ key: '0-0', data: { name: 'React', size: '25kb', type: 'Folder' } }] }];

export type ExampleArgs = ComponentProps<typeof TreeTable>;
export const defaultArgs: ExampleArgs = { value: nodes, selectionMode: 'checkbox', selectionKeys: {}, expandedKeys: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<TreeTable {...args} onToggle={(event) => { updateArgs({ expandedKeys: event.value }); args.onToggle?.(event); }} onSelectionChange={(event) => { updateArgs({ selectionKeys: typeof event.value === 'string' ? { [event.value]: true } : event.value }); args.onSelectionChange?.(event); }}><Column field="name" header="Name" expander /><Column field="size" header="Size" /><Column field="type" header="Type" /></TreeTable>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
