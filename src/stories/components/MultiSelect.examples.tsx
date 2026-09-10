import { useState, type ComponentProps } from 'react';
import { MultiSelect } from 'primereact/multiselect';

const countryOptions = [{ name: 'Australia', code: 'AU' }, { name: 'Brazil', code: 'BR' }, { name: 'Germany', code: 'DE' }];

export type ExampleArgs = ComponentProps<typeof MultiSelect>;
export const defaultArgs: ExampleArgs = { value: [], placeholder: 'Select countries', options: countryOptions, optionLabel: 'name', display: 'chip', filter: false, invalid: false, disabled: false, variant: 'outlined', showClear: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<MultiSelect {...args} onChange={(event) => { updateArgs({ value: event.value ?? [] }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
