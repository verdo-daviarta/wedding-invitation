/** Keep keyboard focus aligned with the destination and respect reduced motion. */
export function scrollToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return false;
  section.focus({ preventScroll: true });
  section.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
    block: 'start',
  });
  return true;
}
