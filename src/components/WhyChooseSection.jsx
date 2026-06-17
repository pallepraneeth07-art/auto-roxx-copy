import React from 'react';
import { motion } from 'framer-motion';
import { Users, Award, BadgeDollarSign, Zap, ThumbsUp, Cpu } from 'lucide-react';
import SectionHeading from './SectionHeading';

const REASONS = [
  { icon: Users, title: 'Expert Technicians', desc: 'Certified professionals with 10+ years in premium car care' },
  { icon: Award, title: 'Premium Products', desc: 'Only the finest imported coatings and materials are used' },
  { icon: BadgeDollarSign, title: 'Affordable Pricing', desc: 'Premium quality at competitive market prices' },
  { icon: Zap, title: 'Fast Service', desc: 'Efficient turnaround without compromising on quality' },
  { icon: ThumbsUp, title: 'Satisfaction Guaranteed', desc: '100% customer satisfaction with warranty on all services' },
  { icon: Cpu, title: 'Modern Equipment', desc: 'State-of-the-art tools and technology for precise results' },
];

export default function WhyChooseSection() {
  return (
    <section id="why-us" className="py-20 md:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Why Choose Us"
          title="THE AUTO ROXX ADVANTAGE"
          subtitle="Where scientific precision meets automotive passion"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group relative p-6 rounded-2xl bg-secondary/50 border border-white/5 hover:border-primary/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <reason.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-bold text-sm tracking-wider text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reason.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}