'use client';

import { useEffect, useRef, useState } from 'react';
import styles from '../../styles/invitation.module.css';

type GuestCountSelectProps = Readonly<{
  value: string;
  onChange: (value: string) => void;
}>;

/** A disclosure with native radios keeps the custom styling and arrow-key navigation. */
export function GuestCountSelect({ value, onChange }: GuestCountSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node))
        setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div
      className={styles.selectShell}
      data-open={isOpen}
      ref={containerRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setIsOpen(false);
      }}
    >
      <input name="guestCount" type="hidden" value={value} />
      <button
        aria-controls="guest-count-options"
        aria-expanded={isOpen}
        aria-label={`Jumlah tamu: ${value} Orang`}
        className={styles.guestSelectButton}
        onClick={() => setIsOpen((open) => !open)}
        ref={triggerRef}
        type="button"
      >
        <span>{value} Orang</span>
        <span className={styles.selectChevron} aria-hidden="true" />
      </button>
      <fieldset
        className={styles.guestSelectMenu}
        id="guest-count-options"
        hidden={!isOpen}
      >
        <legend className="sr-only">Jumlah tamu</legend>
        {['1', '2'].map((count) => (
          <label
            className={styles.guestSelectOption}
            data-selected={value === count}
            key={count}
          >
            <input
              type="radio"
              name="guestCountChoice"
              value={count}
              checked={value === count}
              onChange={() => onChange(count)}
            />
            <span>{count} Orang</span>
          </label>
        ))}
        <button
          type="button"
          className={styles.guestSelectDone}
          onClick={() => {
            setIsOpen(false);
            triggerRef.current?.focus();
          }}
        >
          Selesai
        </button>
      </fieldset>
    </div>
  );
}
