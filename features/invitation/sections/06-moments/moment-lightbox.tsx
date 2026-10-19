'use client';

import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { ChevronLeft, ChevronRight, LoaderCircle, X } from 'lucide-react';
import { galleryPhotos, type GalleryPhoto } from '../../data/gallery';
import styles from './moment-lightbox.module.css';

function LightboxPhoto({ photo }: Readonly<{ photo: GalleryPhoto }>) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    'loading',
  );
  const [useFallback, setUseFallback] = useState(false);

  return (
    <>
      {/* Pre-generated responsive images keep the full frame in the lightbox. */}
      {/* oxlint-disable-next-line nextjs/no-img-element */}
      <img
        className={styles.photo}
        data-loaded={status === 'ready'}
        src={`/images/prewed/${photo.file}-${useFallback ? '720' : 'large'}.webp`}
        srcSet={
          useFallback
            ? undefined
            : `/images/prewed/${photo.file}-720.webp 720w, /images/prewed/${photo.file}-large.webp ${photo.large.width}w`
        }
        sizes="90vw"
        width={photo.large.width}
        height={photo.large.height}
        alt={photo.alt}
        decoding="async"
        draggable={false}
        onLoad={() => setStatus('ready')}
        onError={() => {
          if (useFallback) setStatus('error');
          else setUseFallback(true);
        }}
      />
      {status === 'loading' && (
        <span className={styles.loading} role="status">
          <LoaderCircle aria-hidden="true" size={24} />
          <span className={styles.srOnly}>Memuat foto...</span>
        </span>
      )}
      {status === 'error' && (
        <p className={styles.error} role="status">
          Foto belum dapat dimuat. Silakan pilih foto lainnya.
        </p>
      )}
    </>
  );
}

export function MomentLightbox({
  initialIndex,
  onClose,
}: Readonly<{ initialIndex: number; onClose: () => void }>) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const lastSwipeAt = useRef(-Infinity);
  const photo = galleryPhotos[currentIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    triggerRef.current ??= document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const body = document.body;
    const previous = {
      rootOverflow: root.style.overflow,
      bodyOverflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight) + scrollbarWidth}px`;
    }
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    // Native modal dialogs contain keyboard focus and make the background inert.
    if (!dialog.open) dialog.showModal();

    return () => {
      root.style.overflow = previous.rootOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.paddingRight;
      if (!dialog.open && triggerRef.current?.isConnected) {
        triggerRef.current.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    if (!isClosing) return;
    const duration = window.matchMedia('(prefers-reduced-motion: reduce)')
      .matches
      ? 0
      : 200;
    const timer = window.setTimeout(() => dialogRef.current?.close(), duration);
    return () => window.clearTimeout(timer);
  }, [isClosing]);

  const requestClose = () => setIsClosing(true);
  const showPhoto = (direction: number) => {
    if (isClosing) return;
    setCurrentIndex(
      (index) =>
        (index + direction + galleryPhotos.length) % galleryPhotos.length,
    );
  };

  const finishSwipe = (event: PointerEvent<HTMLElement>) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start || event.pointerId !== start.id) return;
    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    if (Math.abs(deltaX) >= 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      lastSwipeAt.current = performance.now();
      showPhoto(deltaX < 0 ? 1 : -1);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      data-closing={isClosing}
      aria-labelledby="moment-lightbox-title"
      aria-describedby="moment-lightbox-help"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
      onClick={(event) => {
        if (
          event.target === event.currentTarget &&
          performance.now() - lastSwipeAt.current > 400
        )
          requestClose();
      }}
      onPointerUp={finishSwipe}
      onPointerCancel={() => {
        touchStart.current = null;
      }}
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          const buttons =
            event.currentTarget.querySelectorAll<HTMLButtonElement>('button');
          const first = buttons[0];
          const last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
          return;
        }
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
          event.preventDefault();
          showPhoto(event.key === 'ArrowLeft' ? -1 : 1);
        }
      }}
    >
      <h2 id="moment-lightbox-title" className={styles.srOnly}>
        Our Moment
      </h2>
      <p id="moment-lightbox-help" className={styles.srOnly}>
        Gunakan tombol panah atau geser foto untuk melihat foto lainnya. Tekan
        Escape untuk menutup.
      </p>
      <div className={styles.toolbar}>
        <p className={styles.counter} aria-live="polite" aria-atomic="true">
          <span className={styles.srOnly}>Foto </span>
          {currentIndex + 1}
          <span aria-hidden="true"> / </span>
          <span className={styles.srOnly}> dari </span>
          {galleryPhotos.length}
        </p>
        <button
          className={styles.control}
          type="button"
          aria-label="Tutup foto"
          onClick={requestClose}
        >
          <X aria-hidden="true" size={21} />
        </button>
      </div>
      <div
        className={styles.stage}
        onClick={(event) => {
          if (
            event.target === event.currentTarget &&
            performance.now() - lastSwipeAt.current > 400
          )
            requestClose();
        }}
        onPointerDown={(event) => {
          touchStart.current =
            event.pointerType === 'touch' && event.isPrimary
              ? { x: event.clientX, y: event.clientY, id: event.pointerId }
              : null;
        }}
      >
        <LightboxPhoto photo={photo} key={photo.file} />
      </div>
      <button
        className={`${styles.control} ${styles.previous}`}
        type="button"
        aria-label="Foto sebelumnya"
        onClick={() => showPhoto(-1)}
      >
        <ChevronLeft aria-hidden="true" size={24} />
      </button>
      <button
        className={`${styles.control} ${styles.next}`}
        type="button"
        aria-label="Foto berikutnya"
        onClick={() => showPhoto(1)}
      >
        <ChevronRight aria-hidden="true" size={24} />
      </button>
    </dialog>
  );
}
