import { useState, type ComponentProps } from 'react';
import { Splitter } from 'primereact/splitter';
import { SplitterPanel } from 'primereact/splitter';

export type ExampleArgs = ComponentProps<typeof Splitter>;
export const defaultArgs: ExampleArgs = { layout: 'horizontal', gutterSize: 4, step: 5, style: { height: '180px', width: '30rem', maxWidth: '100%' } };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const panels = args.children ?? [
    <SplitterPanel key="panel-1" size={30} minSize={10} className="flex align-items-center justify-content-center">Panel 1</SplitterPanel>,
    <SplitterPanel key="panel-2" size={70} minSize={10} className="flex align-items-center justify-content-center">Panel 2</SplitterPanel>
  ];
  return (<Splitter {...args}>{panels}</Splitter>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
