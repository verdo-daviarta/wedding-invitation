import { ArrowRight } from 'lucide-react';

const wedding = {
  date: '17/05',
  year: '2025',
  time: 'Waktu akan diumumkan',
  groom: 'Verdo',
  bride: 'Intan',
};

function CoupleNames() {
  return (
    <h1
      className="couple-names"
      id="hero-title"
      aria-label={`${wedding.groom} & ${wedding.bride}`}
    >
      <span className="groom-name">{wedding.groom}</span>
      <span className="ampersand" aria-hidden="true">
        &amp;
      </span>
      <span className="bride-name">{wedding.bride}</span>
    </h1>
  );
}

function GuestGreeting() {
  return (
    <div className="guest-greeting">
      <p className="salutation">Yth. Bapak/Ibu/Saudara/i</p>
      <p className="guest-name">Tamu Undangan</p>
      <p className="invitation-message">
        Tanpa mengurangi rasa hormat,
        <br />
        kami mengundang anda untuk menghadiri acara pernikahan kami.
      </p>
    </div>
  );
}

export default function Home() {
  return (
    <main className="invitation">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-heading">
          <div
            className="date-row"
            aria-label={`Tanggal ${wedding.date}/${wedding.year}`}
          >
            <time dateTime={`${wedding.year}-05-17`}>{wedding.date}</time>
            <span>{wedding.year}</span>
          </div>
          <p className="event-time">{wedding.time}</p>
          <p className="eyebrow">The Wedding of</p>
          <CoupleNames />
        </div>

        <div className="hero-footer">
          <GuestGreeting />
          <a className="open-invitation" href="/undangan">
            Buka Undangan
            <ArrowRight size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </main>
  );
}
