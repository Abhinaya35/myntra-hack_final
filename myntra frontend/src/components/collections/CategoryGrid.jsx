import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 3: CategoryGrid
 * Displays category cards for active department (Bridal, Sarees, Kurtis, Shirts, Ethnic, etc.).
 */
export const CategoryGrid = ({ categories = [], departmentLabel = 'Women' }) => {
  if (!categories || categories.length === 0) {
    return (
      <div className="p-8 bg-surface border border-dashed border-border/80 rounded-3xl text-center text-text-muted">
        <p className="text-sm font-semibold">No categories currently listed for {departmentLabel}.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline={`${departmentLabel} Handloom Catalog`}
        title={`${departmentLabel} Categories`}
        subtitle={`Browse curated categories handcrafted for ${departmentLabel.toLowerCase()}.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id || index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
            className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Category Cover Image */}
            <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-slate-900">
              <img
                src={cat.coverImage}
                alt={cat.name}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

              {/* Tag & Count Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-[11px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>{cat.tag || 'Handcrafted Edit'}</span>
                </span>

                <span className="px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-[11px] font-semibold text-white border border-white/20 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-accent" />
                  <span>{cat.productCount} Items</span>
                </span>
              </div>

              {/* Category Name & Icon Overlay */}
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1 z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
                    {cat.name}
                  </h3>
                </div>
                <p className="text-xs text-slate-200 font-normal line-clamp-2 leading-relaxed italic">
                  {cat.description}
                </p>
              </div>
            </div>

            {/* Bottom Explore Button */}
            <div className="p-4 sm:p-5 bg-surface border-t border-border/60 flex items-center justify-between">
              <span className="text-xs font-semibold text-text-muted">
                Explore {cat.productCount} Handloom Designs
              </span>

              <Link
                to={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary group-hover:underline underline-offset-4"
              >
                <span>Explore Category</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
