import { describe, expect, it, vi } from 'vitest';
import type { MenuItem } from 'primereact/menuitem';
import { menuWithActions } from '../src/stories/menuExamples';

type CommandEvent = Parameters<NonNullable<MenuItem['command']>>[0];

function commandEvent(item: MenuItem): CommandEvent {
  return { originalEvent: new Event('click') as unknown as CommandEvent['originalEvent'], item };
}

describe('menuWithActions', () => {
  it('preserves supplied parent and nested commands while adding feedback', () => {
    const supplied = vi.fn();
    const feedback = vi.fn();
    const parent: MenuItem = { label: 'Parent', command: supplied, items: [{ label: 'Child', command: supplied }] };
    const [wrapped] = menuWithActions([parent], feedback);

    wrapped.command?.(commandEvent(wrapped));
    const child = wrapped.items && !Array.isArray(wrapped.items[0]) ? wrapped.items[0] : undefined;
    if (child && !Array.isArray(child)) child.command?.(commandEvent(child));

    expect(supplied).toHaveBeenCalledTimes(2);
    expect(feedback).toHaveBeenNthCalledWith(1, 'Parent selected');
    expect(feedback).toHaveBeenNthCalledWith(2, 'Child selected');
  });
});
