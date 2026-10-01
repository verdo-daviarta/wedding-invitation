import styles from '../../styles/invitation.module.css';

export function IntroductionSection() {
  return (
    <section
      className={`${styles.section} ${styles.introduction}`}
      id="introduction"
      tabIndex={-1}
    >
      <p className={styles.quote}>
        “Ini enaknya di isi pake
        <br />
        Quotes apa yang
        <br />
        sekiranya bagus gitu..”
      </p>
    </section>
  );
}
