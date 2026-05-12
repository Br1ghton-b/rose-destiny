import { Link } from 'react-router-dom';
import { ArrowRight, LogIn, Minus, Plus, Trash2, UserPlus } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SmartImage from '../components/SmartImage';
import { useCart } from '../stores/cart';
import { useAuth } from '../stores/auth';
import { formatPrice } from '../lib/format';
import { BRAND } from '../lib/config';
import { motion, AnimatePresence } from 'framer-motion';

export default function Cart() {
  const { items, remove, updateQuantity, subtotal } = useCart();
  const user = useAuth((s) => s.currentUser());
  const sub = subtotal();
  const delivery = sub === 0 ? 0 : sub >= BRAND.freeDeliveryThreshold ? 0 : BRAND.deliveryFlatFee;
  const vat = (sub + delivery) * BRAND.vatRate;
  const total = sub + delivery + vat;

  if (items.length === 0) {
    return (
      <PageWrapper>
        <div className="container-x py-16 sm:py-24 lg:py-32 text-center">
          <div className="eyebrow justify-center mb-5">Your bag</div>
          <h1 className="font-display text-5xl md:text-6xl">
            A quiet, <span className="italic text-rouge">empty</span> bag.
          </h1>
          <p className="mt-5 text-ink/60 max-w-md mx-auto">Begin by browsing a hand-tied composition.</p>
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
          <div className="eyebrow justify-center mb-5">The Bag</div>
          <h1 className="font-display text-5xl md:text-6xl">
            Your <span className="italic text-rouge">selections</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Items */}
          <div className="lg:col-span-8 border-t border-ink/10">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="py-6 border-b border-ink/10 flex gap-5 items-start"
                >
                  <Link to={`/product/${item.slug}`} className="shrink-0 w-24 h-32 sm:w-28 sm:h-36 bg-ivory-200 overflow-hidden">
                    <SmartImage src={item.image} alt={item.name} className="w-full h-full" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.slug}`} className="font-display text-xl hover:text-rouge transition block">{item.name}</Link>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-gold-500 mt-1">{item.sizeLabel}</div>
                    {item.note && (
                      <div className="text-xs text-ink/50 italic mt-2 max-w-md">Card message: "{item.note}"</div>
                    )}
                    <div className="mt-4 flex items-center justify-between flex-wrap gap-3">
                      <div className="flex items-center border border-ink/15">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-9 w-9 flex items-center justify-center hover:bg-ink hover:text-ivory transition">
                          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-9 w-9 flex items-center justify-center hover:bg-ink hover:text-ivory transition">
                          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                      <div className="flex items-center gap-5">
                        <span className="font-display text-lg text-rouge">{formatPrice(item.price * item.quantity)}</span>
                        <button onClick={() => remove(item.id)} aria-label="Remove" className="text-ink/40 hover:text-rouge transition">
                          <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-4">
            <div className="bg-ink text-ivory p-8 sticky top-32">
              <div className="eyebrow mb-6 text-gold">Order Summary</div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-ivory/70">Subtotal</span>
                  <span>{formatPrice(sub)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory/70">Delivery</span>
                  <span>{delivery === 0 ? <span className="text-gold">Complimentary</span> : formatPrice(delivery)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ivory/70">VAT (15%)</span>
                  <span>{formatPrice(vat)}</span>
                </div>
                <div className="hairline my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-gold">Total</span>
                  <span className="font-display text-3xl gold-text">{formatPrice(total)}</span>
                </div>
              </div>

              {sub < BRAND.freeDeliveryThreshold && (
                <div className="mt-5 text-xs text-gold-200 leading-relaxed">
                  Add {formatPrice(BRAND.freeDeliveryThreshold - sub)} more to unlock complimentary delivery.
                </div>
              )}

              {user ? (
                <>
                  <div className="mt-7 px-4 py-3 bg-ivory/5 border border-gold/30 text-xs text-ivory/70 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    Signed in as <span className="text-gold">{user.name}</span>
                  </div>
                  <Link to="/checkout" className="btn-gold w-full mt-3">
                    Proceed to Checkout
                    <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                  </Link>
                </>
              ) : (
                <>
                  <div className="mt-7 px-4 py-3 bg-rouge/15 border border-gold/30 text-xs text-ivory/80 leading-relaxed">
                    Please sign in or create an account to complete your order.
                  </div>
                  <Link
                    to="/login?redirect=%2Fcheckout"
                    className="btn-gold w-full mt-3"
                  >
                    <LogIn className="h-4 w-4" strokeWidth={1.5} />
                    Sign In to Checkout
                  </Link>
                  <Link
                    to="/register?redirect=%2Fcheckout"
                    className="block w-full text-center mt-3 py-3 border border-ivory/30 text-ivory text-[11px] uppercase tracking-[0.22em] hover:bg-ivory hover:text-ink transition"
                  >
                    <UserPlus className="h-4 w-4 inline mr-2" strokeWidth={1.5} />
                    Create Account
                  </Link>
                </>
              )}
              <Link to="/shop" className="block text-center mt-4 text-[11px] uppercase tracking-[0.28em] text-ivory/60 hover:text-gold transition">
                Continue Browsing
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PageWrapper>
  );
}
