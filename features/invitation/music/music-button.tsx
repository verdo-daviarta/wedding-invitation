'use client';

import { LoaderCircle, Volume2, VolumeX } from 'lucide-react';
import styles from './music-button.module.css';
import { useMusic } from './music-provider';

export function MusicButton() {
  const { isPlaying, isMuted, isLoading, error, toggleMute } = useMusic();
  const soundEnabled = !isMuted && (isPlaying || isLoading);

  const label = soundEnabled ? 'Matikan suara' : 'Aktifkan suara';

  return (
    <div className={styles.player}>
      <button
        data-music-control
        className={styles.musicButton}
        type="button"
        aria-label={label}
        aria-pressed={soundEnabled}
        aria-busy={isLoading}
        title={label}
        onClick={toggleMute}
      >
        {isLoading && !isMuted ? (
          <LoaderCircle
            className={styles.loading}
            size={18}
            aria-hidden="true"
          />
        ) : soundEnabled ? (
          <Volume2 size={18} aria-hidden="true" />
        ) : (
          <VolumeX size={18} aria-hidden="true" />
        )}
      </button>
      <output className={error ? styles.error : undefined}>{error}</output>
    </div>
  );
}
