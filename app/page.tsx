'use client';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
export default function Home() {
 const [opened, setOpened] = useState(false);
 return <main className="invitation" id="home">
  <section className="cover" aria-labelledby="hero-title">
   <div className="cover-heading">
    <div className="date-row" aria-label="May 17, 2025"><span>17/05</span><span>2025</span></div>
    <p className="event-time">Waktu akan diumumkan</p>
    <p className="eyebrow">The wedding of</p>
    <h1 id="hero-title" aria-label="Verdo & Intan"><span className="first-name">Verdo</span><span className="ampersand">&amp;</span><span className="second-name">Intan</span></h1>
   </div>
   <div className="guest-welcome">
    <div className="guest-greeting">
     <h2 className="salutation">Yth. Bapak/Ibu/Saudara/i</h2>
     <h2 className="guest-name"><span className="pinvite-guest-name">Tamu Undangan</span></h2>
     <h2 className="invitation-message">Tanpa mengurangi rasa hormat,{ '\u2028' }kami mengundang anda untuk menghadiri acara pernikahan kami.</h2>
    </div>
    <button className="open-invitation" type="button" aria-expanded={opened} aria-controls="invitation-details" onClick={() => setOpened(!opened)}><span className="elementor-button-text">{opened ? 'Tutup Detail' : 'Buka Undangan'}</span><ArrowRight size={17} aria-hidden="true" /></button>
    {opened && <div className="invitation-details" id="invitation-details"><p>Sabtu, 17 Mei 2025</p><p>The Lindegate · Bali, Indonesia</p></div>}
   </div>
  </section>
 </main>;
}
