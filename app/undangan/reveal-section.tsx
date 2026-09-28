'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export function RevealSection({
  ariaLabelledBy,
  children,
  className,
}: Readonly<{
  ariaLabelledBy: string;
  children: ReactNode;
  className: string;
}>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>('[data-scroll-reveal]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.setAttribute('data-reveal-state', 'visible'));
      return;
    }

    targets.forEach((target) => target.setAttribute('data-reveal-state', 'ready'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.16) {
            entry.target.setAttribute('data-reveal-state', 'visible');
            return;
          }

          if (!entry.isIntersecting) {
            entry.target.setAttribute('data-reveal-state', 'ready');
          }
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: [0, 0.16],
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby={ariaLabelledBy}
      className={className}
      ref={sectionRef}
    >
      {children}
    </section>
  );
}
