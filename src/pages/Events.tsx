import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, Camera, Crown, Gem, MessageCircle, Send, Sparkles, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import SmartImage from '../components/SmartImage';
import SectionHeading from '../components/SectionHeading';
import { BRAND } from '../lib/config';

const EVENT_TYPES = [
  { icon: Crown, name: 'Weddings', body: 'Ceremony arches, bridal cascade, bridesmaid posies, reception tablescapes and installations.' },
  { icon: Gem, name: 'Receptions', body: 'Long-table arrangements, hanging florals and signature welcome installations.' },
  { icon: Sparkles, name: 'Private parties', body: 'Birthdays, anniversaries, milestone dinners and intimate at-home celebrations.' },
  { icon: Users, name: 'Corporate', body: 'Brand launches, gala dinners, conferences and recurring lobby compositions.' },
  { icon: Camera, name: 'Editorial & shoots', body: 'Set florals, prop styling and on-call refresh through long shoot days.' },
  { icon: CalendarDays, name: 'Memorial services', body: 'Reverent funeral and memorial floral design — composed with discretion.' },
];

const PACKAGES = [
  {
    name: 'The Intimate',
    subtitle: 'Up to 30 guests',
    range: 'From R12,000',
    inclusions: [
      'Bridal bouquet & bridesmaid posies',
      'Two ceremony arrangements',
      'Three reception tablescapes',
      'Single buttonhole / boutonnière design',
    ],
  },
  {
    name: 'The Atelier',
    subtitle: '30 – 80 guests',
    range: 'From R24,000',
    inclusions: [
      'Full bridal party florals',
      'Ceremony arch or focal moment',
      'Up to eight reception tables',
      'Welcome installation',
      'Personalised signage florals',
    ],
    featured: true,
  },
  {
    name: 'The Sovereign',
    subtitle: '80+ guests',
    range: 'From R48,000',
    inclusions: [
      'Bespoke creative direction',
      'Architectural ceremony moment',
      'Long-table & hanging installations',
      'Cocktail-area florals',
      'On-site florist for the day',
      'Late-night refresh',
    ],
  },
];

