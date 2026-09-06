import { useState, type ComponentProps } from 'react';
import { Galleria } from 'primereact/galleria';

const images = [1, 2, 3].map((index) => ({ itemImageSrc: './demo/images/galleria/galleria' + index + '.jpg', thumbnailImageSrc: './demo/images/galleria/galleria' + index + 's.jpg', alt: 'Landscape ' + index }));

export type ExampleArgs = ComponentProps<typeof Galleria>;
export const defaultArgs: ExampleArgs = { value: images, numVisible: 1, circular: true, showItemNavigators: true };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<Galleria {...args} item={(item: (typeof images)[number]) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />} thumbnail={(item: (typeof images)[number]) => <img src={item.thumbnailImageSrc} alt={item.alt} />} style={{ maxWidth: '420px' }} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
