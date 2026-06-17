import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Droplets, Sparkles, Paintbrush, Car, Wrench, Settings, Star, Waves } from 'lucide-react';
import ServiceCard from './ServiceCard';
import SectionHeading from './SectionHeading';

const SERVICES = [
  {
    title: 'PPF COATING',
    icon: Shield,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/538e64a35_generated_994f2d12.png',
    features: [
      'Paint Protection Film installation',
      'Protection from scratches & stone chips',
      'UV damage protection',
    ],
  },
  {
    title: 'GRAPHENE COATING',
    icon: Droplets,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/3fe6f7bde_generated_8e8324c3.png',
    features: [
      'Advanced graphene protection',
      'Long-lasting shine',
      'Superior water repellency',
    ],
  },
  {
    title: 'CERAMIC COATING',
    icon: Sparkles,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/8c889160f_generated_93310ae2.png',
    features: [
      'Premium ceramic coating service',
      'Enhanced gloss finish',
      '9H hardness paint protection',
    ],
  },
  {
    title: 'DENTING & PAINTING',
    icon: Paintbrush,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/b781a275c_generated_27806dff.png',
    features: [
      'Professional dent removal',
      'Full-body & panel painting',
      'Color matching technology',
    ],
  },
  {
    title: 'CAR ACCESSORIES',
    icon: Car,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/41bf47c82_generated_dd1eb541.png',
    features: [
      'Interior & exterior accessories',
      'Seat covers & lighting upgrades',
      'Infotainment system installation',
    ],
  },
  {
    title: 'UNDERBODY WORK',
    icon: Wrench,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/8a96f2c21_generated_26792417.png',
    features: [
      'Anti-rust coating',
      'Underbody inspection',
      'Comprehensive repairs',
    ],
  },
  {
    title: 'MECHANIC WORK',
    icon: Settings,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/ca154c7fa_generated_808b9788.png',
    features: [
      'Engine diagnostics',
      'General servicing & repairs',
      'Brake & suspension maintenance',
    ],
  },
  {
    title: 'CAR DETAILING',
    icon: Star,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/31d6e7254_generated_9c1eca37.png',
    features: [
      'Interior & exterior detailing',
      'Premium polishing',
      'Paint restoration & correction',
    ],
  },
  {
    title: 'CAR WASH',
    icon: Waves,
    image: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/03c68cb89_generated_5469d809.png',
    features: [
      'Foam wash & pressure cleaning',
      'Interior deep cleaning',
      'Premium car spa services',
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-28 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="THE TREATMENT LABORATORY"
          subtitle="Every vehicle receives scientific-grade care with premium products and precision techniques"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}