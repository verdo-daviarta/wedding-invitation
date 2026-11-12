'use client';

import { useEffect, useRef, useState } from 'react';
import { useMusic } from '../music/music-provider';
import { loadVideoSource } from '../lib/load-video-source';
import styles from './invitation-background.module.css';

type DataSavingNavigator = Navigator & {
  connection?: EventTarget & { saveData?: boolean };
};

/** One decorative video for the invitation column, independent of its sections. */
export function InvitationBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayed, setHasPlayed] = useState(false);
  const { syncVideoToMusic } = useMusic();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as DataSavingNavigator).connection;
    let idleId: number | undefined;
    let timerId: number | undefined;
    let pendingLoad: AbortController | undefined;
    let releaseSource: (() => void) | undefined;
    let disposed = false;

    const cancelStart = () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
      idleId = undefined;
      timerId = undefined;
    };

    const canPlay = () =>
      !document.hidden && !reducedMotion.matches && !connection?.saveData;

    const startPlayback = async () => {
      idleId = undefined;
      timerId = undefined;
      if (!canPlay() || pendingLoad) return;

      if (!video.hasAttribute('src')) {
        // Select once to avoid downloading another rendition on rotation/resize.
        const resolution = window.matchMedia('(max-width: 36rem)').matches
          ? 480
          : 720;
        const controller = new AbortController();
        pendingLoad = controller;
        try {
          const source = await loadVideoSource(
            `/videos/invitation-prewed3-${resolution}.mp4`,
            controller.signal,
          );
          if (disposed || controller.signal.aborted || !canPlay()) {
            source.release();
            return;
          }
          releaseSource = source.release;
          video.src = source.src;
          video.load();
        } catch {
          if (!disposed && !controller.signal.aborted) setHasPlayed(false);
          return;
        } finally {
          if (pendingLoad === controller) pendingLoad = undefined;
        }
      }

      if (disposed || !canPlay()) return;
      video.muted = true;
      // Autoplay can be blocked by the device; the poster remains visible.
      void video.play().catch(() => {});
    };

    const syncPlayback = () => {
      if (!canPlay()) {
        cancelStart();
        pendingLoad?.abort();
        pendingLoad = undefined;
        video.pause();
        if (reducedMotion.matches || connection?.saveData) {
          video.removeAttribute('src');
          video.load();
          releaseSource?.();
          releaseSource = undefined;
          setHasPlayed(false);
        }
        return;
      }

      if (video.hasAttribute('src')) {
        void startPlayback();
      } else if (idleId === undefined && timerId === undefined) {
        // Let the page render before starting the background request.
        if (typeof window.requestIdleCallback === 'function') {
          idleId = window.requestIdleCallback(startPlayback, { timeout: 1800 });
        } else {
          timerId = window.setTimeout(startPlayback, 600);
        }
      }
    };

    reducedMotion.addEventListener('change', syncPlayback);
    connection?.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);
    syncPlayback();

    return () => {
      disposed = true;
      cancelStart();
      pendingLoad?.abort();
      reducedMotion.removeEventListener('change', syncPlayback);
      connection?.removeEventListener('change', syncPlayback);
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
      video.removeAttribute('src');
      video.load();
      releaseSource?.();
    };
  }, []);

  return (
    <div
      className={styles.background}
      aria-hidden="true"
      data-invitation-background
    >
      <video
        ref={videoRef}
        className={styles.video}
        data-playing={hasPlayed}
        poster="/images/backgrounds/invitation-prewed3-poster.webp"
        preload="none"
        autoPlay
        loop
        muted
        playsInline
        tabIndex={-1}
        onPlaying={(event) => {
          syncVideoToMusic(event.currentTarget);
          setHasPlayed(true);
        }}
        onTimeUpdate={(event) => syncVideoToMusic(event.currentTarget)}
        onSeeked={(event) => syncVideoToMusic(event.currentTarget)}
        onError={() => setHasPlayed(false)}
      />
    </div>
  );
}
