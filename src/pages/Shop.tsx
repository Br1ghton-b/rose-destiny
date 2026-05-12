import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import ProductCard from '../components/ProductCard';
import { CATEGORIES, PRODUCTS, type Category } from '../lib/products';
import { motion } from 'framer-motion';

const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price · Low to High' },
  { id: 'price-desc', label: 'Price · High to Low' },
  { id: 'name', label: 'A → Z' },
] as const;

type SortId = (typeof SORTS)[number]['id'];

export default function Shop() {
  const { category } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQ = searchParams.get('q') ?? '';
  const [q, setQ] = useState(initialQ);
  const [sort, setSort] = useState<SortId>('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const cat = CATEGORIES.find((c) => c.id === category);

  const filtered = useMemo(() => {
    const base = category ? PRODUCTS.filter((p) => p.category === (category as Category)) : PRODUCTS;
    const searched = q
      ? base.filter((p) =>
          (p.name + p.tagline + p.description + p.categoryName).toLowerCase().includes(q.toLowerCase()),
        )
      : base;
    const sorted = [...searched];
    switch (sort) {
      case 'price-asc': sorted.sort((a, b) => a.basePrice - b.basePrice); break;
      case 'price-desc': sorted.sort((a, b) => b.basePrice - a.basePrice); break;
      case 'name': sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return sorted;
  }, [category, q, sort]);

  return (
    <PageWrapper>
      {/* Header */}
      <section className="bg-ink text-ivory relative overflow-hidden">
        <div className="absolute inset-0 bg-noise opacity-20" />
        <div className="container-x py-20 lg:py-28 relative">
          <div className="eyebrow mb-5 text-gold">{cat ? 'Collection' : 'The Shop'}</div>
          <div className="flex items-end justify-between flex-wrap gap-6">
            <div className="max-w-3xl">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.04]">
                {cat ? (
                  <>
                    {cat.name.split(' ')[0]}{' '}
                    <span className="italic text-gold">{cat.name.split(' ').slice(1).join(' ')}</span>
                  </>
                ) : (
                  <>The full <span className="italic text-gold">collection</span></>
                )}
              </h1>
              <p className="mt-5 text-ivory/70 max-w-xl leading-relaxed text-lg">
                {cat ? cat.description : 'Browse every composition, from petite posies to bespoke commissions.'}
              </p>
            </div>
            <div className="text-[11px] uppercase tracking-[0.28em] text-ivory/50">
              {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
            </div>
          </div>

          {/* Category pills */}
          <div className="mt-12 flex flex-wrap gap-2">
            <Link
              to="/shop"
              className={`px-5 py-2 text-[11px] uppercase tracking-[0.24em] border transition ${
                !category ? 'bg-gold text-ink border-gold' : 'border-ivory/30 text-ivory hover:border-gold hover:text-gold'
              }`}
            >
              All
            </Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.id}
                to={`/shop/${c.id}`}
                className={`px-5 py-2 text-[11px] uppercase tracking-[0.24em] border transition ${
                  category === c.id ? 'bg-gold text-ink border-gold' : 'border-ivory/30 text-ivory hover:border-gold hover:text-gold'
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Filter / sort bar */}
      <section className="border-b border-ink/10 bg-ivory/95 backdrop-blur lg:sticky lg:top-[68px] z-20">
        <div className="container-x py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden flex items-center gap-2 text-[11px] uppercase tracking-[0.24em]"
          >
            <Filter className="h-4 w-4" strokeWidth={1.25} /> Filter
          </button>
          <div className="flex-1 max-w-md hidden md:block">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                const params = new URLSearchParams(searchParams);
                if (e.target.value) params.set('q', e.target.value);
                else params.delete('q');
                setSearchParams(params);
              }}
              placeholder="Search the collection…"
              className="input"
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.24em] text-ink/50 hidden sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortId)}
              className="text-[11px] uppercase tracking-[0.24em] bg-transparent border border-ink/20 px-3 py-2 focus:outline-none focus:border-gold"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="container-x py-16 lg:py-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="font-display text-3xl italic text-rouge mb-3">No compositions found</h3>
            <p className="text-ink/60">Try another search or browse the collection.</p>
            <Link to="/shop" className="btn-primary mt-8">Reset Filters</Link>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-14"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        )}
      </section>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-ink/60 z-50 lg:hidden" onClick={() => setDrawerOpen(false)}>
          <div className="absolute right-0 top-0 h-full w-[88%] max-w-sm bg-ivory p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <span className="font-display text-2xl italic text-rouge">Filter</span>
              <button onClick={() => setDrawerOpen(false)}><X className="h-6 w-6" strokeWidth={1.25} /></button>
            </div>
            <label className="label">Search</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search…"
              className="input mb-6"
            />
            <label className="label">Category</label>
            <div className="flex flex-col gap-2">
              <Link to="/shop" onClick={() => setDrawerOpen(false)} className="text-sm hover:text-gold-500">All</Link>
              {CATEGORIES.map((c) => (
                <Link key={c.id} to={`/shop/${c.id}`} onClick={() => setDrawerOpen(false)} className="text-sm hover:text-gold-500">
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </PageWrapper>
  );
}
