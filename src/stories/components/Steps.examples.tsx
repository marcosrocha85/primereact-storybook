import { useState, type ComponentProps } from 'react';
import { Steps } from 'primereact/steps';
import type { MenuItem } from 'primereact/menuitem';

const items: MenuItem[] = [{ label: 'Personal' }, { label: 'Seat' }, { label: 'Payment' }];

export type ExampleArgs = ComponentProps<typeof Steps>;
export const defaultArgs: ExampleArgs = { model: items, activeIndex: 0, readOnly: false, className: '', style: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0 }}><Steps {...args} onSelect={(event) => { updateArgs({ activeIndex: event.index }); args.onSelect?.(event); } } /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
