import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import type { DropdownProps } from 'primereact/dropdown';

const cityOptions = [{ name: 'New York', code: 'NY' }, { name: 'Rome', code: 'RM' }, { name: 'London', code: 'LDN' }];

export type ExampleArgs = DropdownProps;
export const defaultArgs: ExampleArgs = { value: null, placeholder: 'Select a city', optionLabel: 'name', options: cityOptions, filter: false, disabled: false, invalid: false, variant: 'outlined', showClear: false, editable: false, checkmark: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Dropdown {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
