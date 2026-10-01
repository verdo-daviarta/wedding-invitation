'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

export function RevealSection({
  id,
  ariaLabelledBy,
  children,
  className,
}: Readonly<{
  id: string;
  ariaLabelledBy: string;
  children: ReactNode;
  className: string;
}>) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const targets = section.querySelectorAll<HTMLElement>(
      '[data-scroll-reveal]',
    );
    const motionPreference = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    );
    let observer: IntersectionObserver | undefined;
    const configureObserver = () => {
      observer?.disconnect();
      if (motionPreference.matches || !('IntersectionObserver' in window)) {
        targets.forEach((target) =>
          target.setAttribute('data-reveal-state', 'visible'),
        );
        return;
      }
      targets.forEach((target) =>
        target.setAttribute('data-reveal-state', 'ready'),
      );
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
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
          // Any intersection also works for content taller than the viewport.
          threshold: 0,
        },
      );

      targets.forEach((target) => observer?.observe(target));
    };
    const revealFocusedContent = (event: FocusEvent) => {
      (event.target as HTMLElement)
        .closest('[data-scroll-reveal]')
        ?.setAttribute('data-reveal-state', 'visible');
    };
    configureObserver();
    motionPreference.addEventListener('change', configureObserver);
    section.addEventListener('focusin', revealFocusedContent);
    return () => {
      observer?.disconnect();
      motionPreference.removeEventListener('change', configureObserver);
      section.removeEventListener('focusin', revealFocusedContent);
    };
  }, []);

  return (
    <section
      id={id}
      tabIndex={-1}
      aria-labelledby={ariaLabelledBy}
      className={className}
      ref={sectionRef}
    >
      {children}
    </section>
  );
}
