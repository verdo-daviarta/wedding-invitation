'use client';

import { useState } from 'react';
import { galleryPhotos } from '../../data/gallery';
import styles from '../../styles/invitation.module.css';
import { MomentLightbox } from './moment-lightbox';

// Pair photos into justified rows without changing their saved order.
const galleryRows = Array.from(
  { length: Math.ceil(galleryPhotos.length / 2) },
  (_, index) => galleryPhotos.slice(index * 2, index * 2 + 2),
);

export function MomentGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className={styles.gallery}>
        {galleryRows.map((row, rowIndex) => (
          <div className={styles.galleryRow} key={row[0].file}>
            {row.map((photo, columnIndex) => (
              <figure
                className={styles.galleryItem}
                key={photo.file}
                style={{
                  flexGrow: row.length === 1 ? 1 : photo.width / photo.height,
                  aspectRatio: `${photo.width} / ${photo.height}`,
                }}
              >
                <button
                  className={styles.galleryPhotoButton}
                  type="button"
                  aria-label={`Perbesar foto: ${photo.alt}`}
                  aria-haspopup="dialog"
                  onClick={() => setSelectedIndex(rowIndex * 2 + columnIndex)}
                >
                  {/* WebP variants are pre-generated; sizes accounts for crop zoom. */}
                  {/* oxlint-disable-next-line nextjs/no-img-element */}
                  <img
                    src={`/images/prewed/${photo.file}-720.webp`}
                    srcSet={`/images/prewed/${photo.file}-360.webp 360w, /images/prewed/${photo.file}-720.webp 720w`}
                    sizes={`(max-width: 30rem) calc(${100 * photo.focus.zoom}vw - ${2 * photo.focus.zoom}rem), ${28 * photo.focus.zoom}rem`}
                    width={photo.width}
                    height={photo.height}
                    alt={photo.alt}
                    style={{
                      transform: `scale(${photo.focus.zoom})`,
                      transformOrigin: `${photo.focus.x}% ${photo.focus.y}%`,
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              </figure>
            ))}
          </div>
        ))}
      </div>
      {selectedIndex !== null && (
        <MomentLightbox
          initialIndex={selectedIndex}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}
