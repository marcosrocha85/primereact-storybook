import { useState, type ComponentProps } from 'react';
import { TabMenu } from 'primereact/tabmenu';

const items = [{ label: 'Home', icon: 'pi pi-fw pi-home' }, { label: 'Calendar', icon: 'pi pi-fw pi-calendar' }];

export type ExampleArgs = ComponentProps<typeof TabMenu>;
export const defaultArgs: ExampleArgs = { model: items, activeIndex: 0 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<TabMenu {...args} onTabChange={(event) => { updateArgs({ activeIndex: event.index }); args.onTabChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
