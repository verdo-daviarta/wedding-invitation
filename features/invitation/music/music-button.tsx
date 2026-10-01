'use client';

import { useEffect, useRef, useState } from 'react';
import { LoaderCircle, Music2, Pause } from 'lucide-react';
import styles from './music-button.module.css';
import { music } from '../data/music';

export function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const playRequest = useRef(0);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      playRequest.current += 1;
      audio?.pause();
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    setError('');

    if (!audio.paused || isLoading) {
      audio.pause();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    audio.muted = false;
    audio.volume = music.volume;
    try {
      // Reload a failed source so the button can retry after a network error.
      if (audio.error) audio.load();
      await audio.play();
    } catch (playError) {
      if (
        request === playRequest.current &&
        !(playError instanceof DOMException && playError.name === 'AbortError')
      ) {
        setError('Musik belum dapat diputar. Silakan coba lagi.');
      }
    } finally {
      if (request === playRequest.current) setIsLoading(false);
    }
  };

  const label = isLoading
    ? 'Batalkan pemuatan musik'
    : isPlaying
      ? 'Jeda musik'
      : 'Putar musik';

  return (
    <div className={styles.player}>
      {/* Instrumental background music contains no speech requiring captions. */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={music.src}
        preload="metadata"
        loop
        onPlaying={() => {
          setIsPlaying(true);
          setIsLoading(false);
          setError('');
        }}
        onPause={() => {
          setIsPlaying(false);
          setIsLoading(false);
        }}
        onError={() => {
          setIsPlaying(false);
          setIsLoading(false);
          setError('Musik belum dapat diputar. Silakan coba lagi.');
        }}
      />
      <button
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
