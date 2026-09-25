import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '../lib/config';
import { whatsappEnquiryLink } from '../lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-[#082c72] pb-8 pt-16 text-white">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5"><img src="/rose-destiny-logo.svg" alt="Rose Destiny Cleaning Services" className="w-32 rounded bg-white p-2" /><p className="mt-6 max-w-md leading-7 text-white/70">Professional, reliable and affordable cleaning services for homes, businesses and commercial spaces across Johannesburg and surrounding areas.</p><div className="mt-7 flex gap-3"><a href={BRAND.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#ed168c] hover:bg-[#ed168c]"><Instagram className="h-4 w-4" /></a><a href={BRAND.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#ed168c] hover:bg-[#ed168c]"><Facebook className="h-4 w-4" /></a><a href={whatsappEnquiryLink('Hello Rose Destiny, I would like to enquire about your cleaning services.')} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:border-[#ed168c] hover:bg-[#ed168c]"><MessageCircle className="h-4 w-4" /></a></div></div>
          <div className="md:col-span-3"><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff66bd]">Quick links</h3><ul className="mt-5 space-y-3 text-sm text-white/75"><li><Link to="/" className="hover:text-white">Home</Link></li><li><Link to="/about" className="hover:text-white">About us</Link></li><li><Link to="/contact" className="hover:text-white">Our services</Link></li><li><Link to="/contact" className="hover:text-white">Contact</Link></li></ul></div>
          <div className="md:col-span-4"><h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff66bd]">Get in touch</h3><ul className="mt-5 space-y-4 text-sm text-white/75"><li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff66bd]" />{BRAND.address}</li><li><a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 hover:text-white"><Phone className="h-4 w-4 text-[#ff66bd]" />{BRAND.phone}</a></li><li><a href={`mailto:${BRAND.email}`} className="flex items-center gap-3 hover:text-white"><Mail className="h-4 w-4 text-[#ff66bd]" />{BRAND.email}</a></li></ul></div>
        </div>
        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-white/15 pt-6 text-xs text-white/45 sm:flex-row"><span>© {new Date().getFullYear()} Rose Destiny Cleaning Services. All rights reserved.</span><span>Clean spaces · Healthier lives</span></div>
      </div>
    </footer>
  );
}
