import { useState, useId, type ComponentProps } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof Tooltip>;
export const defaultArgs: ExampleArgs = { content: 'Tooltip content', event: 'both' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const id = useId();
  return (<><Tooltip {...args} pt={{ root: { 'aria-hidden': false }, ...args.pt }} target={'[id="' + id + '"]'} /><Button id={id} label="Hover or focus me" /></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
