import { useState, useRef, type ComponentProps } from 'react';
import { FileUpload } from 'primereact/fileupload';

export type ExampleArgs = ComponentProps<typeof FileUpload>;
export const defaultArgs: ExampleArgs = { mode: 'advanced', name: 'demo[]', accept: 'image/*', maxFileSize: 1000000, chooseLabel: 'Choose', uploadLabel: 'Upload', cancelLabel: 'Clear', multiple: false, auto: false, customUpload: true, disabled: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const ref = useRef<FileUpload>(null);
  const [result, setResult] = useState('Select a file to simulate an upload. Files stay in this browser.');
  const pt = args.pt;
  const mergedPt = {
    ...pt,
    uploadButton: { root: { 'aria-hidden': false }, ...pt?.uploadButton },
    cancelButton: { root: { 'aria-hidden': false }, ...pt?.cancelButton },
    removeButton: { root: { 'aria-label': 'Remove file' }, ...pt?.removeButton }
  };
  const uploadHandler = args.customUpload === false ? args.uploadHandler : (event: Parameters<NonNullable<ExampleArgs['uploadHandler']>>[0]) => {
    event.options.clear();
    args.uploadHandler?.(event);
    setResult(event.files.length + ' file(s) processed locally.');
  };
  return (<><FileUpload {...args} pt={mergedPt} ref={ref} uploadHandler={uploadHandler} onClear={() => { setResult('Select a file to simulate an upload. Files stay in this browser.'); args.onClear?.(); }} /><p role="status">{result}</p></>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
