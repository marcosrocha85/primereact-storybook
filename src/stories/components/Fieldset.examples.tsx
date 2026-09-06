import { useState, type ComponentProps } from 'react';
import { Fieldset } from 'primereact/fieldset';

export type ExampleArgs = ComponentProps<typeof Fieldset>;
export const defaultArgs: ExampleArgs = { legend: 'Legend', toggleable: true, collapsed: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Fieldset {...args} onToggle={(event) => { updateArgs({ collapsed: event.value }); args.onToggle?.(event); }}><p>Fieldset content.</p></Fieldset>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
