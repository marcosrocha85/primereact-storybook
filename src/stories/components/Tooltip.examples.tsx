import { useState, useId, type ComponentProps } from 'react';
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button';
import type { TooltipPassThroughOptions } from 'primereact/tooltip';

export type ExampleArgs = ComponentProps<typeof Tooltip>;
export const defaultArgs: ExampleArgs = { content: 'Tooltip content', event: 'both', position: 'top', disabled: false, showOnDisabled: false, mouseTrack: false, mouseTrackLeft: 5, mouseTrackTop: 5, showDelay: 0, hideDelay: 0, closeOnEscape: false, autoHide: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const id = useId();
  const target = args.target ?? '[id="' + id + '"]';
  const root = args.pt?.root;
  type TooltipRoot = NonNullable<TooltipPassThroughOptions['root']>;
  type TooltipRootOptions<T> = T extends (options?: infer Options) => unknown ? Options : never;
  const accessibleRoot = typeof root === 'function'
    ? (options: TooltipRootOptions<TooltipRoot>) => ({ 'aria-hidden': false, ...(root(options) ?? {}) })
    : { 'aria-hidden': false, ...(root ?? {}) };
  const pt: TooltipPassThroughOptions = { ...args.pt, root: accessibleRoot };
  return (<><Tooltip {...args} target={target} pt={pt} /><Button id={id} label="Hover or focus me" /></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
