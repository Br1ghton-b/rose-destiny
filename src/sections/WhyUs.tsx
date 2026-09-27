import { ArrowRight } from 'lucide-react';
import { Heading, Reveal, Sparkle } from '../components/ui';
import { REASONS } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';

export default function WhyUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-gradient-to-br from-navy-700 via-navy-600 to-navy-500 py-16 text-white lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-rose-400/20 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-navy-300/20 blur-3xl" />

      <div className="container-x relative grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Heading align="left" tone="dark" kicker="Why Choose Rose Destiny" title="The Rose Destiny" accent="Difference" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative mt-10">
              <div className="overflow-hidden rounded-[2rem] ring-1 ring-white/20">
                <img src="/images/why-marble.jpg" alt="A cleaner in protective gloves wiping down a marble table" loading="lazy" className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className="absolute -bottom-7 right-4 rotate-[-4deg] rounded-2xl bg-white px-6 py-3 shadow-lift sm:right-8">
                <p className="font-script text-3xl leading-tight text-navy-700 sm:text-4xl">
                  More than just <span className="text-rose-500">cleaning</span>
                </p>
              </div>
              <Sparkle className="absolute -left-3 -top-3 h-7 w-7 animate-twinkle text-rose-200" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <a href="#about" onClick={onAnchorClick} className="btn-light mt-14">
              Learn More About Us <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/15 ring-1 ring-white/15 sm:grid-cols-2 lg:col-span-7">
          {REASONS.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.06} className="h-full">
              <div className="group h-full bg-navy-700/60 p-8 backdrop-blur transition duration-500 hover:bg-navy-600/60">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-rose-200 ring-1 ring-white/20 transition group-hover:bg-rose-400 group-hover:text-white">
                    <Icon className="h-5 w-5" strokeWidth={1.6} />
                  </span>
                  <span className="font-display text-2xl text-white/25">0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-white/70">{text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
