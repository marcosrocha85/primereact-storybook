import { useState, type ComponentProps } from 'react';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';

export type ExampleArgs = ComponentProps<typeof Badge> & {
  placement: 'standalone' | 'icon' | 'button';
  icon?: string;
  label: string;
};
export const defaultArgs: ExampleArgs = { value: '2', severity: undefined, size: undefined, placement: 'standalone', icon: 'pi pi-check', label: 'Notifications' };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { placement, icon, label, ...badgeProps } = args;
  const [message, setMessage] = useState('');
  return (<>
    {placement === 'button' ? (
      <Button label={label} icon={icon} onClick={() => setMessage(label + ' opened')}>
        <Badge {...badgeProps} />
      </Button>
    ) : placement === 'icon' && icon ? (
      <span className="p-overlay-badge inline-flex" role="img" aria-label={label + (badgeProps.value ? ': ' + badgeProps.value : ': new activity')}>
        <i className={icon} style={{ fontSize: '2rem' }} aria-hidden="true" />
        <Badge {...badgeProps} size={undefined} />
      </span>
    ) : <Badge {...badgeProps} />}
    {placement === 'button' && <span role="status" className="ml-3">{message}</span>}
  </>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
