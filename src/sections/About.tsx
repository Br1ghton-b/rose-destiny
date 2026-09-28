import { BadgeCheck, CalendarCheck, ShieldCheck } from 'lucide-react';
import { Heading, Reveal, Sparkle } from '../components/ui';

const pillars = [
  { icon: BadgeCheck, label: 'Professional' },
  { icon: ShieldCheck, label: 'Reliable' },
  { icon: CalendarCheck, label: 'Thorough' },
];

export default function About() {
  return (
    <section id="about" className="relative bg-white py-16 lg:py-20">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative mx-auto max-w-lg">
            <div aria-hidden className="absolute -left-6 -top-6 h-40 w-40 rounded-full bg-rose-50" />
            <div aria-hidden className="absolute -bottom-8 -right-4 h-56 w-56 rounded-full bg-navy-50" />
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-lift">
              <img
                src="/images/about-kitchen.webp"
                width={1400}
                height={933}
                alt="A smiling woman wiping down a modern kitchen stove"
                loading="lazy"
                className="aspect-[4/5] w-full object-cover object-[72%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-navy-700 px-5 py-4 text-white shadow-lift sm:left-10">
              <Sparkle className="h-5 w-5 text-rose-300" />
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/60">Serving</p>
                <p className="font-display text-lg font-semibold leading-tight">Johannesburg &amp; surrounds</p>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <Heading align="left" kicker="Company Profile" title="A clean space makes a" accent="lasting impression" />
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-7 space-y-5 text-[16.5px] leading-8 text-navy-600/85">
              <p>
                <span className="font-semibold text-navy-800">Rose Destiny Cleaning Services</span> is a professional cleaning company
                committed to providing reliable, thorough and consistent cleaning solutions for businesses and organisations.
              </p>
              <p>
                We understand that a clean and well-maintained environment creates a professional impression for clients, supports
                employee wellbeing and helps businesses operate in a comfortable environment.
              </p>
              <p>
                Our goal is to provide dependable cleaning services tailored to the individual needs of each client — whether you
                require <em className="font-display text-lg not-italic text-rose-500">daily, weekly, scheduled or once-off</em> cleaning.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
              {pillars.map(({ icon: Icon, label }) => (
                <li key={label} className="rounded-2xl border border-navy-100 bg-pearl px-3 py-5 text-center transition hover:-translate-y-1 hover:border-rose-200 hover:bg-rose-50/60">
                  <Icon className="mx-auto h-6 w-6 text-rose-500" strokeWidth={1.5} />
                  <p className="mt-3 font-display text-xl font-semibold text-navy-800">{label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
