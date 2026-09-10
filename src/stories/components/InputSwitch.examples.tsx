import { useState, type ComponentProps } from 'react';
import { InputSwitch } from 'primereact/inputswitch';

export type ExampleArgs = ComponentProps<typeof InputSwitch>;
export const defaultArgs: ExampleArgs = { checked: true, disabled: false, invalid: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { onChange, ...inputSwitchArgs } = args;
  const ariaLabel = inputSwitchArgs['aria-label'] ?? 'InputSwitch';

  return (<InputSwitch {...inputSwitchArgs} aria-label={ariaLabel} onChange={(event) => { updateArgs({ checked: event.value }); onChange?.(event); }} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
