import {
  CalendarDays,
  Camera,
  ChevronDown,
  Clock3,
  Copy,
  Gift,
  Heart,
  MapPin,
  Menu,
  Music2,
  Send,
} from 'lucide-react';
import styles from './undangan.module.css';

const invitation = {
  date: '17/05',
  dateLong: 'Sabtu, 17 Mei 2025',
  year: '2025',
  bride: 'Intan',
  groom: 'Verdo',
  venue: 'The Lindegate',
  address: 'Bali, Indonesia',
};

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

const gifts = [
  ['Lemari', 'Rp1.500.000'],
  ['Dipan', 'Rp1.000.000'],
  ['Dispenser', 'Rp900.000'],
];

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
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  return (
    <button className={`${styles.button} ${className}`} type="button" disabled>
      {children}
    </button>
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

function EventCard({
  title,
  time,
}: Readonly<{ title: string; time: string }>) {
  return (
    <article className={styles.eventCard}>
      <ScriptTitle>{title}</ScriptTitle>
      <p className={styles.eventDate}>{invitation.dateLong}</p>
      <p className={styles.eventTime}>
        <Clock3 aria-hidden="true" size={16} />
        {time}
      </p>
      <div className={styles.venue}>
        <MapPin aria-hidden="true" size={19} />
        <div>
          <strong>{invitation.venue}</strong>
          <span>{invitation.address}</span>
        </div>
      </div>
      <InertButton>Buka Maps</InertButton>
    </article>
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
          <span className={styles.scrollCue} aria-hidden="true">
            <ChevronDown size={24} />
          </span>
        </section>

        <section className={`${styles.section} ${styles.introduction}`}>
          <Heart aria-hidden="true" size={28} />
          <p className={styles.quote}>
            “Falling in love is easy,<br />planning a wedding<br />not so much.”
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

        <section className={`${styles.section} ${styles.storySection}`}>
          <ScriptTitle>Journey of Love</ScriptTitle>
          <div className={styles.storyList}>
            {story.map((item, index) => (
              <article className={styles.storyItem} key={item.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
          <PhotoPlaceholder label="Foto perjalanan kami" className={styles.storyPhoto} />
        </section>

        <section className={`${styles.section} ${styles.scheduleSection}`}>
          <CalendarDays aria-hidden="true" size={26} />
          <ScriptTitle>Save The Date</ScriptTitle>
          <p className={styles.tracked}>{invitation.dateLong}</p>
          <div className={styles.countdown} aria-label="Hitung mundur pernikahan">
            {['Hari', 'Jam', 'Menit', 'Detik'].map((unit) => (
              <div key={unit}>
                <strong>00</strong>
                <span>{unit}</span>
              </div>
            ))}
          </div>
          <InertButton>Simpan Tanggal</InertButton>
          <div className={styles.eventGrid}>
            <EventCard title="Akad" time="Waktu akan diumumkan" />
            <EventCard title="Resepsi" time="Waktu akan diumumkan" />
          </div>
        </section>

        <section className={`${styles.section} ${styles.dressSection}`}>
          <ScriptTitle>Dresscode</ScriptTitle>
          <p>Kami dengan hormat menganjurkan para tamu mengenakan warna-warna ini untuk hari istimewa kami.</p>
          <div className={styles.swatches} aria-label="Warna dresscode">
            <span className={styles.swatchBlack} />
            <span className={styles.swatchBlue} />
            <span className={styles.swatchLight} />
          </div>
          <div className={styles.photoBooth}>
            <Camera aria-hidden="true" size={25} />
            <ScriptTitle>Virtual Photo Booth</ScriptTitle>
            <p>Abadikan momen kamu saat menghadiri pernikahan kami dengan menggunakan wedding frame.</p>
            <InertButton>Mulai Berfoto</InertButton>
          </div>
        </section>

        <section className={`${styles.section} ${styles.gallerySection}`}>
          <ScriptTitle>Our Moment</ScriptTitle>
          <p>“I was created in time to fill your time, and I use all the time in my life to love you.”</p>
          <div className={styles.gallery}>
            {Array.from({ length: 10 }, (_, index) => (
              <PhotoPlaceholder label={`Momen ${index + 1}`} key={index} />
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.rsvpSection}`}>
          <ScriptTitle>RSVP</ScriptTitle>
          <p>Bagi tamu yang akan hadir, silakan kirimkan konfirmasi kehadiran melalui formulir berikut.</p>
          <div className={styles.formCard} aria-label="Formulir RSVP">
            <label>
              Nama <span>*</span>
              <input type="text" placeholder="Nama lengkap" />
            </label>
            <label>
              Ucapan &amp; Doa
              <textarea rows={4} placeholder="Tuliskan ucapan terbaik Anda" />
            </label>
            <label>
              Konfirmasi Kehadiran <span>*</span>
              <select defaultValue="Hadir">
                <option>Hadir</option>
                <option>Tidak Hadir</option>
                <option>Masih Ragu</option>
              </select>
            </label>
            <label>
              Jumlah Tamu
              <select defaultValue="1 Orang">
                <option>1 Orang</option>
                <option>2 Orang</option>
              </select>
            </label>
            <InertButton className={styles.submitButton}>
              <Send aria-hidden="true" size={15} />
              Kirim
            </InertButton>
          </div>
        </section>

        <section className={`${styles.section} ${styles.wishesSection}`}>
          <ScriptTitle>Wishes</ScriptTitle>
          <p>Terima kasih telah memberikan ucapan selamat dan doa untuk kami.</p>
          <div className={styles.wishList}>
            {wishes.map(([name, message]) => (
              <article key={name}>
                <div>
                  <strong>{name}</strong>
                  <span>baru saja</span>
                </div>
                <p>{message}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.giftSection}`}>
          <Gift aria-hidden="true" size={27} />
          <ScriptTitle>Wedding Gift</ScriptTitle>
          <p>Doa dan kehadiran Anda adalah hadiah terbaik. Jika ingin memberi tanda kasih, detailnya tersedia di bawah ini.</p>

          <div className={styles.bankList}>
            <article>
              <span className={styles.bankMark}>BCA</span>
              <div><strong>Verdo</strong><span>0000 0000 0000</span></div>
              <InertButton className={styles.copyButton}><Copy aria-hidden="true" size={18} /></InertButton>
            </article>
            <article>
              <span className={styles.bankMark}>BANK</span>
              <div><strong>Intan</strong><span>0000 0000 0000</span></div>
              <InertButton className={styles.copyButton}><Copy aria-hidden="true" size={18} /></InertButton>
            </article>
            <article>
              <span className={styles.bankMark}><Gift aria-hidden="true" size={19} /></span>
              <div><strong>Kirim Kado</strong><span>{invitation.venue}, {invitation.address}</span></div>
              <InertButton className={styles.copyButton}><Copy aria-hidden="true" size={18} /></InertButton>
            </article>
          </div>

          <div className={styles.registry}>
            <div className={styles.registryHeading}>
              <h3>Gift Registry</h3>
              <ChevronDown aria-hidden="true" size={20} />
            </div>
            <div className={styles.registryGrid}>
              {gifts.map(([name, price]) => (
                <article key={name}>
                  <PhotoPlaceholder label={name} />
                  <strong>{name}</strong>
                  <span>{price}</span>
                </article>
              ))}
            </div>
            <InertButton className={styles.confirmGift}>Konfirmasi Kado</InertButton>
          </div>
        </section>

        <section className={`${styles.section} ${styles.thanksSection}`}>
          <ScriptTitle>Thank You!</ScriptTitle>
          <p>Merupakan suatu kebahagiaan dan kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir di hari bahagia kami.</p>
          <CoupleLockup compact />
          <footer>
            <strong>Verdo &amp; Intan</strong>
            <span>Digital Wedding Invitation © 2026</span>
          </footer>
        </section>

        <button className={styles.musicButton} type="button" aria-label="Musik" disabled>
          <Music2 aria-hidden="true" size={18} />
        </button>
      </div>
    </main>
  );
}
