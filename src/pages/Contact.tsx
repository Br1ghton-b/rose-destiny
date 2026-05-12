import { useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { BRAND } from '../lib/config';
import { whatsappEnquiryLink } from '../lib/whatsapp';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New Enquiry — ${BRAND.name}*\n\nFrom: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nSubject: ${form.subject}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <PageWrapper>
      <section className="container-x pt-16 lg:pt-24 pb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="eyebrow justify-center mb-5">Get in touch</div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl leading-[1.04]">
            Tell us the <span className="italic text-rouge">moment.</span>
            <br />We will compose it.
          </h1>
          <p className="mt-6 text-ink/70 text-lg leading-relaxed">
            For orders, bespoke commissions, weddings, corporate accounts or simply to say hello —
            we read every message personally.
          </p>
        </div>
      </section>

      <section className="container-x pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-ivory border border-gold/20 p-8 lg:p-12">
              {sent ? (
                <div className="text-center py-16">
                  <div className="font-display text-4xl italic text-rouge mb-4">Thank you.</div>
                  <p className="text-ink/70 max-w-md mx-auto">
                    Your enquiry has been prepared in WhatsApp. Send it through and we will respond
                    within the hour during studio hours.
                  </p>
                  <button onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', subject: 'General Enquiry', message: '' }); }} className="btn-outline mt-8">Send another</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Your name</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label className="label">Email</label>
                      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="label">Phone</label>
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input" placeholder="+27 …" />
                    </div>
                    <div>
                      <label className="label">Reason</label>
                      <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input bg-transparent">
                        <option>General Enquiry</option>
                        <option>Bespoke Commission</option>
                        <option>Wedding</option>
                        <option>Corporate Account</option>
                        <option>Care Question</option>
                        <option>Delivery</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="label">Tell us about the moment</label>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" placeholder="When is it? Who is it for? What feeling are we composing?" />
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto">
                    Send Enquiry
                    <Send className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                  <p className="text-xs text-ink/50">By sending, we will open WhatsApp prefilled with your message for direct delivery to our atelier.</p>
                </form>
              )}
            </div>
          </div>

          {/* Studio details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-display text-2xl italic text-rouge mb-4">The Studio</h3>
              <div className="space-y-3">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <span className="text-ink/75">{BRAND.address}</span>
                </div>
                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <a href={`tel:${BRAND.phone}`} className="text-ink/75 hover:text-gold-500 transition">{BRAND.phone}</a>
                </div>
                <div className="flex gap-4">
                  <Mail className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <a href={`mailto:${BRAND.email}`} className="text-ink/75 hover:text-gold-500 transition">{BRAND.email}</a>
                </div>
                <div className="flex gap-4">
                  <MessageCircle className="h-5 w-5 text-gold-500 mt-0.5 shrink-0" strokeWidth={1.5} />
                  <a href={whatsappEnquiryLink('Hello Rose Destiny!')} target="_blank" rel="noreferrer" className="text-ink/75 hover:text-gold-500 transition">WhatsApp the atelier</a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-display text-2xl italic text-rouge mb-4">Studio Hours</h3>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-ink/10"><td className="py-2 text-ink/60">Mon – Fri</td><td className="py-2 text-right">08:00 – 18:00</td></tr>
                  <tr className="border-b border-ink/10"><td className="py-2 text-ink/60">Saturday</td><td className="py-2 text-right">08:00 – 14:00</td></tr>
                  <tr><td className="py-2 text-ink/60">Sunday</td><td className="py-2 text-right">By appointment</td></tr>
                </tbody>
              </table>
            </div>

            <div className="bg-ink text-ivory p-8">
              <div className="eyebrow text-gold mb-4">Delivery</div>
              <p className="text-ivory/75 text-sm leading-relaxed">
                Same-day delivery across Johannesburg & Pretoria for orders placed before 11:00.
                Nationwide and international delivery by arrangement. Complimentary on orders over R1,500.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
