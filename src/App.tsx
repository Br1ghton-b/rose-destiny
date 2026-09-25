import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Home from './pages/Home';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Plain window.scrollTo(0,0) — guaranteed instant on every browser,
    // no fight with scroll-behavior or framer-motion exit animations.
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Home />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
