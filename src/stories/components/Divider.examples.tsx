import { useState, type ComponentProps } from 'react';
import { Divider } from 'primereact/divider';

export type ExampleArgs = ComponentProps<typeof Divider>;
export const defaultArgs: ExampleArgs = { layout: 'horizontal', align: 'center', type: 'solid', children: 'Divider' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<div style={{ width: '24rem', maxWidth: '100%', height: args.layout === 'vertical' ? '8rem' : undefined, display: args.layout === 'vertical' ? 'flex' : 'block', alignItems: 'center' }}><span>Before</span><Divider {...args} /><span>After</span></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
