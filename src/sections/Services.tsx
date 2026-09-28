import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Heading, Reveal } from '../components/ui';
import { SERVICE_CATEGORIES, SERVICE_OPTIONS } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';

export default function Services() {
  const [index, setIndex] = useState(0);
  const current = SERVICE_CATEGORIES[index];
  const CurrentIcon = current.icon;
  const tabs = useRef<HTMLDivElement>(null);

  // On phones the tabs are a swipeable row; keep the selected one in view.
  useEffect(() => {
    const row = tabs.current;
    const tab = row?.children[index] as HTMLElement | undefined;
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    // Scroll only the row: scrollIntoView would also nudge the clipped section sideways.
    const left = row.scrollLeft + tab.getBoundingClientRect().left - row.getBoundingClientRect().left - 20;
    row.scrollTo({ left, behavior: 'smooth' });
  }, [index]);

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
          <div
            ref={tabs}
            role="tablist"
            aria-label="Service categories"
            className="-mx-5 flex snap-x scroll-px-5 gap-2.5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:col-span-5 lg:grid-cols-1 [&::-webkit-scrollbar]:hidden"
          >
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
                  className={`group flex shrink-0 snap-start items-center gap-3 rounded-2xl border px-4 py-3 text-left transition duration-300 sm:gap-4 sm:px-5 sm:py-4 ${
                    selected
                      ? 'border-rose-200 bg-white shadow-soft'
                      : 'border-transparent bg-white/50 hover:border-navy-100 hover:bg-white'
                  }`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition sm:h-12 sm:w-12 ${
                      selected ? 'bg-gradient-to-br from-rose-400 to-rose-500 text-white shadow-rose' : 'bg-navy-50 text-navy-500 group-hover:text-rose-500'
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="flex-1">
                    <span className={`block whitespace-nowrap font-display text-lg font-semibold leading-tight sm:whitespace-normal sm:text-xl ${selected ? 'text-navy-800' : 'text-navy-700'}`}>{cat.title}</span>
                    <span className="mt-0.5 hidden text-xs text-navy-400 sm:block">{cat.items.length} services included</span>
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
            className="relative overflow-hidden rounded-[2rem] border border-navy-100 bg-white p-6 shadow-soft sm:p-12 lg:col-span-7"
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
                <h3 className="mt-5 text-3xl font-semibold sm:mt-6 sm:text-4xl">{current.title}</h3>
                <p className="mt-3 max-w-lg leading-7 text-navy-600/80">{current.intro}</p>
                <div className="my-6 h-px bg-gradient-to-r sm:my-8 from-rose-200 via-navy-100 to-transparent" />
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
                <a href="#contact" onClick={onAnchorClick} className="btn-rose mt-8 sm:mt-10">
                  Request a Quote <ArrowRight className="h-4 w-4" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-14 sm:mt-16 lg:mt-20">
          <Reveal>
            <Heading kicker="Service Options" title="A schedule that" accent="suits you" text="We structure our cleaning services around your operational needs." />
          </Reveal>
          <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {SERVICE_OPTIONS.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={i * 0.08}>
                <article className="group relative flex h-full gap-4 overflow-hidden rounded-[1.5rem] border border-navy-100 bg-white p-5 transition sm:block sm:rounded-[1.75rem] sm:p-7 duration-500 hover:-translate-y-1.5 hover:border-rose-200 hover:shadow-lift">
                  <div aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-rose-300 to-navy-300 transition duration-500 group-hover:scale-x-100" />
                  <Icon className="h-7 w-7 shrink-0 text-rose-400 sm:h-8 sm:w-8" strokeWidth={1.3} />
                  <div>
                    <h3 className="text-xl font-semibold leading-tight sm:mt-6 sm:text-2xl">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-navy-600/80 sm:mt-3">{text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
