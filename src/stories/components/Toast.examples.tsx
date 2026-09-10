import { useState, useRef, type ComponentProps } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof Toast> & {
  messageSeverity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast';
  messageSummary: string;
  messageDetail: string;
  messageClosable: boolean;
  messageSticky: boolean;
  messageLife: number;
};
export const defaultArgs: ExampleArgs = { position: 'top-right', messageSeverity: 'success', messageSummary: 'Success', messageDetail: 'Action completed', messageClosable: true, messageSticky: false, messageLife: 3000 };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<Toast>(null);
  const { messageSeverity, messageSummary, messageDetail, messageClosable, messageSticky, messageLife, ...toastProps } = args;
  return (<><Toast {...toastProps} ref={ref} /><Button label="Show toast" onClick={() => ref.current?.show({ severity: messageSeverity, summary: messageSummary, detail: messageDetail, closable: messageClosable, sticky: messageSticky, life: messageSticky ? undefined : messageLife })} /><Button label="Clear" outlined onClick={() => ref.current?.clear()} /></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
