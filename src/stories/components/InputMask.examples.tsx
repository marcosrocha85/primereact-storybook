import { useState, type ComponentProps } from 'react';
import { InputMask } from 'primereact/inputmask';

export type ExampleArgs = ComponentProps<typeof InputMask>;
export const defaultArgs: ExampleArgs = { value: '', mask: '99/99/9999', placeholder: '99/99/9999' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<InputMask {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
