'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/invitation.module.css';

type CopyState = 'idle' | 'copied' | 'error';

export function CopyButton({
  value,
  ariaLabel,
  className = '',
}: Readonly<{
  value: string;
  ariaLabel: string;
  className?: string;
}>) {
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  const resetFeedbackLater = () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState('idle'), 1800);
  };

  const copyToClipboard = async () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    try {
      await navigator.clipboard.writeText(value);
      setCopyState('copied');
      resetFeedbackLater();
    } catch {
      setCopyState('error');
    }
  };

  const feedback =
    copyState === 'copied'
      ? 'Tersalin'
      : copyState === 'error'
        ? 'Gagal menyalin'
        : '';

  return (
    <span className={styles.copyControl}>
      <button
        ref={buttonRef}
        aria-label={
          copyState === 'copied' ? `${ariaLabel}, berhasil` : ariaLabel
        }
        className={className}
        data-copy-state={copyState}
        onClick={copyToClipboard}
        title={ariaLabel}
        type="button"
      >
        {copyState === 'copied' ? (
          <Check aria-hidden="true" size={18} />
        ) : (
          <Copy aria-hidden="true" size={18} />
        )}
        {copyState === 'copied' && (
          <span className={styles.copyFeedback} aria-hidden="true">
            {feedback}
          </span>
        )}
      </button>
      <output className="sr-only">{feedback}</output>
      {copyState === 'error' && (
        <span className={styles.copyManual}>
          <label>
            Salin manual — akses clipboard tidak tersedia.
            <input
              aria-label={ariaLabel}
              readOnly
              value={value}
              onFocus={(event) => event.currentTarget.select()}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setCopyState('idle');
              buttonRef.current?.focus();
            }}
          >
            Tutup
          </button>
        </span>
      )}
    </span>
  );
}
