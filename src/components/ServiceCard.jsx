import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ service, index }) {
  const scrollToBooking = () => {
    document.querySelector('#booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative overflow-hidden rounded-2xl bg-secondary border border-white/5 hover:border-primary/30 transition-all duration-500 light-streak"
    >
      {/* Image */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/30 to-transparent" />
        
        {/* Service icon overlay */}
        <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
          <service.icon className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-bold text-base tracking-wider text-white mb-2">
          {service.title}
        </h3>
        <ul className="space-y-1.5 mb-4">
          {service.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        <button
          onClick={scrollToBooking}
          className="flex items-center gap-2 text-sm font-medium text-primary hover:text-white transition-colors group/btn"
        >
          Book Now
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}