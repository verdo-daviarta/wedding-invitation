import styles from '../../styles/invitation.module.css';

export function IntroductionSection() {
  return (
    <section
      className={`${styles.section} ${styles.introduction}`}
      id="introduction"
      tabIndex={-1}
    >
      <p className={styles.quote}>
        “Demikianlah mereka bukan lagi dua,        
        <br />
        melainkan satu.
        <br />
        Karena itu, apa yang dipersatukan Allah, 
        <br />
        tidak boleh diceraikan manusia.”
      </p>
    </section>
  );
}
