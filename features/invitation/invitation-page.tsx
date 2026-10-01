import styles from './styles/invitation.module.css';
import { IdentityPanel } from './components/identity-panel';
import { InvitationMenu } from './navigation/invitation-menu';
import { MusicButton } from './music/music-button';
import { OpeningSection } from './sections/01-opening/opening-section';
import { IntroductionSection } from './sections/02-introduction/introduction-section';
import { CoupleSection } from './sections/03-couple/couple-section';
import { JourneySection } from './sections/04-journey/journey-section';
import { ScheduleSection } from './sections/05-schedule/schedule-section';
import { MomentsSection } from './sections/06-moments/moments-section';
import { RsvpSection } from './sections/07-rsvp/rsvp-section';
import { WishesSection } from './sections/08-wishes/wishes-section';
import { GiftSection } from './sections/09-gift/gift-section';
import { ThanksSection } from './sections/10-thanks/thanks-section';

export function InvitationPage() {
  return (
    <main className={styles.page}>
      <IdentityPanel />
      <div className={styles.content}>
        <InvitationMenu />
        <OpeningSection />
        <IntroductionSection />
        <CoupleSection />
        <JourneySection />
        <ScheduleSection />
        <MomentsSection />
        <RsvpSection />
        <WishesSection />
        <GiftSection />
        <ThanksSection />
        <MusicButton />
      </div>
    </main>
  );
}
