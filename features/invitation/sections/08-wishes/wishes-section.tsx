import styles from '../../styles/invitation.module.css';
import { WishesForm } from './wishes-form';

export function WishesSection() {
  return (
    <section
      aria-label="Wishes"
      id="wishes"
      tabIndex={-1}
      className={`${styles.section} ${styles.wishesSection}`}
    >
      <div className={styles.wishesHeader}>
        <h2 className={styles.wishesTitle}>Wishes</h2>
        <p className={styles.wishesDescription}>
          Terima kasih telah memberikan ucapan selamat, saran pernikahan
          terbaik, hal-hal lucu, atau apa pun itu semuanya istimewa bagi kami!
        </p>
      </div>
      <WishesForm />
    </section>
  );
}
