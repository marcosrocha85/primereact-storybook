import { useState, type ComponentProps } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { menuWithActions } from '../menuExamples';

const home = { icon: 'pi pi-home', url: '/' }; const items = [{ label: 'Computer' }, { label: 'Notebook' }];

export type ExampleArgs = ComponentProps<typeof BreadCrumb>;
export const defaultArgs: ExampleArgs = { home, model: items };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<><BreadCrumb {...args} home={{ icon: 'pi pi-home', command: () => setAction('Home selected') }} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
