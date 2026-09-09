import styles from './undangan.module.css';

type JourneyStage = 'meeting' | 'relationship' | 'wedding';

const artwork = {
  meeting: {
    src: '/journey/awal-bertemu.png',
    className: styles.meetingArtwork,
  },
  relationship: {
    src: '/journey/menjalin-hubungan.png',
    className: styles.relationshipArtwork,
  },
  wedding: {
    src: '/journey/hari-pernikahan.png',
    className: styles.weddingArtwork,
  },
} satisfies Record<JourneyStage, { src: string; className: string }>;

export function JourneyIllustration({ stage }: Readonly<{ stage: JourneyStage }>) {
  const image = artwork[stage];

  return (
    <span
      className={`${styles.journeyArtwork} ${image.className}`}
      aria-hidden="true"
    >
      <img src={image.src} alt="" />
    </span>
  );
}

export function FootstepTrail({ reverse = false }: Readonly<{ reverse?: boolean }>) {
  return (
    <span
      className={`${styles.footstepTrail} ${reverse ? styles.reverseTrail : ''}`}
      aria-hidden="true"
    >
      {Array.from({ length: 9 }, (_, index) => (
        <span className={styles.footstepStamp} key={index}>
          <img src="/journey/foot-trail.png" alt="" />
        </span>
      ))}
    </span>
  );
}
