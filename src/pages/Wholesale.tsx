import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Calendar, Check, Leaf, MessageCircle, ScrollText, Send, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import SmartImage from '../components/SmartImage';
import SectionHeading from '../components/SectionHeading';
import { CATEGORIES, PRODUCTS } from '../lib/products';
import { BRAND } from '../lib/config';
import { whatsappEnquiryLink } from '../lib/whatsapp';

export default function Wholesale() {
  const flowerCats = CATEGORIES.filter((c) => c.group === 'flowers');
  const [form, setForm] = useState({
    company: '', name: '', email: '', phone: '',
    type: 'Florist / Studio',
    frequency: 'Weekly',
    notes: '',
  });

  const submitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const lines = [
      `*Wholesale Enquiry — ${BRAND.name}*`,
      '',
      `Business: ${form.company}`,
      `Contact: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email}`,
      `Type: ${form.type}`,
      `Frequency: ${form.frequency}`,
      '',
      `Notes:`,
      form.notes,
    ];
    const url = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <PageWrapper>
      {/* Hero */}
      <section className="bg-ink text-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
          <SmartImage
            src="https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=1400&q=80"
            alt="Wholesale florals"
            palette={['#5E4A1E', '#C9A24C', '#0A0A0A']}
            className="absolute inset-0 h-full w-full"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-ink/60 to-ink" />
        </div>
        <div className="container-x relative py-16 sm:py-20 lg:py-32">
          <div className="max-w-2xl">
            <div className="eyebrow mb-5 text-gold">Trade & Wholesale</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.04]">
              For florists, planners
              <br />and <span className="italic gold-text">discerning trade.</span>
            </h1>
            <p className="mt-6 text-ivory/75 leading-relaxed text-lg max-w-xl">
              Direct-from-farm stems, market-grade quality and bespoke pre-orders for
              studios, hotels, set stylists and event planners across South Africa.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#quote" className="btn-gold">Request a Quote</a>
              <a
                href={whatsappEnquiryLink('Hello Rose Destiny, I would like to enquire about a wholesale account.')}
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

      {/* Value props */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <SectionHeading
          eyebrow="What you get"
          title="Better stems,"
          italic="fewer surprises."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
          {[
            { icon: Leaf, title: 'Market-graded', body: 'Stems hand-picked at the dawn market — never the broker bucket.' },
            { icon: Calendar, title: 'Pre-orders welcome', body: 'Secure stock for a date in advance, with revisions up to 72 hours prior.' },
            { icon: Truck, title: 'Nationwide delivery', body: 'Refrigerated overnight delivery to most major South African cities.' },
            { icon: ScrollText, title: 'Trade pricing', body: 'Transparent tiers from R3,000 / month upward, with VAT-compliant invoicing.' },
          ].map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-ink/10 hover:border-gold/50 transition p-7"
            >
              <v.icon className="h-6 w-6 text-gold-500" strokeWidth={1.25} />
              <h3 className="font-display text-2xl mt-5 italic text-rouge">{v.title}</h3>
              <p className="text-ink/65 mt-2 text-sm leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Available varietals */}
      <section className="bg-ivory-50 py-14 sm:py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we stock"
            title="Available"
            italic="varietals."
            description="Twelve categories, in season. Tell us what you need and we will tell you what is grading well this week."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-4 mt-14">
            {flowerCats.map((c, i) => {
              const sample = PRODUCTS.find((p) => p.category === c.id);
              const count = PRODUCTS.filter((p) => p.category === c.id).length;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                >
                  <Link to={`/shop/${c.id}`} className="group block relative aspect-square overflow-hidden bg-ink">
                    {sample && (
                      <SmartImage
                        src={sample.image}
                        alt={c.name}
                        palette={sample.palette}
                        className="absolute inset-0 w-full h-full transition-transform duration-[1.2s] group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent" />
                    <div className="absolute inset-x-4 bottom-4 text-ivory">
                      <div className="font-display text-xl italic leading-tight">{c.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.24em] text-gold mt-1.5">
                        {count} {count === 1 ? 'line' : 'lines'} available
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="container-x py-14 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="aspect-[5/6] overflow-hidden bg-ink">
            <SmartImage
              src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80"
              alt="Trade clients"
              palette={['#EAD18C', '#C9A24C', '#FAF7F0']}
              className="w-full h-full"
            />
          </div>
          <div>
            <div className="eyebrow mb-5">Who we partner with</div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">
              Florists, planners and the <span className="italic text-rouge">discerning few</span> who care about the petal.
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                'Independent florists and studios looking for reliable weekly supply.',
                'Wedding and event planners booking florals six to nine months ahead.',
                'Hotels and restaurants composing weekly compositions for lobbies and tables.',
                'Set stylists, art directors and editorial productions on a deadline.',
                'Corporates with reception desks worth caring about.',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-ink/75 leading-relaxed">
                  <Check className="h-4 w-4 text-gold mt-1 shrink-0" strokeWidth={2} />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a href="#quote" className="btn-primary group">
                Open a Trade Account
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ink text-ivory py-14 sm:py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-x relative">
          <SectionHeading
            eyebrow="The process"
            title="From enquiry"
            italic="to dispatch."
            light
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-14">
            {[
              { n: '01', t: 'Enquire', b: 'Send the form below or open WhatsApp. Share your scale and types.' },
              { n: '02', t: 'Account', b: 'We set up a trade account, share price tiers and a current availability list.' },
              { n: '03', t: 'Pre-order', b: 'Place a standing weekly order or a one-off pre-order with revisions allowed.' },
              { n: '04', t: 'Dispatch', b: 'Refrigerated delivery overnight, or studio collection at our Sandton base.' },
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

      {/* Quote form */}
      <section id="quote" className="container-x py-14 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="eyebrow mb-5">Open an account</div>
            <h2 className="font-display text-4xl md:text-5xl">
              Tell us about <span className="italic text-rouge">your studio.</span>
            </h2>
            <p className="mt-6 text-ink/70 leading-relaxed">
              Submit the form and your enquiry will open on WhatsApp for our trade desk to receive directly.
              We respond to wholesale enquiries within one business day.
            </p>
            <div className="mt-10 space-y-3 text-sm text-ink/70">
              <div className="flex items-center gap-3">
                <Building2 className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                {BRAND.address}
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                Trade desk: {BRAND.phone}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={submitQuote} className="bg-ivory border border-gold/20 p-8 lg:p-10 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="label">Business name</label>
                  <input required className="input" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                </div>
                <div>
                  <label className="label">Your name</label>
                  <input required className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="label">Email</label>
                  <input required type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="label">Phone</label>
                  <input required className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="label">Business type</label>
                  <select className="input bg-transparent" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option>Florist / Studio</option>
                    <option>Event Planner</option>
                    <option>Hotel / Restaurant</option>
                    <option>Set Stylist / Production</option>
                    <option>Corporate / Office</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="label">Expected frequency</label>
                  <select className="input bg-transparent" value={form.frequency} onChange={(e) => setForm({ ...form, frequency: e.target.value })}>
                    <option>Weekly</option>
                    <option>Fortnightly</option>
                    <option>Monthly</option>
                    <option>One-off / Pre-order</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">What stems are you looking for?</label>
                <textarea rows={5} className="w-full bg-transparent border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Approximate weekly volume, varietals, palette preferences, delivery city…" />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send Enquiry
                <Send className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <p className="text-xs text-ink/45">Your enquiry is sent directly to our atelier WhatsApp for a same-day reply.</p>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
