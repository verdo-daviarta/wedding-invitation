import {
  Camera,
  Gift,
  Heart,
  Menu,
  Music2,
} from 'lucide-react';
import { CopyButton } from './copy-button';
import { Countdown } from './countdown';
import { RsvpForm } from './rsvp-form';
import { ScrollCueButton } from './scroll-cue-button';
import { WishesForm } from './wishes-form';
import styles from './undangan.module.css';

const invitation = {
  date: '26/12',
  dateLong: 'Sabtu, 26 Desember 2026',
  year: '2026',
  bride: 'Intan',
  groom: 'Verdo',
  venue: 'Hotel Dana Solo',
  address: 'Jl. Slamet Riyadi St No.286, Sriwedari, Laweyan, Kota Surakarta, Jawa Tengah 57141',
};

const googleCalendarUrl = `https://calendar.google.com/calendar/render?${new URLSearchParams({
  action: 'TEMPLATE',
  text: `The Wedding of ${invitation.groom} & ${invitation.bride}`,
  dates: '20261226T010000Z/20261226T060000Z',
  details: `Pernikahan ${invitation.groom} dan ${invitation.bride}`,
  location: `${invitation.venue}, Indonesia`,
  ctz: 'Asia/Jakarta',
}).toString()}`;

const events = [
  {
    title: 'Pemberkatan',
    time: '08.00 - 10.00 WIB',
    venue: 'Paroki St. Maria Diangkat Ke Surga - Palur',
    addressLine1: 'Jl. Cemp. No.1, Randurejo, Ngringo,',
    addressLine2: 'Kabupaten Karanganyar, Jawa Tengah 57772',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Paroki%20St.%20Maria%20Diangkat%20Ke%20Surga%20-%20Palur%2C%20Jl.%20Cemp.%20No.1%2C%20Randurejo%2C%20Ngringo%2C%20Karanganyar%2C%20Kabupaten%20Karanganyar%2C%20Jawa%20Tengah%2057772',
  },
  {
    title: 'Resepsi',
    time: '11.00 - 14.00 WIB',
    venue: invitation.venue,
    addressLine1: 'Jl. Slamet Riyadi St No.286, Sriwedari, Laweyan',
    addressLine2: 'Kota Surakarta, Jawa Tengah 57141',
    mapUrl:
      'https://www.google.com/maps/search/?api=1&query=Hotel%20Dana%20Solo%2C%20Jl.%20Slamet%20Riyadi%20St%20No.286%2C%20Sriwedari%2C%20Laweyan%2C%20Surakarta%20City%2C%20Central%20Java%2057141',
  },
];

const story = [
  {
    title: 'Awal Bertemu',
    text: 'Semua berawal dari pertemuan sederhana yang tak pernah direncanakan. Dari sapaan singkat, perlahan tumbuh rasa nyaman yang sulit dijelaskan.',
  },
  {
    title: 'Menjalin Hubungan',
    text: 'Hari demi hari, kami belajar mengenal satu sama lain, tentang mimpi, kebiasaan kecil, dan cara kami saling melengkapi.',
  },
  {
    title: 'Hari Pernikahan',
    text: 'Kini, perjalanan itu membawa kami pada langkah baru yang lebih berarti: menjadi dua jiwa yang bersatu dalam satu janji suci.',
  },
];

const galleryColumns = [
  [
    [1, 'portrait'],
    [5, 'landscape'],
    [6, 'landscape'],
    [7, 'portrait'],
    [10, 'landscape'],
  ],
  [
    [2, 'landscape'],
    [3, 'landscape'],
    [4, 'portrait'],
    [8, 'landscape'],
    [9, 'portrait'],
  ],
] as const;

function ScriptTitle({ children }: Readonly<{ children: React.ReactNode }>) {
  return <h2 className={styles.scriptTitle}>{children}</h2>;
}

function CoupleLockup({ compact = false }: Readonly<{ compact?: boolean }>) {
  return (
    <div className={`${styles.coupleLockup} ${compact ? styles.compactLockup : ''}`}>
      <span>{invitation.groom}</span>
      <span className={styles.ampersand}>&amp;</span>
      <span>{invitation.bride}</span>
    </div>
  );
}

function InertButton({
  children,
  className = '',
  ariaLabel,
}: Readonly<{ children: React.ReactNode; className?: string; ariaLabel?: string }>) {
  return (
    <button
      aria-label={ariaLabel}
      className={`${styles.button} ${className}`}
      type="button"
      disabled
    >
      {children}
    </button>
  );
}

