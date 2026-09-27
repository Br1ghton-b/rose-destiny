import { ArrowRight, CalendarCheck, Star } from 'lucide-react';
import { Heading, Reveal, Sparkle } from '../components/ui';
import { TESTIMONIALS } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';

export default function Reviews() {
  return (
    <>
      <section id="reviews" className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <Reveal>
            <Heading kicker="Happy Clients" title="What our clients" accent="say" />
          </Reveal>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <figure className="relative flex h-full flex-col rounded-[2rem] border border-navy-100 bg-pearl p-8 transition duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lift sm:p-10">
                  <span aria-hidden className="font-display text-7xl leading-[0.6] text-rose-300">“</span>
                  <blockquote className="mt-4 flex-1 font-display text-[1.35rem] leading-snug text-navy-700">{t.quote}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-navy-100 pt-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-rose-200 to-navy-200 font-display text-lg font-semibold text-navy-800">
                      {t.name.charAt(0)}
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-navy-800">{t.name}</span>
                      <span className="block text-xs text-navy-400">{t.detail}</span>
                    </span>
                    <span className="flex gap-0.5 text-rose-400" aria-label="5 out of 5 stars">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <Star key={k} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-action band */}
      <div className="bg-white pb-16 lg:pb-20">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-rose-400 via-rose-400 to-navy-400 px-8 py-10 text-white shadow-lift sm:px-14 sm:py-12">
              <Sparkle className="absolute right-10 top-8 h-10 w-10 animate-twinkle text-white/40" />
              <Sparkle className="absolute bottom-10 right-40 h-5 w-5 animate-twinkle text-white/40 [animation-delay:1s]" />
              <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full border border-white/20" />
              <div aria-hidden className="absolute -left-10 -top-10 h-64 w-64 rounded-full border border-white/10" />
              <div className="relative flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-5">
                  <span className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 sm:flex">
                    <CalendarCheck className="h-7 w-7" strokeWidth={1.4} />
                  </span>
                  <div>
                    <h2 className="text-4xl font-semibold text-white sm:text-5xl">Ready for a cleaner, healthier space?</h2>
                    <p className="mt-3 max-w-xl text-white/85">Book your cleaning service today and experience the Rose Destiny difference.</p>
                  </div>
                </div>
                <a href="#contact" onClick={onAnchorClick} className="btn-light shrink-0">
                  Get a Quote Now <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
