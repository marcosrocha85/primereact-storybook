import { useState, type ComponentProps } from 'react';
import { DataView } from 'primereact/dataview';

export const products = [
  { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 },
  { id: '1002', name: 'Blue Band', category: 'Fitness', price: 79 },
  { id: '1003', name: 'Blue T-Shirt', category: 'Clothing', price: 29 }
];

function productTemplate(product: (typeof products)[number], layout?: string) {
  return <div className={layout === 'grid' ? 'col-12 md:col-4 p-3' : 'col-12 p-3'}>
    <div className="border-1 surface-border border-round p-3">
      <div className="font-medium">{product.name}</div>
      <div className="text-sm text-color-secondary">{product.category}</div>
      <div className="mt-2">${product.price}</div>
    </div>
  </div>;
}

export type ExampleArgs = ComponentProps<typeof DataView>;
export const defaultArgs: ExampleArgs = { value: products, dataKey: 'id', layout: 'list', paginator: true, rows: 1 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<DataView {...args} itemTemplate={args.itemTemplate ?? productTemplate} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
