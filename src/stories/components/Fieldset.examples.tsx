import { useState, type ComponentProps } from 'react';
import { Fieldset } from 'primereact/fieldset';

export type ExampleArgs = ComponentProps<typeof Fieldset> & {
  contentText?: string;
};
export const defaultArgs: ExampleArgs = { legend: 'Legend', toggleable: true, collapsed: false, expandIcon: undefined, collapseIcon: undefined, contentText: 'Fieldset content.' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { contentText, children, ...fieldsetProps } = args;
  return (<Fieldset {...fieldsetProps} onToggle={(event) => { updateArgs({ collapsed: event.value }); args.onToggle?.(event); }}>{children !== undefined ? children : <p className="m-0 line-height-3">{contentText}</p>}</Fieldset>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
