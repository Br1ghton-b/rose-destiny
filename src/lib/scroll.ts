import { useEffect, useState, type MouseEvent } from 'react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // scroll-margin-top matches the compact header. If the header is still tall, it
  // shrinks once we scroll and pulls the page up, so aim that much higher.
  const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const header = document.querySelector('header');
  const shrink = header ? Math.max(0, header.offsetHeight - margin) : 0;
  const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - margin - shrink;
  window.scrollTo({ top: Math.max(0, top), behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
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
