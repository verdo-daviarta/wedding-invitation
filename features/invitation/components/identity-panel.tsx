import styles from '../styles/invitation.module.css';
import { CoupleLockup } from './couple-lockup';

export function IdentityPanel() {
  return (
    <aside className={styles.identityPanel} aria-label="Identitas pernikahan">
      <div className={styles.identityCopy}>
        <p className={styles.eyebrow}>The Wedding of</p>
        <CoupleLockup compact />
        <p className={styles.verse}>
          Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
          pasangan hidup dari jenismu sendiri supaya kamu mendapat ketenangan
          hati dan dijadikan-Nya kasih sayang di antara kamu.
        </p>
      </div>
    </aside>
  );
}
