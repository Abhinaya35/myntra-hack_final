import React from 'react';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * Component 11: HeritagePromise
 * Elegant, minimal heritage commitment section closing the product details page.
 */
export const HeritagePromise = () => {
  return (
    <div className="relative w-full rounded-3xl bg-slate-950 text-white p-8 sm:p-10 md:p-12 shadow-elevated overflow-hidden text-center space-y-4">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-accent border border-white/10 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Cultural Impact Promise</span>
        </div>

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight">
          Preserving India's Textile Heritage
        </h3>

        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
          Every purchase directly supports regional master weavers, sustains rural loom communities, and preserves centuries of uncompromised Indian handloom artistry.
        </p>

        <div className="pt-2 flex items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>Fair Artisan Wages</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>100% Authentic Handloom</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeritagePromise;
