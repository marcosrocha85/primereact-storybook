import { useState, type ComponentProps } from 'react';
import { RadioButton } from 'primereact/radiobutton';

export type ExampleArgs = ComponentProps<typeof RadioButton>;
export const defaultArgs: ExampleArgs = { checked: false, value: 'Option 1' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<RadioButton {...args} aria-label="RadioButton" onChange={(event) => { updateArgs({ checked: event.checked ?? false }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
