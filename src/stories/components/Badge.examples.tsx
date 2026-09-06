import { useState, type ComponentProps } from 'react';
import { Badge } from 'primereact/badge';

export type ExampleArgs = ComponentProps<typeof Badge>;
export const defaultArgs: ExampleArgs = { value: '2', severity: 'info', size: undefined };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Badge {...args} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
