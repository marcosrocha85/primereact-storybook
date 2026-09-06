import { useState, type ComponentProps } from 'react';
import { Chart } from 'primereact/chart';

const data = { labels: ['A', 'B', 'C'], datasets: [{ label: 'Dataset', data: [12, 19, 3], backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'] }] };

export type ExampleArgs = ComponentProps<typeof Chart>;
export const defaultArgs: ExampleArgs = { type: 'bar', data };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: '32rem', maxWidth: '100%' }}><Chart {...args} /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
