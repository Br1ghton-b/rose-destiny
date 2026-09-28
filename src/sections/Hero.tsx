import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { Sparkle } from '../components/ui';
import { HIGHLIGHTS } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    // Runs up behind the (transparent at the top) 100px header so the glows aren't cut off at its edge.
    <section id="home" className="relative -mt-[100px] overflow-hidden bg-pearl pt-[100px]">
      {/* Soft ambient glows */}
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-navy-100/70 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-rose-100 blur-3xl" />
      <svg aria-hidden viewBox="0 0 1440 200" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-white">
        <path d="M0 140C240 60 480 60 720 120s480 80 720-40v120H0z" fill="currentColor" />
        <path d="M0 150C260 80 520 90 760 140s440 50 680-50" fill="none" stroke="#F6CDE0" strokeWidth="2" />
        <path d="M0 165C300 110 540 120 780 160s420 30 660-40" fill="none" stroke="#CCD8EF" strokeWidth="1.5" />
      </svg>

      <div className="container-x relative grid items-center gap-14 pb-20 pt-10 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-14">
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="kicker">
            Professional Cleaning Services
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease }}
            className="mt-6 text-[3.4rem] font-semibold leading-[0.95] sm:text-7xl xl:text-[5.4rem]"
          >
            Clean Spaces.
            <span className="mt-1 block font-script text-[1.25em] font-normal leading-[1.05] text-rose-500">Healthier Lives.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease }}
            className="mt-6 max-w-lg text-[17px] leading-8 text-navy-600/85"
          >
            Reliable, thorough and consistent cleaning for offices, businesses, homes and hospitality spaces across
            Johannesburg — because a clean space is a healthier, happier space.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <a href="#contact" onClick={onAnchorClick} className="btn-rose group">
              Book Your Cleaning Today <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </a>
            <a href="#services" onClick={onAnchorClick} className="btn-outline">
              Explore Services
            </a>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-11 flex flex-wrap gap-x-7 gap-y-4 border-t border-navy-100 pt-7 text-[13px] font-medium text-navy-700"
          >
            {[
              { icon: ShieldCheck, label: 'Trusted & Reliable' },
              { icon: Leaf, label: 'Eco-Friendly Products' },
              { icon: Sparkles, label: 'Trained & Professional Team' },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="inline-flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-500 ring-1 ring-rose-100">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          className="relative mx-auto w-full max-w-[26rem] lg:col-span-6 lg:max-w-[28rem] xl:col-start-8 xl:col-span-5"
        >
          {/* Offset arch outline */}
          <div aria-hidden className="absolute -right-4 -top-4 bottom-4 left-4 rounded-t-full border border-rose-300/70 sm:-right-6 sm:-top-6 sm:bottom-6 sm:left-6" />
          <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[2rem] bg-navy-50 shadow-lift">
            <img
              src="/images/hero.jpg"
              alt="A smiling cleaner pulling on gloves in a bright, airy bedroom"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/25 via-transparent to-transparent" />
          </div>

          <Sparkle className="absolute -top-2 right-6 h-8 w-8 animate-twinkle text-navy-500" />
          <Sparkle className="absolute right-0 top-10 h-4 w-4 animate-twinkle text-rose-400 [animation-delay:1.2s]" />

          <div className="absolute -left-4 top-[18%] animate-float rounded-2xl border border-white/70 bg-white/85 px-5 py-3 shadow-soft backdrop-blur-md sm:-left-14">
            <p className="font-script text-3xl leading-none text-rose-500">Your Space,</p>
            <p className="font-script text-3xl leading-none text-navy-700">Our Priority</p>
          </div>

          <div className="absolute -right-2 bottom-10 rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-soft backdrop-blur-md sm:-right-10">
            <div className="flex gap-0.5 text-rose-400" aria-label="Rated 5 out of 5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
            </div>
            <p className="mt-1.5 font-display text-lg font-semibold leading-tight text-navy-800">Loved by our clients</p>
            <p className="text-xs text-navy-500">Professional care, every visit</p>
          </div>
        </motion.div>
      </div>

      {/* Highlight ribbon */}
      <div className="relative border-y border-navy-100/70 bg-white py-5">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex shrink-0 animate-marquee items-center">
            {[...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS].map(({ icon: Icon, label }, i) => (
              <span key={i} className="flex items-center gap-3 px-8 font-display text-xl italic text-navy-700">
                <Icon className="h-5 w-5 not-italic text-rose-400" strokeWidth={1.5} />
                {label}
                <Sparkle className="ml-8 h-3 w-3 text-rose-300" />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
