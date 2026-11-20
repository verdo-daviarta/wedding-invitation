import styles from '../../styles/invitation.module.css';
import { RsvpForm } from './rsvp-form';

export type RsvpGuest = {
  code: string;
  name: string;
  available: boolean;
};

export function RsvpSection({ guest }: { guest?: RsvpGuest }) {
  return (
    <section
      aria-label="Konfirmasi Kehadiran"
      id="rsvp"
      tabIndex={-1}
      className={`${styles.section} ${styles.rsvpSection}`}
    >
      <div className={styles.rsvpHeader}>
        <h2 className={styles.rsvpTitle}>Konfirmasi Kehadiran</h2>
      </div>
      {guest ? (
        <RsvpForm key={guest.code} guest={guest} />
      ) : (
        <p className={styles.rsvpDescription}>
          Buka link undangan pribadi Anda untuk mengisi konfirmasi kehadiran.
        </p>
      )}
    </section>
  );
}
