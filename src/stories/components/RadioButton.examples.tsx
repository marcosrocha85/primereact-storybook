import { useState, useId, type ComponentProps } from 'react';
import { RadioButton } from 'primereact/radiobutton';

export function RadioGroupExample() {
  const [selected, setSelected] = useState('Chicago');
  const options = ['Chicago', 'Los Angeles', 'New York'];
  return <div className="flex flex-wrap gap-3">{options.map((option) => {
    const inputId = 'radio-' + option.toLowerCase().replaceAll(' ', '-');
    return <div className="flex align-items-center gap-2" key={option}>
      <RadioButton inputId={inputId} name="city" value={option} checked={selected === option} onChange={(event) => setSelected(event.value)} />
      <label htmlFor={inputId}>{option}</label>
    </div>;
  })}</div>;
}

export type ExampleArgs = ComponentProps<typeof RadioButton>;
export const defaultArgs: ExampleArgs = { checked: false, value: 'Option 1', name: 'options', disabled: false, invalid: false, readOnly: false, required: false, variant: undefined };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const generatedId = useId();
  return (<div className="flex align-items-center gap-2"><RadioButton {...args} inputId={args.inputId ?? generatedId} aria-label={args['aria-label'] ?? (args['aria-labelledby'] ? undefined : 'RadioButton')} onChange={(event) => { updateArgs({ checked: event.checked }); args.onChange?.(event); } } /><label htmlFor={args.inputId ?? generatedId}>{String(args.value ?? 'Option')}</label></div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
