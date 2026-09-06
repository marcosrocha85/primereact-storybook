import { useState, type ComponentProps } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

export type ExampleArgs = Omit<ComponentProps<typeof Dialog>, 'onHide'> & { onHide?: () => void };
export const defaultArgs: ExampleArgs = { header: 'Dialog', modal: true, visible: false, style: { width: '32rem', maxWidth: '90vw' } };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<><Button label="Open Dialog" onClick={() => updateArgs({ visible: true })} /><Dialog {...args} onHide={() => { updateArgs({ visible: false }); args.onHide?.(); } }><p>Dialog content.</p></Dialog></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
