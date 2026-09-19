import {
  Camera,
  CircleCheck,
  Copy,
  Gift,
  Heart,
  Menu,
  Music2,
} from 'lucide-react';
import { ScrollCueButton } from './scroll-cue-button';
import { FootstepTrail, JourneyIllustration } from './journey-art';
import styles from './undangan.module.css';

const invitation = {
  date: '26/12',
  dateLong: 'Sabtu, 26 Desember 2026',
  year: '2026',
  bride: 'Intan',
  groom: 'Verdo',
  venue: 'Hotel Dana Solo',
  address: 'Solo, Indonesia',
};

const events = [
  {
    title: 'Pemberkatan',
    time: '08.00 - 10.00 WIB',
  },
  {
    title: 'Resepsi',
    time: '10.30 - 14.00 WIB',
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

const wishes = [
  ['Keluarga & Sahabat', 'Semoga hari bahagia ini menjadi awal perjalanan yang penuh kasih, damai, dan sukacita.'],
  ['Teman-teman', 'Selamat menempuh hidup baru. Semoga selalu saling menjaga dan bertumbuh bersama.'],
  ['Orang Terkasih', 'Bahagia selalu sampai tua, dan semoga rumah tangga kalian dipenuhi kebaikan.'],
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
}: Readonly<{ title: string; time: string }>) {
  return (
    <article className={styles.eventDetails}>
      <h3 className={styles.eventTitle}>{title}</h3>
      <div className={styles.eventDateTime}>
        <p>{invitation.dateLong}</p>
        <p>{time}</p>
      </div>
      <div className={styles.eventLocation}>
        <strong>{invitation.venue}</strong>
        <p>{invitation.address}</p>
      </div>
      <InertButton className={styles.mapButton}>Buka Maps</InertButton>
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
              <p>Putri dari keluarga tercinta</p>
              <InertButton className={styles.iconButton}>
                <Heart aria-hidden="true" size={15} />
                Instagram Intan
              </InertButton>
            </div>
          </article>

          <span className={styles.personDivider}>&amp;</span>

          <article className={styles.personCard}>
            <ScriptTitle>The Groom</ScriptTitle>
            <PhotoPlaceholder label="Foto Verdo" className={styles.portrait} />
            <div className={styles.personDetails}>
              <h3>Verdo</h3>
              <p>Putra dari keluarga tercinta</p>
              <InertButton className={styles.iconButton}>
                <Heart aria-hidden="true" size={15} />
                Instagram Verdo
              </InertButton>
            </div>
          </article>
        </section>

        <section
          className={`${styles.section} ${styles.storySection}`}
          aria-label="Journey of Love"
        >
          <div className={styles.storyList}>
                        {story.map((item, index) => (
              <article className={styles.storyItem} key={item.title}>
                <JourneyIllustration
                  stage={index === 0 ? 'meeting' : index === 1 ? 'relationship' : 'wedding'}
                />
                <div className={styles.storyCopy}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
            <FootstepTrail />
            <FootstepTrail reverse />
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
            <div className={styles.countdown} aria-label="Hitung mundur pernikahan">
              {['Days', 'Hours', 'Minutes', 'Seconds'].map((unit) => (
                <div key={unit}>
                  <strong>00</strong>
                  <span>{unit}</span>
                </div>
              ))}
            </div>
            <InertButton className={styles.saveDateButton}>Simpan Tanggal</InertButton>
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
            <h2 className={styles.rsvpTitle}>RSVP</h2>
            <p className={styles.rsvpDescription}>
              Bagi tamu undangan yang akan hadir di acara pernikahan kami silahkan
              kirimkan konfirmasi kehadiran dengan mengisi form berikut :
            </p>
          </div>
          <div className={styles.formCard} aria-label="Formulir RSVP">
            <label>
              <span className={styles.fieldLabel}>Nama <b>*</b></span>
              <input type="text" />
            </label>
            <label>
              <span className={styles.fieldLabel}>Ucapan &amp; Doa</span>
              <textarea rows={2} />
            </label>
            <label>
              <span className={styles.fieldLabel}>Konfirmasi Kehadiran <b>*</b></span>
              <select defaultValue="Hadir">
                <option>Hadir</option>
                <option>Tidak Hadir</option>
                <option>Masih Ragu</option>
              </select>
            </label>
            <label>
              <span className={styles.fieldLabel}>Jumlah Tamu</span>
              <select defaultValue="1 Orang">
                <option>1 Orang</option>
                <option>2 Orang</option>
              </select>
            </label>
            <InertButton className={styles.submitButton}>Kirim</InertButton>
          </div>
        </section>

        <section className={`${styles.section} ${styles.wishesSection}`}>
          <div className={styles.wishesHeader}>
            <h2 className={styles.wishesTitle}>Wishes</h2>
            <p className={styles.wishesDescription}>
              Terima kasih telah memberikan ucapan selamat, saran pernikahan terbaik,
              hal-hal lucu, atau apa pun itu semuanya istimewa bagi kami!
            </p>
          </div>
          <div className={styles.wishList}>
            {wishes.map(([name, message]) => (
              <article key={name}>
                <div className={styles.wishMeta}>
                  <div className={styles.wishAuthor}>
                    <strong>{name}</strong>
                    <CircleCheck aria-label="Hadir" size={16} />
                  </div>
                  <time>baru saja</time>
                </div>
                <p>{message}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.giftSection}`}>
          <h2 className={styles.giftTitle}>Wedding Gift</h2>

          <div className={styles.bankList}>
            <article>
              <span className={`${styles.bankMark} ${styles.bankMarkBca}`}>BCA</span>
              <div><strong>Verdo</strong><span>0000 0000 0000</span></div>
              <InertButton ariaLabel="Salin nomor rekening Verdo" className={styles.copyButton}>
                <Copy aria-hidden="true" size={20} />
              </InertButton>
            </article>
            <article>
              <span className={`${styles.bankMark} ${styles.bankMarkSea}`}>
                <span>S</span>
              </span>
              <div><strong>Intan</strong><span>0000 0000 0000</span></div>
              <InertButton ariaLabel="Salin nomor rekening Intan" className={styles.copyButton}>
                <Copy aria-hidden="true" size={20} />
              </InertButton>
            </article>
            <article className={styles.giftDelivery}>
              <span className={`${styles.bankMark} ${styles.deliveryMark}`}>
                <Gift aria-hidden="true" size={24} />
              </span>
              <div><strong>Kirim Kado</strong><span>{invitation.venue}, {invitation.address}</span></div>
              <InertButton ariaLabel="Salin alamat pengiriman kado" className={styles.copyButton}>
                <Copy aria-hidden="true" size={20} />
              </InertButton>
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
