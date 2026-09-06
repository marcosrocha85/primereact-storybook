import { useState, useRef, type ComponentProps } from 'react';
import { Messages } from 'primereact/messages';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof Messages>;
export const defaultArgs: ExampleArgs = {};

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<Messages>(null);
  return (<><Messages {...args} ref={ref} /><Button label="Show messages" onClick={() => ref.current?.show({ severity: 'success', summary: 'Success', detail: 'Action completed', life: 3000 })} /><Button label="Clear" outlined onClick={() => ref.current?.clear()} /></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
