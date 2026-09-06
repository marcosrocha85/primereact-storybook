import { useState, type ComponentProps } from 'react';
import { MegaMenu } from 'primereact/megamenu';
import { menuWithActions } from '../menuExamples';

const items = [{ label: 'Videos', icon: 'pi pi-fw pi-video', items: [[{ label: 'Video 1', items: [{ label: 'Video 1.1' }] }]] }];

export type ExampleArgs = ComponentProps<typeof MegaMenu>;
export const defaultArgs: ExampleArgs = { model: items, orientation: 'horizontal' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<><MegaMenu {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
