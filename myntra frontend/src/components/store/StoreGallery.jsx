import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Section 7: StoreGallery Component (Polished)
 * Masonry grid gallery with category tags, smooth hover zoom & immersive image treatment.
 */
export const StoreGallery = ({ gallery = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!gallery || gallery.length === 0) return null;

  const categories = ['All', ...new Set(gallery.map((g) => g.category).filter(Boolean))];
  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter((g) => g.category === selectedCategory);

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Authentic Ambiance"
        title="Store Experience Gallery"
        subtitle="Step inside our flagship showroom and glimpse the living heritage of Indian handlooms."
      />

      {/* Category Filter Chips */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center gap-2 justify-center pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-subtle'
                  : 'bg-surface border border-border/80 text-text-muted hover:text-text-primary hover:border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Masonry-Style Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredGallery.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group relative rounded-3xl overflow-hidden shadow-card border border-border/80 bg-slate-950 h-72 sm:h-80 flex flex-col justify-end p-5 cursor-pointer"
          >
            {/* Background Image with Smooth Scale Zoom */}
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

            {/* Top Category Badge */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[10px] font-semibold text-accent border border-white/20 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>{item.category || 'Showroom'}</span>
              </span>
            </div>

            {/* Bottom Content Info */}
            <div className="relative z-10 text-white space-y-1.5">
              <h4 className="font-editorial text-xl font-bold leading-tight">
                {item.title}
              </h4>
              <p className="text-xs text-slate-300 font-normal line-clamp-2 leading-relaxed">
                {item.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoreGallery;
