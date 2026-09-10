import { useState, type ComponentProps } from 'react';
import { Galleria } from 'primereact/galleria';

const images = [1, 2, 3].map((index) => ({ itemImageSrc: './demo/images/galleria/galleria' + index + '.jpg', thumbnailImageSrc: './demo/images/galleria/galleria' + index + 's.jpg', alt: 'Landscape ' + index }));

export type ExampleArgs = ComponentProps<typeof Galleria>;
export const defaultArgs: ExampleArgs = { value: images, activeIndex: 0, numVisible: 1, circular: true, showItemNavigators: true, showThumbnails: true, showIndicators: false, fullScreen: false, style: { maxWidth: '420px', width: '100%' } };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const itemTemplate = (item: (typeof images)[number]) => <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  const thumbnailTemplate = (item: (typeof images)[number]) => <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100%', display: 'block' }} />;
  const onItemChange = args.activeIndex === undefined ? args.onItemChange : (event: Parameters<NonNullable<ExampleArgs['onItemChange']>>[0]) => {
    updateArgs({ activeIndex: event.index });
    args.onItemChange?.(event);
  };
  return (<Galleria {...args} item={args.item === undefined ? itemTemplate : args.item} thumbnail={args.thumbnail === undefined ? thumbnailTemplate : args.thumbnail} onItemChange={onItemChange} />);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
