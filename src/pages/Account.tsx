import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ChevronRight, LogOut, Pencil, Package, User as UserIcon } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { useAuth } from '../stores/auth';
import { formatPrice } from '../lib/format';
import { BRAND } from '../lib/config';

type Tab = 'orders' | 'profile' | 'addresses';

export default function Account() {
  const navigate = useNavigate();
  const user = useAuth((s) => s.currentUser());
  const logout = useAuth((s) => s.logout);
  const updateProfile = useAuth((s) => s.updateProfile);
  const [tab, setTab] = useState<Tab>('orders');
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
    city: user?.city ?? '',
    postalCode: user?.postalCode ?? '',
  });
  const [saved, setSaved] = useState(false);

  if (!user) {
    navigate('/login', { replace: true });
    return null;
  }

  const save = () => {
    updateProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <PageWrapper>
      <section className="container-x py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="bg-ink text-ivory p-8">
              <div className="h-14 w-14 rounded-full bg-gold-gradient flex items-center justify-center text-ink font-display text-xl">
                {user.name
                  .split(' ')
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>
              <div className="mt-5">
                <div className="font-display text-2xl italic">{user.name}</div>
                <div className="text-xs text-ivory/60 mt-1">{user.email}</div>
                <div className="text-[10px] uppercase tracking-[0.24em] text-gold mt-3">
                  Member since {new Date(user.createdAt).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })}
                </div>
              </div>

              <nav className="mt-8 space-y-1">
                {([
                  { id: 'orders' as Tab, label: 'My Orders', icon: Package, count: user.orders.length },
                  { id: 'profile' as Tab, label: 'Profile', icon: UserIcon },
                  { id: 'addresses' as Tab, label: 'Addresses', icon: ChevronRight },
                ]).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-sm transition ${
                      tab === t.id
                        ? 'bg-gold text-ink'
                        : 'text-ivory/80 hover:text-gold'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <t.icon className="h-4 w-4" strokeWidth={1.5} />
                      {t.label}
                    </span>
                    {typeof t.count === 'number' && (
                      <span className="text-[10px] uppercase tracking-[0.22em] opacity-70">{t.count}</span>
                    )}
                  </button>
                ))}
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-ivory/60 hover:text-rouge transition mt-4 border-t border-ivory/10 pt-5"
                >
                  <LogOut className="h-4 w-4" strokeWidth={1.5} />
                  Sign out
                </button>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-8">
            {tab === 'orders' && (
              <div>
                <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <div className="eyebrow mb-3">Order History</div>
                    <h1 className="font-display text-4xl md:text-5xl">
                      Your <span className="italic text-rouge">compositions</span>
                    </h1>
                  </div>
                  <Link to="/shop" className="btn-outline">Order Again</Link>
                </div>

                {user.orders.length === 0 ? (
                  <div className="bg-ivory border border-gold/20 p-12 text-center">
                    <Package className="h-10 w-10 text-gold-500 mx-auto" strokeWidth={1.25} />
                    <h3 className="font-display text-2xl italic text-rouge mt-5">No orders just yet</h3>
                    <p className="text-ink/60 mt-2 max-w-sm mx-auto">
                      When you place your first order, it will live here for easy reordering.
                    </p>
                    <Link to="/shop" className="btn-primary mt-8 inline-flex">Browse the Collection</Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {user.orders.map((o) => (
                      <article key={o.orderId} className="bg-ivory border border-ink/10 hover:border-gold/40 transition p-6 lg:p-7">
                        <header className="flex items-center justify-between flex-wrap gap-4 pb-5 border-b border-ink/10">
                          <div>
                            <div className="text-[10px] uppercase tracking-[0.28em] text-gold-500">Order</div>
                            <div className="font-display text-xl mt-0.5">{o.orderId}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-[0.28em] text-ink/50">Placed</div>
                            <div className="text-sm mt-0.5">{new Date(o.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-[0.28em] text-ink/50">Status</div>
                            <div className="inline-flex items-center gap-1.5 mt-0.5 text-sm">
                              <span className={`h-1.5 w-1.5 rounded-full ${
                                o.status === 'delivered' ? 'bg-green-600' :
                                o.status === 'confirmed' ? 'bg-gold' : 'bg-rouge'
                              }`} />
                              {o.status === 'pending' ? 'Awaiting confirmation' : o.status}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] uppercase tracking-[0.28em] text-ink/50">Total</div>
                            <div className="font-display text-xl text-rouge mt-0.5">{formatPrice(o.total)}</div>
                          </div>
                        </header>
                        <ul className="mt-5 space-y-1.5 text-sm text-ink/75">
                          {o.items.map((i) => (
                            <li key={i.id} className="flex items-center justify-between gap-4">
                              <span><span className="text-gold mr-2">✦</span>{i.quantity} × {i.name} <span className="text-ink/50">({i.sizeLabel})</span></span>
                              <span>{formatPrice(i.price * i.quantity)}</span>
                            </li>
                          ))}
                        </ul>
                        <footer className="mt-5 pt-5 border-t border-ink/10 flex items-center justify-between flex-wrap gap-3 text-xs text-ink/60">
                          <span>
                            {o.deliveryMethod === 'delivery' ? 'Delivery' : 'Collection'} · {o.deliveryDate} · {o.deliveryTimeWindow}
                          </span>
                          {o.message && <em className="font-display text-rouge">"{o.message}"</em>}
                        </footer>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'profile' && (
              <div>
                <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <div className="eyebrow mb-3">Profile</div>
                    <h1 className="font-display text-4xl md:text-5xl">
                      Your <span className="italic text-rouge">details</span>
                    </h1>
                  </div>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="btn-outline">
                      <Pencil className="h-4 w-4" strokeWidth={1.5} /> Edit
                    </button>
                  ) : (
                    <button onClick={save} className="btn-gold">
                      <Check className="h-4 w-4" strokeWidth={1.5} /> Save
                    </button>
                  )}
                </div>

                {saved && (
                  <div className="mb-6 px-4 py-3 bg-gold/15 border border-gold/40 text-sm">
                    Your profile has been updated.
                  </div>
                )}

                <div className="bg-ivory border border-gold/20 p-8 lg:p-10 grid sm:grid-cols-2 gap-6">
                  <Field
                    label="Full name"
                    value={form.name}
                    editing={editing}
                    onChange={(v) => setForm({ ...form, name: v })}
                  />
                  <Field label="Email" value={user.email} editing={false} />
                  <Field
                    label="Phone"
                    value={form.phone}
                    editing={editing}
                    onChange={(v) => setForm({ ...form, phone: v })}
                  />
                </div>
              </div>
            )}

            {tab === 'addresses' && (
              <div>
                <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
                  <div>
                    <div className="eyebrow mb-3">Addresses</div>
                    <h1 className="font-display text-4xl md:text-5xl">
                      Default <span className="italic text-rouge">delivery</span>
                    </h1>
                  </div>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="btn-outline">
                      <Pencil className="h-4 w-4" strokeWidth={1.5} /> Edit
                    </button>
                  ) : (
                    <button onClick={save} className="btn-gold">
                      <Check className="h-4 w-4" strokeWidth={1.5} /> Save
                    </button>
                  )}
                </div>

                {saved && (
                  <div className="mb-6 px-4 py-3 bg-gold/15 border border-gold/40 text-sm">
                    Your address has been updated.
                  </div>
                )}

                <div className="bg-ivory border border-gold/20 p-8 lg:p-10 grid sm:grid-cols-2 gap-6">
                  <Field
                    label="Street address"
                    value={form.address}
                    editing={editing}
                    onChange={(v) => setForm({ ...form, address: v })}
                    full
                  />
                  <Field
                    label="City"
                    value={form.city}
                    editing={editing}
                    onChange={(v) => setForm({ ...form, city: v })}
                  />
                  <Field
                    label="Postal code"
                    value={form.postalCode}
                    editing={editing}
                    onChange={(v) => setForm({ ...form, postalCode: v })}
                  />
                </div>

                <p className="mt-6 text-xs text-ink/50">
                  Deliveries are available across Gauteng same-day. Nationwide and international by arrangement —
                  enquire via WhatsApp ({BRAND.phone}).
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

function Field({
  label,
  value,
  editing,
  onChange,
  full,
}: {
  label: string;
  value: string;
  editing: boolean;
  onChange?: (v: string) => void;
  full?: boolean;
}) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className="label">{label}</label>
      {editing && onChange ? (
        <input className="input" value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <div className="py-3 text-sm text-ink/80 border-b border-ink/10">{value || <span className="text-ink/30">—</span>}</div>
      )}
    </div>
  );
}
