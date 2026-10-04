import { ArrowUp, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '../lib/config';
import { TikTok } from './ui';
import { SECTIONS, SERVICE_CATEGORIES } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';
import { whatsappEnquiryLink } from '../lib/whatsapp';

const socials = [
  { icon: Facebook, label: 'Facebook', href: BRAND.social.facebook },
  { icon: Instagram, label: 'Instagram', href: BRAND.social.instagram },
  { icon: TikTok, label: 'TikTok', href: BRAND.social.tiktok },
  { icon: MessageCircle, label: 'WhatsApp', href: whatsappEnquiryLink('Hello Rose Destiny, I would like to enquire about your cleaning services.') },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-navy-100 bg-white">
      <div aria-hidden className="h-1 bg-gradient-to-r from-navy-300 via-rose-300 to-navy-300" />
      {/* On phones Explore and Services share a row; the brand and contact blocks span both columns. */}
      <div className="container-x grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-x-6 gap-y-10 py-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:py-16">
        <div className="col-span-2 md:col-span-1 lg:col-span-4">
          <img src="/images/logo.webp" alt={BRAND.fullName} width={480} height={347} loading="lazy" className="h-28 w-auto" />
          <p className="mt-6 max-w-sm text-[15px] leading-7 text-navy-600/80">
            Reliable, thorough and consistent cleaning solutions for businesses, organisations and homes across Johannesburg.
          </p>
          <p className="mt-4 font-script text-3xl text-rose-500">Clean Spaces · Healthier Lives</p>
          <div className="mt-6 flex gap-2.5">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 text-navy-600 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-500">Explore</h3>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} onClick={onAnchorClick} className="text-navy-600 transition hover:text-rose-500">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-500">Services</h3>
          <ul className="mt-5 space-y-2.5 text-[15px]">
            {SERVICE_CATEGORIES.map((s) => (
              <li key={s.title}>
                <a href="#services" onClick={onAnchorClick} className="text-navy-600 transition hover:text-rose-500">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-rose-500">Get in Touch</h3>
          <ul className="mt-5 space-y-4 text-[15px] text-navy-600">
            <li>
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 transition hover:text-rose-500">
                <Phone className="h-4 w-4 text-rose-400" /> {BRAND.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 transition hover:text-rose-500">
                <Mail className="h-4 w-4 shrink-0 text-rose-400" /> <span className="min-w-0 break-all">{BRAND.email}</span>
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="h-4 w-4 shrink-0 text-rose-400" /> {BRAND.address}
            </li>
          </ul>
          <a href="#contact" onClick={onAnchorClick} className="btn-rose mt-7 !px-6 !py-3">
            Free Site Assessment
          </a>
        </div>
      </div>

      <div className="border-t border-navy-100 bg-pearl">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-400 sm:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">Professional · Reliable · Thorough</span>
          <a href="#home" onClick={onAnchorClick} className="inline-flex items-center gap-1.5 transition hover:text-rose-500">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
