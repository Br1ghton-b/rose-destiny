import { ArrowRight } from 'lucide-react';
import { Heading, Reveal } from '../components/ui';
import { PARTNERS } from '../lib/content';
import { onAnchorClick } from '../lib/scroll';

export default function Partners() {
  return (
    <section id="partners" className="relative overflow-hidden bg-gradient-to-b from-rose-50/70 to-pearl py-16 lg:py-20">
      <div aria-hidden className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-navy-100/60 blur-3xl" />
      <div className="container-x relative">
        <Reveal>
          <Heading
            kicker="Commercial Partnerships"
            title="Built for lasting"
            accent="partnerships"
            text="Rose Destiny Cleaning Services is interested in establishing long-term relationships with organisations of every kind."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {PARTNERS.map(({ icon: Icon, label }, i) => (
            <Reveal key={label} delay={(i % 4) * 0.06}>
              <div className="group flex h-full flex-col items-start gap-4 rounded-2xl border border-white bg-white/80 p-5 shadow-[0_8px_30px_-18px_rgba(45,64,107,0.3)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-rose-200 sm:flex-row sm:items-center sm:p-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 text-navy-500 transition group-hover:bg-rose-50 group-hover:text-rose-500">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <span className="text-[14.5px] font-medium leading-snug text-navy-700">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-10 max-w-2xl text-center">
          <p className="font-display text-2xl italic leading-snug text-navy-700 sm:text-[1.7rem]">
            “We welcome the opportunity to discuss a cleaning solution that works within your operational requirements and
            budget.”
          </p>
          <a href="#contact" onClick={onAnchorClick} className="btn-rose mt-8">
            Start the Conversation <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
