import { useEffect, useState, type MouseEvent } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const behavior = prefersReducedMotion() ? 'auto' : 'smooth';
  if (id === 'home') window.scrollTo({ top: 0, behavior });
  else el.scrollIntoView({ behavior, block: 'start' });
  history.replaceState(null, '', id === 'home' ? window.location.pathname : `#${id}`);
}

/** onClick handler for in-page `href="#id"` links: smooth-scrolls instead of jumping. */
export function onAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
  const href = event.currentTarget.getAttribute('href');
  if (!href?.startsWith('#')) return;
  event.preventDefault();
  scrollToSection(href.slice(1));
}

/** Returns the id of the section currently in the middle of the viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
