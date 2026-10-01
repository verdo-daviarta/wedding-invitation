import { music } from '../../data/music';
import styles from '../../styles/invitation.module.css';
import { invitation } from '../../data/wedding';

export function ThanksSection() {
  return (
    <section
      aria-label="Thank You"
      id="thanks"
      tabIndex={-1}
      className={`${styles.section} ${styles.thanksSection}`}
    >
      <div className={styles.thanksTitleStage}>
        <h2 className={styles.thanksTitle}>Thank You!</h2>
      </div>
      <p className={styles.thanksMessage}>
        Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
        Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.
      </p>
      <p className={styles.thanksCouple}>
        {invitation.groom} <span>&amp;</span> {invitation.bride}
      </p>
      <footer>
        <span>Daviarta copyright 2026</span>
        <small className={styles.musicCredit}>
          Musik:{' '}
          <a href={music.sourceUrl} target="_blank" rel="noopener noreferrer">
            There is Romance — Kevin MacLeod
          </a>
          {' · '}
          <a href={music.licenseUrl} target="_blank" rel="noopener noreferrer">
            {music.license}
          </a>
        </small>
      </footer>
    </section>
  );
}
