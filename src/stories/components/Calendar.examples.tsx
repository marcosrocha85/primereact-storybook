import { useState, type ComponentProps } from 'react';
import { Calendar } from 'primereact/calendar';

export type ExampleArgs = ComponentProps<typeof Calendar>;
export const defaultArgs: ExampleArgs = { value: null, placeholder: 'Select date', showIcon: true, showButtonBar: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Calendar {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
