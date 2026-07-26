import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Sparkles, Award, ShoppingBag, Compass, ArrowRight } from 'lucide-react';
import { getFashionPulseCategoryPath } from '../../constants/routes';

// Icon Map helper for dynamic icons string from API
const ICON_MAP = {
  Flame,
  TrendingUp,
  Sparkles,
  Award,
  ShoppingBag,
  Compass,
};

/**
 * FashionPulseCard - Premium Myntra-style regional trend card component
 */
export const FashionPulseCard = ({ trend = {}, index = 0 }) => {
  const navigate = useNavigate();

  const {
    categoryId = 'temple-jewellery',
    category = 'Temple Jewellery',
    growth_percentage = 35,
    reason = 'Bonalu shopping has increased demand this week.',
    state = 'Telangana',
    icon = 'Flame',
    image,
  } = trend;

  // Determine Icon component
  const IconComponent = ICON_MAP[icon] || Flame;

  const handleClick = () => {
    navigate(getFashionPulseCategoryPath(categoryId));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={handleClick}
      className="group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Banner Image with Gradient Overlay */}
      <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={category}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-rose-100/60 via-amber-50 to-orange-100 flex items-center justify-center">
            <IconComponent className="w-12 h-12 text-primary/30" />
          </div>
        )}

        {/* Gradient backdrop for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

        {/* Top Badges: Region State & Growth Badge */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="bg-slate-900/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border border-white/10 shadow-sm">
            {state}
          </span>

          <span className="bg-primary/95 text-white backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md animate-pulse">
            <TrendingUp className="w-3.5 h-3.5" />
            ↑ {growth_percentage}%
          </span>
        </div>

        {/* Category Title on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
          <div className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white shrink-0">
            <IconComponent className="w-4 h-4 text-accent" />
          </div>
          <h3 className="text-lg font-bold text-white font-editorial tracking-tight line-clamp-1 drop-shadow-sm">
            {category}
          </h3>
        </div>
      </div>

      {/* Card Content & Reason Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        {/* User-requested "Why?" / "Reason:" block */}
        <div className="space-y-1.5 bg-background/60 p-3 rounded-2xl border border-border/50">
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-primary">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span>Why It's Trending</span>
          </div>
          <p className="text-xs text-text-primary leading-relaxed font-medium line-clamp-2">
            {reason}
          </p>
        </div>

        {/* Card Footer with Explore CTA */}
        <div className="pt-2 border-t border-border/60 flex items-center justify-between">
          <span className="text-xs font-semibold text-text-muted group-hover:text-text-primary transition-colors">
            Regional Trend
          </span>

          <motion.div
            whileHover={{ x: 3 }}
            className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-primary-hover transition-colors"
          >
            <span>View Collection</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FashionPulseCard;
