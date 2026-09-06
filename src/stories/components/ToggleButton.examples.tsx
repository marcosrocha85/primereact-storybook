import { useState, type ComponentProps } from 'react';
import { ToggleButton } from 'primereact/togglebutton';

export type ExampleArgs = ComponentProps<typeof ToggleButton>;
export const defaultArgs: ExampleArgs = { checked: true, onLabel: 'Yes', offLabel: 'No', onIcon: 'pi pi-check', offIcon: 'pi pi-times' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<ToggleButton {...args} aria-label="ToggleButton" onChange={(event) => { updateArgs({ checked: event.value }); args.onChange?.(event); } } />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