export default function Events() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    eventType: 'Wedding',
    eventDate: '',
    guests: '',
    venue: '',
    budget: 'R10,000 – R25,000',
    notes: '',
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `*Event Consultation Enquiry — ${BRAND.name}*`,
      '',
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      '',
      `Event type: ${form.eventType}`,
      `Date: ${form.eventDate}`,
      `Guests: ${form.guests}`,
      `Venue: ${form.venue}`,
      `Budget: ${form.budget}`,
      '',
      `Notes:`,
      form.notes,
    ].join('\n');
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="relative bg-ink text-ivory overflow-hidden">
        <div className="absolute inset-0">
          <SmartImage
            src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1800&q=80"
            alt="Event florals"
            palette={['#8E1B2A', '#0A0A0A', '#C9A24C']}
            className="absolute inset-0 h-full w-full opacity-65"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/40" />
          <div className="absolute inset-0 bg-noise opacity-25" />
        </div>
        <div className="container-x relative py-20 sm:py-24 lg:py-36">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5 text-gold">Weddings & Events</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02]">
              Florals for the
              <br />
              <span className="italic gold-text">unforgettable.</span>
            </h1>
            <p className="mt-6 text-ivory/75 leading-relaxed text-lg max-w-xl">
              From small private ceremonies to architectural reception installations.
              Bespoke floral design with a small atelier's full attention.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#consultation" className="btn-gold">
                Book a Consultation
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent('Hello Rose Destiny, I would like to discuss event florals for…')}`}
                target="_blank"
                rel="noreferrer"
                className="btn border border-ivory/30 text-ivory hover:bg-ivory hover:text-ink"
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Event types */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="What we compose for"
          title="A range of"
          italic="occasions."
          description="Whatever the moment, our atelier brings the same considered hand — quiet, restrained, full of intention."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 mt-14">
          {EVENT_TYPES.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative bg-ivory border border-ink/10 hover:border-gold/60 transition p-7 lg:p-8"
            >
              <t.icon className="h-7 w-7 text-gold-500" strokeWidth={1.25} />
              <h3 className="font-display text-2xl italic text-rouge mt-5">{t.name}</h3>
              <p className="text-ink/65 mt-3 text-sm leading-relaxed">{t.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lookbook collage */}
      <section className="bg-ivory-50 py-14 sm:py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="Recent compositions"
            title="From the"
            italic="lookbook."
          />
          <div className="mt-14 grid grid-cols-12 grid-rows-4 gap-3 lg:gap-4 h-[520px] md:h-[700px]">
            {[
              { src: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=900&q=80', palette: ['#F4D1D5', '#8E1B2A'], cls: 'col-span-7 row-span-2' },
              { src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80', palette: ['#EAD18C', '#F5E9C3'], cls: 'col-span-5 row-span-2' },
              { src: 'https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=900&q=80', palette: ['#EAD18C', '#F4D1D5'], cls: 'col-span-4 row-span-2' },
              { src: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=900&q=80', palette: ['#8E1B2A', '#4D0D17'], cls: 'col-span-4 row-span-2' },
              { src: 'https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=900&q=80', palette: ['#5E4A1E', '#C9A24C'], cls: 'col-span-4 row-span-2' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className={`${item.cls} relative overflow-hidden bg-ink`}
              >
                <SmartImage src={item.src} alt="" palette={item.palette} className="absolute inset-0 w-full h-full hover:scale-105 transition-transform duration-[1.4s]" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="Investment guide"
          title="Three"
          italic="starting points."
          description="Every brief is custom — these are guideposts to help us begin the conversation."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {PACKAGES.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`relative border p-7 sm:p-8 lg:p-10 ${
                p.featured
                  ? 'bg-ink text-ivory border-gold lg:scale-[1.02] shadow-[0_30px_80px_-30px_rgba(201,162,76,0.4)]'
                  : 'bg-ivory border-ink/10'
              }`}
            >
              {p.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-gradient text-ink text-[10px] uppercase tracking-[0.28em] px-3 py-1">
                  Most chosen
                </div>
              )}
              <div className={`text-[10px] uppercase tracking-[0.32em] ${p.featured ? 'text-gold-200' : 'text-gold-500'}`}>
                {p.subtitle}
              </div>
              <h3 className={`font-display text-4xl italic mt-2 ${p.featured ? 'text-gold' : 'text-rouge'}`}>{p.name}</h3>
              <div className={`font-display text-2xl mt-3 ${p.featured ? 'text-ivory' : 'text-ink'}`}>{p.range}</div>
              <ul className={`mt-7 space-y-2.5 text-sm ${p.featured ? 'text-ivory/80' : 'text-ink/70'}`}>
                {p.inclusions.map((line) => (
                  <li key={line} className="flex items-start gap-2.5">
                    <span className={`mt-1.5 text-[8px] ${p.featured ? 'text-gold' : 'text-gold-500'}`}>✦</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#consultation"
                className={`mt-8 block text-center py-3 text-[11px] uppercase tracking-[0.28em] transition ${
                  p.featured
                    ? 'bg-gold text-ink hover:brightness-110'
                    : 'bg-ink text-ivory hover:bg-gold hover:text-ink'
                }`}
              >
                Begin Here
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="bg-ink text-ivory py-14 sm:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="How we work"
            title="From dream"
            italic="to ceremony."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-14">
            {[
              { n: '01', t: 'Discovery', b: 'A complimentary 30-minute call to understand your day, your colours and your dreams.' },
              { n: '02', t: 'Proposal', b: 'A bespoke proposal with mood, palette, item list and full investment breakdown.' },
              { n: '03', t: 'Refinement', b: 'Two rounds of revisions, final venue walk-through and supplier coordination.' },
              { n: '04', t: 'The day', b: 'Our atelier installs on-site, refreshes through the day, and breaks down quietly.' },
            ].map((s) => (
              <div key={s.n}>
                <div className="font-display text-5xl gold-text leading-none">{s.n}</div>
                <h3 className="font-display text-2xl italic mt-3 text-gold-200">{s.t}</h3>
                <p className="text-ivory/70 mt-2 text-sm leading-relaxed">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial pull */}
      <section className="container-x py-14 sm:py-20 lg:py-28 text-center">
        <div className="ornament text-gold text-xs uppercase tracking-[0.32em] mb-6">From a recent bride</div>
        <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl italic leading-[1.3] max-w-3xl mx-auto text-ink">
          “Rose composed our wedding florals like she had known us for years.
          Half our guests took the centrepieces home. We will never forget the room she made.”
        </blockquote>
        <div className="mt-8 text-[11px] uppercase tracking-[0.32em] text-gold-500">— Mia & Jordan · Stellenbosch, March 2026</div>
      </section>

      {/* Consultation form */}
      <section id="consultation" className="bg-ivory-50 py-14 sm:py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Begin a consultation</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.04]">
              Tell us about <span className="italic text-rouge">your day.</span>
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed">
              The form below opens a private conversation with our atelier on WhatsApp.
              We respond to event enquiries within one business day and offer complimentary
              discovery calls to confirm fit.
            </p>
            <div className="mt-10 p-6 bg-ink text-ivory border-l-2 border-gold">
              <div className="eyebrow text-gold mb-3">Lead time</div>
              <p className="text-sm text-ivory/75 leading-relaxed">
                We book most weddings between four and twelve months ahead. For dates within four months, please call or
                WhatsApp directly — we can usually still help.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={submit} className="bg-ivory border border-gold/20 p-8 lg:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="label">Your name</label>
                  <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input required className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Email</label>
                  <input required type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="label">Event type</label>
                  <select className="input bg-transparent" value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                    <option>Wedding</option>
                    <option>Reception / dinner</option>
                    <option>Private party</option>
                    <option>Corporate event</option>
                    <option>Editorial / shoot</option>
                    <option>Memorial service</option>
                  </select>
                </div>
                <div>
                  <label className="label">Date</label>
                  <input type="date" className="input" value={form.eventDate} onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
                </div>
                <div>
                  <label className="label">Guests</label>
                  <input className="input" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} placeholder="Approx." />
                </div>
                <div>
                  <label className="label">Budget guide</label>
                  <select className="input bg-transparent" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                    <option>Under R10,000</option>
                    <option>R10,000 – R25,000</option>
                    <option>R25,000 – R50,000</option>
                    <option>R50,000+</option>
                    <option>Advise me</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Venue (if confirmed)</label>
                  <input className="input" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Name & town" />
                </div>
              </div>
              <div>
                <label className="label">Tell us the dream</label>
                <textarea rows={5} className="w-full bg-transparent border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Palette, mood, focal moments, anything that has caught your eye…" />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send to the Atelier
                <Send className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="container-x py-16 text-center">
        <Link to="/contact" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink hover:text-gold-500 transition">
          Other Enquiries
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </section>
    </PageWrapper>
  );
}
