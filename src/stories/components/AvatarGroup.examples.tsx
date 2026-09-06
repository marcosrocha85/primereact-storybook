import { useState, type ComponentProps } from 'react';
import { AvatarGroup } from 'primereact/avatargroup';
import { Avatar } from 'primereact/avatar';

export type ExampleArgs = ComponentProps<typeof AvatarGroup>;
export const defaultArgs: ExampleArgs = { className: '', style: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  return (<AvatarGroup {...args}>
    <Avatar image="demo/images/avatar/amyelsner.png" imageAlt="Amy Elsner" size="large" shape="circle" />
    <Avatar image="demo/images/avatar/asiyajavayant.png" imageAlt="Asiya Javayant" size="large" shape="circle" />
    <Avatar image="demo/images/avatar/onyamalimba.png" imageAlt="Onyama Limba" size="large" shape="circle" />
    <Avatar image="demo/images/avatar/ionibowcher.png" imageAlt="Ioni Bowcher" size="large" shape="circle" />
    <Avatar image="demo/images/avatar/xuxuefeng.png" imageAlt="Xuxue Feng" size="large" shape="circle" />
    <Avatar label="+2" aria-label="2 additional members" shape="circle" size="large" style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />
  </AvatarGroup>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
