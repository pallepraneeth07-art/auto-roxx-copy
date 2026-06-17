import React from 'react';
import { Phone, MapPin, Instagram, Facebook, Youtube, Mail } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Book Now', href: '#booking' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES = [
  'PPF Coating', 'Graphene Coating', 'Ceramic Coating',
  'Denting & Painting', 'Car Detailing', 'Car Wash',
];

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050506] border-t border-white/5">
      {/* Top accent */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display font-black text-2xl tracking-wider text-white mb-2">
              AUTO <span className="text-primary">ROXX</span>
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Premium Car Care, Protection & Performance. Hyderabad's trusted automotive care laboratory.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' },
                { icon: Mail, href: 'mailto:autoroxx@email.com' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-white mb-4">Services</h4>
            <ul className="space-y-2">
              {SERVICES.map((s) => (
                <li key={s}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-sm text-muted-foreground hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Dashboard */}
          <div>
            <h4 className="font-display text-xs tracking-[0.2em] uppercase text-white mb-4">Specifications</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-dot" />
                  <span className="text-xs text-muted-foreground font-display tracking-wider">TEL</span>
                </div>
                <a href="tel:8143448598" className="text-sm text-white hover:text-primary transition-colors">
                  814 344 8598
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                  <span className="text-xs text-muted-foreground font-display tracking-wider">LOC</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Miyapur, Hyderabad,<br />Telangana – 500118
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-dot" />
                  <span className="text-xs text-muted-foreground font-display tracking-wider">STATUS</span>
                </div>
                <span className="text-sm text-green-400">Accepting Bookings</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Auto Roxx. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50">
            Premium Car Care, Protection & Performance
          </p>
        </div>
      </div>
    </footer>
  );
}