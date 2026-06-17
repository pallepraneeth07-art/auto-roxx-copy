import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Calendar, ChevronDown } from 'lucide-react';

const HERO_IMG = 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/10709d2a4_generated_cfbeb45c.png';

export default function HeroSection() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Premium luxury supercar in Auto Roxx studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/70 via-[#0A0A0B]/50 to-[#0A0A0B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B]/80 via-transparent to-[#0A0A0B]/60" />
      </div>

      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-primary rounded-full pulse-dot" />
            <span className="text-xs font-medium tracking-widest text-secondary-foreground uppercase">
              Hyderabad's Premium Car Care Lab
            </span>
          </motion.div>

          {/* Main Heading */}
          <h1 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-4">
            <span className="text-white">AUTO</span>
            <span className="text-primary ml-3 md:ml-5">ROXX</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl md:text-2xl text-secondary-foreground/80 font-light tracking-wide max-w-2xl mx-auto mb-3">
            Premium Car Care, Protection & Performance
          </p>

          {/* Separator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary" />
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary" />
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('#booking')}
              className="group flex items-center gap-3 px-8 py-4 bg-primary text-white font-display font-bold text-sm tracking-widest rounded-full glow-red hover:glow-red-intense transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              SCHEDULE SERVICE
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="tel:8143448598"
              className="flex items-center gap-3 px-8 py-4 bg-white/5 text-white border border-white/15 font-display font-bold text-sm tracking-widest rounded-full backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              CALL NOW
            </motion.a>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex items-center justify-center gap-8 md:gap-16 mt-16"
          >
            {[
              { value: '5000+', label: 'Cars Serviced' },
              { value: '10+', label: 'Years Experience' },
              { value: '4.9★', label: 'Customer Rating' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display font-bold text-2xl md:text-3xl text-white">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground tracking-wider uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollTo('#services')}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-white transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
}