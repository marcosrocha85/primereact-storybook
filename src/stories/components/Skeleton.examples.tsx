import { useState, type ComponentProps } from 'react';
import { Skeleton } from 'primereact/skeleton';

export type ExampleArgs = ComponentProps<typeof Skeleton>;
export const defaultArgs: ExampleArgs = { width: '10rem', height: '2rem', borderRadius: '16px' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Skeleton {...args} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
