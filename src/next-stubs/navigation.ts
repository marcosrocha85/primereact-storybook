export function useRouter() {
  return {
    back: () => undefined,
    forward: () => undefined,
    prefetch: (_href?: string) => undefined,
    push: (_href?: string) => undefined,
    refresh: () => undefined,
    replace: (_href?: string) => undefined
  };
}

export function usePathname() {
  return '/storybook';
}

export function useSearchParams() {
  return new URLSearchParams();
}
