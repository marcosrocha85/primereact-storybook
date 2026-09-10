import { useState, type ComponentProps } from 'react';
import { InputNumber } from 'primereact/inputnumber';

export type ExampleArgs = ComponentProps<typeof InputNumber>;
export const defaultArgs: ExampleArgs = { value: null, placeholder: 'Number', mode: 'decimal', currency: 'USD', showButtons: true, buttonLayout: 'stacked', format: true, useGrouping: true, step: 1, min: undefined, max: undefined, invalid: false, disabled: false, readOnly: false, variant: undefined };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: '20rem', maxWidth: '100%' }}><InputNumber {...args} onValueChange={(event) => { updateArgs({ value: event.value }); args.onValueChange?.(event); }} /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
