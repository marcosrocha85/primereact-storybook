import { useState, type ComponentProps } from 'react';
import { AvatarGroup } from 'primereact/avatargroup';
import { Avatar } from 'primereact/avatar';

const members = [
  { name: 'Amy Elsner', label: 'AE', image: 'demo/images/avatar/amyelsner.png' },
  { name: 'Asiya Javayant', label: 'AJ', image: 'demo/images/avatar/asiyajavayant.png' },
  { name: 'Onyama Limba', label: 'OL', image: 'demo/images/avatar/onyamalimba.png' },
  { name: 'Ioni Bowcher', label: 'IB', image: 'demo/images/avatar/ionibowcher.png' },
  { name: 'Xuxue Feng', label: 'XF', image: 'demo/images/avatar/xuxuefeng.png' },
];

export type ExampleArgs = ComponentProps<typeof AvatarGroup> & {
  count: 2 | 3 | 4 | 5;
  content: 'text' | 'image' | 'mixed';
  size: ComponentProps<typeof Avatar>['size'];
  shape: ComponentProps<typeof Avatar>['shape'];
  showOverflow: boolean;
};
export const defaultArgs: ExampleArgs = { count: 5, content: 'image', size: 'large', shape: 'circle', showOverflow: true, className: '', style: {} };

export function Playground({ args, updateArgs }: {
  args: ExampleArgs;
  updateArgs: (changes: Partial<ExampleArgs>) => void;
}) {
  const { count, content, size, shape, showOverflow, ...groupProps } = args;
  return (<AvatarGroup {...groupProps}>
    {members.slice(0, count).map((member, index) => {
      const useImage = content === 'image' || (content === 'mixed' && index % 2 === 0);
      return <Avatar key={member.name} image={useImage ? member.image : undefined} imageAlt={useImage ? member.name : undefined} label={useImage ? undefined : member.label} aria-label={member.name} size={size} shape={shape} />;
    })}
    {showOverflow && <Avatar label="+2" aria-label="2 additional members" shape={shape} size={size} style={{ backgroundColor: '#9c27b0', color: '#ffffff' }} />}
  </AvatarGroup>);
}

export function Example({ initialArgs = {} }: { initialArgs?: Partial<ExampleArgs> }) {
  const [args, setArgs] = useState<ExampleArgs>({ ...defaultArgs, ...initialArgs });
  return <Playground args={args} updateArgs={(changes) => setArgs((current) => ({ ...current, ...changes }))} />;
}
