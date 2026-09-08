import { useState, useId, type ComponentProps } from 'react';
import { Checkbox } from 'primereact/checkbox';

export type ExampleArgs = ComponentProps<typeof Checkbox> & { label?: string };
export const defaultArgs: ExampleArgs = { checked: true, label: 'Chicago', disabled: false, readOnly: false, invalid: false, variant: 'outlined', icon: undefined };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const generatedId = useId();
  const { label, ...checkboxProps } = args;
  const inputId = args.inputId ?? generatedId;
  return (<div className="flex align-items-center gap-2">
    <Checkbox aria-label={label ? undefined : 'Checkbox'} {...checkboxProps} inputId={inputId}
      onChange={(event) => { updateArgs({ checked: event.checked }); args.onChange?.(event); }} />
    {label && <label htmlFor={inputId}>{label}</label>}
  </div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
