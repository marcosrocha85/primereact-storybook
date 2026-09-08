import { useState, type ComponentProps } from 'react';
import { Carousel } from 'primereact/carousel';
import { useEffect, useSyncExternalStore } from 'react';

function subscribeViewport(onChange: () => void) {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
}
const getViewport = () => window.innerWidth;
const getServerViewport = () => 1024;

const products = [
  { name: 'Bamboo Watch', image: 'bamboo-watch.jpg', price: 65, inventoryStatus: 'INSTOCK' },
  { name: 'Black Watch', image: 'black-watch.jpg', price: 72, inventoryStatus: 'INSTOCK' },
  { name: 'Blue Band', image: 'blue-band.jpg', price: 79, inventoryStatus: 'LOWSTOCK' }
];

function productTemplate(product: (typeof products)[number]) {
  return <div className="border-1 surface-border border-round m-1 text-center p-3">
    <img src={'./demo/images/product/' + product.image} alt={product.name} style={{ width: '6rem', maxWidth: '100%' }} />
    <h4 className="mt-3 mb-2">{product.name}</h4>
    <p className="mt-0 mb-3">${product.price}</p>
    <span className={'product-badge status-' + product.inventoryStatus.toLowerCase()}>{product.inventoryStatus}</span>
  </div>;
}

export type ExampleArgs = ComponentProps<typeof Carousel>;
export const defaultArgs: ExampleArgs = { value: products, itemTemplate: productTemplate, page: 0, numVisible: 1, numScroll: 1, circular: false, orientation: 'horizontal', verticalViewPortHeight: '320px', showIndicators: true, showNavigators: true, autoplayInterval: 0 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const viewportWidth = useSyncExternalStore(subscribeViewport, getViewport, getServerViewport);
  const nativePaging = Boolean(args.circular || args.autoplayInterval);
  const count = args.value?.length ?? 0;
  const numVisible = args.numVisible ?? 1;
  const numScroll = args.numScroll ?? 1;
  const page = args.page ?? 0;
  const validCounts = (visible: number, scroll: number) =>
    Number.isInteger(visible) && visible > 0 && Number.isInteger(scroll) && scroll > 0 &&
    scroll <= visible && (!count || visible <= count);
  const responsiveOptions = Array.isArray(args.responsiveOptions) ? args.responsiveOptions : [];
  const invalidResponsive = (args.responsiveOptions != null && !Array.isArray(args.responsiveOptions)) ||
    responsiveOptions.some((option) => !option || typeof option.breakpoint !== 'string' || !/^\d+px$/.test(option.breakpoint));
  const configurations = [{ numVisible, numScroll }, ...responsiveOptions.filter(Boolean)];
  const invalidCounts = configurations.some((option) => !validCounts(option.numVisible, option.numScroll));
  const effectiveCounts = [...responsiveOptions].filter((option) => option && parseInt(option.breakpoint, 10) >= viewportWidth)
      .sort((left, right) => parseInt(left.breakpoint, 10) - parseInt(right.breakpoint, 10))[0] ?? { numVisible, numScroll };
  const maxPage = Math.max(0, Math.ceil((count - effectiveCounts.numVisible) / effectiveCounts.numScroll));
  const renderedPage = responsiveOptions.length ? Math.min(page, maxPage) : page;
  useEffect(() => {
    if (Number.isFinite(renderedPage) && renderedPage !== page) updateArgs({ page: renderedPage });
  }, [renderedPage, page, updateArgs]);
  const problem = invalidResponsive ? 'Responsive options must be an array of breakpoint/count objects with pixel breakpoints, for example 560px.'
    : !Number.isInteger(args.autoplayInterval ?? 0) || (args.autoplayInterval ?? 0) < 0 ? 'Autoplay interval must be a nonnegative integer in milliseconds.'
    : invalidCounts ? 'Use positive integer counts with numScroll <= numVisible <= item count, including responsive options.'
    : !Number.isInteger(page) || page < 0 || (!responsiveOptions.length && page > maxPage) ? 'Choose a page available at the current viewport (0 to ' + maxPage + ').'
    : nativePaging && (page !== 0 || args.onPageChange) ? 'Circular/autoplay uses native paging. Set page to 0 and omit onPageChange (PrimeReact 10.9.7 limitation).'
    : undefined;
  if (problem) return <p role="alert">{problem}</p>;
  return (<div style={{ width: 'min(48rem, calc(100vw - 4rem))', maxWidth: '100%' }}>
    <Carousel key={JSON.stringify([nativePaging, numVisible, numScroll, args.responsiveOptions, args.orientation, args.autoplayInterval, effectiveCounts.numVisible, effectiveCounts.numScroll])} {...args} page={renderedPage} onPageChange={nativePaging ? undefined : (event) => {
      updateArgs({ page: event.page });
      args.onPageChange?.(event);
    }} />
  </div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
