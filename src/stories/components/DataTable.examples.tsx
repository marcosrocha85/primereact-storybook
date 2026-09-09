import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import type { DataTablePropsSingle } from 'primereact/datatable';
import { Column } from 'primereact/column';

export const products = [
  { id: '1000', name: 'Bamboo Watch', category: 'Accessories', price: 65 },
  { id: '1001', name: 'Black Watch', category: 'Accessories', price: 72 },
  { id: '1002', name: 'Blue Band', category: 'Fitness', price: 79 },
  { id: '1003', name: 'Blue T-Shirt', category: 'Clothing', price: 29 }
];

export type ExampleArgs = DataTablePropsSingle<typeof products>;
export const defaultArgs: ExampleArgs = { value: products, dataKey: 'id', paginator: true, rows: 1, stripedRows: false, showGridlines: false, selectionMode: 'single', selection: null };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<DataTable {...args} onSelectionChange={(event) => { updateArgs({ selection: event.value }); args.onSelectionChange?.(event); }}><Column field="name" header="Name" sortable filter /><Column field="category" header="Category" sortable /><Column field="price" header="Price" sortable /></DataTable>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
