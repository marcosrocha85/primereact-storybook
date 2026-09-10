import { useState } from 'react';
import { ListBox } from 'primereact/listbox';
import type { ListBoxProps } from 'primereact/listbox';

const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];

export type ExampleArgs = ListBoxProps;
export const defaultArgs: ExampleArgs = { value: null, options: cityOptions, optionLabel: 'name', multiple: false, filter: false, invalid: false, disabled: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<ListBox {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
