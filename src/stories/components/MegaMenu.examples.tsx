import { useState, type ComponentProps } from 'react';
import { MegaMenu } from 'primereact/megamenu';
import { menuWithActions } from '../menuExamples';

const items = [{ label: 'Videos', icon: 'pi pi-fw pi-video', items: [[{ label: 'Video 1', items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }] }, { label: 'Video 2', items: [{ label: 'Video 2.1' }] }], [{ label: 'Guides', items: [{ label: 'Guide 1' }] }]] }];

export type ExampleArgs = ComponentProps<typeof MegaMenu>;
export const defaultArgs: ExampleArgs = { model: items, orientation: 'horizontal', breakpoint: '767px', scrollHeight: '400px' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const [action, setAction] = useState('No action yet');
  return (<div style={{ width: '100%', maxWidth: '56rem' }}><MegaMenu {...args} model={menuWithActions(args.model ?? [], setAction)} /><p role="status">{action}</p></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
