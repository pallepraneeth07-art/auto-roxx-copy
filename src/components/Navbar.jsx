import React, { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Book Now', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      setScrolled(current > 50);
      setVisible(current < lastScroll || current < 100);
      setLastScroll(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const handleNavClick = (href) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: visible ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0A0B]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <button onClick={() => handleNavClick('#hero')} className="flex items-center gap-2">
              <span className="font-display text-xl md:text-2xl font-bold tracking-wider text-white">
                AUTO <span className="text-primary">ROXX</span>
              </span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="px-3 py-2 text-sm font-medium text-secondary-foreground/80 hover:text-white transition-colors duration-300 tracking-wide uppercase"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:8143448598"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white border border-white/10 rounded-full hover:border-primary/50 transition-all duration-300"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
              <button
                onClick={() => handleNavClick('#booking')}
                className="px-5 py-2 text-sm font-bold font-display tracking-wider bg-primary text-white rounded-full hover:bg-primary/90 transition-all duration-300 glow-red"
              >
                BOOK SERVICE
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-white"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0A0B]/98 backdrop-blur-2xl pt-20"
          >
            <div className="flex flex-col items-center gap-2 p-6">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-center py-3 text-lg font-display tracking-wider text-secondary-foreground/80 hover:text-white transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <div className="flex flex-col gap-3 w-full mt-4 pt-4 border-t border-white/10">
                <a
                  href="tel:8143448598"
                  className="flex items-center justify-center gap-2 py-3 text-white border border-white/20 rounded-full"
                >
                  <Phone className="w-4 h-4" />
                  <span className="font-medium">8143448598</span>
                </a>
                <button
                  onClick={() => handleNavClick('#booking')}
                  className="py-3 font-display font-bold tracking-wider bg-primary text-white rounded-full glow-red"
                >
                  BOOK SERVICE
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}