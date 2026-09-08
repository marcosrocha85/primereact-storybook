import { useState, type ComponentProps } from 'react';
import { Card } from 'primereact/card';

export type ExampleArgs = ComponentProps<typeof Card> & {
  contentText?: string;
  headerText?: string;
  footerText?: string;
};
export const defaultArgs: ExampleArgs = { title: 'Card', subTitle: 'Subtitle', contentText: 'Card content.', headerText: '', footerText: '', className: '', style: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { contentText, headerText, footerText, children, header, footer, ...cardProps } = args;
  return (<div style={{ width: 'min(24rem, calc(100vw - 2rem))', maxWidth: '100%' }}>
    <Card {...cardProps}
      header={header !== undefined ? header : headerText ? <h5 className="m-0 p-3 pb-0">{headerText}</h5> : undefined}
      footer={footer !== undefined ? footer : footerText || undefined}
    >
      {children !== undefined ? children : contentText ? <p className="m-0 line-height-3">{contentText}</p> : undefined}
    </Card>
  </div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
