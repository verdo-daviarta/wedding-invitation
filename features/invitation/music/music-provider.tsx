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
  isMuted: boolean;
  isLoading: boolean;
  error: string;
  startMusic: () => Promise<void>;
  toggleMute: () => Promise<void>;
  syncVideoToMusic: (video: HTMLVideoElement) => void;
};

const MusicContext = createContext<MusicControls | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequest = useRef(0);
  const shouldAutoStart = useRef(true);
  const mutedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const playMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const request = ++playRequest.current;
    setError('');
    setIsLoading(true);
    if (audio.getAttribute('src') !== music.src) {
      audio.src = music.src;
    }
    audio.muted = mutedRef.current;
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
          event.target.closest('[data-music-control], [data-open-invitation]'))
      ) {
        return;
      }
      const isInvitationPage =
        window.location.pathname.replace(/\/$/, '') === '/undangan';
      if (!isInvitationPage) return;
      // Direct visits can retry after an autoplay denial using any click input.
      void playMusic();
    };

    document.addEventListener('click', retryAutoplay);
    document.addEventListener('keydown', retryAutoplay);
    if (window.location.pathname.replace(/\/$/, '') === '/undangan') {
      void playMusic();
    }

    return () => {
      document.removeEventListener('click', retryAutoplay);
      document.removeEventListener('keydown', retryAutoplay);
      playRequest.current += 1;
      audio?.pause();
    };
  }, [playMusic]);

  const syncVideoToMusic = useCallback((video: HTMLVideoElement) => {
    const audio = audioRef.current;
    if (
      !audio ||
      audio.paused ||
      audio.readyState < 2 ||
      video.readyState < 2 ||
      video.seeking ||
      !Number.isFinite(video.duration) ||
      video.duration <= 0
    ) {
      return;
    }

    const targetTime = audio.currentTime % video.duration;
    const difference = Math.abs(video.currentTime - targetTime);
    // Compare circular positions so a normal loop boundary does not cause a seek.
    const drift = Math.min(difference, video.duration - difference);
    const seekable = video.seekable;
    const canSeek = Array.from(
      { length: seekable.length },
      (_, index) =>
        targetTime >= seekable.start(index) &&
        targetTime <= seekable.end(index),
    ).some(Boolean);
    if (drift > 0.2 && canSeek) video.currentTime = targetTime;
    if (video.playbackRate !== audio.playbackRate) {
      video.playbackRate = audio.playbackRate;
    }
  }, []);

  const toggleMute = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    shouldAutoStart.current = false;
    // A first interaction can unlock audio when the browser blocked autoplay.
    if (audio.paused && !isLoading) {
      mutedRef.current = false;
      audio.muted = false;
      setIsMuted(false);
      await playMusic();
      return;
    }

    // Muting never pauses or seeks either track; their clocks keep advancing.
    mutedRef.current = !mutedRef.current;
    audio.muted = mutedRef.current;
    setIsMuted(mutedRef.current);
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        isLoading,
        error,
        startMusic: playMusic,
        toggleMute,
        syncVideoToMusic,
      }}
    >
      {children}
      {/* Decorative background audio is controlled by the music button. */}
      {/* oxlint-disable-next-line jsx-a11y/media-has-caption */}
      <audio
        ref={audioRef}
        preload="none"
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
