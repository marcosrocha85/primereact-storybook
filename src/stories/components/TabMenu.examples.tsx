import { useState, type ComponentProps } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import type { MenuItem } from 'primereact/menuitem';

const items: MenuItem[] = [{ label: 'Home', icon: 'pi pi-fw pi-home' }, { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }];

export type ExampleArgs = ComponentProps<typeof TabMenu>;
export const defaultArgs: ExampleArgs = { model: items, activeIndex: 0, className: '', style: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: 'min(40rem, calc(100vw - 2rem))', maxWidth: '100%', minWidth: 0 }}><TabMenu {...args} onTabChange={(event) => { updateArgs({ activeIndex: event.index }); args.onTabChange?.(event); } } /></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
