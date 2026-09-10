import { useState, type ComponentProps } from 'react';
import { InputTextarea } from 'primereact/inputtextarea';

export type ExampleArgs = ComponentProps<typeof InputTextarea>;
export const defaultArgs: ExampleArgs = { value: '', placeholder: 'Your Message', rows: 5, cols: 30, autoResize: false, disabled: false, invalid: false, readOnly: false, variant: undefined };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<InputTextarea {...args} value={args.value ?? ''} onChange={(event) => { updateArgs({ value: event.target.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
