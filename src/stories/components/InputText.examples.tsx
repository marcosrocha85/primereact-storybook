import { useState, type ComponentProps } from 'react';
import { InputText } from 'primereact/inputtext';

export type ExampleArgs = ComponentProps<typeof InputText>;
export const defaultArgs: ExampleArgs = { value: '', placeholder: 'Default', disabled: false, invalid: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<InputText {...args} value={args.value ?? ''} onChange={(event) => { updateArgs({ value: event.target.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
