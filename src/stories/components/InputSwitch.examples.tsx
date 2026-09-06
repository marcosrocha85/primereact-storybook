import { useState, type ComponentProps } from 'react';
import { InputSwitch } from 'primereact/inputswitch';

export type ExampleArgs = ComponentProps<typeof InputSwitch>;
export const defaultArgs: ExampleArgs = { checked: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<InputSwitch {...args} aria-label="InputSwitch" onChange={(event) => { updateArgs({ checked: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
