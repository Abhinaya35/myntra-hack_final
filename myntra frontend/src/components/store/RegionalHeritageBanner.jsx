import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake } from 'lucide-react';

/**
 * Section 4B: RegionalHeritageBanner Component
 * High-impact storytelling banner celebrating regional weaving preservation & weaver support.
 */
export const RegionalHeritageBanner = ({ banner }) => {
  if (!banner) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-elevated border border-border/80 bg-slate-950 text-white my-8">
      {/* Background Image with Dark Gradient & Blur */}
      <img
        src={banner.image}
        alt={banner.title}
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/40" />

      {/* Content Layout with Generous Whitespace */}
      <div className="relative z-10 p-8 sm:p-12 lg:p-16 max-w-4xl space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-semibold">
          <HeartHandshake className="w-4 h-4" />
          <span>Artesanal Legacy Initiative</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-white">
          {banner.title}
        </h2>

        <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
          {banner.subtitle}
        </p>

        <p className="text-xs sm:text-sm text-slate-400 font-normal max-w-xl border-l-2 border-primary/60 pl-4 italic">
          {banner.description}
        </p>
      </div>
    </div>
  );
};

export default RegionalHeritageBanner;
