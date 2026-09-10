import { useState, type ComponentProps } from 'react';
import { ScrollPanel } from 'primereact/scrollpanel';

export type ExampleArgs = ComponentProps<typeof ScrollPanel>;
export const defaultArgs: ExampleArgs = { style: { width: '24rem', maxWidth: '100%', height: '160px' } };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const content = args.children ?? <p style={{ lineHeight: 1.7 }}>{Array.from({ length: 12 }, (_, index) => <span key={index} className="block">Scrollable content line {index + 1}.</span>)}</p>;
  return (<ScrollPanel {...args}>{content}</ScrollPanel>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
