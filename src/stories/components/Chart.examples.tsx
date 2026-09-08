import { useState, type ComponentProps } from 'react';
import { Chart } from 'primereact/chart';
import type { ChartData, ChartOptions } from 'chart.js';

const data: ChartData = {
  labels: ['A', 'B', 'C'],
  datasets: [{
    label: 'Sample values',
    data: [12, 19, 3],
    backgroundColor: ['#6366f1', '#a855f7', '#14b8a6'],
    borderColor: '#6366f1',
    borderWidth: 1
  }]
};
const options: ChartOptions = {
  responsive: true,
  plugins: { title: { display: true, text: 'Sample values: A 12, B 19, C 3' } }
};

export type ExampleArgs = ComponentProps<typeof Chart>;
export const defaultArgs: ExampleArgs = { type: 'bar', data, options };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: 'min(32rem, calc(100vw - 4rem))', maxWidth: '100%' }}><Chart {...args} /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...structuredClone(defaultArgs), ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
