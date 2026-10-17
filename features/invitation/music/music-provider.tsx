'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { music } from '../data/music';

type MusicControls = {
  isPlaying: boolean;
  isLoading: boolean;
  error: string;
  toggleMusic: () => Promise<void>;
};

const MusicContext = createContext<MusicControls | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequest = useRef(0);
  const shouldAutoStart = useRef(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    setError('');
    setIsLoading(true);
    audio.muted = false;
    audio.volume = music.volume;

    try {
      if (audio.error) audio.load();
      await audio.play();
    } catch (playError) {
      // Autoplay denial is expected on a new browser; retry on interaction.
      if (
        request === playRequest.current &&
        !(
          playError instanceof DOMException &&
          (playError.name === 'NotAllowedError' ||
            playError.name === 'AbortError')
        )
      ) {
        setError('Musik belum dapat diputar. Silakan coba lagi.');
      }
    } finally {
      if (request === playRequest.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    shouldAutoStart.current = true;

    const retryAutoplay = (event: Event) => {
      if (
        !shouldAutoStart.current ||
        (event.target instanceof Element &&
          event.target.closest('[data-music-control]'))
      ) {
        return;
      }
      // Call play synchronously within the gesture, before route navigation.
      void playMusic();
    };

    document.addEventListener('pointerup', retryAutoplay);
    document.addEventListener('keydown', retryAutoplay);
    void playMusic();

    return () => {
      document.removeEventListener('pointerup', retryAutoplay);
      document.removeEventListener('keydown', retryAutoplay);
      playRequest.current += 1;
      audio?.pause();
    };
  }, [playMusic]);

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    // An explicit pause must survive subsequent taps and route changes.
    shouldAutoStart.current = false;
    if (!audio.paused || isLoading) {
      playRequest.current += 1;
      audio.pause();
      setIsLoading(false);
      return;
    }
    await playMusic();
  };

  return (
    <MusicContext.Provider value={{ isPlaying, isLoading, error, toggleMusic }}>
      {children}
      {/* Instrumental background music contains no speech requiring captions. */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        src={music.src}
        preload="auto"
        loop
        onPlaying={() => {
          shouldAutoStart.current = false;
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
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const controls = useContext(MusicContext);
  if (!controls) throw new Error('MusicButton requires MusicProvider');
  return controls;
}
