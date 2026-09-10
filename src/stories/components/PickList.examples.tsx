import { useState, type ComponentProps } from 'react';
import { PickList } from 'primereact/picklist';

const source = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }, { name: 'Blue Band' }];

function pickListItemTemplate(item: { name: string }) {
  return <span>{item.name}</span>;
}

export type ExampleArgs = ComponentProps<typeof PickList>;
export const defaultArgs: ExampleArgs = { dataKey: 'name', filterBy: 'name', source, target: [], sourceHeader: 'Available', targetHeader: 'Selected', filter: false, showSourceControls: true, showTargetControls: true, metaKeySelection: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [lastMove, setLastMove] = useState('No items moved yet.');
  return (<><PickList {...args} itemTemplate={args.itemTemplate ?? pickListItemTemplate} onChange={(event) => { updateArgs({ source: event.source, target: event.target }); args.onChange?.(event); }} onMoveToTarget={(event) => { setLastMove(event.value.length + ' item(s) moved to target.'); args.onMoveToTarget?.(event); }} /><p role="status">{lastMove}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
