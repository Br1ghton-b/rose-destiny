import { Link } from 'react-router-dom';
import { Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';
import { BRAND } from '../lib/config';
import { whatsappEnquiryLink } from '../lib/whatsapp';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Services' },
  { href: '#why-us', label: 'Why Choose Us' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="bg-[#082c72] py-2 text-[11px] font-semibold text-white">
        <div className="container-x flex items-center justify-between gap-4">
          <span className="hidden sm:inline">Johannesburg & surrounding areas</span>
          <span className="mx-auto sm:mx-0">Professional cleaning services you can trust</span>
          <a href={`tel:${BRAND.phone}`} className="hidden items-center gap-1.5 hover:text-[#ff66bd] sm:flex"><Phone className="h-3 w-3" /> {BRAND.phone}</a>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="container-x flex items-center justify-between gap-6 py-3">
          <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setMobileOpen(false)}>
            <img src="/rose-destiny-logo.svg" alt="Rose Destiny Cleaning Services" className="h-24 w-auto object-contain" />
          </Link>
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => <a key={link.label} href={link.href} className="text-xs font-bold text-[#082c72] transition hover:text-[#ed168c]">{link.label}</a>)}
          </nav>
          <div className="flex items-center gap-3">
            <a href={whatsappEnquiryLink('Hello Rose Destiny, I would like to get a quote.')} target="_blank" rel="noreferrer" className="hidden rounded-full bg-[#ed168c] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#d90c7b] sm:inline-flex">Get a quote <span className="ml-2">→</span></a>
            <button type="button" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} className="rounded-lg p-2 text-[#082c72] lg:hidden" onClick={() => setMobileOpen((open) => !open)}>{mobileOpen ? <X /> : <Menu />}</button>
          </div>
        </div>
        {mobileOpen && <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden"><div className="container-x flex flex-col gap-4">{links.map((link) => <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm font-bold text-[#082c72]">{link.label}</a>)}<a href={whatsappEnquiryLink('Hello Rose Destiny, I would like to get a quote.')} target="_blank" rel="noreferrer" className="btn-pink mt-2 w-full">Get a quote</a></div></nav>}
      </header>
    </>
  );
}
