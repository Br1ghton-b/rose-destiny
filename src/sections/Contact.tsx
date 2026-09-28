import { useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import { Reveal } from '../components/ui';
import { BRAND } from '../lib/config';
import { SERVICE_CATEGORIES, SERVICE_OPTIONS } from '../lib/content';
import { whatsappEnquiryLink } from '../lib/whatsapp';

const PREMISES = [
  'Office / corporate',
  'Medical practice',
  'School / educational facility',
  'Guesthouse / hospitality',
  'Retail business',
  'Salon / beauty establishment',
  'Church / community organisation',
  'Residential complex',
  'Warehouse / commercial facility',
  'Home',
  'Other',
];

const REQUEST_TYPES = ['Free Site Assessment', 'Quote'] as const;
type RequestType = (typeof REQUEST_TYPES)[number];
type Channel = 'whatsapp' | 'email';

type FormState = {
  type: RequestType;
  name: string;
  company: string;
  phone: string;
  email: string;
  premises: string;
  service: string;
  frequency: string;
  message: string;
};

const empty: FormState = {
  type: 'Free Site Assessment',
  name: '',
  company: '',
  phone: '',
  email: '',
  premises: '',
  service: '',
  frequency: '',
  message: '',
};

const subject = (f: FormState) => `${f.type} Request — ${f.name}`;

/** Plain-text body; WhatsApp gets a bold heading, email gets it as the subject. */
function buildMessage(f: FormState, channel: Channel) {
  const lines = channel === 'whatsapp' ? [`*${f.type} Request — ${BRAND.fullName}*`, ''] : [`Hello ${BRAND.fullName},`, '', `I would like to request a ${f.type.toLowerCase()}.`, ''];
  lines.push(`Name: ${f.name}`);
  if (f.company) lines.push(`Company: ${f.company}`);
  lines.push(`Phone: ${f.phone}`);
  if (f.email) lines.push(`Email: ${f.email}`);
  if (f.premises) lines.push(`Premises: ${f.premises}`);
  if (f.service) lines.push(`Service: ${f.service}`);
  if (f.frequency) lines.push(`Frequency: ${f.frequency}`);
  if (f.message) lines.push('', `Details: ${f.message}`);
  return lines.join('\n');
}

const emailLink = (f: FormState) =>
  `mailto:${BRAND.email}?subject=${encodeURIComponent(subject(f))}&body=${encodeURIComponent(buildMessage(f, 'email'))}`;

function send(f: FormState, channel: Channel) {
  if (channel === 'whatsapp') window.open(whatsappEnquiryLink(buildMessage(f, 'whatsapp')), '_blank', 'noopener,noreferrer');
  else window.location.href = emailLink(f);
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(empty);
  const [sent, setSent] = useState<Channel | null>(null);
  const channel = useRef<Channel>('whatsapp');

  const set = (key: keyof FormState) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    send(form, channel.current);
    setSent(channel.current);
  };

  const contactItems = [
    { icon: Phone, label: 'Call us', value: BRAND.phoneDisplay, href: `tel:${BRAND.phone}` },
    { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
    { icon: MapPin, label: 'Service area', value: BRAND.address },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-b from-pearl to-rose-50/60 py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-navy-100/60 blur-3xl" />
      <div className="container-x relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <Reveal>
            <p className="kicker">Let's Work Together</p>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              Request a free <span className="font-script text-[1.2em] font-normal text-rose-500">assessment</span> or quote
            </h2>
            <p className="mt-6 text-[16.5px] leading-8 text-navy-600/85">
              We would be pleased to visit your premises, assess your cleaning requirements and prepare a customised quotation.
            </p>
            <p className="mt-4 text-[15px] leading-7 text-navy-500">
              No two businesses have exactly the same cleaning requirements. Our proposal is based on the size of your premises,
              frequency of service, scope of work and specific requirements.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-3">
              {contactItems.map(({ icon: Icon, label, value, href }) => {
                const inner = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-rose-500 shadow-soft ring-1 ring-rose-100">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-400">{label}</span>
                      <span className="block break-words font-medium text-navy-800">{value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={label}>
                    {href ? (
                      <a href={href} className="flex items-center gap-4 rounded-2xl p-2 transition hover:bg-white/70">
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 p-2">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 font-display text-xl italic tracking-wide text-navy-500">Professional · Reliable · Thorough</p>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="min-w-0 lg:col-span-7">
          <div className="relative rounded-[2.25rem] border border-white bg-white/90 p-7 shadow-lift backdrop-blur sm:p-10">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[28rem] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-100">
                    <CheckCircle2 className="h-8 w-8" strokeWidth={1.5} />
                  </span>
                  <h3 className="mt-6 text-3xl font-semibold">Almost there, {form.name.split(' ')[0]}!</h3>
                  <p className="mt-3 max-w-sm leading-7 text-navy-600/80">
                    Your {form.type.toLowerCase()} request has opened in {sent === 'whatsapp' ? 'WhatsApp' : 'your email app'} — just
                    press send and our team will be in touch.
                  </p>
                  {sent === 'email' && (
                    <p className="mt-3 max-w-sm text-sm text-navy-500">
                      Email app didn't open? Write to us at <span className="font-semibold text-navy-700">{BRAND.email}</span>.
                    </p>
                  )}
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <button type="button" onClick={() => send(form, sent)} className="btn-rose">
                      {sent === 'whatsapp' ? <MessageCircle className="h-4 w-4" /> : <Mail className="h-4 w-4" />} Try again
                    </button>
                    <button
                      type="button"
                      className="btn-outline"
                      onClick={() => {
                        setForm(empty);
                        setSent(null);
                      }}
                    >
                      New request
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <h3 className="text-3xl font-semibold">Tell us about your space</h3>
                    <p className="mt-1.5 text-sm text-navy-500">Share a few details and choose how you'd like to send your request.</p>
                  </div>
                  <fieldset className="sm:col-span-2">
                    <legend className="field-label">I would like a *</legend>
                    <div className="mt-1 grid grid-cols-2 gap-1 rounded-full bg-navy-50 p-1">
                      {REQUEST_TYPES.map((t) => {
                        const on = form.type === t;
                        return (
                          <button
                            key={t}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setForm((f) => ({ ...f, type: t }))}
                            className={`rounded-full px-4 py-2.5 text-[13px] font-semibold transition ${
                              on ? 'bg-white text-rose-600 shadow-soft' : 'text-navy-500 hover:text-navy-700'
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <label>
                    <span className="field-label">Full name *</span>
                    <input required autoComplete="name" className="field" value={form.name} onChange={set('name')} placeholder="Your name" />
                  </label>
                  <label>
                    <span className="field-label">Company</span>
                    <input autoComplete="organization" className="field" value={form.company} onChange={set('company')} placeholder="Business name (optional)" />
                  </label>
                  <label>
                    <span className="field-label">Phone *</span>
                    <input required type="tel" autoComplete="tel" className="field" value={form.phone} onChange={set('phone')} placeholder="073 000 0000" />
                  </label>
                  <label>
                    <span className="field-label">Email</span>
                    <input type="email" autoComplete="email" className="field" value={form.email} onChange={set('email')} placeholder="you@company.co.za" />
                  </label>
                  <label>
                    <span className="field-label">Type of premises</span>
                    <select className="field" value={form.premises} onChange={set('premises')}>
                      <option value="">Select…</option>
                      {PREMISES.map((p) => (
                        <option key={p}>{p}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="field-label">Service required</span>
                    <select className="field" value={form.service} onChange={set('service')}>
                      <option value="">Select…</option>
                      {SERVICE_CATEGORIES.map((s) => (
                        <option key={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </label>
                  <fieldset className="sm:col-span-2">
                    <legend className="field-label">Preferred frequency</legend>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((o) => {
                        const on = form.frequency === o.title;
                        return (
                          <button
                            key={o.title}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setForm((f) => ({ ...f, frequency: on ? '' : o.title }))}
                            className={`rounded-full border px-4 py-2 text-[13px] font-medium transition ${
                              on ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-navy-100 bg-pearl text-navy-600 hover:border-navy-200'
                            }`}
                          >
                            {o.title}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>
                  <label className="sm:col-span-2">
                    <span className="field-label">Tell us more</span>
                    <textarea
                      rows={4}
                      className="field resize-none"
                      value={form.message}
                      onChange={set('message')}
                      placeholder="Size of premises, areas that need attention, preferred start date…"
                    />
                  </label>
                  <div className="sm:col-span-2">
                    <p className="field-label">Send my request via</p>
                    <div className="mt-1 grid gap-3 sm:grid-cols-2">
                      <button type="submit" onClick={() => (channel.current = 'whatsapp')} className="btn-rose w-full">
                        <MessageCircle className="h-4 w-4" /> WhatsApp
                      </button>
                      <button type="submit" onClick={() => (channel.current = 'email')} className="btn-outline w-full">
                        <Send className="h-4 w-4" /> Email
                      </button>
                    </div>
                    <p className="mt-3 text-center text-xs text-navy-400">
                      Your message opens pre-filled in WhatsApp or your email app, ready to send.
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
