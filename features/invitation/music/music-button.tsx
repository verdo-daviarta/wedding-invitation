'use client';

import { LoaderCircle, Music2, Pause } from 'lucide-react';
import styles from './music-button.module.css';
import { useMusic } from './music-provider';

export function MusicButton() {
  const { isPlaying, isLoading, error, toggleMusic } = useMusic();

  const label = isLoading
    ? 'Batalkan pemuatan musik'
    : isPlaying
      ? 'Jeda musik'
      : 'Putar musik';

  return (
    <div className={styles.player}>
      <button
        data-music-control
        className={styles.musicButton}
        type="button"
        aria-label={label}
        aria-pressed={isPlaying}
        aria-busy={isLoading}
        title={label}
        onClick={toggleMusic}
      >
        {isLoading ? (
          <LoaderCircle
            className={styles.loading}
            size={18}
            aria-hidden="true"
          />
        ) : isPlaying ? (
          <Pause size={18} aria-hidden="true" />
        ) : (
          <Music2 size={18} aria-hidden="true" />
        )}
      </button>
      <output className={error ? styles.error : undefined}>{error}</output>
    </div>
  );
}
