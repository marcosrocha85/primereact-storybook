import { useState, useRef, type ComponentProps } from 'react';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof FileUpload>;
export const defaultArgs: ExampleArgs = { mode: 'basic', name: 'demo[]', accept: 'image/*', maxFileSize: 1000000, chooseLabel: 'Choose' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<FileUpload>(null);
  const [result, setResult] = useState('Select a file to simulate an upload. Files stay in this browser.');
  return (<><FileUpload {...args} pt={{ uploadButton: { root: { 'aria-hidden': false } }, cancelButton: { root: { 'aria-hidden': false } }, removeButton: { root: { 'aria-label': 'Remove file' } }, ...args.pt }} ref={ref} customUpload uploadHandler={(event) => { setResult(event.files.length + ' file(s) processed locally.'); event.options.clear(); args.uploadHandler?.(event); }} onClear={() => { args.onClear?.(); }} /><p role="status">{result}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