function EventDetails({
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
  mapUrl?: string;
}>) {
  return (
    <article className={styles.eventDetails}>
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
      {mapUrl ? (
        <a
          className={`${styles.button} ${styles.mapButton}`}
          href={mapUrl}
          rel="noreferrer"
          target="_blank"
        >
          Buka Maps
        </a>
      ) : (
        <InertButton className={styles.mapButton}>Buka Maps</InertButton>
      )}
    </article>
  );
}

function PhotoPlaceholder({
  label,
  className = '',
}: Readonly<{ label: string; className?: string }>) {
  return (
    <div className={`${styles.photoPlaceholder} ${className}`} aria-label={label}>
      <Camera aria-hidden="true" size={22} />
      <span>{label}</span>
    </div>
  );
}

export default function InvitationPage() {
  return (
    <main className={styles.page}>
      <aside className={styles.identityPanel} aria-label="Identitas pernikahan">
        <div className={styles.identityCopy}>
          <p className={styles.eyebrow}>The Wedding of</p>
          <CoupleLockup compact />
          <p className={styles.verse}>
            Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu
            pasangan hidup dari jenismu sendiri supaya kamu mendapat ketenangan hati
            dan dijadikan-Nya kasih sayang di antara kamu.
          </p>
        </div>
      </aside>

      <div className={styles.content}>
        <button className={styles.menuButton} type="button" aria-label="Menu" disabled>
          <Menu aria-hidden="true" size={21} />
        </button>

        <section className={`${styles.section} ${styles.opening}`} aria-labelledby="opening-title">
          <div className={styles.dateRow}>
            <span>{invitation.date}</span>
            <span>{invitation.year}</span>
          </div>
          <p className={styles.eyebrow} id="opening-title">The Wedding of</p>
          <CoupleLockup />
          <ScrollCueButton className={styles.scrollCue} />
        </section>

        <section
          className={`${styles.section} ${styles.introduction}`}
          id="introduction"
        >
          <p className={styles.quote}>
            “Ini enaknya di isi pake<br />Quotes apa yang<br />sekiranya bagus gitu..”
          </p>
        </section>

        <section className={`${styles.section} ${styles.coupleSection}`}>
          <p className={styles.sectionKicker}>Dengan penuh rasa syukur, kami memperkenalkan</p>
          <article className={styles.personCard}>
            <ScriptTitle>The Bride</ScriptTitle>
            <PhotoPlaceholder label="Foto Intan" className={styles.portrait} />
            <div className={styles.personDetails}>
              <h3>Intan</h3>
              <p className={styles.fullName}>(Carolina Haslita Intan Cahyaningrum, S.M)</p>
              <p>Putri dari keluarga tercinta</p>
              <InertButton className={styles.iconButton}>
                <Heart aria-hidden="true" size={15} />
                intan1210
              </InertButton>
            </div>
          </article>

          <span className={styles.personDivider}>&amp;</span>

          <article className={styles.personCard}>
            <ScriptTitle>The Groom</ScriptTitle>
            <PhotoPlaceholder label="Foto Verdo" className={styles.portrait} />
            <div className={styles.personDetails}>
              <h3>Verdo</h3>
              <p className={styles.fullName}>(Benidiktus Verdo Daviarta, S.E, M.Msi)</p>
              <p>Putra dari keluarga tercinta</p>
              <InertButton className={styles.iconButton}>
                <Heart aria-hidden="true" size={15} />
                verdo_aseli
              </InertButton>
            </div>
          </article>
        </section>

        <section
          className={`${styles.section} ${styles.storySection}`}
          aria-labelledby="journey-title"
        >
          <header className={styles.storyHeader}>
            <h2 id="journey-title">Journey of Love</h2>
            <p className={styles.storyIntroduction}>
              Tiga bab sederhana yang membawa kami menuju <br />satu perjalanan seumur hidup.
            </p>
          </header>

          <div className={styles.storyList}>
            {story.map((item) => (
              <article className={styles.storyItem} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className={`${styles.section} ${styles.scheduleSection}`}
          aria-labelledby="save-the-date-title"
        >
          <div className={styles.saveDateContent}>
            <img
              className={styles.saveDateImage}
              src="/placeholders/save-the-date.png"
              alt="Placeholder foto pasangan"
            />
            <h2 className={styles.saveDateTitle} id="save-the-date-title">
              Save The Date
            </h2>
            <p className={styles.saveDateDate}>26 December 2026</p>
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

          <div className={styles.dresscodeBlock}>
            <p className={styles.dresscodeText}>
              Kami dengan hormat menganjurkan para tamu kami untuk mengenakan
              warna-warna ini untuk hari istimewa kami.
            </p>
            <div className={styles.swatches} aria-label="Warna dresscode">
              <span className={styles.swatchBlack} />
              <span className={styles.swatchGreen} />
              <span className={styles.swatchLightGreen} />
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.photoBoothSection}`}>
          <h2 className={styles.showcaseTitle}>Virtual Photo Booth</h2>
          <p className={styles.photoBoothDescription}>
            Abadikan momen kamu saat menghadiri pernikahan kami dengan menggunakan
            Wedding Frame di bawah ini.
          </p>
          <InertButton className={styles.photoBoothButton}>
            <Camera aria-hidden="true" size={14} />
            Mulai Berfoto
          </InertButton>
        </section>

        <section className={`${styles.section} ${styles.gallerySection}`}>
          <div className={styles.galleryHeader}>
            <h2 className={`${styles.showcaseTitle} ${styles.momentTitle}`}>Our Moment</h2>
            <p className={styles.momentQuote}>
              “I was created in time to fill your time, and I use all the time in my
              life to love you.”
            </p>
          </div>
          <div className={styles.gallery}>
            {galleryColumns.map((column, columnIndex) => (
              <div className={styles.galleryColumn} key={columnIndex}>
                {column.map(([number, orientation]) => (
                  <PhotoPlaceholder
                    className={`${styles.galleryItem} ${
                      orientation === 'portrait'
                        ? styles.galleryPortrait
                        : styles.galleryLandscape
                    }`}
                    label={`Momen ${number}`}
                    key={number}
                  />
                ))}
              </div>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.rsvpSection}`}>
          <div className={styles.rsvpHeader}>
            <h2 className={styles.rsvpTitle}>Konfirmasi Kehadiran</h2>
            <p className={styles.rsvpDescription}>
              Silakan isi formulir singkat ini untuk membantu kami mempersiapkan
              hari bahagia dengan lebih baik.
            </p>
          </div>
          <RsvpForm />
        </section>

        <section className={`${styles.section} ${styles.wishesSection}`}>
          <div className={styles.wishesHeader}>
            <h2 className={styles.wishesTitle}>Wishes</h2>
            <p className={styles.wishesDescription}>
              Terima kasih telah memberikan ucapan selamat, saran pernikahan terbaik,
              hal-hal lucu, atau apa pun itu semuanya istimewa bagi kami!
            </p>
          </div>
          <WishesForm />
        </section>

        <section className={`${styles.section} ${styles.giftSection}`}>
          <h2 className={styles.giftTitle}>Wedding Gift</h2>

          <div className={styles.bankList}>
            <article>
              <span className={styles.bankMark}>
                <img className={styles.bankLogo} src="/images/mandiri.svg" alt="Bank Mandiri" />
              </span>
              <div><strong>A.N Benidiktus Verdo Dav</strong><span>1570 0102 6013 2</span></div>
              <CopyButton
                ariaLabel="Salin nomor rekening Verdo"
                className={styles.copyButton}
                value="1570010260132"
              />
            </article>
            <article>
              <span className={styles.bankMark}>
                <img className={styles.bankLogo} src="/images/bca.svg" alt="Bank BCA" />
              </span>
              <div><strong>A.N Carolina Haslita Intan C.</strong><span>1662 4558 94</span></div>
              <CopyButton
                ariaLabel="Salin nomor rekening Intan"
                className={styles.copyButton}
                value="1662455894"
              />
            </article>
            <article className={styles.giftDelivery}>
              <span className={`${styles.bankMark} ${styles.deliveryMark}`}>
                <Gift aria-hidden="true" size={24} />
              </span>
              <div><strong>Kirim Kado</strong><span>{invitation.venue}, {invitation.address}</span></div>
              <CopyButton
                ariaLabel="Salin alamat pengiriman kado"
                className={styles.copyButton}
                value={`${invitation.venue}, ${invitation.address}`}
              />
            </article>
          </div>
        </section>

        <section className={`${styles.section} ${styles.thanksSection}`}>
          <div className={styles.thanksTitleStage}>
            <h2 className={styles.thanksTitle}>Thank You!</h2>
          </div>
          <p className={styles.thanksMessage}>
            Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.
          </p>
          <p className={styles.thanksCouple}>
            {invitation.groom} <span>&amp;</span> {invitation.bride}
          </p>
          <footer>
            <span>Daviarta copyright 2026</span>
          </footer>
        </section>

        <button className={styles.musicButton} type="button" aria-label="Musik" disabled>
          <Music2 aria-hidden="true" size={18} />
        </button>
      </div>
    </main>
  );
}
