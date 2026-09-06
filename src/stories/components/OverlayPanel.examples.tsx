import { useState, useRef, type ComponentProps } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof OverlayPanel>;
export const defaultArgs: ExampleArgs = { showCloseIcon: true, dismissable: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<OverlayPanel>(null);
  return (<><Button label="Show overlay" onClick={(event) => ref.current?.toggle(event)} /><OverlayPanel {...args} ref={ref}><p>Overlay content.</p></OverlayPanel></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
