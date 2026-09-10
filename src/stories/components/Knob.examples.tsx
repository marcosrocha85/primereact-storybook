import { useState, type ComponentProps } from 'react';
import { Knob } from 'primereact/knob';

export type ExampleArgs = ComponentProps<typeof Knob>;
export const defaultArgs: ExampleArgs = { value: 20, min: 0, max: 100, step: 1, size: 100, disabled: false, readOnly: false, showValue: true, strokeWidth: 14, valueTemplate: '{value}' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Knob {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
