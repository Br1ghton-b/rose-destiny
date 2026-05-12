import { useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronRight, Heart, Minus, Plus, ShoppingBag, Truck, Leaf, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import SmartImage from '../components/SmartImage';
import ProductCard from '../components/ProductCard';
import { getProductBySlug, getRelatedProducts } from '../lib/products';
import { formatPrice } from '../lib/format';
import { useCart } from '../stores/cart';
import { useWishlist } from '../stores/wishlist';
import { whatsappEnquiryLink } from '../lib/whatsapp';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = getProductBySlug(slug ?? '');
  const [sizeIndex, setSizeIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState('');
  const add = useCart((s) => s.add);
  const { has, toggle } = useWishlist();

  const related = useMemo(() => (product ? getRelatedProducts(product, 4) : []), [product]);

  if (!product) {
    return (
      <PageWrapper>
        <div className="container-x py-20 sm:py-28 lg:py-32 text-center">
          <h1 className="font-display text-5xl italic text-rouge">Not found</h1>
          <p className="mt-4 text-ink/60">That bloom has wandered. Return to the collection.</p>
          <Link to="/shop" className="btn-primary mt-8">Back to Shop</Link>
        </div>
      </PageWrapper>
    );
  }

  const size = product.sizes ? product.sizes[sizeIndex] : { label: 'Standard', price: product.basePrice };
  const wished = has(product.id);

  const addToCart = (goToCheckout = false) => {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      sizeLabel: size.label,
      price: size.price,
      quantity: qty,
      note: note || undefined,
    });
    if (goToCheckout) navigate('/checkout');
  };

  return (
    <PageWrapper>
      <section className="container-x pt-10">
        <nav className="flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ink/50">
          <Link to="/" className="hover:text-gold-500">Home</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <Link to="/shop" className="hover:text-gold-500">Shop</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <Link to={`/shop/${product.category}`} className="hover:text-gold-500">{product.categoryName}</Link>
          <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
          <span className="text-ink">{product.name}</span>
        </nav>
      </section>

      <section className="container-x py-10 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Gallery */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/5] overflow-hidden bg-ivory-200"
            >
              <SmartImage src={product.image} alt={product.name} palette={product.palette} className="absolute inset-0" loading="eager" />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-ivory/95 backdrop-blur text-[10px] uppercase tracking-[0.28em] px-3 py-1.5 text-ink">
                  {product.badge}
                </span>
              )}
            </motion.div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {[product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square bg-ivory-200 overflow-hidden">
                  <SmartImage src={src} alt={product.name} palette={product.palette} className="w-full h-full opacity-80 hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold-500 mb-3">{product.categoryName}</div>
            <h1 className="font-display text-5xl md:text-6xl leading-[1.02] text-balance">
              {product.name}
            </h1>
            <p className="mt-4 text-lg italic text-rouge font-display">{product.tagline}</p>

            <div className="hairline my-7" />

            <p className="text-ink/75 leading-relaxed">{product.description}</p>
            {product.story && (
              <p className="mt-4 text-ink/60 italic leading-relaxed font-display">{product.story}</p>
            )}

            {/* Price */}
            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-ink/40">Price</span>
              <span className="font-display text-4xl text-rouge">{formatPrice(size.price)}</span>
              <span className="text-xs text-ink/50">VAT included</span>
            </div>

            {/* Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mt-8">
                <label className="label">Choose your size</label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {product.sizes.map((s, i) => (
                    <button
                      key={s.label}
                      onClick={() => setSizeIndex(i)}
                      className={`p-4 text-left border transition ${
                        i === sizeIndex
                          ? 'border-gold bg-gold/10'
                          : 'border-ink/15 hover:border-ink/40'
                      }`}
                    >
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className="font-display text-lg text-rouge mt-1">{formatPrice(s.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Card message */}
            <div className="mt-8">
              <label className="label">Add a card message (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={220}
                placeholder="A handwritten card will be included, free of charge."
                className="w-full bg-transparent border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold transition resize-none"
              />
              <div className="text-[10px] uppercase tracking-[0.24em] text-ink/40 text-right mt-1">{note.length}/220</div>
            </div>

            {/* Quantity & actions */}
            <div className="mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-ink/15">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-12 w-10 sm:w-12 flex items-center justify-center hover:bg-ink hover:text-ivory transition">
                    <Minus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <span className="w-10 sm:w-12 text-center font-display text-lg">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="h-12 w-10 sm:w-12 flex items-center justify-center hover:bg-ink hover:text-ivory transition">
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </div>
                <div className="flex-1" />
                <button
                  onClick={() => toggle(product.id)}
                  aria-label="Wishlist"
                  className={`h-12 w-12 flex items-center justify-center border transition ${
                    wished ? 'border-rouge bg-rouge text-ivory' : 'border-ink/20 hover:border-rouge hover:text-rouge'
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wished ? 'fill-current' : ''}`} strokeWidth={1.5} />
                </button>
              </div>
              <button onClick={() => addToCart(false)} className="btn-primary w-full">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                Add to Bag
              </button>
            </div>

            <button onClick={() => addToCart(true)} className="btn-gold w-full mt-3">
              Order Now · Checkout
            </button>

            <a
              href={whatsappEnquiryLink(`Hello Rose Destiny, I'd love to enquire about the ${product.name}.`)}
              target="_blank"
              rel="noreferrer"
              className="block text-center mt-4 text-[11px] uppercase tracking-[0.28em] text-ink/60 hover:text-gold-500 transition"
            >
              Or arrange via WhatsApp →
            </a>

            {/* Composition / care */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[10px] uppercase tracking-[0.28em] text-gold-500 mb-3">Composition</div>
                <ul className="space-y-1.5 text-sm text-ink/75">
                  {product.ingredients.map((ing) => (
                    <li key={ing} className="flex items-start gap-2">
                      <span className="text-gold mt-1.5 text-[8px]">✦</span> {ing}
                    </li>
                  ))}
                </ul>
              </div>
              {product.care && (
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-gold-500 mb-3">Care</div>
                  <p className="text-sm text-ink/75 leading-relaxed">{product.care}</p>
                </div>
              )}
            </div>

            {/* Value props */}
            <div className="mt-10 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Truck, label: 'Same-day Gauteng' },
                { icon: Leaf, label: 'Sourced at dawn' },
                { icon: Award, label: 'Hand-tied' },
              ].map((v, i) => (
                <div key={i} className="border border-ink/10 py-4">
                  <v.icon className="h-5 w-5 mx-auto text-gold-500" strokeWidth={1.25} />
                  <div className="text-[10px] uppercase tracking-[0.22em] mt-2 text-ink/70">{v.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-x py-20">
          <h2 className="font-display text-3xl md:text-4xl mb-12">
            You might also <span className="italic text-rouge">love</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-12">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </PageWrapper>
  );
}
