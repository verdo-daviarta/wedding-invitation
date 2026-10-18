import styles from '../../styles/invitation.module.css';
import { galleryColumns } from '../../data/gallery';

export function MomentsSection() {
  return (
    <section
      aria-label="Our Moment"
      id="moments"
      tabIndex={-1}
      className={`${styles.section} ${styles.gallerySection}`}
    >
      <div className={styles.galleryHeader}>
        <h2 className={`${styles.showcaseTitle} ${styles.momentTitle}`}>
          Our Moment
        </h2>
        <p className={styles.momentQuote}>
          “I was created in time to fill your time, and I use all the time in my
          life to love you.”
        </p>
      </div>
      <div className={styles.gallery}>
        {galleryColumns.map((column, columnIndex) => (
          <div className={styles.galleryColumn} key={columnIndex}>
            {column.map((photo) => (
              <figure className={styles.galleryItem} key={photo.file}>
                <img
                  src={`/images/prewed/${photo.file}-720.webp`}
                  srcSet={`/images/prewed/${photo.file}-360.webp 360w, /images/prewed/${photo.file}-720.webp 720w`}
                  sizes="(max-width: 30rem) calc(50vw - 1.3125rem), 14rem"
                  width={photo.width}
                  height={photo.height}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
