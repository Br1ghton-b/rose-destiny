import { Link } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import SmartImage from '../components/SmartImage';
import SectionHeading from '../components/SectionHeading';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <PageWrapper>
      {/* Hero */}
      <section className="container-x pt-16 lg:pt-24 pb-12">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5">The Atelier</div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-balance">
              Composed quietly, <span className="italic text-rouge">in service of moments</span> that ask for beauty.
            </h1>
          </div>
          <div className="lg:col-span-5 text-ink/70 leading-relaxed text-lg">
            <p>
              Rose Destiny began as a small Sunday market table in Sandton — a single bucket of garden roses,
              a roll of ribbon, and a notebook full of names. Three years on, we are a discreet, by-appointment
              atelier with a single ambition: to compose flowers worthy of the moment they enter.
            </p>
          </div>
        </div>
      </section>

      <section className="container-x">
        <div className="relative aspect-[16/8] lg:aspect-[16/6] overflow-hidden">
          <SmartImage
            src="https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?auto=format&fit=crop&w=1800&q=80"
            alt="The atelier"
            palette={['#EAD18C', '#C9A24C', '#0A0A0A']}
            className="absolute inset-0"
            loading="eager"
          />
        </div>
      </section>

      {/* Manifesto */}
      <section className="container-x py-16 sm:py-20 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <div className="eyebrow">Our Manifesto</div>
          </div>
          <div className="lg:col-span-8 space-y-8 text-ink/80 text-xl leading-relaxed font-display">
            <p>
              We believe a bouquet should never look mass-produced. It should look like it was made for
              <em className="text-rouge"> someone</em>, by <em className="text-rouge">someone</em>.
            </p>
            <p>
              We choose stems for character, not yield. We build each composition by hand — never by template —
              and we wrap it as though it were a small, considered gift.
            </p>
            <p>
              We work with growers in the Cape and at our market in Johannesburg, and we refuse to compromise
              on freshness, palette or intention.
            </p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="bg-ink text-ivory py-16 sm:py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-x relative grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[4/5] overflow-hidden">
              <SmartImage
                src="https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=900&q=80"
                alt="The founder"
                palette={['#5E4A1E', '#C9A24C', '#0A0A0A']}
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="eyebrow mb-5 text-gold">The Founder</div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Meet <span className="italic gold-text">Rose,</span>
              <br />the hands behind the petals.
            </h2>
            <div className="mt-8 space-y-5 text-ivory/75 leading-relaxed">
              <p>
                Trained in floristry in Cape Town and refined by short stints in studios in Amsterdam and
                Paris, Rose returned home to compose the kind of South African floral work she felt was missing —
                quiet, considered, and absolutely beautiful.
              </p>
              <p>
                She personally signs off every order that leaves the studio. If your bouquet doesn't make you
                pause, it doesn't ship.
              </p>
            </div>
            <div className="font-script text-4xl text-gold mt-10">Rose</div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold-200">Founder & Lead Florist</div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-x py-16 sm:py-20 lg:py-32">
        <SectionHeading
          eyebrow="What we believe"
          title="A small set of"
          italic="convictions."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14 mt-16">
          {[
            { n: '01', title: 'Petal first', body: 'We refuse stems that have travelled too long or grown too fast. Freshness is non-negotiable.' },
            { n: '02', title: 'No two alike', body: 'Every arrangement is composed by hand. Templates have no place in our studio.' },
            { n: '03', title: 'Quiet luxury', body: 'Restraint over volume. The right three roses always beat the wrong thirty.' },
            { n: '04', title: 'Local first', body: 'We source proteas, ranunculus and greenery from South African growers wherever we can.' },
            { n: '05', title: 'Considered packaging', body: 'Recyclable matte black, ivory and kraft. Silk and grosgrain ribbon, never plastic.' },
            { n: '06', title: 'The customer is family', body: 'We remember your anniversaries. We notice the little things. That is the whole point.' },
          ].map((v, i) => (
            <motion.div
              key={v.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <div className="font-display text-6xl gold-text leading-none">{v.n}</div>
              <h3 className="font-display text-2xl italic text-rouge mt-3">{v.title}</h3>
              <p className="text-ink/70 mt-3 leading-relaxed">{v.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-24 lg:pb-32">
        <div className="text-center">
          <div className="ornament text-gold text-xs uppercase tracking-[0.32em] mb-6">visit the studio</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl">
            Step into our <span className="italic text-rouge">collection</span>
          </h2>
          <Link to="/shop" className="btn-primary mt-10 inline-flex">Browse the Shop</Link>
        </div>
      </section>
    </PageWrapper>
  );
}
