import { useState, type ComponentProps } from 'react';
import { ColorPicker } from 'primereact/colorpicker';

export type ExampleArgs = ComponentProps<typeof ColorPicker>;
export const defaultArgs: ExampleArgs = { value: '1976D2' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<ColorPicker {...args} onChange={(event) => { updateArgs({ value: event.value ?? undefined }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
