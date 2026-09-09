'use client';

import { ChevronDown } from 'lucide-react';

export function ScrollCueButton({ className }: Readonly<{ className: string }>) {
  function scrollToIntroduction() {
    document.getElementById('introduction')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
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
