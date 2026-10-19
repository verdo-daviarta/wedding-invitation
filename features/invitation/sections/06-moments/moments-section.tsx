import styles from '../../styles/invitation.module.css';
import { MomentGallery } from './moment-gallery';

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
      <MomentGallery />
    </section>
  );
}
