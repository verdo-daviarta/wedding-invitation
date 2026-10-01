import styles from '../../styles/invitation.module.css';
import { invitation } from '../../data/wedding';

export function EventDetails({
  title,
  time,
  venue,
  addressLine1,
  addressLine2,
  mapUrl,
}: Readonly<{
  title: string;
  time: string;
  venue: string;
  addressLine1: string;
  addressLine2: string;
  mapUrl: string;
}>) {
  return (
    <article className={styles.eventDetails} data-scroll-reveal>
      <h3 className={styles.eventTitle}>{title}</h3>
      <div className={styles.eventDateTime}>
        <p>{invitation.dateLong}</p>
        <p>{time}</p>
      </div>
      <div className={styles.eventLocation}>
        <strong>{venue}</strong>
        <p>
          {addressLine1}
          <br />
          {addressLine2}
        </p>
      </div>
      <a
        className={`${styles.button} ${styles.mapButton}`}
        href={mapUrl}
        rel="noreferrer"
        target="_blank"
      >
        Buka Maps
      </a>
    </article>
  );
}
