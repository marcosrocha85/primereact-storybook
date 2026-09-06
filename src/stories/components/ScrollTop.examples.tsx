import { useState, type ComponentProps } from 'react';
import { ScrollTop } from 'primereact/scrolltop';

export type ExampleArgs = ComponentProps<typeof ScrollTop>;
export const defaultArgs: ExampleArgs = { threshold: 100, behavior: 'smooth' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ height: '12rem', overflow: 'auto', position: 'relative' }}><div style={{ height: '30rem', padding: '1rem' }}>Scroll down inside this panel.</div><ScrollTop {...args} target="parent" /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
