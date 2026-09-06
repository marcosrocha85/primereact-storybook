import { useState, type ComponentProps } from 'react';
import { Avatar } from 'primereact/avatar';

export type ExampleArgs = ComponentProps<typeof Avatar>;
export const defaultArgs: ExampleArgs = { label: 'P', shape: 'circle', size: 'large' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Avatar {...args} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
