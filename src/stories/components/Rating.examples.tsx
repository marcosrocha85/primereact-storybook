import { useState, type ComponentProps } from 'react';
import { Rating } from 'primereact/rating';

export type ExampleArgs = ComponentProps<typeof Rating>;
export const defaultArgs: ExampleArgs = { value: 3, stars: 5, cancel: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Rating {...args} onChange={(event) => { updateArgs({ value: event.value ?? undefined }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
