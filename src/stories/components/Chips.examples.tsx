import { useState, type ComponentProps } from 'react';
import { Chips } from 'primereact/chips';

export type ExampleArgs = ComponentProps<typeof Chips>;
export const defaultArgs: ExampleArgs = { value: [], placeholder: 'Add item', separator: ',' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Chips {...args} onChange={(event) => { updateArgs({ value: event.value ?? [] }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
