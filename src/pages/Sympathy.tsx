import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Heart, MessageCircle, Phone, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import SmartImage from '../components/SmartImage';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../lib/products';
import { BRAND } from '../lib/config';

const COLOUR_MEANINGS: { hex: string; name: string; meaning: string }[] = [
  { hex: '#FAF7F0', name: 'White', meaning: 'Peace, reverence and a clean farewell.' },
  { hex: '#F4D1D5', name: 'Soft Pink', meaning: 'Tenderness, gratitude and remembered kindness.' },
  { hex: '#8E1B2A', name: 'Red', meaning: 'Deep love, grief carried with dignity.' },
  { hex: '#C9A24C', name: 'Gold & Cream', meaning: 'A celebrated life — gentle joy alongside the sadness.' },
  { hex: '#5E4A1E', name: 'Earth Tones', meaning: 'Quietude, grounding, the natural cycle of things.' },
  { hex: '#1C1C1C', name: 'Ink & Deep Burgundy', meaning: 'Solemnity, formality and unspoken depth.' },
];

export default function Sympathy() {
  const sympathyProducts = PRODUCTS.filter((p) => p.category === 'sympathy-tributes');
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    serviceDate: '',
    type: 'Wreath',
    budget: 'R600 – R1,500',
    venue: '',
    message: '',
  });

  const submitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = [
      `*Sympathy Enquiry — ${BRAND.name}*`,
      '',
      `From: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      '',
      `Service date: ${form.serviceDate || '—'}`,
      `Type: ${form.type}`,
      `Budget: ${form.budget}`,
      `Venue / family address: ${form.venue}`,
      '',
      `Card message:`,
      form.message,
    ].join('\n');
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-ivory-50 relative overflow-hidden">
        <div className="container-x py-14 sm:py-20 lg:py-28 grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <div className="eyebrow mb-5">Sympathy & Tributes</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.04]">
              For the moments
              <br />that ask for <span className="italic text-rouge">quiet beauty.</span>
            </h1>
            <p className="mt-6 text-ink/70 leading-relaxed text-lg max-w-xl">
              Composed with reverence and discretion. We will personally deliver to homes, places of worship
              and memorial venues across Gauteng, and arrange nationwide on request.
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-ink/60">
              <Clock className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
              Same-day arrangement available for orders placed before 11:00.
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#enquiry" className="btn-primary">
                Place a Tribute Order
                <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a href={`tel:${BRAND.phone}`} className="btn-outline">
                <Phone className="h-4 w-4" strokeWidth={1.5} /> Speak to the Atelier
              </a>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] overflow-hidden bg-ink">
              <SmartImage
                src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80"
                alt="Sympathy wreath"
                palette={['#FAF7F0', '#F3EEE2', '#C9A24C']}
                className="w-full h-full"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Types of tributes */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="The arrangements"
          title="A discreet"
          italic="selection."
          description="Each tribute can be customised in palette, size and personalised with a handwritten sash or card."
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12 mt-14">
          {sympathyProducts.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Colour meanings */}
      <section className="bg-ink text-ivory py-14 sm:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-x relative">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5">
              <div className="eyebrow text-gold mb-5">A small guide</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                What the <span className="italic gold-text">colours</span> say.
              </h2>
              <p className="mt-6 text-ivory/70 leading-relaxed">
                Colour is often the language of remembrance. The notes below are a gentle reference —
                we will always defer to your family's tradition and the wishes of the bereaved.
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {COLOUR_MEANINGS.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="border border-ivory/15 hover:border-gold/50 transition p-5"
                  >
                    <div className="flex items-center gap-3">
                      <span className="h-6 w-6 rounded-full border border-ivory/30 shadow-inner" style={{ backgroundColor: c.hex }} />
                      <span className="font-display text-xl">{c.name}</span>
                    </div>
                    <p className="text-sm text-ivory/65 mt-3 leading-relaxed">{c.meaning}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The promise */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="aspect-[5/4] overflow-hidden bg-ink">
            <SmartImage
              src="https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=900&q=80"
              alt="Sympathy florals"
              palette={['#FAF7F0', '#8E1B2A']}
              className="w-full h-full"
            />
          </div>
          <div>
            <div className="eyebrow mb-5">Our promise</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.04]">
              Discretion. <span className="italic text-rouge">Reverence.</span> Care.
            </h2>
            <ul className="mt-8 space-y-5 text-ink/75 leading-relaxed">
              {[
                { t: 'Personally delivered', b: 'A senior florist accompanies every tribute — not a third-party courier.' },
                { t: 'Quiet packaging', b: 'No bright logos. Matte black sleeves, ivory ribbon, hand-written cards.' },
                { t: 'Tradition-aware', b: 'Tell us the family\'s faith or cultural tradition — we will compose accordingly.' },
                { t: 'Same-day possible', b: 'For orders placed before 11:00 we can deliver the same afternoon in Gauteng.' },
                { t: 'Live updates', b: 'Photo confirmation on WhatsApp once delivered.' },
              ].map((p) => (
                <li key={p.t} className="flex items-start gap-4">
                  <Heart className="h-5 w-5 text-gold mt-1 shrink-0" strokeWidth={1.5} />
                  <span>
                    <strong className="text-ink">{p.t}.</strong>{' '}
                    <span className="text-ink/65">{p.b}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="bg-ivory-50 py-14 sm:py-20 lg:py-28">
        <div className="container-x grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Place a tribute</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.04]">
              We are here to <span className="italic text-rouge">help.</span>
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed">
              Send us the details and we will respond personally within an hour during studio hours.
              For urgent same-day orders, please WhatsApp or call directly.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 text-ink/70 hover:text-rouge transition">
                <Phone className="h-4 w-4 text-gold-500" strokeWidth={1.5} /> {BRAND.phone}
              </a>
              <a
                href={`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent('Hello Rose Destiny, I need to arrange sympathy flowers.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-ink/70 hover:text-rouge transition"
              >
                <MessageCircle className="h-4 w-4 text-gold-500" strokeWidth={1.5} /> WhatsApp the atelier
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={submitEnquiry} className="bg-ivory border border-gold/20 p-8 lg:p-10 space-y-6">
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
                  <label className="label">Service date</label>
                  <input type="date" className="input" value={form.serviceDate} onChange={(e) => setForm({ ...form, serviceDate: e.target.value })} />
                </div>
                <div>
                  <label className="label">Type of tribute</label>
                  <select className="input bg-transparent" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option>Wreath</option>
                    <option>Cross arrangement</option>
                    <option>Standing heart</option>
                    <option>Casket spray</option>
                    <option>Posy / Family bouquet</option>
                    <option>Memorial centrepiece</option>
                    <option>I would like advice</option>
                  </select>
                </div>
                <div>
                  <label className="label">Budget</label>
                  <select className="input bg-transparent" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                    <option>Under R600</option>
                    <option>R600 – R1,500</option>
                    <option>R1,500 – R3,000</option>
                    <option>R3,000+</option>
                    <option>Advise me</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="label">Venue or family address</label>
                  <input className="input" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} placeholder="Where shall we deliver?" />
                </div>
              </div>
              <div>
                <label className="label">Card message (optional)</label>
                <textarea rows={3} className="w-full bg-transparent border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="A short, handwritten card will accompany your tribute." />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send Sympathy Enquiry
                <Send className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="container-x py-16 text-center">
        <Link to="/shop/sympathy-tributes" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink hover:text-gold-500 transition">
          View All Sympathy Compositions
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </Link>
      </section>
    </PageWrapper>
  );
}
