import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import WhyUs from './sections/WhyUs';
import Process from './sections/Process';
import Partners from './sections/Partners';
import Reviews from './sections/Reviews';
import Contact from './sections/Contact';

export default function App() {
  // Sections render after the browser tries to honour a #hash, so jump to it once mounted.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyUs />
        <Process />
        <Partners />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
