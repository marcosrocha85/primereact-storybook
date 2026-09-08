import { useState, type ComponentProps } from 'react';
import { Chip } from 'primereact/chip';

export type ExampleArgs = ComponentProps<typeof Chip> & { visible?: boolean };
export const defaultArgs: ExampleArgs = { label: 'Action', icon: undefined, image: undefined, imageAlt: 'Amy Elsner', removable: false, visible: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { visible = true, ...chipProps } = args;
  return (visible ? <Chip {...chipProps} onRemove={(event) => {
    const result = chipProps.onRemove?.(event);
    if (result !== false) updateArgs({ visible: false });
    return result !== false;
  }} /> : null);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
