import { useState, type ComponentProps } from 'react';
import { AvatarGroup } from 'primereact/avatargroup';
import { Avatar } from 'primereact/avatar';

export type ExampleArgs = ComponentProps<typeof AvatarGroup>;
export const defaultArgs: ExampleArgs = {};

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<AvatarGroup {...args}><Avatar label="A" shape="circle" /><Avatar label="B" shape="circle" /><Avatar label="+2" shape="circle" /></AvatarGroup>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
