import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Four-point sparkle from the logo. */
export function Sparkle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12 0c.9 6.4 5.6 11.1 12 12-6.4.9-11.1 5.6-12 12-.9-6.4-5.6-11.1-12-12C6.4 11.1 11.1 6.4 12 0z" />
    </svg>
  );
}

/** TikTok logo (lucide-react has no brand icon for it); sized and coloured like a lucide icon. */
export function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48z" />
    </svg>
  );
}

export function Heading({
  kicker,
  title,
  accent,
  text,
  align = 'center',
  tone = 'light',
}: {
  kicker: string;
  title: string;
  accent?: string;
  text?: string;
  align?: 'center' | 'left';
  tone?: 'light' | 'dark';
}) {
  const centered = align === 'center';
  const dark = tone === 'dark';
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-xl'}>
      <p className={`kicker ${dark ? 'text-rose-200 before:bg-rose-200/60' : ''}`}>{kicker}</p>
      <h2 className={`mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.4rem] ${dark ? 'text-white' : ''}`}>
        {title}
        {accent && (
          <>
            {' '}
            <span className={`font-script text-[1.2em] font-normal ${dark ? 'text-rose-200' : 'text-rose-500'}`}>{accent}</span>
          </>
        )}
      </h2>
      {text && <p className={`mt-5 text-base leading-7 sm:text-[17px] ${dark ? 'text-white/75' : 'text-navy-600/80'}`}>{text}</p>}
    </div>
  );
}
