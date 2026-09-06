import { useState, type ComponentProps } from 'react';
import { DataView } from 'primereact/dataview';

const items = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];

export type ExampleArgs = ComponentProps<typeof DataView>;
export const defaultArgs: ExampleArgs = { value: items, layout: 'list', paginator: true, rows: 1 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<DataView {...args} itemTemplate={(item: { name: string }, layout) => <div className={layout === 'grid' ? 'col-12 md:col-4 p-3' : 'col-12 p-3'}>{item.name}</div>} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
