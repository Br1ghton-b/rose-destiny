import { Link } from 'react-router-dom';
import { ArrowRight, Heart, X } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import ProductCard from '../components/ProductCard';
import { useWishlist } from '../stores/wishlist';
import { PRODUCTS } from '../lib/products';

export default function Wishlist() {
  const { ids, clear } = useWishlist();
  const items = PRODUCTS.filter((p) => ids.includes(p.id));

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="container-x py-16 sm:py-24 lg:py-32 text-center">
          <Heart className="h-10 w-10 text-gold-500 mx-auto" strokeWidth={1.25} />
          <div className="eyebrow justify-center mt-5 mb-5">Your wishlist</div>
          <h1 className="font-display text-5xl md:text-6xl">
            A small <span className="italic text-rouge">empty</span> notebook.
          </h1>
          <p className="mt-5 text-ink/60 max-w-md mx-auto">
            Tap the heart on any composition to keep it close.
          </p>
          <Link to="/shop" className="btn-primary mt-10 inline-flex">
            Browse the Collection
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="container-x py-16 lg:py-24">
        <div className="text-center mb-14">
          <div className="eyebrow justify-center mb-5">Saved for later</div>
          <h1 className="font-display text-5xl md:text-6xl">
            Your <span className="italic text-rouge">wishlist</span>
          </h1>
          <p className="mt-4 text-ink/60">{items.length} {items.length === 1 ? 'piece' : 'pieces'} kept close.</p>
          <button onClick={clear} className="mt-4 text-[11px] uppercase tracking-[0.28em] text-ink/50 hover:text-rouge transition inline-flex items-center gap-1.5">
            <X className="h-3.5 w-3.5" strokeWidth={1.5} />
            Clear wishlist
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-14">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
