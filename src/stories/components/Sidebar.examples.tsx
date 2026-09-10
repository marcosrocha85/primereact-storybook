import { useState, type ComponentProps } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';

export type ExampleArgs = Omit<ComponentProps<typeof Sidebar>, 'onHide'> & { onHide?: () => void };
export const defaultArgs: ExampleArgs = { visible: false, position: 'right', dismissable: true, modal: true, showCloseIcon: true, closeOnEscape: true, fullScreen: false, blockScroll: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<><Button label="Open Sidebar" onClick={() => updateArgs({ visible: true })} /><Sidebar {...args} onHide={() => { updateArgs({ visible: false }); args.onHide?.(); } }>{args.children ?? <p>Sidebar content.</p>}</Sidebar></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
