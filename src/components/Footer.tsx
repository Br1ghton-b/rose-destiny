import { Link } from 'react-router-dom';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';
import { BRAND } from '../lib/config';
import { whatsappEnquiryLink } from '../lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-ink text-ivory pt-24 pb-10 mt-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-30 pointer-events-none" />
      <div className="container-x relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <div className="font-display text-4xl mb-4">
              Rose <span className="text-rouge italic">Destiny</span>
            </div>
            <p className="text-ivory/70 max-w-md leading-relaxed">
              A South African floral atelier composing roses, proteas and the unexpected into hand-tied
              gestures. Delivered with discretion and care across Gauteng.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <a href={BRAND.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                className="h-10 w-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-ink transition">
                <Instagram className="h-4 w-4" strokeWidth={1.25} />
              </a>
              <a href={BRAND.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
                className="h-10 w-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-ink transition">
                <Facebook className="h-4 w-4" strokeWidth={1.25} />
              </a>
              <a href={whatsappEnquiryLink('Hello Rose Destiny, I would love to enquire about…')} target="_blank" rel="noreferrer" aria-label="WhatsApp"
                className="h-10 w-10 rounded-full border border-gold/40 flex items-center justify-center hover:bg-gold hover:text-ink transition">
                <MessageCircle className="h-4 w-4" strokeWidth={1.25} />
              </a>
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Atelier</h4>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li><Link to="/about" className="hover:text-gold transition">Our Story</Link></li>
              <li><Link to="/journal" className="hover:text-gold transition">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition">Contact</Link></li>
              <li><Link to="/account" className="hover:text-gold transition">My Account</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Shop</h4>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li><Link to="/shop/signature-bouquets" className="hover:text-gold transition">Signature Bouquets</Link></li>
              <li><Link to="/shop/roses" className="hover:text-gold transition">Roses</Link></li>
              <li><Link to="/shop/proteas-natives" className="hover:text-gold transition">Proteas & Natives</Link></li>
              <li><Link to="/shop/chrysanthemums" className="hover:text-gold transition">Chrysanthemums</Link></li>
              <li><Link to="/shop/ranunculus" className="hover:text-gold transition">Ranunculus</Link></li>
              <li><Link to="/shop/gift-collections" className="hover:text-gold transition">Gift Collections</Link></li>
            </ul>
          </div>

          <div className="md:col-span-1">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Services</h4>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li><Link to="/weddings" className="hover:text-gold transition">Weddings & Events</Link></li>
              <li><Link to="/sympathy" className="hover:text-gold transition">Sympathy</Link></li>
              <li><Link to="/wholesale" className="hover:text-gold transition">Wholesale</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-5">Studio</h4>
            <ul className="space-y-3 text-sm text-ivory/80">
              <li>{BRAND.address}</li>
              <li><a href={`tel:${BRAND.phone}`} className="hover:text-gold transition">{BRAND.phone}</a></li>
              <li><a href={`mailto:${BRAND.email}`} className="hover:text-gold transition">{BRAND.email}</a></li>
              <li className="text-ivory/60">{BRAND.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ivory/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-ivory/40">
          <span>© {new Date().getFullYear()} {BRAND.name}. Composed with care in Johannesburg.</span>
          <div className="flex gap-6">
            <Link to="/contact" className="hover:text-gold transition">Care Guide</Link>
            <Link to="/contact" className="hover:text-gold transition">Delivery</Link>
            <Link to="/contact" className="hover:text-gold transition">Returns</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
