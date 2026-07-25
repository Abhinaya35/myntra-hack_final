import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 4: FeaturedCollections
 * Large editorial cards for seasonal or signature edits (Wedding Edit, Festive Picks, Summer Essentials).
 */
export const FeaturedCollections = ({ featuredEdits = [] }) => {
  if (!featuredEdits || featuredEdits.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Seasonal Showcase"
        title="Featured Collections"
        subtitle="Explore signature seasonal edits curated by master weavers and fashion directors."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {featuredEdits.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, delay: index * 0.08, ease: 'easeOut' }}
            className="group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Immersive Imagery */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Badge & Item Count */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md text-xs font-semibold text-primary shadow-subtle flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-primary fill-primary/20" />
                  <span>{item.badge || 'Trending Season'}</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20">
                  {item.itemCount} Designs
                </span>
              </div>

              {/* Title & Subtitle Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                <p className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {item.subtitle}
                </p>
                <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-normal line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Bottom Explore Button */}
            <div className="p-4 sm:p-5 bg-surface border-t border-border/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted">
                Explore {item.itemCount} Curated Pieces
              </span>

              <Link
                to={`/explore?edit=${encodeURIComponent(item.title)}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group-hover:underline underline-offset-4"
              >
                <span>Explore Edit</span>
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
