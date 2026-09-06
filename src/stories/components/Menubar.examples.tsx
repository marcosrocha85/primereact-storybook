import { useState, type ComponentProps } from 'react';
import { Menubar } from 'primereact/menubar';
import { menuWithActions } from '../menuExamples';

const menuItems = [{ label: 'File', icon: 'pi pi-fw pi-file' }, { label: 'Edit', icon: 'pi pi-fw pi-pencil' }];

export type ExampleArgs = ComponentProps<typeof Menubar>;
export const defaultArgs: ExampleArgs = { model: menuItems };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<><Menubar {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
