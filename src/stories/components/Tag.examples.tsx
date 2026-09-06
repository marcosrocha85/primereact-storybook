import { useState, type ComponentProps } from 'react';
import { Tag } from 'primereact/tag';

export type ExampleArgs = ComponentProps<typeof Tag>;
export const defaultArgs: ExampleArgs = { value: 'Primary', severity: undefined, rounded: false, icon: undefined };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Tag {...args} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
