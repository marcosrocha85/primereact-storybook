import { useState, type ComponentProps } from 'react';
import { Tree } from 'primereact/tree';

const nodes = [{ key: '0', label: 'Documents', children: [{ key: '0-0', label: 'Work' }] }];

export type ExampleArgs = ComponentProps<typeof Tree>;
export const defaultArgs: ExampleArgs = { value: nodes, selectionMode: 'checkbox', selectionKeys: {}, expandedKeys: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Tree {...args} onToggle={(event) => { updateArgs({ expandedKeys: event.value }); args.onToggle?.(event); }} onSelectionChange={(event) => { updateArgs({ selectionKeys: event.value }); args.onSelectionChange?.(event); }} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
