import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Heading, Reveal } from '../components/ui';
import { SERVICE_CATEGORIES, SERVICE_OPTIONS } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';

export default function Services() {
  const [index, setIndex] = useState(0);
  const current = SERVICE_CATEGORIES[index];
  const CurrentIcon = current.icon;

  return (
    <section id="services" className="relative overflow-hidden bg-gradient-to-b from-pearl to-navy-50/60 py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-40 h-96 w-96 rounded-full bg-rose-100/70 blur-3xl" />
      <div className="container-x relative">
        <Reveal>
          <Heading
            kicker="Our Services"
            title="Tailored care for"
            accent="every space"
            text="From offices and washrooms to guesthouses and managed properties — we've got you covered."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div role="tablist" aria-label="Service categories" className="grid gap-2.5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
            {SERVICE_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const selected = i === index;
              return (
                <button
                  key={cat.title}
                  role="tab"
                  id={`service-tab-${i}`}
                  aria-selected={selected}
                  aria-controls="service-panel"
                  onClick={() => setIndex(i)}
                  className={`group flex items-center gap-4 rounded-2xl border px-5 py-4 text-left transition duration-300 ${
                    selected
                      ? 'border-rose-200 bg-white shadow-soft'
                      : 'border-transparent bg-white/50 hover:border-navy-100 hover:bg-white'
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition ${
                      selected ? 'bg-gradient-to-br from-rose-400 to-rose-500 text-white shadow-rose' : 'bg-navy-50 text-navy-500 group-hover:text-rose-500'
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="flex-1">
                    <span className={`block font-display text-xl font-semibold leading-tight ${selected ? 'text-navy-800' : 'text-navy-700'}`}>{cat.title}</span>
                    <span className="mt-0.5 block text-xs text-navy-400">{cat.items.length} services included</span>
                  </span>
                  <ArrowRight className={`hidden h-4 w-4 transition lg:block ${selected ? 'translate-x-0 text-rose-500' : '-translate-x-1 text-navy-200'}`} />
                </button>
              );
            })}
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${index}`}
            className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-8 shadow-soft sm:p-12 lg:col-span-7"
          >
            <span aria-hidden className="pointer-events-none absolute right-8 top-4 select-none font-display text-[7rem] font-semibold leading-none text-navy-50 [font-variant-numeric:lining-nums]">
              0{index + 1}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 ring-1 ring-rose-100">
                  <CurrentIcon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 text-3xl font-semibold sm:text-4xl">{current.title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-navy-600/80">{current.intro}</p>
                <div className="my-8 h-px bg-gradient-to-r from-rose-200 via-navy-100 to-transparent" />
                <ul className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                  {current.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-navy-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" onClick={onAnchorClick} className="btn-rose mt-10">
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-16 lg:mt-20">
          <Reveal>
            <Heading kicker="Service Options" title="A schedule that" accent="suits you" text="We structure our cleaning services around your operational needs." />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_OPTIONS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white p-7 transition duration-500 hover:-translate-y-1.5 hover:border-rose-200 hover:shadow-lift">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-rose-300 to-navy-300 transition duration-500 group-hover:scale-x-100" />
                  <Icon className="h-8 w-8 text-rose-400" strokeWidth={1.3} />
                  <h3 className="mt-6 text-2xl font-semibold leading-tight">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-navy-600/80">{text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
