import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ChevronLeft, MessageCircle, Download, Shield, UserCheck } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import SmartImage from '../components/SmartImage';
import { useCart } from '../stores/cart';
import { useAuth } from '../stores/auth';
import { BRAND } from '../lib/config';
import { formatPrice, generateOrderId } from '../lib/format';
import { downloadInvoice, type OrderDetails } from '../lib/invoice';
import { openOrderOnWhatsApp } from '../lib/whatsapp';

type DeliveryMethod = 'delivery' | 'collection';
type PaymentMethod = 'eft' | 'card-on-delivery' | 'whatsapp-arranged';
type Step = 'details' | 'delivery' | 'payment' | 'review';

const STEPS: { id: Step; label: string }[] = [
  { id: 'details', label: 'Your Details' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'review', label: 'Review' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, subtotal, clear } = useCart();
  const user = useAuth((s) => s.currentUser());
  const recordOrder = useAuth((s) => s.recordOrder);
  const [step, setStep] = useState<Step>('details');

  const [customer, setCustomer] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    city: user?.city ?? '',
    postalCode: user?.postalCode ?? '',
  });
  const [delivery, setDelivery] = useState({
    method: 'delivery' as DeliveryMethod,
    date: '',
    timeWindow: 'Morning · 09:00 – 12:00',
    recipientName: '',
    recipientPhone: '',
    message: '',
  });
  const [payment, setPayment] = useState<PaymentMethod>('eft');
  const [notes, setNotes] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  const sub = subtotal();
  const deliveryFee = useMemo(() => {
    if (delivery.method === 'collection') return 0;
    return sub >= BRAND.freeDeliveryThreshold ? 0 : BRAND.deliveryFlatFee;
  }, [sub, delivery.method]);
  const vat = (sub + deliveryFee) * BRAND.vatRate;
  const total = sub + deliveryFee + vat;

  if (items.length === 0 && !placedOrder) {
    return (
      <PageWrapper>
        <div className="container-x py-20 sm:py-28 lg:py-32 text-center">
          <h1 className="font-display text-5xl italic text-rouge">An empty bag</h1>
          <p className="mt-4 text-ink/60">There is nothing to check out just yet.</p>
          <Link to="/shop" className="btn-primary mt-8">Browse the Collection</Link>
        </div>
      </PageWrapper>
    );
  }

  const canAdvance = () => {
    if (step === 'details') return customer.name && customer.email && customer.phone;
    if (step === 'delivery') {
      if (!delivery.date) return false;
      if (delivery.method === 'delivery' && !customer.address) return false;
      return true;
    }
    if (step === 'payment') return !!payment;
    if (step === 'review') return agreed;
    return false;
  };

  const stepIndex = STEPS.findIndex((s) => s.id === step);
  const advance = () => {
    if (!canAdvance()) return;
    const next = STEPS[stepIndex + 1];
    if (next) setStep(next.id);
  };
  const back = () => {
    const prev = STEPS[stepIndex - 1];
    if (prev) setStep(prev.id);
    else navigate('/cart');
  };

  const placeOrder = () => {
    const order: OrderDetails = {
      orderId: generateOrderId(),
      date: new Date(),
      customer,
      delivery,
      payment: { method: payment },
      items: [...items],
      subtotal: sub,
      deliveryFee,
      vat,
      total,
      notes,
    };
    setPlacedOrder(order);
    downloadInvoice(order);
    openOrderOnWhatsApp(order);
    recordOrder({
      orderId: order.orderId,
      date: order.date.toISOString(),
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      vat: order.vat,
      total: order.total,
      deliveryMethod: order.delivery.method,
      deliveryDate: order.delivery.date,
      deliveryTimeWindow: order.delivery.timeWindow,
      recipientName: order.delivery.recipientName,
      message: order.delivery.message,
      paymentMethod: order.payment.method,
      status: 'pending',
    });
    clear();
    sessionStorage.setItem('lastOrder', JSON.stringify({ ...order, date: order.date.toISOString() }));
    navigate('/order-confirmation');
  };

  return (
    <PageWrapper>
      <section className="container-x py-12 lg:py-16">
        <div className="text-center mb-10">
          <div className="eyebrow justify-center mb-5">Place your order</div>
          <h1 className="font-display text-4xl md:text-5xl">
            Almost <span className="italic text-rouge">composed.</span>
          </h1>
          {user && (
            <div className="inline-flex items-center gap-2 mt-5 px-4 py-2 bg-gold/10 border border-gold/30 text-xs uppercase tracking-[0.22em]">
              <UserCheck className="h-3.5 w-3.5 text-gold-500" strokeWidth={1.5} />
              Signed in as <span className="text-rouge">{user.name}</span>
            </div>
          )}
        </div>

        {/* Stepper */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between gap-2">
            {STEPS.map((s, i) => {
              const done = i < stepIndex;
              const active = i === stepIndex;
              return (
                <div key={s.id} className="flex-1 flex items-center gap-2">
                  <button
                    onClick={() => i <= stepIndex && setStep(s.id)}
                    className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-medium border transition ${
                      done ? 'bg-gold text-ink border-gold' :
                      active ? 'bg-ink text-ivory border-ink' :
                      'bg-transparent text-ink/40 border-ink/20'
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" strokeWidth={2} /> : i + 1}
                  </button>
                  <div className={`text-[10px] uppercase tracking-[0.24em] hidden md:block ${active ? 'text-ink' : 'text-ink/40'}`}>{s.label}</div>
                  {i < STEPS.length - 1 && <div className={`flex-1 h-px ${done ? 'bg-gold' : 'bg-ink/10'}`} />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* Main panel */}
          <div className="lg:col-span-7">
            <div className="bg-ivory border border-gold/20 p-7 lg:p-10">
              {step === 'details' && (
                <div className="space-y-6">
                  <h2 className="font-display text-3xl italic text-rouge">Your details</h2>
                  <div>
                    <label className="label">Full name</label>
                    <input className="input" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} placeholder="Jane Doe" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Email</label>
                      <input type="email" className="input" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="label">Mobile number</label>
                      <input className="input" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} placeholder="+27 …" />
                    </div>
                  </div>
                </div>
              )}

              {step === 'delivery' && (
                <div className="space-y-6">
                  <h2 className="font-display text-3xl italic text-rouge">Delivery</h2>
                  <div>
                    <label className="label">How shall we deliver?</label>
                    <div className="grid sm:grid-cols-2 gap-3 mt-2">
                      <button onClick={() => setDelivery({ ...delivery, method: 'delivery' })}
                        className={`p-5 text-left border transition ${delivery.method === 'delivery' ? 'border-gold bg-gold/10' : 'border-ink/15 hover:border-ink/40'}`}>
                        <div className="font-display text-xl text-ink">Door delivery</div>
                        <div className="text-xs text-ink/60 mt-1">Hand-delivered in Gauteng. {sub >= BRAND.freeDeliveryThreshold ? 'Complimentary.' : `${formatPrice(BRAND.deliveryFlatFee)} flat.`}</div>
                      </button>
                      <button onClick={() => setDelivery({ ...delivery, method: 'collection' })}
                        className={`p-5 text-left border transition ${delivery.method === 'collection' ? 'border-gold bg-gold/10' : 'border-ink/15 hover:border-ink/40'}`}>
                        <div className="font-display text-xl text-ink">Studio collection</div>
                        <div className="text-xs text-ink/60 mt-1">Pick up from our Sandton atelier. Complimentary.</div>
                      </button>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Date</label>
                      <input type="date" className="input" value={delivery.date} onChange={(e) => setDelivery({ ...delivery, date: e.target.value })} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div>
                      <label className="label">Time window</label>
                      <select className="input bg-transparent" value={delivery.timeWindow} onChange={(e) => setDelivery({ ...delivery, timeWindow: e.target.value })}>
                        <option>Morning · 09:00 – 12:00</option>
                        <option>Afternoon · 12:00 – 16:00</option>
                        <option>Evening · 16:00 – 18:00</option>
                      </select>
                    </div>
                  </div>

                  {delivery.method === 'delivery' && (
                    <>
                      <div>
                        <label className="label">Delivery address</label>
                        <input className="input" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} placeholder="Street address" />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="label">City</label>
                          <input className="input" value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} placeholder="Johannesburg" />
                        </div>
                        <div>
                          <label className="label">Postal code</label>
                          <input className="input" value={customer.postalCode} onChange={(e) => setCustomer({ ...customer, postalCode: e.target.value })} placeholder="2196" />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="label">Recipient name (if a gift)</label>
                          <input className="input" value={delivery.recipientName} onChange={(e) => setDelivery({ ...delivery, recipientName: e.target.value })} />
                        </div>
                        <div>
                          <label className="label">Recipient phone</label>
                          <input className="input" value={delivery.recipientPhone} onChange={(e) => setDelivery({ ...delivery, recipientPhone: e.target.value })} />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="label">Card message (optional)</label>
                    <textarea rows={3} maxLength={220} className="w-full bg-transparent border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none" value={delivery.message} onChange={(e) => setDelivery({ ...delivery, message: e.target.value })} placeholder="A short, handwritten card included with the bouquet." />
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <h2 className="font-display text-3xl italic text-rouge">Payment</h2>
                  <p className="text-sm text-ink/60">Choose how you would like to settle. We will confirm details on WhatsApp.</p>
                  <div className="grid gap-3">
                    {[
                      { id: 'eft' as PaymentMethod, title: 'Bank Transfer (EFT)', body: 'We will send banking details via WhatsApp. Order is reserved on receipt of proof of payment.' },
                      { id: 'card-on-delivery' as PaymentMethod, title: 'Card on Delivery', body: 'Our courier will bring a portable card machine. Available in Gauteng.' },
                      { id: 'whatsapp-arranged' as PaymentMethod, title: 'Arrange via WhatsApp', body: 'Speak to us about a custom payment plan or invoice arrangement.' },
                    ].map((p) => (
                      <button key={p.id} onClick={() => setPayment(p.id)}
                        className={`p-5 text-left border transition ${payment === p.id ? 'border-gold bg-gold/10' : 'border-ink/15 hover:border-ink/40'}`}>
                        <div className="font-display text-lg">{p.title}</div>
                        <div className="text-xs text-ink/60 mt-1">{p.body}</div>
                      </button>
                    ))}
                  </div>
                  <div>
                    <label className="label">Any notes for the studio?</label>
                    <textarea rows={3} className="w-full bg-transparent border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold resize-none" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Allergies, palette preferences, the story behind the gesture…" />
                  </div>
                </div>
              )}

              {step === 'review' && (
                <div className="space-y-6">
                  <h2 className="font-display text-3xl italic text-rouge">Review your order</h2>
                  <div className="space-y-5 text-sm">
                    <Box label="Customer">
                      {customer.name}<br />
                      {customer.email}<br />
                      {customer.phone}
                    </Box>
                    <Box label={delivery.method === 'delivery' ? 'Delivery' : 'Collection'}>
                      {delivery.date} · {delivery.timeWindow}<br />
                      {delivery.method === 'delivery' ? `${customer.address}, ${customer.city} ${customer.postalCode}` : 'Sandton Atelier'}<br />
                      {delivery.recipientName && <>For: {delivery.recipientName}<br /></>}
                      {delivery.message && <em className="text-ink/60">"{delivery.message}"</em>}
                    </Box>
                    <Box label="Payment">
                      {payment === 'eft' ? 'Bank Transfer (EFT)' : payment === 'card-on-delivery' ? 'Card on Delivery' : 'Arranged via WhatsApp'}
                    </Box>
                  </div>

                  <div className="bg-ink text-ivory p-5 text-xs leading-relaxed">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-gold shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div>
                        When you place this order, a PDF invoice is downloaded to your device and
                        the order is opened directly in WhatsApp for our atelier to receive. The
                        composition is reserved as soon as we confirm receipt.
                      </div>
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-4 w-4 accent-gold" />
                    <span className="text-sm text-ink/70">
                      I agree to the order terms and understand my invoice will be downloaded and the order
                      will be sent to <strong>Rose Destiny</strong> on WhatsApp for confirmation.
                    </span>
                  </label>
                </div>
              )}

              {/* Actions */}
              <div className="mt-10 flex items-center justify-between">
                <button onClick={back} className="btn-ghost">
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                  {stepIndex === 0 ? 'Back to Bag' : 'Back'}
                </button>
                {step === 'review' ? (
                  <button onClick={placeOrder} disabled={!canAdvance()} className="btn-gold">
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                    Place Order & Send
                    <MessageCircle className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                ) : (
                  <button onClick={advance} disabled={!canAdvance()} className="btn-primary">Continue</button>
                )}
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="lg:col-span-5">
            <div className="bg-ink text-ivory p-7 lg:p-9 lg:sticky lg:top-32">
              <div className="eyebrow text-gold mb-6">Your composition</div>
              <ul className="space-y-4 max-h-[280px] overflow-y-auto pr-2 mb-5">
                {items.map((i) => (
                  <li key={i.id} className="flex gap-3">
                    <div className="w-14 h-16 bg-ivory/10 overflow-hidden shrink-0">
                      <SmartImage src={i.image} alt={i.name} className="w-full h-full" palette={['#C9A24C', '#8E1B2A']} />
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="font-display text-base text-ivory">{i.name}</div>
                      <div className="text-[10px] uppercase tracking-[0.22em] text-gold-200 mt-0.5">{i.sizeLabel} · ×{i.quantity}</div>
                    </div>
                    <div className="text-sm">{formatPrice(i.price * i.quantity)}</div>
                  </li>
                ))}
              </ul>

              <div className="hairline mb-5" />

              <div className="space-y-2 text-sm">
                <Row label="Subtotal" value={formatPrice(sub)} />
                <Row label="Delivery" value={deliveryFee === 0 ? 'Complimentary' : formatPrice(deliveryFee)} />
                <Row label="VAT (15%)" value={formatPrice(vat)} />
              </div>

              <div className="hairline my-5" />

              <div className="flex justify-between items-baseline">
                <span className="text-[11px] uppercase tracking-[0.28em] text-gold">Total</span>
                <span className="font-display text-3xl gold-text">{formatPrice(total)}</span>
              </div>

              <div className="mt-6 text-[10px] uppercase tracking-[0.22em] text-ivory/40 leading-relaxed">
                Order opens in WhatsApp for atelier confirmation. PDF invoice downloads automatically.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </PageWrapper>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-ivory/70">{label}</span>
      <span>{value}</span>
    </div>
  );
}

function Box({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border border-ink/10 p-5">
      <div className="text-[10px] uppercase tracking-[0.28em] text-gold-500 mb-2">{label}</div>
      <div className="text-ink/80 leading-relaxed">{children}</div>
    </div>
  );
}
