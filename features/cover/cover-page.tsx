import { invitation as wedding } from '../invitation/data/wedding';
import styles from './cover.module.css';
import { ArrowRight } from 'lucide-react';

function CoupleNames() {
  return (
    <h1
      className={styles['couple-names']}
      id="hero-title"
      aria-label={`${wedding.groom} & ${wedding.bride}`}
    >
      <span className={styles['groom-name']}>{wedding.groom}</span>
      <span className={styles['ampersand']} aria-hidden="true">
        &amp;
      </span>
      <span className={styles['bride-name']}>{wedding.bride}</span>
    </h1>
  );
}

function GuestGreeting() {
  return (
    <div className={styles['guest-greeting']}>
      <p className={styles['salutation']}>Yth. Bapak/Ibu/Saudara/i</p>
      <p className={styles['guest-name']}>Tamu Undangan</p>
      <p className={styles['invitation-message']}>
        Tanpa mengurangi rasa hormat,
        <br />
        kami mengundang anda untuk menghadiri acara pernikahan kami.
      </p>
    </div>
  );
}

export function CoverPage() {
  return (
    <main className={styles['invitation']}>
      <section className={styles['hero']} aria-labelledby="hero-title">
        <div className={styles['hero-heading']}>
          <div
            className={styles['date-row']}
            aria-label={`Tanggal ${wedding.date}/${wedding.year}`}
          >
            <time dateTime={wedding.dateISO}>{wedding.date}</time>
            <span>{wedding.year}</span>
          </div>
          <p className={styles['event-time']}>{wedding.time}</p>
          <p className={styles['eyebrow']}>The Wedding of</p>
          <CoupleNames />
        </div>

        <div className={styles['hero-footer']}>
          <GuestGreeting />
          {/* Full document navigation also works without JavaScript on static hosting. */}
          {/* oxlint-disable-next-line nextjs/no-html-link-for-pages */}
          <a className={styles['open-invitation']} href="/undangan">
            Buka Undangan
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
