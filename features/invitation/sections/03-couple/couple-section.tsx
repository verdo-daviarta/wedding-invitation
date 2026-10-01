import { Fragment } from 'react';
import { Heart } from 'lucide-react';
import { couple } from '../../data/wedding';
import { ScriptTitle } from '../../components/script-title';
import { PhotoPlaceholder } from '../../components/photo-placeholder';
import { InertButton } from '../../components/inert-button';
import styles from '../../styles/invitation.module.css';

export function CoupleSection() {
  return (
    <section
      aria-label="Mempelai"
      id="couple"
      tabIndex={-1}
      className={`${styles.section} ${styles.coupleSection}`}
    >
      <p className={styles.sectionKicker}>
        Dengan penuh rasa syukur, kami memperkenalkan
      </p>
      {couple.map((person, index) => (
        <Fragment key={person.name}>
          {index > 0 && (
            <span className={styles.personDivider} aria-hidden="true">
              &amp;
            </span>
          )}
          <article className={styles.personCard}>
            <ScriptTitle>{person.title}</ScriptTitle>
            <PhotoPlaceholder
              label={`Foto ${person.name}`}
              className={styles.portrait}
            />
            <div className={styles.personDetails}>
              <h3>{person.name}</h3>
              <p className={styles.fullName}>({person.fullName})</p>
              <p>{person.family}</p>
              <InertButton className={styles.iconButton}>
                <Heart aria-hidden="true" size={15} />
                {person.socialHandle}
              </InertButton>
            </div>
          </article>
        </Fragment>
      ))}
    </section>
  );
}
