import { useState, type ComponentProps } from 'react';
import { OrderList } from 'primereact/orderlist';

type Product = { name: string; category: string };

const products: Product[] = [
  { name: 'Bamboo Watch', category: 'Accessories' },
  { name: 'Black Watch', category: 'Accessories' },
  { name: 'Blue Band', category: 'Fitness' },
  { name: 'Blue T-Shirt', category: 'Clothing' }
];

function productTemplate(product: Product) {
  return <div><div className="font-medium">{product.name}</div><div className="text-sm text-color-secondary">{product.category}</div></div>;
}

export type ExampleArgs = ComponentProps<typeof OrderList>;
export const defaultArgs: ExampleArgs = { dataKey: 'name', filterBy: 'name', value: products, header: 'Products', filter: false, dragdrop: false, filterMatchMode: 'contains' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<OrderList {...args} itemTemplate={args.itemTemplate ?? productTemplate} onChange={(event) => { updateArgs({ value: event.value }); args.onChange?.(event); }} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
