import React from 'react';
import { motion } from 'framer-motion';
import { Flame, TrendingUp, Sparkles, MapPin } from 'lucide-react';
import IndiaBackdrop from '../../pages/Landing/IndiaBackdrop';

/**
 * FashionPulseHeader - Hero header banner for category details view
 */
export const FashionPulseHeader = ({
  category = 'Temple Jewellery',
  state = 'Telangana',
  growth_percentage = 35,
  reason = 'Bonalu celebrations have increased demand for traditional jewellery.',
  description,
}) => {
  return (
    <div className="relative rounded-3xl bg-surface border border-border/80 p-6 sm:p-10 shadow-card overflow-hidden text-left space-y-4">
      {/* Ambient Backdrop */}
      <IndiaBackdrop />

      <div className="relative z-10 max-w-4xl space-y-4">
        {/* Top Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-primary" />
            <span>🔥 {state} - Threads of Bharat</span>
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold">
            <MapPin className="w-3 h-3 text-accent" />
            <span>{state} Region</span>
          </div>

          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-extrabold">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>+{growth_percentage}% Growth This Week</span>
          </div>
        </div>

        {/* Main Category Heading */}
        <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
          {category}
        </h1>

        {/* Reason Banner Callout */}
        <div className="p-4 rounded-2xl bg-background/80 border border-border/80 space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Why It's Trending in {state}:</span>
          </div>
          <p className="text-sm font-semibold text-text-primary leading-relaxed">
            {reason}
          </p>
        </div>

        {description && (
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed font-normal">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default FashionPulseHeader;
