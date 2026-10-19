'use client';

import { useEffect, useRef, useState } from 'react';
import { galleryColumns } from '../../data/gallery';
import styles from '../../styles/invitation.module.css';

// Preserve the mixed left/right sequence when rendering the expandable grid.
const galleryPhotos = Array.from(
  { length: Math.max(...galleryColumns.map((column) => column.length)) },
  (_, row) =>
    galleryColumns.flatMap((column) => (column[row] ? [column[row]] : [])),
).flat();

export function MomentGallery() {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const expandedButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedFile) {
      expandedButtonRef.current?.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedFile]);

  return (
    <div className={styles.gallery}>
      {galleryPhotos.map((photo) => {
        const isExpanded = selectedFile === photo.file;
        return (
          <figure
            className={styles.galleryItem}
            data-expanded={isExpanded}
            key={photo.file}
          >
            <button
              className={styles.galleryPhotoButton}
              type="button"
              ref={isExpanded ? expandedButtonRef : undefined}
              aria-label={`${isExpanded ? 'Kecilkan' : 'Perbesar'} foto: ${photo.alt}`}
              aria-pressed={isExpanded}
              onClick={() => {
                setSelectedFile((current) =>
                  current === photo.file ? null : photo.file,
                );
              }}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setSelectedFile(null);
              }}
            >
              {/* WebP variants are pre-generated; sizes accounts for crop zoom. */}
              {/* oxlint-disable-next-line nextjs/no-img-element */}
              <img
                src={`/images/prewed/${photo.file}-720.webp`}
                srcSet={`/images/prewed/${photo.file}-360.webp 360w, /images/prewed/${photo.file}-720.webp 720w`}
                sizes={
                  isExpanded
                    ? '(max-width: 30rem) calc(100vw - 2rem), 28rem'
                    : `(max-width: 30rem) calc(${50 * photo.focus.zoom}vw - ${1.3125 * photo.focus.zoom}rem), ${14 * photo.focus.zoom}rem`
                }
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                style={{
                  transform: isExpanded ? 'none' : `scale(${photo.focus.zoom})`,
                  transformOrigin: `${photo.focus.x}% ${photo.focus.y}%`,
                }}
                loading="lazy"
                decoding="async"
              />
            </button>
          </figure>
        );
      })}
    </div>
  );
}
