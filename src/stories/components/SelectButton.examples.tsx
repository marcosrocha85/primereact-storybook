import { useState, type ComponentProps } from 'react';
import { SelectButton } from 'primereact/selectbutton';

const selectOptions = [{ name: 'Option 1', code: 'O1' }, { name: 'Option 2', code: 'O2' }, { name: 'Option 3', code: 'O3' }];

export type ExampleArgs = ComponentProps<typeof SelectButton>;
export const defaultArgs: ExampleArgs = { value: null, options: selectOptions, optionLabel: 'name', multiple: false, allowEmpty: true, invalid: false, disabled: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<SelectButton {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
