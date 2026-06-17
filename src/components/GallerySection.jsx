import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import SectionHeading from './SectionHeading';

const GALLERY_ITEMS = [
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/e60955f28_generated_bf0dae9a.png', label: 'Ceramic Coating', category: 'coating' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/3fe6f7bde_generated_8e8324c3.png', label: 'Graphene Coating', category: 'coating' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/29c34c6b2_generated_b34e9ce3.png', label: 'PPF Installation', category: 'protection' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/31d6e7254_generated_9c1eca37.png', label: 'Car Detailing', category: 'detailing' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/03c68cb89_generated_5469d809.png', label: 'Premium Car Wash', category: 'wash' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/b781a275c_generated_27806dff.png', label: 'Denting & Painting', category: 'bodywork' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/f5aa81e88_generated_69a7942e.png', label: 'Interior Detailing', category: 'detailing' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/f876aafdb_generated_a962b310.png', label: 'Before & After', category: 'results' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/7fedd976e_generated_cd160ec2.png', label: 'Our Facility', category: 'facility' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/41bf47c82_generated_dd1eb541.png', label: 'Accessories', category: 'accessories' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/538e64a35_generated_994f2d12.png', label: 'PPF Application', category: 'protection' },
  { src: 'https://media.base44.com/images/public/6a32b0de69d8f5a2c5920210/8c889160f_generated_93310ae2.png', label: 'Ceramic Application', category: 'coating' },
];

const CATEGORIES = [
  { key: 'all', label: 'All Work' },
  { key: 'coating', label: 'Coatings' },
  { key: 'protection', label: 'Protection' },
  { key: 'detailing', label: 'Detailing' },
  { key: 'bodywork', label: 'Bodywork' },
  { key: 'results', label: 'Results' },
];

export default function GallerySection() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((g) => g.category === filter);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-secondary/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Work"
          title="TRANSFORMATION VAULT"
          subtitle="Witness the precision and artistry behind every service we deliver"
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 text-xs font-display tracking-widest uppercase rounded-full border transition-all duration-300 ${
                filter === cat.key
                  ? 'bg-primary text-white border-primary glow-red'
                  : 'bg-transparent text-muted-foreground border-white/10 hover:border-white/30'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                key={item.src + item.label}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer light-streak"
                onClick={() => setLightbox(item)}
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-all duration-700 grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs font-display tracking-wider text-white">{item.label}</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ZoomIn className="w-4 h-4 text-white" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors">
              <X className="w-5 h-5" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={lightbox.src}
              alt={lightbox.label}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <p className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display tracking-wider text-white text-sm">
              {lightbox.label}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}