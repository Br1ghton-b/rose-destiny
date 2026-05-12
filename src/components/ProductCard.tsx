import { Link } from 'react-router-dom';
import { Heart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../lib/products';
import { formatPrice } from '../lib/format';
import { useWishlist } from '../stores/wishlist';
import { useCart } from '../stores/cart';
import SmartImage from './SmartImage';

interface Props {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: Props) {
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const add = useCart((s) => s.add);

  const minPrice = product.sizes ? product.sizes[0].price : product.basePrice;

  const onQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const size = product.sizes ? product.sizes[0] : { label: 'Standard', price: product.basePrice };
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      sizeLabel: size.label,
      price: size.price,
      quantity: 1,
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: 'easeOut' }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden bg-ivory-200 aspect-[4/5]">
          <SmartImage
            src={product.image}
            alt={product.name}
            palette={product.palette}
            className="absolute inset-0 w-full h-full transition-transform duration-[1.2s] group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-3 left-3 bg-ivory/95 backdrop-blur text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 text-ink">
              {product.badge}
            </span>
          )}

          {/* Wishlist */}
          <button
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={(e) => {
              e.preventDefault();
              toggle(product.id);
            }}
            className="absolute top-3 right-3 h-9 w-9 rounded-full bg-ivory/95 backdrop-blur flex items-center justify-center hover:bg-gold hover:text-ink transition"
          >
            <Heart
              className={`h-4 w-4 ${wished ? 'fill-rouge text-rouge' : 'text-ink'}`}
              strokeWidth={1.25}
            />
          </button>

          {/* Quick add — slides up on hover */}
          <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            <button
              onClick={onQuickAdd}
              className="w-full bg-ink text-ivory text-[11px] uppercase tracking-[0.28em] py-3 flex items-center justify-center gap-2 hover:bg-gold hover:text-ink transition"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
              Quick Add
            </button>
          </div>
        </div>

        <div className="pt-5 pb-2">
          <div className="text-[10px] uppercase tracking-[0.28em] text-gold-500 mb-1.5">
            {product.categoryName}
          </div>
          <h3 className="font-display text-xl text-ink leading-tight">{product.name}</h3>
          <p className="text-sm text-ink/60 mt-1.5 line-clamp-1">{product.tagline}</p>
          <div className="flex items-baseline gap-2 mt-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-ink/40">From</span>
            <span className="price-tag text-rouge">{formatPrice(minPrice)}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
