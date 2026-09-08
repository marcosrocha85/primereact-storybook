import { useState, useId } from 'react';
import { Calendar } from 'primereact/calendar';
import type { CalendarProps } from 'primereact/calendar';

export type ExampleArgs = Omit<CalendarProps, 'value'> & {
  value: number | null;
  label: string;
  floatLabel: boolean;
};
export const defaultArgs: ExampleArgs = { value: null, label: 'Date', floatLabel: false, placeholder: 'Select date', dateFormat: 'mm/dd/yy', showIcon: true, showButtonBar: true, invalid: false, disabled: false, className: 'w-full' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { value, label, floatLabel, inputId, ...calendarProps } = args;
  const generatedId = useId();
  const id = inputId ?? generatedId;
  const date = value == null ? null : new Date(value);
  const selectedDate = date && !Number.isNaN(date.getTime()) ? date : null;
  return (<div style={{ width: '20rem', maxWidth: '100%' }}>
    <div className={floatLabel ? 'p-float-label' : 'flex flex-column gap-2'}>
      {!floatLabel && <label htmlFor={id}>{label}</label>}
      <Calendar
        pt={{ input: { root: { 'aria-invalid': calendarProps.invalid } } }}
        {...calendarProps}
        inputId={id}
        value={selectedDate}
        placeholder={floatLabel ? undefined : calendarProps.placeholder}
        onChange={(event) => {
          updateArgs({ value: event.value?.getTime() ?? null });
          calendarProps.onChange?.(event);
        }}
      />
      {floatLabel && <label htmlFor={id}>{label}</label>}
    </div>
  </div>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
