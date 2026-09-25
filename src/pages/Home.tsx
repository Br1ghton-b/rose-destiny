import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Check, House, Leaf, ShieldCheck, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import PageWrapper from '../components/PageWrapper';
import { whatsappEnquiryLink } from '../lib/whatsapp';

const services = [
  { icon: House, title: 'Residential Cleaning', description: 'Thoughtful home cleaning that gives you back your time and peace of mind.' },
  { icon: Building2, title: 'Commercial Cleaning', description: 'Professional workplace care that keeps your team productive and your business ready.' },
  { icon: Sparkles, title: 'Deep Cleaning', description: 'A detailed reset for the spaces that need a little more attention and care.' },
  { icon: ShieldCheck, title: 'Trusted & Reliable', description: 'A dependable local team, trained to deliver a consistent standard every visit.' },
  { icon: Leaf, title: 'Eco-Friendly Products', description: 'Effective, considered products that are kinder to your family and the planet.' },
];

const testimonials = [
  { quote: 'Rose Destiny has never been cleaner. The team is professional, friendly and trustworthy.', name: 'Nomsa M.', detail: 'Residential client' },
  { quote: 'We have used them for our office and the difference is incredible. Highly recommended.', name: 'Thabo K.', detail: 'Commercial client' },
  { quote: 'Reliable, efficient and affordable. They always go the extra mile, and my home feels amazing.', name: 'Lerato S.', detail: 'Residential client' },
];

const heroImage = 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1500&q=85';
const teamImage = 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1200&q=85';

