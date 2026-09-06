import { useState, type ComponentProps } from 'react';
import { OrderList } from 'primereact/orderlist';

const products = [{ name: 'Bamboo Watch' }, { name: 'Black Watch' }];

export type ExampleArgs = ComponentProps<typeof OrderList>;
export const defaultArgs: ExampleArgs = { dataKey: 'name', filterBy: 'name', value: products, header: 'Products' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<OrderList {...args} itemTemplate={(item: { name: string }) => <span>{item.name}</span>} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); }} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
