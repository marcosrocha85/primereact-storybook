import { useState, type ComponentProps } from 'react';
import { ConfirmPopup } from 'primereact/confirmpopup';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof ConfirmPopup>;
export const defaultArgs: ExampleArgs = { message: 'Are you sure?', visible: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const [result, setResult] = useState('No decision yet');
  return (<><Button label="Confirm" onClick={(event) => { setTarget(event.currentTarget); updateArgs({ visible: true }); }} /><ConfirmPopup {...args} target={target ?? undefined} onHide={() => updateArgs({ visible: false })} accept={() => { setResult('Accepted'); args.accept?.(); }} reject={() => { setResult('Rejected'); args.reject?.(); }} /><p role="status">{result}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
