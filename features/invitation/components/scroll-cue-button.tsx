'use client';

import { ChevronDown } from 'lucide-react';
import { scrollToSection } from '../lib/scroll-to-section';

export function ScrollCueButton({
  className,
}: Readonly<{ className: string }>) {
  function scrollToIntroduction() {
    scrollToSection('introduction');
  }

  return (
    <button
      className={className}
      type="button"
      aria-label="Lanjut ke bagian pengantar"
      onClick={scrollToIntroduction}
    >
      <ChevronDown aria-hidden="true" size={24} />
    </button>
  );
}
