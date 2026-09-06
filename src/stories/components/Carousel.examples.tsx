import { useState, type ComponentProps } from 'react';
import { Carousel } from 'primereact/carousel';

const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }, { name: 'Blue Band' }];

export type ExampleArgs = ComponentProps<typeof Carousel>;
export const defaultArgs: ExampleArgs = { value: products, numVisible: 1, numScroll: 1, circular: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Carousel {...args} itemTemplate={(item: { name: string }) => <div className="p-3 text-center">{item.name}</div>} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
