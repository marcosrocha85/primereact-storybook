import { useState, type ComponentProps } from 'react';
import { InputNumber } from 'primereact/inputnumber';

export type ExampleArgs = ComponentProps<typeof InputNumber>;
export const defaultArgs: ExampleArgs = { value: null, placeholder: 'Number', mode: 'decimal', currency: 'USD', showButtons: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<InputNumber {...args} currency={args.currency ?? 'USD'} onValueChange={(event) => { updateArgs({ value: event.value }); args.onValueChange?.(event); }} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
