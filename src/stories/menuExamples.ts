import type { MenuItem } from 'primereact/menuitem';

function isGrouped(items: MenuItem[] | MenuItem[][]): items is MenuItem[][] {
  return items.every(Array.isArray);
}

export function menuWithActions(items: MenuItem[], onAction: (action: string) => void): MenuItem[] {
  return items.map((item) => {
    if (item.items) {
      return {
        ...item,
        items: isGrouped(item.items)
          ? item.items.map((group) => menuWithActions(group, onAction))
          : menuWithActions(item.items, onAction)
      };
    }
    return {
      ...item,
      command: (event) => {
        item.command?.(event);
        onAction(`${item.label ?? 'Action'} selected`);
      }
    };
  });
}
