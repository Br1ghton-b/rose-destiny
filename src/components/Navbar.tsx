import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Facebook, Instagram, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { BRAND } from '../lib/config';
import { SECTIONS } from '../lib/content';
import { onAnchorClick, useActiveSection } from '../lib/scroll';

const ids = SECTIONS.map((s) => s.id);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    onAnchorClick(event);
  };

  return (
    <>
      <div className="hidden bg-navy-700 text-[12px] text-white/85 md:block">
        <div className="container-x flex h-10 items-center justify-between">
          <div className="flex items-center gap-7">
            <a href={`tel:${BRAND.phone}`} className="inline-flex items-center gap-2 transition hover:text-rose-200">
              <Phone className="h-3.5 w-3.5 text-rose-300" /> {BRAND.phoneDisplay}
            </a>
            <a href={`mailto:${BRAND.email}`} className="inline-flex items-center gap-2 transition hover:text-rose-200">
              <Mail className="h-3.5 w-3.5 text-rose-300" /> {BRAND.email}
            </a>
            <span className="hidden items-center gap-2 lg:inline-flex">
              <MapPin className="h-3.5 w-3.5 text-rose-300" /> {BRAND.address}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="font-script text-lg text-rose-100">Clean Spaces · Healthier Lives</span>
            <a href={BRAND.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="transition hover:text-rose-200">
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a href={BRAND.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition hover:text-rose-200">
              <Instagram className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-white/85 shadow-[0_10px_40px_-20px_rgba(45,64,107,0.35)] backdrop-blur-xl' : 'bg-pearl/70 backdrop-blur'
        }`}
      >
        <div className={`container-x flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'h-[76px]' : 'h-[100px]'}`}>
          <a href="#home" onClick={go} className="shrink-0" aria-label={`${BRAND.fullName} — back to top`}>
            <img
              src="/images/logo.png"
              alt={BRAND.fullName}
              className={`w-auto transition-all duration-500 ${scrolled ? 'h-14' : 'h-[84px]'}`}
            />
          </a>

          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            {SECTIONS.map((s) => {
              const isActive = active === s.id;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={go}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-3.5 py-2 text-[13px] font-medium transition ${isActive ? 'text-rose-500' : 'text-navy-700 hover:text-rose-500'}`}
                >
                  {s.label}
                  {isActive && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-3.5 -bottom-0.5 h-px bg-rose-400" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a href="#contact" onClick={go} className="btn-rose hidden !px-6 !py-3 sm:inline-flex">
              Get a Quote <ArrowRight className="h-4 w-4" />
            </a>
            <button
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-100 bg-white text-navy-700 xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label="Mobile"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden border-t border-navy-100 bg-white xl:hidden"
            >
              <div className="container-x flex max-h-[calc(100dvh-88px)] flex-col overflow-y-auto py-4">
                {SECTIONS.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={go}
                    className={`flex items-center justify-between border-b border-navy-50 py-3.5 font-display text-2xl ${active === s.id ? 'text-rose-500' : 'text-navy-800'}`}
                  >
                    {s.label}
                    <ArrowRight className="h-4 w-4 opacity-40" />
                  </a>
                ))}
                <a href="#contact" onClick={go} className="btn-rose mt-5 w-full">
                  Request a Free Site Assessment
                </a>
                <a href={`tel:${BRAND.phone}`} className="mt-4 inline-flex items-center justify-center gap-2 text-sm text-navy-600">
                  <Phone className="h-4 w-4 text-rose-400" /> {BRAND.phoneDisplay}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
