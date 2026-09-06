import { useState, type ComponentProps } from 'react';
import { Checkbox } from 'primereact/checkbox';

export type ExampleArgs = ComponentProps<typeof Checkbox>;
export const defaultArgs: ExampleArgs = { checked: true, disabled: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Checkbox {...args} aria-label="Checkbox" onChange={(event) => { updateArgs({ checked: event.checked ?? false }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
