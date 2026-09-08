import { ArrowRight, CalendarDays, MapPin, Mail } from 'lucide-react';
export default function Home() {
return <main className="invitation" id="home">
<header><a className="identity" href="#home" aria-label="V and I home"><span className="monogram">V / I</span><span className="brand-line"/><span className="brand-caption">TWO-HEARTS<br/>ONE BEAUTIFUL JOURNEY</span></a><nav aria-label="Main navigation"><a href="#home" aria-current="page">Home</a><span aria-disabled="true">Our story</span><a href="#details">Details</a><span aria-disabled="true">RSVP</span></nav></header>
<section className="hero" aria-labelledby="hero-title"><p className="eyebrow">You’re invited to our</p><h1 id="hero-title"><span>Wedding</span><span>Invitation</span></h1><p className="intro">Join us to celebrate a new chapter<br className="desktop-break"/> filled with love, laughter, and a brighter tomorrow.</p><a className="details-button" href="#details">View details <ArrowRight aria-hidden="true"/></a>
<div className="event-details" id="details" tabIndex={-1}><div className="detail"><CalendarDays aria-hidden="true"/><p><span className="day">Sat</span><time dateTime="2025-05-17">May 17, 2025</time></p></div><div className="detail"><MapPin aria-hidden="true"/><p>The Lindegate<span className="secondary">Bali Indonesia</span></p></div><div className="detail"><Mail aria-hidden="true"/><p>Kindly RSVP<span className="secondary">By Apr 10, 2020</span></p></div></div><p className="closing">Same people <span>—</span> a brighter tomorrow</p></section>
</main>;
}
