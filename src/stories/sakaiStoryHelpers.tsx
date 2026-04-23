import { useEffect, useRef, type ComponentType } from 'react';

export type SakaiDemoComponent = ComponentType<Record<string, unknown>>;

type SakaiSectionDemoProps = {
  Component: SakaiDemoComponent;
  section: string;
};

function normalizeText(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function getSectionContainer(heading: HTMLHeadingElement) {
  return heading.closest<HTMLElement>('.card, .p-card') ?? heading.parentElement;
}

function getDirectChild(container: HTMLElement, child: HTMLElement) {
  let current: HTMLElement = child;
  while (current.parentElement && current.parentElement !== container) {
    current = current.parentElement;
  }

  return current.parentElement === container ? current : child;
}

function hideElement(element: Element) {
  element.classList.add('sakai-section-hidden');
}

function showElement(element: Element) {
  element.classList.remove('sakai-section-hidden');
}

export function SakaiSectionDemo({ Component, section }: SakaiSectionDemoProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const headings = Array.from(root.querySelectorAll<HTMLHeadingElement>('h5'));
    const containers = headings
      .map((heading) => getSectionContainer(heading))
      .filter((container): container is HTMLElement => Boolean(container));
    const touchedElements = new Set<Element>(containers);

    containers.forEach((container) => {
      hideElement(container);
    });

    headings.forEach((heading) => {
      if (normalizeText(heading.textContent ?? '') === section) {
        const container = getSectionContainer(heading);
        if (!container) return;

        showElement(container);

        const headingsInContainer = Array.from(container.querySelectorAll('h5'));
        if (headingsInContainer.length <= 1) return;

        const children = Array.from(container.children);
        children.forEach((child) => {
          touchedElements.add(child);
          hideElement(child);
        });

        const sectionStart = getDirectChild(container, heading);
        let shouldShow = false;

        children.forEach((child) => {
          if (child === sectionStart) shouldShow = true;
          else if (shouldShow && child.querySelector('h5')) shouldShow = false;

          if (shouldShow) showElement(child);
        });
      }
    });

    return () => {
      touchedElements.forEach((element) => {
        showElement(element);
      });
    };
  }, [section]);

  return (
    <main className="sakai-component-canvas">
      <div ref={ref}>
        <Component />
      </div>
    </main>
  );
}

export function extractSectionSource(source: string, section: string) {
  const headingMatch = new RegExp(`<h5[^>]*>\\s*${section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*<\\/h5>`).exec(source);
  const headingIndex = headingMatch?.index ?? -1;
  if (headingIndex === -1) return source;

  const cardStart = source.lastIndexOf('<div className="card"', headingIndex);
  const gridStart = source.lastIndexOf('<div className="col-', headingIndex);
  const start = Math.max(cardStart, gridStart);
  if (start === -1) return source.slice(Math.max(0, headingIndex - 400), headingIndex + 1200);

  const nextHeadingIndex = source.indexOf('<h5', headingIndex + 1);
  if (nextHeadingIndex !== -1) {
    const nextCardStart = source.lastIndexOf('<div className="card"', nextHeadingIndex);
    if (nextCardStart === cardStart) {
      return source.slice(headingIndex, nextHeadingIndex).trim();
    }
  }

  let depth = 0;
  const tagPattern = /<\/?div\b[^>]*>/g;
  tagPattern.lastIndex = start;

  for (const match of source.matchAll(tagPattern)) {
    const [tag] = match;
    if (tag.startsWith('</')) depth -= 1;
    else depth += 1;

    if (depth === 0 && match.index > start) {
      return source.slice(start, match.index + tag.length);
    }
  }

  return source.slice(start, headingIndex + 1600);
}

export function sourceParameters(source: string, section: string, components: string) {
  return {
    docs: {
      description: {
        story: `Example "${section}". Covered components: ${components}. Use Show code below the preview to inspect the original Sakai usage pattern.`
      },
      source: {
        code: extractSectionSource(source, section),
        language: 'tsx',
        type: 'code'
      }
    }
  };
}
