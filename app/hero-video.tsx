'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (preference.matches) video.current?.pause();
      else video.current?.play().catch(() => {});
    };
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  return <>
    <video ref={video} className="hero-video" muted loop playsInline preload="auto" aria-hidden="true" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}>
      <source src="/hero-background.mp4" type="video/mp4" />
    </video>
    <div className="hero-overlay" aria-hidden="true" />
    <button className="video-toggle" type="button" aria-label={playing ? 'Pause background video' : 'Play background video'} onClick={() => {
      if (playing) video.current?.pause();
      else video.current?.play().catch(() => {});
    }}>{playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}</button>
  </>;
}
