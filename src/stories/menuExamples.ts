import type { MenuItem } from 'primereact/menuitem';

function isGrouped(items: MenuItem[] | MenuItem[][]): items is MenuItem[][] {
  return items.every(Array.isArray);
}

export function menuWithActions(items: MenuItem[], onAction: (action: string) => void): MenuItem[] {
  return items.map((item) => {
    const withAction = (event: Parameters<NonNullable<MenuItem['command']>>[0]) => {
      item.command?.(event);
      onAction(`${item.label ?? 'Action'} selected`);
    };
    const nextItem = item.items || item.command
      ? { ...item, ...(item.command ? { command: withAction } : {}) }
      : { ...item, command: withAction };
    if (!item.items) return nextItem;
    return {
      ...nextItem,
      items: isGrouped(item.items)
        ? item.items.map((group) => menuWithActions(group, onAction))
        : menuWithActions(item.items, onAction)
    };
  });
}
