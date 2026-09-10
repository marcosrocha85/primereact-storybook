import { useState, useId } from 'react';
import { InputMask } from 'primereact/inputmask';
import type { InputMaskProps } from 'primereact/inputmask';

export type ExampleArgs = InputMaskProps & {
  label?: string;
  floatLabel?: boolean;
};
export const defaultArgs: ExampleArgs = { value: '', mask: '99/99/9999', placeholder: 'MM/DD/YYYY', label: 'Date', floatLabel: false, slotChar: '_', autoClear: true, unmask: false, invalid: false, disabled: false, readOnly: false };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const generatedId = useId();
  const { label, floatLabel, ...inputMaskProps } = args;
  const inputId = inputMaskProps.id ?? generatedId;
  return (<div style={{ width: '20rem', maxWidth: '100%' }}>
    <div className={floatLabel ? 'p-float-label' : 'flex flex-column gap-2'}>
      {!floatLabel && label && <label htmlFor={inputId}>{label}</label>}
      <InputMask {...inputMaskProps} id={inputId} value={inputMaskProps.value ?? ''}
        onChange={(event) => { updateArgs({ value: event.value ?? '' }); inputMaskProps.onChange?.(event); }} />
      {floatLabel && label && <label htmlFor={inputId}>{label}</label>}
    </div>
  </div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
