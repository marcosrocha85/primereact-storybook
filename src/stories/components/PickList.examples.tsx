import { useState, type ComponentProps } from 'react';
import { PickList } from 'primereact/picklist';

const source = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];

export type ExampleArgs = ComponentProps<typeof PickList>;
export const defaultArgs: ExampleArgs = { dataKey: 'name', filterBy: 'name', source, target: [], sourceHeader: 'Available', targetHeader: 'Selected' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<PickList {...args} itemTemplate={(item: { name: string }) => <span>{item.name}</span>} onChange={(event) => { updateArgs({ source: event.source, target: event.target }); args.onChange?.(event); }} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
