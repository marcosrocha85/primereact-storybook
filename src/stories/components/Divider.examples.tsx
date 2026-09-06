import { useState, type ComponentProps } from 'react';
import { Divider } from 'primereact/divider';

export type ExampleArgs = ComponentProps<typeof Divider>;
export const defaultArgs: ExampleArgs = { layout: 'horizontal', align: 'center' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: '24rem', maxWidth: '100%', display: args.layout === 'vertical' ? 'flex' : 'block' }}><span>Before</span><Divider {...args}>Divider</Divider><span>After</span></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
