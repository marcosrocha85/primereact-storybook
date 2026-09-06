import { useState, useRef, type ComponentProps } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof Toast>;
export const defaultArgs: ExampleArgs = { position: 'top-right' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<Toast>(null);
  return (<><Toast {...args} ref={ref} /><Button label="Show toast" onClick={() => ref.current?.show({ severity: 'success', summary: 'Success', detail: 'Action completed', life: 3000 })} /><Button label="Clear" outlined onClick={() => ref.current?.clear()} /></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
