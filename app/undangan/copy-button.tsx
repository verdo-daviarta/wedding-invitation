'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import styles from './undangan.module.css';

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

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const resetFeedbackLater = () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopyState('idle'), 1800);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }

    resetFeedbackLater();
  };

  const feedback = copyState === 'copied'
    ? 'Tersalin'
    : copyState === 'error'
      ? 'Gagal menyalin'
      : '';

  return (
    <button
      aria-label={copyState === 'copied' ? `${ariaLabel}, berhasil` : ariaLabel}
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
      {feedback && <span className={styles.copyFeedback}>{feedback}</span>}
    </button>
  );
}
