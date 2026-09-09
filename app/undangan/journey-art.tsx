import styles from './undangan.module.css';

type JourneyStage = 'meeting' | 'relationship' | 'wedding';

export function JourneyIllustration({ stage }: Readonly<{ stage: JourneyStage }>) {
  if (stage === 'meeting') {
    return (
      <svg className={styles.journeyIllustration} viewBox="0 0 140 110" aria-hidden="true">
        <circle cx="35" cy="16" r="10" fill="currentColor" />
        <rect x="26" y="29" width="18" height="49" rx="7" fill="currentColor" />
        <path d="M27 39 18 66M43 39l9 27M31 75v27M40 75v27" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <circle cx="91" cy="18" r="10" fill="currentColor" />
        <path d="m91 29-18 48h36L96 29Z" fill="currentColor" />
        <path d="m82 39-12 29m30-29 12 29M83 75v27m17-27v27" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      </svg>
    );
  }

  if (stage === 'relationship') {
    return (
      <svg className={styles.journeyIllustration} viewBox="0 0 170 125" aria-hidden="true">
        <path d="M132 116c8-40 8-67-1-93" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        <path d="M130 27c-18-17-35-13-47-3 18 0 30 5 47 12M133 28c14-19 31-19 41-13-14 4-25 11-40 22M133 30c-3-18 7-29 18-35 1 13-3 24-14 38M130 30c-19-11-35-5-42 5 16-2 27 2 40 5" fill="currentColor" />
        <circle cx="48" cy="66" r="12" fill="currentColor" />
        <circle cx="78" cy="62" r="12" fill="currentColor" />
        <path d="M26 116c1-27 7-42 22-42s22 15 23 42ZM59 116c1-30 5-46 20-46 17 0 24 17 26 46Z" fill="currentColor" />
        <path d="M56 80c8 8 13 9 22 0" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg className={styles.journeyIllustration} viewBox="0 0 150 150" aria-hidden="true">
      <circle cx="56" cy="27" r="12" fill="currentColor" />
      <circle cx="91" cy="30" r="11" fill="currentColor" />
      <path d="M47 42c-7 12-11 27-9 48l-17 43h26l12-37 8 37h24L76 82l2-35c-10-8-22-10-31-5ZM84 44c10-6 22-3 28 7l18 31-13 7-18-28 3 72H72l7-49-5-26c1-7 4-11 10-14Z" fill="currentColor" />
      <path d="M47 48 20 72M103 49l27-28M125 21l10 8" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function FootstepTrail({ reverse = false }: Readonly<{ reverse?: boolean }>) {
  return (
    <div
      className={`${styles.footstepTrail} ${reverse ? styles.reverseTrail : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
    </div>
  );
}
