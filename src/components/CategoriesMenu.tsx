import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, CATEGORY_GROUPS, PRODUCTS } from '../lib/products';
import SmartImage from './SmartImage';

interface Props {
  onClose: () => void;
}

const FEATURED_SLUGS = ['the-velvet-sovereign', 'royal-king-protea', 'peony-ranunculus-posy'];

export default function CategoriesMenu({ onClose }: Props) {
  const featured = FEATURED_SLUGS.map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute left-0 right-0 top-full bg-ivory border-t border-gold/30 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.25)] z-40"
      onMouseLeave={onClose}
    >
      <div className="container-x py-10 lg:py-12">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* Column groups */}
          {CATEGORY_GROUPS.map((g) => {
            const items = CATEGORIES.filter((c) => c.group === g.id);
            return (
              <div key={g.id} className="col-span-12 md:col-span-4">
                <div className="text-[10px] uppercase tracking-[0.32em] text-gold-500 mb-2">
                  {g.label}
                </div>
                <div className="font-display text-xs italic text-ink/50 mb-6">{g.tagline}</div>
                <ul className="space-y-2.5">
                  {items.map((c) => {
                    const count = PRODUCTS.filter((p) => p.category === c.id).length;
                    return (
                      <li key={c.id}>
                        <Link
                          to={`/shop/${c.id}`}
                          onClick={onClose}
                          className="group flex items-center justify-between gap-3 py-1"
                        >
                          <span className="flex items-baseline gap-2">
                            <span className="font-display text-lg text-ink group-hover:text-rouge transition">
                              {c.name}
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.24em] text-ink/30">
                              {count}
                            </span>
                          </span>
                          <ArrowRight
                            className="h-3.5 w-3.5 text-gold opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition"
                            strokeWidth={1.5}
                          />
                        </Link>
                        {c.short && (
                          <div className="text-xs text-ink/45 -mt-1">{c.short}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}

          {/* Featured products */}
          <div className="col-span-12 md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.32em] text-gold-500 mb-2">Featured</div>
            <div className="font-display text-xs italic text-ink/50 mb-6">The current darlings</div>
            <div className="grid grid-cols-3 gap-3">
              {featured.map((p) =>
                p ? (
                  <Link
                    key={p.id}
                    to={`/product/${p.slug}`}
                    onClick={onClose}
                    className="group"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-ivory-200">
                      <SmartImage
                        src={p.image}
                        alt={p.name}
                        palette={p.palette}
                        className="w-full h-full transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="mt-2 font-display text-sm leading-tight group-hover:text-rouge transition">
                      {p.name}
                    </div>
                  </Link>
                ) : null,
              )}
            </div>
            <Link
              to="/shop"
              onClick={onClose}
              className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink hover:text-gold-500 transition border-b border-ink/30 pb-1"
            >
              View Full Collection
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
          </div>
        </div>

        {/* Service links bar */}
        <div className="mt-10 pt-8 border-t border-ink/10 flex flex-wrap gap-x-10 gap-y-3 text-[11px] uppercase tracking-[0.28em] text-ink/70">
          <Link to="/weddings" onClick={onClose} className="hover:text-gold-500 transition">Weddings & Events</Link>
          <Link to="/sympathy" onClick={onClose} className="hover:text-gold-500 transition">Sympathy & Tributes</Link>
          <Link to="/wholesale" onClick={onClose} className="hover:text-gold-500 transition">Wholesale & Trade</Link>
          <Link to="/contact" onClick={onClose} className="hover:text-gold-500 transition">Bespoke Enquiry</Link>
        </div>
      </div>
    </motion.div>
  );
}
