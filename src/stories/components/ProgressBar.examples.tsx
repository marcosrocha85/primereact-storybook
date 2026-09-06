import { useState, type ComponentProps } from 'react';
import { ProgressBar } from 'primereact/progressbar';

export type ExampleArgs = ComponentProps<typeof ProgressBar>;
export const defaultArgs: ExampleArgs = { value: 50, showValue: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: '24rem', maxWidth: '100%' }}><ProgressBar {...args} /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
