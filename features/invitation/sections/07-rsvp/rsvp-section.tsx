import styles from '../../styles/invitation.module.css';
import { RsvpForm } from './rsvp-form';

export function RsvpSection() {
  return (
    <section
      aria-label="Konfirmasi Kehadiran"
      id="rsvp"
      tabIndex={-1}
      className={`${styles.section} ${styles.rsvpSection}`}
    >
      <div className={styles.rsvpHeader}>
        <h2 className={styles.rsvpTitle}>Konfirmasi Kehadiran</h2>
        <p className={styles.rsvpDescription}>
          Silakan isi formulir singkat ini untuk membantu kami mempersiapkan
          hari bahagia dengan lebih baik.
        </p>
      </div>
      <RsvpForm />
    </section>
  );
}
