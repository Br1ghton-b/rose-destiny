import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SectionHeading from '../components/SectionHeading';
import SmartImage from '../components/SmartImage';
import { motion } from 'framer-motion';

const POSTS = [
  {
    id: '01',
    title: 'How to keep cut roses for fourteen days',
    excerpt: 'A florist\'s short, honest guide to water, blades, sunlight and the one tip nobody tells you.',
    category: 'Care',
    date: '14 April 2026',
    image: 'https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=900&q=80',
    palette: ['#8E1B2A', '#0A0A0A'],
  },
  {
    id: '02',
    title: 'In praise of the king protea',
    excerpt: 'South Africa\'s most architectural bloom — and why it deserves to stand alone in a single vase.',
    category: 'Field Notes',
    date: '02 April 2026',
    image: 'https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=900&q=80',
    palette: ['#D26370', '#86692A'],
  },
  {
    id: '03',
    title: 'Composing for a winter wedding',
    excerpt: 'Burgundy, copper, ivory and an unexpected dose of black. A study from a recent commission in the Cape.',
    category: 'Weddings',
    date: '21 March 2026',
    image: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?auto=format&fit=crop&w=900&q=80',
    palette: ['#F4D1D5', '#8E1B2A'],
  },
  {
    id: '04',
    title: 'Three colour palettes we are loving this season',
    excerpt: 'From soft champagne to inky burgundy — the moods we are working into our hand-tied bouquets right now.',
    category: 'Trends',
    date: '08 March 2026',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=900&q=80',
    palette: ['#EAD18C', '#F5E9C3'],
  },
  {
    id: '05',
    title: 'A note on sympathy flowers',
    excerpt: 'What to send, what to say, and why the smallest, most personal posy often means the most.',
    category: 'Gestures',
    date: '24 February 2026',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80',
    palette: ['#FAF7F0', '#F3EEE2'],
  },
  {
    id: '06',
    title: 'Behind the velvet: how we build our signature bouquet',
    excerpt: 'A step-by-step look at how The Velvet Sovereign is composed — from cut to silk ribbon.',
    category: 'Atelier',
    date: '10 February 2026',
    image: 'https://images.unsplash.com/photo-1614113489855-66422ad300a4?auto=format&fit=crop&w=900&q=80',
    palette: ['#8E1B2A', '#4D0D17'],
  },
];

export default function Journal() {
  return (
    <PageWrapper>
      <section className="container-x pt-16 lg:pt-24 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow justify-center mb-5">The Journal</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.04]">
            Field notes from the <span className="italic text-rouge">atelier</span>
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed">
            Slow reading on flowers, care, ceremony and the occasional aesthetic obsession.
          </p>
        </div>
      </section>

      {/* Featured (first) */}
      <section className="container-x mb-20">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="group grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
        >
          <div className="aspect-[5/4] overflow-hidden bg-ink">
            <SmartImage src={POSTS[0].image} alt={POSTS[0].title} palette={POSTS[0].palette} className="w-full h-full transition-transform duration-[1.4s] group-hover:scale-105" />
          </div>
          <div>
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.28em] text-gold-500 mb-5">
              <span>{POSTS[0].category}</span>
              <span className="text-ink/30">·</span>
              <span className="text-ink/50 flex items-center gap-1.5"><Calendar className="h-3 w-3" strokeWidth={1.5} /> {POSTS[0].date}</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[1.05]">{POSTS[0].title}</h2>
            <p className="mt-5 text-ink/70 leading-relaxed text-lg">{POSTS[0].excerpt}</p>
            <Link to="/journal" className="inline-flex items-center gap-2 mt-8 text-[11px] uppercase tracking-[0.28em] text-rouge border-b border-rouge pb-1 hover:gap-3 transition-all">
              Read Article <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </motion.article>
      </section>

      {/* Grid */}
      <section className="container-x pb-24 lg:pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
          {POSTS.slice(1).map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="group"
            >
              <Link to="/journal" className="block">
                <div className="aspect-[5/4] overflow-hidden bg-ink mb-5">
                  <SmartImage src={post.image} alt={post.title} palette={post.palette} className="w-full h-full transition-transform duration-[1.2s] group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-gold-500 mb-3">
                  <span>{post.category}</span>
                  <span className="text-ink/30">·</span>
                  <span className="text-ink/50">{post.date}</span>
                </div>
                <h3 className="font-display text-2xl leading-tight group-hover:text-rouge transition">{post.title}</h3>
                <p className="mt-3 text-ink/65 leading-relaxed">{post.excerpt}</p>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x pb-24">
        <div className="bg-ink text-ivory p-10 lg:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-noise opacity-20" />
          <div className="relative max-w-2xl mx-auto">
            <SectionHeading
              eyebrow="The Letter"
              title="Slow notes from"
              italic="the studio."
              description="A monthly love-letter on flowers, gentle living and the occasional discount we never publish anywhere else."
              light
            />
            <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="you@example.com" className="flex-1 bg-transparent border-b border-ivory/40 px-0 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold transition" />
              <button className="btn-gold">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