export default function Home() {
  return (
    <PageWrapper>
      <section id="home" className="relative scroll-mt-24 overflow-hidden bg-[#f8faff]">
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#ed168c]/10 blur-3xl" />
        <div className="container-x relative grid items-center gap-10 pb-16 pt-10 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
          <motion.div className="z-10 lg:col-span-5" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-[#ed168c]"><span className="h-0.5 w-8 bg-[#ed168c]" /> Professional cleaning services</div>
            <h1 className="max-w-xl font-display text-5xl font-bold leading-[0.95] text-[#082c72] sm:text-6xl lg:text-7xl">Clean spaces.<br /><span className="font-script font-normal text-[#ed168c]">Healthier lives.</span></h1>
            <p className="mt-7 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">Reliable, professional and affordable cleaning services for homes, businesses and commercial spaces across Johannesburg and surrounding areas.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={whatsappEnquiryLink('Hello Rose Destiny, I would like to book a cleaning service.')} target="_blank" rel="noreferrer" className="btn-pink group">Book your cleaning today <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></a>
              <a href="#contact" className="btn-blue-outline">Get a quote</a>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[#082c72]">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-[#ed168c]" /> Trusted & reliable</span>
              <span className="inline-flex items-center gap-2"><Leaf className="h-5 w-5 text-[#ed168c]" /> Eco-friendly products</span>
              <span className="inline-flex items-center gap-2"><Sparkles className="h-5 w-5 text-[#ed168c]" /> Trained team</span>
            </div>
          </motion.div>
          <motion.div className="relative min-h-[390px] overflow-hidden rounded-[2rem] lg:col-span-7 lg:min-h-[560px]" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
            <img src={heroImage} alt="Professional cleaner caring for a bright home" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#082c72]/35 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-2xl bg-white/95 px-5 py-4 shadow-xl backdrop-blur sm:bottom-8 sm:left-8">
              <div className="flex items-center gap-1 text-[#ed168c]" aria-label="5 out of 5 stars">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
              <p className="mt-1 text-sm font-bold text-[#082c72]">Loved by our clients</p><p className="text-xs text-slate-500">Professional care, every visit</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-[#082c72] py-5 text-white"><div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-center text-sm font-semibold sm:justify-between"><span>Residential cleaning</span><span className="text-[#ed168c]">✦</span><span>Commercial cleaning</span><span className="text-[#ed168c]">✦</span><span>Deep cleaning</span><span className="text-[#ed168c]">✦</span><span>Locally owned & operated</span></div></section>

      <section id="services" className="container-x scroll-mt-24 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl text-center"><p className="section-kicker">Our services</p><h2 className="mt-3 font-display text-4xl font-bold text-[#082c72] sm:text-5xl">What we offer</h2><p className="mt-4 text-slate-600">From homes to offices, we have got you covered.</p></div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{services.map((service, index) => { const Icon = service.icon; return <motion.article key={service.title} className="group rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-[0_10px_30px_rgba(8,44,114,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(8,44,114,0.12)]" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ delay: index * 0.06 }}><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ed168c] text-white transition group-hover:rotate-6"><Icon className="h-7 w-7" strokeWidth={1.7} /></span><h3 className="mt-5 font-display text-xl font-bold text-[#082c72]">{service.title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{service.description}</p><Link to="/contact" className="mt-5 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.16em] text-[#ed168c]">Learn more <ArrowRight className="h-3.5 w-3.5" /></Link></motion.article>; })}</div>
      </section>

      <section className="overflow-hidden bg-[#082c72] text-white"><div className="container-x grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-20"><div><p className="section-kicker text-[#ff66bd]">Why choose us</p><h2 className="mt-3 max-w-lg font-display text-4xl font-bold leading-tight sm:text-5xl">The Rose Destiny difference</h2><div className="mt-8 grid gap-4 sm:grid-cols-2">{['Professional & well-trained staff', 'Attention to detail', 'Flexible scheduling', '100% customer satisfaction', 'Competitive pricing', 'Locally owned & operated'].map((item) => <div key={item} className="flex items-center gap-3 text-sm text-white/85"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ed168c]"><Check className="h-3 w-3" /></span>{item}</div>)}</div><a href={whatsappEnquiryLink('Hello Rose Destiny, please tell me more about your cleaning services.')} target="_blank" rel="noreferrer" className="btn-pink mt-9 inline-flex">Learn more about us <ArrowRight className="h-4 w-4" /></a></div><div className="relative min-h-[320px] overflow-hidden rounded-[2rem]"><img src={teamImage} alt="Rose Destiny cleaning supplies in a bright room" className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-[#ed168c]/15 mix-blend-multiply" /><div className="absolute bottom-5 left-5 font-script text-4xl text-white drop-shadow-md sm:bottom-8 sm:left-8">More than just cleaning.</div></div></div></section>

      <section className="bg-[#fff3fa] py-20 lg:py-24"><div className="container-x"><div className="text-center"><p className="section-kicker">Happy clients</p><h2 className="mt-3 font-display text-4xl font-bold text-[#082c72] sm:text-5xl">What our clients say</h2></div><div className="mt-12 grid gap-5 lg:grid-cols-3">{testimonials.map((testimonial) => <figure key={testimonial.name} className="rounded-2xl bg-white p-7 shadow-[0_10px_30px_rgba(8,44,114,0.06)]"><div className="text-4xl leading-none text-[#ed168c]">“</div><blockquote className="mt-2 text-base leading-7 text-slate-600">{testimonial.quote}</blockquote><figcaption className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5"><div><div className="font-bold text-[#082c72]">{testimonial.name}</div><div className="text-xs text-slate-400">{testimonial.detail}</div></div><div className="flex gap-0.5 text-[#ed168c]">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div></figcaption></figure>)}</div></div></section>

      <section className="bg-[#ed168c] py-10 text-white"><div className="container-x flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left"><div><p className="font-display text-3xl font-bold">Ready for a cleaner, healthier space?</p><p className="mt-1 text-sm text-white/85">Book your cleaning service today and experience the Rose Destiny difference.</p></div><a href={whatsappEnquiryLink('Hello Rose Destiny, I would like to get a quote for a cleaning service.')} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-[#082c72] shadow-lg transition hover:-translate-y-0.5">Get a quote now <ArrowRight className="h-4 w-4" /></a></div></section>
    </PageWrapper>
  );
}
