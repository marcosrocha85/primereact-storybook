import { useState, type ComponentProps } from 'react';
import { Card } from 'primereact/card';

export type ExampleArgs = ComponentProps<typeof Card>;
export const defaultArgs: ExampleArgs = { title: 'Card', subTitle: 'Subtitle' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Card {...args}><p className="m-0">Card content.</p></Card>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
