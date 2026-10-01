import styles from '../../styles/invitation.module.css';
import { story } from '../../data/wedding';
import { RevealSection } from '../../components/reveal-section';

export function JourneySection() {
  return (
    <RevealSection
      id="journey"
      ariaLabelledBy="journey-title"
      className={`${styles.section} ${styles.storySection}`}
    >
      <header className={styles.storyHeader}>
        <h2 data-scroll-reveal id="journey-title">
          Journey of Love
        </h2>
        <p className={styles.storyIntroduction} data-scroll-reveal>
          Tiga bab sederhana yang membawa kami menuju <br />
          satu perjalanan seumur hidup.
        </p>
      </header>

      <div className={styles.storyList}>
        {story.map((item) => (
          <article
            className={styles.storyItem}
            data-scroll-reveal
            key={item.title}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </RevealSection>
  );
}
