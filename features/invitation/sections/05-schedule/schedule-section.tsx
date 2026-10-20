import styles from '../../styles/invitation.module.css';
import { events, googleCalendarUrl, invitation } from '../../data/wedding';
import { RevealSection } from '../../components/reveal-section';
import { Countdown } from './countdown';
import { EventDetails } from './event-details';

export function ScheduleSection() {
  return (
    <RevealSection
      id="schedule"
      ariaLabelledBy="save-the-date-title"
      className={`${styles.section} ${styles.scheduleSection}`}
    >
      <div className={styles.saveDateContent} data-scroll-reveal>
        {/* Optimized static photo; CSS frames the couple inside the circle. */}
        {/* oxlint-disable-next-line nextjs/no-img-element */}
        <img
          width={900}
          height={678}
          loading="lazy"
          decoding="async"
          className={styles.saveDateImage}
          src="/images/save-the-date/couple.webp"
          alt="Verdo dan Intan bergandengan tangan di bawah pepohonan"
        />
        <h2 className={styles.saveDateTitle} id="save-the-date-title">
          Save The Date
        </h2>
        <p className={styles.saveDateDate}>{invitation.dateEnglish}</p>
        <Countdown />
        <a
          className={`${styles.button} ${styles.saveDateButton}`}
          href={googleCalendarUrl}
          rel="noreferrer"
          target="_blank"
        >
          Simpan Tanggal
        </a>
      </div>

      <div className={styles.eventList}>
        {events.map((event) => (
          <EventDetails key={event.title} {...event} />
        ))}
      </div>

      <div className={styles.dresscodeBlock} data-scroll-reveal>
        <p className={styles.dresscodeText}>
          Kami dengan hormat menganjurkan para tamu kami untuk mengenakan
          warna-warna ini untuk hari istimewa kami.
        </p>
        <div className={styles.swatches}>
          <p className="sr-only">
            Warna dresscode: hitam, hijau tua, dan hijau muda.
          </p>
          <span className={styles.swatchBlack} />
          <span className={styles.swatchGreen} />
          <span className={styles.swatchLightGreen} />
        </div>
      </div>
    </RevealSection>
  );
}
