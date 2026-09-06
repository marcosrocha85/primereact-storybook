import { useState, type ComponentProps } from 'react';
import { TabView } from 'primereact/tabview';
import { TabPanel } from 'primereact/tabview';

export type ExampleArgs = ComponentProps<typeof TabView>;
export const defaultArgs: ExampleArgs = { activeIndex: 0 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<TabView {...args} onTabChange={(event) => { updateArgs({ activeIndex: event.index }); args.onTabChange?.(event); } }><TabPanel header="Header I"><p>Content I</p></TabPanel><TabPanel header="Header II"><p>Content II</p></TabPanel></TabView>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
