import { useState, type ComponentProps } from 'react';
import { Chip } from 'primereact/chip';

export type ExampleArgs = ComponentProps<typeof Chip>;
export const defaultArgs: ExampleArgs = { label: 'Action', icon: undefined, removable: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Chip {...args} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
