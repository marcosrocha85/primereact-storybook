import { useState, type ComponentProps } from 'react';
import { Message } from 'primereact/message';

export type ExampleArgs = ComponentProps<typeof Message>;
export const defaultArgs: ExampleArgs = { severity: 'info', text: 'Message content' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Message {...args} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
