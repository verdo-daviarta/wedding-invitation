import styles from '../../styles/invitation.module.css';

export function IntroductionSection() {
  return (
    <section
      className={`${styles.section} ${styles.introduction}`}
      id="introduction"
      tabIndex={-1}
    >
      <p className={styles.quote}>
        “So they are no longer two, but one flesh.     
        <br />
        therefore what God has joined together, let no one separate.”
        <br />
        Matthew 19:6
      </p>
    </section>
  );
}
