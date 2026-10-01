import styles from '../styles/invitation.module.css';
import { invitation } from '../data/wedding';

export function CoupleLockup({
  compact = false,
}: Readonly<{ compact?: boolean }>) {
  return (
    <div
      className={`${styles.coupleLockup} ${compact ? styles.compactLockup : ''}`}
    >
      <span>{invitation.groom}</span>
      <span className={styles.ampersand}>&amp;</span>
      <span>{invitation.bride}</span>
    </div>
  );
}
