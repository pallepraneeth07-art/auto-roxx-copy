import React from 'react';
import { motion } from 'framer-motion';

export default function SectionHeading({ label, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center mb-14"
    >
      <span className="inline-block px-4 py-1 mb-4 text-xs font-medium tracking-[0.2em] uppercase text-primary bg-primary/10 border border-primary/20 rounded-full">
        {label}
      </span>
      <h2 className="font-display font-black text-3xl md:text-4xl lg:text-5xl tracking-wider text-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="flex items-center justify-center gap-2 mt-6">
        <div className="w-8 h-[1px] bg-primary/40" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-8 h-[1px] bg-primary/40" />
      </div>
    </motion.div>
  );
}