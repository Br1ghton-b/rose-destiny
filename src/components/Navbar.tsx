import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Heart, LogOut, Menu, Package, Search, ShoppingBag, User as UserIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../stores/cart';
import { useWishlist } from '../stores/wishlist';
import { useAuth } from '../stores/auth';
import { BRAND } from '../lib/config';
import { CATEGORIES } from '../lib/products';
import CategoriesMenu from './CategoriesMenu';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Atelier' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [shopMenuOpen, setShopMenuOpen] = useState(false);
  const shopCloseTimer = useRef<number | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const openShopMenu = () => {
    if (shopCloseTimer.current) window.clearTimeout(shopCloseTimer.current);
    setShopMenuOpen(true);
  };
  const closeShopMenu = (delay = 120) => {
    if (shopCloseTimer.current) window.clearTimeout(shopCloseTimer.current);
    shopCloseTimer.current = window.setTimeout(() => setShopMenuOpen(false), delay);
  };
  const location = useLocation();
  const cartCount = useCart((s) => s.items.reduce((a, b) => a + b.quantity, 0));
  const wishlistCount = useWishlist((s) => s.ids.length);
  const currentUser = useAuth((s) => s.currentUser());
  const logout = useAuth((s) => s.logout);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
    setShopMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!userMenuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [userMenuOpen]);

  return (
    <>
      {/* Marquee strip */}
      <div className="bg-ink text-ivory text-[11px] uppercase tracking-[0.28em] py-2 overflow-hidden">
        <div className="container-x flex items-center justify-between gap-6">
          <span className="hidden sm:inline gold-text">Complimentary delivery on orders over R1,500 · Johannesburg & Pretoria</span>
          <span className="sm:hidden gold-text">Free delivery over R1,500</span>
          <a href={`tel:${BRAND.phone}`} className="text-ivory/70 hover:text-gold-200 transition hidden md:inline">
            Atelier · {BRAND.phone}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'bg-ivory/95 backdrop-blur shadow-[0_1px_0_0_rgba(201,162,76,0.25)]' : 'bg-ivory'
        }`}
      >
        <div className="container-x flex items-center justify-between gap-6 py-4">
          {/* Mobile menu */}
          <button
            aria-label="Open menu"
            className="lg:hidden text-ink hover:text-gold-500"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.25} />
          </button>

          {/* Left nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `text-[12px] uppercase tracking-[0.28em] transition-colors ${
                  isActive ? 'text-gold-500' : 'text-ink hover:text-gold-500'
                }`
              }
            >
              Home
            </NavLink>
            <div
              onMouseEnter={openShopMenu}
              onMouseLeave={() => closeShopMenu()}
              className="relative"
            >
              <button
                onClick={() => setShopMenuOpen((o) => !o)}
                aria-expanded={shopMenuOpen}
                className={`flex items-center gap-1.5 text-[12px] uppercase tracking-[0.28em] transition-colors ${
                  shopMenuOpen || location.pathname.startsWith('/shop')
                    ? 'text-gold-500'
                    : 'text-ink hover:text-gold-500'
                }`}
              >
                Shop
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${shopMenuOpen ? 'rotate-180' : ''}`}
                  strokeWidth={1.5}
                />
              </button>
            </div>
          </nav>

          {/* Wordmark */}
          <Link to="/" className="group flex flex-col items-center mx-auto lg:mx-0">
            <span className="font-display text-2xl md:text-3xl tracking-[0.04em] text-ink leading-none">
              Rose <span className="text-rouge italic">Destiny</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.42em] text-gold-500 mt-1 group-hover:text-gold-400 transition">
              Floral Atelier · Est. 2025
            </span>
          </Link>

          {/* Right nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.slice(1).map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-[12px] uppercase tracking-[0.28em] transition-colors ${
                    isActive ? 'text-gold-500' : 'text-ink hover:text-gold-500'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 lg:gap-5">
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(true)}
              className="text-ink hover:text-gold-500 transition"
            >
              <Search className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative text-ink hover:text-gold-500 transition"
            >
              <Heart className="h-5 w-5" strokeWidth={1.25} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rouge text-ivory text-[9px] rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account */}
            <div className="relative" ref={userMenuRef}>
              {currentUser ? (
                <>
                  <button
                    onClick={() => setUserMenuOpen((o) => !o)}
                    aria-label="Account menu"
                    className="relative h-7 w-7 rounded-full bg-gold-gradient flex items-center justify-center text-ink text-[10px] font-medium uppercase tracking-wider hover:brightness-110 transition"
                  >
                    {currentUser.name
                      .split(' ')
                      .map((s) => s[0])
                      .slice(0, 2)
                      .join('')}
                  </button>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute right-0 mt-3 w-64 bg-ivory border border-gold/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] z-50"
                      >
                        <div className="p-5 border-b border-ink/10">
                          <div className="text-[10px] uppercase tracking-[0.28em] text-gold-500 mb-1">Signed in</div>
                          <div className="font-display text-lg leading-tight">{currentUser.name}</div>
                          <div className="text-xs text-ink/60 truncate">{currentUser.email}</div>
                        </div>
                        <div className="py-2">
                          <Link to="/account" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gold/10 transition">
                            <UserIcon className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                            My Account
                          </Link>
                          <Link to="/account" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gold/10 transition">
                            <Package className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                            Orders
                          </Link>
                          <Link to="/wishlist" className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-gold/10 transition">
                            <Heart className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                            Wishlist
                          </Link>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-5 py-3 text-sm text-ink/70 hover:text-rouge border-t border-ink/10 transition"
                        >
                          <LogOut className="h-4 w-4" strokeWidth={1.5} />
                          Sign out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to="/login"
                  aria-label="Sign in"
                  className="text-ink hover:text-gold-500 transition flex items-center"
                >
                  <UserIcon className="h-5 w-5" strokeWidth={1.25} />
                </Link>
              )}
            </div>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative text-ink hover:text-gold-500 transition"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.25} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold text-ink text-[9px] font-medium rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className="hairline" />

        {/* Mega-menu */}
        <AnimatePresence>
          {shopMenuOpen && (
            <div
              onMouseEnter={openShopMenu}
              onMouseLeave={() => closeShopMenu(0)}
            >
              <CategoriesMenu onClose={() => setShopMenuOpen(false)} />
            </div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-ink/60 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="absolute left-0 top-0 h-full w-[88%] max-w-sm bg-ivory p-8 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-display text-2xl">Rose <span className="text-rouge italic">Destiny</span></span>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="h-6 w-6" strokeWidth={1.25} />
                </button>
              </div>
              <nav className="flex flex-col gap-5 overflow-y-auto pb-2">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `font-display text-3xl ${isActive ? 'text-rouge' : 'text-ink'}`
                  }
                >
                  Home
                </NavLink>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `font-display text-3xl ${isActive ? 'text-rouge' : 'text-ink'}`
                  }
                >
                  Shop
                </NavLink>
                <details className="group -mt-2">
                  <summary className="cursor-pointer flex items-center justify-between text-[11px] uppercase tracking-[0.28em] text-gold-500 list-none">
                    <span>Categories</span>
                    <ChevronDown className="h-3.5 w-3.5 group-open:rotate-180 transition" strokeWidth={1.5} />
                  </summary>
                  <ul className="mt-3 pl-4 border-l border-gold/30 space-y-2">
                    {CATEGORIES.map((c) => (
                      <li key={c.id}>
                        <Link to={`/shop/${c.id}`} className="text-base text-ink/80 hover:text-rouge transition">
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </details>
                {links.slice(1).map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    className={({ isActive }) =>
                      `font-display text-3xl ${isActive ? 'text-rouge' : 'text-ink'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="pt-4 border-t border-ink/10 space-y-3 text-[12px] uppercase tracking-[0.28em] text-ink/70">
                  <Link to="/sympathy" className="block hover:text-gold-500">Sympathy & Tributes</Link>
                  <Link to="/weddings" className="block hover:text-gold-500">Weddings & Events</Link>
                  <Link to="/wholesale" className="block hover:text-gold-500">Wholesale & Trade</Link>
                </div>
              </nav>
              <div className="mt-8 pt-6 border-t border-ink/10">
                {currentUser ? (
                  <div className="space-y-3">
                    <Link to="/account" className="flex items-center gap-3 text-sm">
                      <UserIcon className="h-4 w-4 text-gold-500" strokeWidth={1.5} />
                      {currentUser.name}
                    </Link>
                    <button onClick={() => { logout(); setMobileOpen(false); }} className="flex items-center gap-3 text-sm text-ink/60 hover:text-rouge transition">
                      <LogOut className="h-4 w-4" strokeWidth={1.5} />
                      Sign out
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/login" className="btn-outline">Sign in</Link>
                    <Link to="/register" className="btn-primary">Create account</Link>
                  </div>
                )}
              </div>
              <div className="mt-auto pt-8 text-sm text-ink/60">
                <p className="mb-1">{BRAND.address}</p>
                <p>{BRAND.phone}</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search panel */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 inset-x-0 z-50 bg-ivory border-b border-gold/30 shadow-lg"
          >
            <div className="container-x py-6 flex items-center gap-4">
              <Search className="h-5 w-5 text-gold-500" strokeWidth={1.25} />
              <input
                autoFocus
                placeholder="Search roses, bouquets, occasions…"
                className="flex-1 bg-transparent text-lg focus:outline-none placeholder:text-ink/30"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const q = (e.target as HTMLInputElement).value;
                    window.location.href = `/shop?q=${encodeURIComponent(q)}`;
                  }
                  if (e.key === 'Escape') setSearchOpen(false);
                }}
              />
              <button onClick={() => setSearchOpen(false)} aria-label="Close search">
                <X className="h-5 w-5" strokeWidth={1.25} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
