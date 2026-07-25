import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 8: ContinueExploring
 * Recommends additional categories (Similar Collections, Trending Categories, More From Store).
 */
export const ContinueExploring = ({ suggestions = [] }) => {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="More Discovery"
        title="Continue Exploring"
        subtitle="Explore related handloom drapes and trending categories from this regional store."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {suggestions.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
            className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-[11px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-primary" />
                <span>{item.type || 'Recommended'}</span>
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h4 className="font-editorial text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-1">
                  {item.title}
                </h4>
                <p className="text-xs text-text-muted font-normal line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-border/60">
                <Link
                  to={`/explore?category=${encodeURIComponent(item.title)}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-background border border-border/80 text-text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Category</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ContinueExploring;
