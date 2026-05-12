import { Link } from 'react-router-dom';
import { ArrowRight, Award, Flower2, Truck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import SmartImage from '../components/SmartImage';
import { getFeaturedProducts, PRODUCTS, CATEGORIES } from '../lib/products';
import { whatsappEnquiryLink } from '../lib/whatsapp';

export default function Home() {
  const featured = getFeaturedProducts();

  return (
    <PageWrapper>
      {/* HERO */}
      <section className="relative bg-ivory overflow-hidden">
        <div className="container-x pt-12 lg:pt-20 pb-16 lg:pb-32">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <div className="lg:col-span-6 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="eyebrow mb-6">A South African Floral Atelier</div>
                <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] text-ink text-balance">
                  Petals composed
                  <br />
                  with <span className="italic text-rouge">grace,</span>
                  <br />
                  bound in <span className="gold-text">gold.</span>
                </h1>
                <p className="mt-8 max-w-lg text-lg text-ink/70 leading-relaxed">
                  Rose Destiny is a Johannesburg-based atelier composing roses, proteas
                  and the unexpected — hand-tied for moments worth remembering.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Link to="/shop" className="btn-primary group">
                    Shop the Collection
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={1.5} />
                  </Link>
                  <Link to="/about" className="btn-ghost">
                    Our Story
                  </Link>
                </div>
                <div className="mt-12 flex items-center gap-8 text-xs uppercase tracking-[0.24em] text-ink/50">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-gold" strokeWidth={1.25} />
                    Bespoke
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-gold" strokeWidth={1.25} />
                    Same-day
                  </div>
                  <div className="flex items-center gap-2">
                    <Flower2 className="h-4 w-4 text-gold" strokeWidth={1.25} />
                    Sourced at dawn
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hero collage */}
            <div className="lg:col-span-6 relative">
              <div className="grid grid-cols-12 grid-rows-6 gap-2.5 sm:gap-3 lg:gap-4 h-[380px] sm:h-[480px] md:h-[600px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="col-span-7 row-span-4 relative overflow-hidden bg-ink"
                >
                  <SmartImage
                    src={featured[0]?.image ?? ''}
                    alt={featured[0]?.name ?? 'Bouquet'}
                    palette={['#8E1B2A', '#4D0D17', '#0A0A0A']}
                    className="absolute inset-0"
                    loading="eager"
                  />
                  <div className="absolute bottom-4 left-4 right-4 text-ivory">
                    <div className="text-[10px] uppercase tracking-[0.32em] text-gold-200">Signature</div>
                    <div className="font-display text-2xl italic">The Velvet Sovereign</div>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                  className="col-span-5 row-span-3 relative overflow-hidden bg-ink"
                >
                  <SmartImage
                    src={featured[1]?.image ?? ''}
                    alt={featured[1]?.name ?? 'Bouquet'}
                    palette={['#1C1C1C', '#5E4A1E', '#C9A24C']}
                    className="absolute inset-0"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.4 }}
                  className="col-span-5 row-span-3 relative overflow-hidden bg-ink"
                >
                  <SmartImage
                    src={featured[2]?.image ?? ''}
                    alt={featured[2]?.name ?? 'Bouquet'}
                    palette={['#EAD18C', '#F5E9C3', '#C9A24C']}
                    className="absolute inset-0"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.9, delay: 0.55 }}
                  className="col-span-7 row-span-2 relative overflow-hidden bg-ink"
                >
                  <SmartImage
                    src={featured[3]?.image ?? ''}
                    alt={featured[3]?.name ?? 'Bouquet'}
                    palette={['#F4D1D5', '#FAF7F0', '#C9A24C']}
                    className="absolute inset-0"
                  />
                </motion.div>
              </div>

              {/* Decorative seal */}
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, type: 'spring' }}
                className="absolute -bottom-6 -left-6 hidden md:flex h-32 w-32 rounded-full bg-ink text-ivory items-center justify-center text-[10px] uppercase tracking-[0.28em] text-center leading-tight border-2 border-gold"
              >
                Hand<br />Composed<br /><span className="text-gold">·</span><br />Same Day
              </motion.div>
            </div>
          </div>
        </div>
        {/* Bottom hairline */}
        <div className="hairline" />
      </section>

      {/* MARQUEE OF VALUES */}
      <section className="bg-ink text-ivory py-5 sm:py-7 overflow-hidden">
        <div className="flex w-max gap-8 sm:gap-16 animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 sm:gap-16 pr-8 sm:pr-16">
              <span className="font-display text-xl sm:text-2xl italic">Composed at dawn</span>
              <span className="text-gold">✦</span>
              <span className="font-display text-xl sm:text-2xl italic">Hand-tied with grace</span>
              <span className="text-gold">✦</span>
              <span className="font-display text-xl sm:text-2xl italic">Delivered the same day</span>
              <span className="text-gold">✦</span>
              <span className="font-display text-xl sm:text-2xl italic">Bespoke compositions</span>
              <span className="text-gold">✦</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container-x py-16 sm:py-20 lg:py-32">
        <SectionHeading
          eyebrow="Browse by Mood"
          title="The"
          italic="Collection"
          description="From statement signature bouquets to native proteas, each composition is hand-tied in our Sandton atelier."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {CATEGORIES.slice(0, 6).map((cat, i) => {
            const sample = PRODUCTS.find((p) => p.category === cat.id);
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
              >
                <Link
                  to={`/shop/${cat.id}`}
                  className="group block relative aspect-[5/6] overflow-hidden bg-ink"
                >
                  {sample && (
                    <SmartImage
                      src={sample.image}
                      alt={cat.name}
                      palette={sample.palette}
                      className="absolute inset-0 w-full h-full transition-transform duration-[1.5s] group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute inset-x-6 bottom-6 text-ivory">
                    <div className="text-[10px] uppercase tracking-[0.32em] text-gold mb-2 opacity-90">Explore</div>
                    <div className="font-display text-3xl italic">{cat.name}</div>
                    <p className="text-sm text-ivory/75 mt-2 max-w-xs">{cat.description}</p>
                    <div className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold border-b border-gold/40 pb-1 group-hover:gap-3 transition-all">
                      Discover
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="bg-ivory-50 py-16 sm:py-20 lg:py-32">
        <div className="container-x">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <div className="eyebrow mb-4">As Featured</div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
                The most loved <span className="italic text-rouge">compositions</span>
              </h2>
            </div>
            <Link to="/shop" className="btn-outline group">
              View All
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" strokeWidth={1.5} />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
            {featured.slice(0, 8).map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* THE PROCESS */}
      <section className="container-x py-16 sm:py-20 lg:py-32 relative">
        <SectionHeading
          eyebrow="The Atelier"
          title="A small studio,"
          italic="great care."
          description="Every order moves through four considered stages — from the dawn market to your door."
        />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-20">
          {[
            { n: '01', title: 'Sourced', body: 'Stems chosen at the dawn flower market and at our growers in Stellenbosch.' },
            { n: '02', title: 'Composed', body: 'Hand-tied in our Sandton atelier, palette and silhouette decided per arrangement.' },
            { n: '03', title: 'Wrapped', body: 'Conditioned, hydrated and dressed in matte black or kraft with a silk tie.' },
            { n: '04', title: 'Delivered', body: 'Same-day delivery across Gauteng. Nationwide on request.' },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative"
            >
              <div className="font-display text-7xl gold-text leading-none">{step.n}</div>
              <h3 className="font-display text-2xl mt-3 italic text-rouge">{step.title}</h3>
              <p className="text-ink/70 mt-3 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-ink text-ivory py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-x relative text-center">
          <div className="ornament mb-8 text-gold text-xs uppercase tracking-[0.32em]">From the founder</div>
          <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl italic leading-[1.25] max-w-4xl mx-auto">
            “A bouquet is a private letter, written without a single word.
            We compose ours in the language of <span className="gold-text not-italic">rare petals</span>,
            quiet hands and unhurried mornings.”
          </blockquote>
          <div className="mt-10 text-[11px] uppercase tracking-[0.32em] text-gold-200">
            — Rose, Founder & Lead Florist
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-x py-16 sm:py-20 lg:py-32">
        <SectionHeading
          eyebrow="Kind Words"
          title="From those who"
          italic="received."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { quote: 'My wife genuinely cried. The Velvet Sovereign arrived in a black box that felt like Hermès. We are clients for life.', name: 'Sipho M.', tag: 'Anniversary order' },
            { quote: 'They styled my mother\'s memorial with such reverence. Quiet, gold-touched, dignified. Thank you, Rose Destiny.', name: 'Lerato K.', tag: 'Sympathy commission' },
            { quote: 'Easily the most beautiful florals at our wedding. Half my guests took the centrepieces home. Worth every cent.', name: 'Mia & Jordan', tag: 'Wedding · Stellenbosch' },
          ].map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card p-8 border border-gold/20 hover:border-gold/60 transition"
            >
              <div className="text-gold text-3xl font-display leading-none mb-4">“</div>
              <p className="text-ink/80 leading-relaxed font-display text-lg italic">{t.quote}</p>
              <div className="mt-6 pt-5 border-t border-gold/20">
                <div className="font-medium text-ink">{t.name}</div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold-500 mt-1">{t.tag}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BESPOKE / CTA */}
      <section className="container-x pb-24 lg:pb-32">
        <div className="relative overflow-hidden bg-ink text-ivory p-10 md:p-16 lg:p-24">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="absolute right-0 top-0 h-full w-1/2 hidden md:block">
            <SmartImage
              src="https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=900&q=80"
              alt="Bespoke florals"
              palette={['#8E1B2A', '#1C1C1C', '#C9A24C']}
              className="absolute inset-0 h-full w-full"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
          </div>
          <div className="relative max-w-xl">
            <div className="eyebrow mb-6 text-gold">Bespoke Commissions</div>
            <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Something <span className="italic text-gold">one-of-one,</span> for a moment that asks for it.
            </h3>
            <p className="mt-6 text-ivory/70 leading-relaxed text-lg">
              Weddings, brand launches, dinner parties, gifts that need to mean something.
              Tell us the moment — we will compose it.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-gold">
                Begin Consultation
                <Heart className="h-4 w-4" strokeWidth={1.5} />
              </Link>
              <a
                href={whatsappEnquiryLink('Hello Rose Destiny, I would like to discuss a bespoke commission for…')}
                target="_blank"
                rel="noreferrer"
                className="btn border border-ivory/30 text-ivory hover:bg-ivory hover:text-ink"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
