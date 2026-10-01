import styles from '../../styles/invitation.module.css';
import { invitation } from '../../data/wedding';
import { CoupleLockup } from '../../components/couple-lockup';
import { ScrollCueButton } from '../../components/scroll-cue-button';

export function OpeningSection() {
  return (
    <section
      id="opening"
      tabIndex={-1}
      className={`${styles.section} ${styles.opening}`}
      aria-labelledby="opening-title"
    >
      <h1 className="sr-only">
        The Wedding of {invitation.groom} &amp; {invitation.bride}
      </h1>
      <div className={styles.dateRow}>
        <span>{invitation.date}</span>
        <span>{invitation.year}</span>
      </div>
      <p className={styles.eyebrow} id="opening-title">
        The Wedding of
      </p>
      <CoupleLockup />
      <ScrollCueButton className={styles.scrollCue} />
    </section>
  );
}
