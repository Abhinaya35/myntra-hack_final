import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Tag, ShieldCheck, HeartHandshake } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';
import { getProductDetailsPath } from '../../constants/routes';

/**
 * Section 6: SignatureProducts Component (Polished)
 * 4 to 8 curated products featuring Regional Origin badges, GI certification & artisan labels.
 */
export const SignatureProducts = ({ products = [] }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Curated Artifacts"
        title="Signature Products"
        subtitle="A limited showcase of iconic drapes, master weaves, and hand-tailored garments."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image Thumbnail with Overlay Badges */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Regional Origin Badge */}
              {item.regionalBadge && (
                <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                  <Tag className="w-3 h-3 text-primary" />
                  <span>{item.regionalBadge}</span>
                </div>
              )}

              {/* GI Tag Indicator */}
              {item.giTag && (
                <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-emerald-300 border border-emerald-500/30 flex items-center gap-1 shadow-subtle">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>{item.giTag}</span>
                </div>
              )}
            </div>

            {/* Content Info */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-text-muted">
                  <HeartHandshake className="w-3.5 h-3.5 text-accent" />
                  <span>{item.artisanTag || 'Crafted by Local Artisans'}</span>
                </div>

                <h4 className="font-editorial text-xl font-bold text-text-primary group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {item.name}
                </h4>

                <div className="flex items-center gap-2 pt-1">
                  <span className="text-lg font-bold text-text-primary">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xs text-text-muted line-through font-normal">
                      {item.originalPrice}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-border/60">
                <Link
                  to={getProductDetailsPath(item.id)}
                  className="w-full py-2.5 px-4 rounded-xl bg-background border border-border/80 text-text-primary text-xs font-semibold hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                >
                  <span>View Product Details</span>
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

export default SignatureProducts;
