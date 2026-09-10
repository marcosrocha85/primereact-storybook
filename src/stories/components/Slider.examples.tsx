import { useState, type ComponentProps } from 'react';
import { Slider } from 'primereact/slider';

export type ExampleArgs = ComponentProps<typeof Slider>;
export const defaultArgs: ExampleArgs = { value: 50, min: 0, max: 100, step: 1, orientation: 'horizontal', range: false, disabled: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: args.orientation === 'vertical' ? '4rem' : '18rem', height: args.orientation === 'vertical' ? '12rem' : undefined, maxWidth: '100%' }}><Slider {...args} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); } } /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
