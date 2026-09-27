import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Reveal, Sparkle } from '../components/ui';
import { PROCESS } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';

const promises = ['Free site assessment', 'Customised cleaning plan', 'Formal quotation', 'Ongoing quality monitoring'];

export default function Process() {
  const timeline = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 70%', 'end 55%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <section id="process" className="relative overflow-hidden bg-white py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-rose-50 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-navy-50 blur-3xl" />

      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Intro — sticks while the timeline scrolls past on desktop */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="kicker">Our Proposed Process</p>
              <h2 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
                From first hello to a <span className="font-script text-[1.2em] font-normal text-rose-500">spotless space</span>
              </h2>
              <p className="mt-6 max-w-md text-[16.5px] leading-8 text-navy-600/85">
                A clear, professional journey in six considered steps — so you always know what happens next, and your premises
                stay consistently cared for.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative mt-10 overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-700 to-navy-500 p-8 text-white shadow-lift">
                <Sparkle className="absolute right-6 top-6 h-6 w-6 animate-twinkle text-rose-200" />
                <div aria-hidden className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full border border-white/15" />
                <p className="font-script text-4xl leading-none text-rose-200">What you can expect</p>
                <ul className="mt-6 space-y-3.5">
                  {promises.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-[15px] text-white/90">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-rose-400/90">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
                <a href="#contact" onClick={onAnchorClick} className="btn-light mt-8">
                  Book Your Consultation <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Timeline */}
        <div ref={timeline} className="relative lg:col-span-7 lg:pl-4">
          <div aria-hidden className="absolute bottom-10 left-[27px] top-10 w-px bg-navy-100 lg:left-[43px]" />
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-10 left-[27px] top-10 w-px origin-top bg-gradient-to-b from-rose-400 via-rose-300 to-navy-400 lg:left-[43px]"
          />

          <ol className="relative">
          {PROCESS.map(({ icon: Icon, phase, title, text }, i) => {
            const newPhase = i === 0 || PROCESS[i - 1].phase !== phase;
            return (
              <li key={title} className="relative">
                {newPhase && (
                  <Reveal className={`relative flex items-center gap-4 pl-[76px] sm:pl-[84px] ${i === 0 ? '' : 'mt-12'}`}>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.32em] text-rose-500">{phase}</span>
                    <span className="h-px flex-1 bg-gradient-to-r from-rose-200 to-transparent" />
                  </Reveal>
                )}
                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative mt-6 flex gap-5 sm:gap-7"
                >
                  <motion.span
                    initial={{ scale: 0.6, backgroundColor: '#FFFFFF', color: '#D95F98' }}
                    whileInView={{ scale: 1, backgroundColor: '#D95F98', color: '#FFFFFF' }}
                    viewport={{ once: true, margin: '-45% 0px -45% 0px' }}
                    transition={{ duration: 0.5 }}
                    className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-4 border-white shadow-rose ring-1 ring-rose-200"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </motion.span>

                  <div className="relative flex-1 overflow-hidden rounded-[1.75rem] border border-navy-100 bg-white/90 p-6 shadow-soft backdrop-blur transition duration-500 group-hover:-translate-y-1 group-hover:border-rose-200 group-hover:shadow-lift sm:p-8">
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-5 top-3 select-none font-display text-[4.5rem] font-semibold leading-none text-rose-50 transition duration-500 [font-variant-numeric:lining-nums] group-hover:text-rose-100"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-navy-300">Step {String(i + 1).padStart(2, '0')}</p>
                    <h3 className="relative mt-2 text-2xl font-semibold sm:text-[1.7rem]">{title}</h3>
                    <p className="relative mt-2.5 max-w-md text-[15px] leading-7 text-navy-600/80">{text}</p>
                  </div>
                </motion.div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}
