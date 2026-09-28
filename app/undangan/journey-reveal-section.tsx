'use client';

import { ReactNode, useEffect, useRef } from 'react';

export function JourneyRevealSection({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className: string;
}>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>('[data-journey-reveal]');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((target) => target.setAttribute('data-reveal-state', 'visible'));
      return;
    }

    targets.forEach((target) => target.setAttribute('data-reveal-state', 'ready'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.setAttribute('data-reveal-state', 'visible');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.16,
      },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-labelledby="journey-title"
      className={className}
      ref={sectionRef}
    >
      {children}
    </section>
  );
}
