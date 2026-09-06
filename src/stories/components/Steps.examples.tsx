import { useState, type ComponentProps } from 'react';
import { Steps } from 'primereact/steps';

const items = [{ label: 'Personal' }, { label: 'Seat' }, { label: 'Payment' }];

export type ExampleArgs = ComponentProps<typeof Steps>;
export const defaultArgs: ExampleArgs = { model: items, activeIndex: 0, readOnly: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Steps {...args} onSelect={(event) => { updateArgs({ activeIndex: event.index }); args.onSelect?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
