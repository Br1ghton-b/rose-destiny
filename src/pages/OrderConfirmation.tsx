import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Download, MessageCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { formatPrice } from '../lib/format';
import { downloadInvoice, type OrderDetails } from '../lib/invoice';
import { openOrderOnWhatsApp } from '../lib/whatsapp';

export default function OrderConfirmation() {
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('lastOrder');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setOrder({ ...parsed, date: new Date(parsed.date) });
      } catch { /* ignore */ }
    }
  }, []);

  if (!order) {
    return (
      <PageWrapper>
        <div className="container-x py-20 sm:py-28 lg:py-32 text-center">
          <h1 className="font-display text-5xl italic text-rouge">No recent order</h1>
          <p className="mt-4 text-ink/60">Your order details have expired or you arrived here directly.</p>
          <Link to="/shop" className="btn-primary mt-8">Browse the Collection</Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="container-x py-16 lg:py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 18 }}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            className="mx-auto h-20 w-20 rounded-full bg-gold-gradient flex items-center justify-center border-4 border-ivory shadow-[0_20px_60px_-15px_rgba(201,162,76,0.6)]"
          >
            <Check className="h-9 w-9 text-ink" strokeWidth={2} />
          </motion.div>
          <div className="eyebrow justify-center mt-8 mb-4">Order received</div>
          <h1 className="font-display text-5xl md:text-6xl leading-[1.04]">
            Thank you, <span className="italic text-rouge">{order.customer.name.split(' ')[0]}.</span>
          </h1>
          <p className="mt-5 text-ink/65 text-lg leading-relaxed">
            Your invoice has been downloaded and your order has been sent to our atelier on WhatsApp.
            We will confirm within the hour during studio hours.
          </p>

          <div className="mt-10 inline-flex flex-col items-center bg-ivory border border-gold/30 px-8 py-6">
            <div className="text-[11px] uppercase tracking-[0.32em] text-gold-500">Order Number</div>
            <div className="font-display text-4xl gold-text mt-1">{order.orderId}</div>
            <div className="text-xs text-ink/50 mt-2">{order.date.toLocaleString('en-ZA')}</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="bg-ink text-ivory p-8 space-y-3">
            <div className="eyebrow text-gold">Summary</div>
            {order.items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm py-2 border-b border-ivory/10">
                <span>
                  <span className="font-display text-base">{i.name}</span>
                  <span className="block text-[10px] uppercase tracking-[0.22em] text-ivory/50 mt-0.5">{i.sizeLabel} · ×{i.quantity}</span>
                </span>
                <span>{formatPrice(i.price * i.quantity)}</span>
              </div>
            ))}
            <div className="pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-ivory/70"><span>Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
              <div className="flex justify-between text-ivory/70"><span>Delivery</span><span>{order.deliveryFee === 0 ? 'Complimentary' : formatPrice(order.deliveryFee)}</span></div>
              <div className="flex justify-between text-ivory/70"><span>VAT</span><span>{formatPrice(order.vat)}</span></div>
              <div className="flex justify-between items-baseline pt-3 border-t border-ivory/10">
                <span className="text-[11px] uppercase tracking-[0.28em] text-gold">Total</span>
                <span className="font-display text-2xl gold-text">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-ivory border border-gold/20 p-8 space-y-5">
            <div>
              <div className="eyebrow mb-2">Recipient</div>
              <div className="text-sm text-ink/80">
                {order.delivery.recipientName || order.customer.name}<br />
                {order.delivery.method === 'delivery' ? `${order.customer.address}, ${order.customer.city}` : 'Studio Collection · Sandton'}
              </div>
            </div>
            <div>
              <div className="eyebrow mb-2">When</div>
              <div className="text-sm text-ink/80">
                {order.delivery.date}<br />
                {order.delivery.timeWindow}
              </div>
            </div>
            {order.delivery.message && (
              <div>
                <div className="eyebrow mb-2">Card Message</div>
                <div className="font-display text-lg italic text-rouge">"{order.delivery.message}"</div>
              </div>
            )}
            <div className="hairline" />
            <div className="flex flex-col gap-3">
              <button onClick={() => downloadInvoice(order)} className="btn-outline w-full">
                <Download className="h-4 w-4" strokeWidth={1.5} />
                Download Invoice Again
              </button>
              <button onClick={() => openOrderOnWhatsApp(order)} className="btn-primary w-full">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                Re-send to WhatsApp
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-ink hover:text-gold-500 transition">
            Continue Browsing <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        </div>
      </section>
    </PageWrapper>
  );
}
