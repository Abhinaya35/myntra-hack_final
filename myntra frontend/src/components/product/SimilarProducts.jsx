import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { getProductDetailsPath } from '../../constants/routes';

/**
 * Component 9: SimilarProducts
 * Related products from the same regional category.
 */
export const SimilarProducts = ({ products = [] }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Handloom Recommendations"
        title="Similar Crafts You May Like"
        subtitle="Explore related drapes and handwoven creations in the same regional style."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Thumbnail */}
            <div className="relative h-64 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {item.regionalBadge && (
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                  <Tag className="w-3 h-3 text-primary" />
                  <span>{item.regionalBadge}</span>
                </div>
              )}
            </div>

            {/* Details & Action */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h4 className="font-editorial text-lg font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {item.name}
                </h4>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-base font-bold text-text-primary">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-text-muted line-through font-normal">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-2 border-t border-border/60">
                <Link
                  to={getProductDetailsPath(item.id)}
                  className="w-full py-2 px-3 rounded-xl bg-background border border-border/80 text-text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
                >
                  <span>View Details</span>
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

export default SimilarProducts;
