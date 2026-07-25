import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Section 5: FeaturedCollections Component (Polished)
 * Editorial collection cards featuring curated product counts, emotional copy & smooth hover lift.
 */
export const FeaturedCollections = ({ collections = [] }) => {
  if (!collections || collections.length === 0) return null;

  return (
    <div id="featured-collections" className="space-y-8 scroll-mt-24">
      <SectionHeader
        tagline="Curated Edits"
        title="Featured Collections"
        subtitle="Handpicked bridal drapes, festive series, and heirloom handlooms crafted for celebrations."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {collections.map((col, index) => (
          <motion.div
            key={col.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Cover Photography */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-900">
              <img
                src={col.coverImage}
                alt={col.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Tag & Piece Count Pill */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-xs font-semibold text-primary shadow-subtle flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>{col.tag || 'Exclusive Edit'}</span>
                </span>

                <span className="px-3.5 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md text-xs font-semibold text-white border border-white/20">
                  {col.itemCount || 100} Curated Pieces
                </span>
              </div>

              {/* Emotional Title Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <h4 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  {col.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 font-normal line-clamp-2 leading-relaxed italic">
                  {col.description}
                </p>
              </div>
            </div>

            {/* Bottom Explore Button */}
            <div className="p-4 sm:p-5 bg-surface border-t border-border/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted">
                Crafted for timeless celebrations
              </span>

              <Link
                to={`/explore?collection=${encodeURIComponent(col.title)}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:underline underline-offset-4"
              >
                <span>Explore</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCollections;
