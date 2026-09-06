import { useState, type ComponentProps } from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof Toolbar>;
export const defaultArgs: ExampleArgs = {};

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<><Toolbar {...args} start={<Button label="New" icon="pi pi-plus" onClick={() => setAction('New selected')} />} end={<Button label="Save" icon="pi pi-check" onClick={() => setAction('Save selected')} />} /><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
