import React from 'react';
import { Sparkles, Layers } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Section 4: RegionalSpecialties Component
 * Highlights iconic weaving techniques and regional textiles as premium chips/cards.
 */
export const RegionalSpecialties = ({ specialties = [] }) => {
  if (!specialties || specialties.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Artisanal Mastery"
        title="Regional Specialties"
        subtitle="Discover signature weaves and iconic traditional craftsmanship perfected over generations."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specialties.map((spec, i) => (
          <div
            key={i}
            className="group relative bg-surface border border-border/80 rounded-2xl p-5 shadow-subtle hover:shadow-card hover:border-primary/40 transition-all duration-300 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Tag */}
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/30 text-[11px] font-semibold text-amber-800">
                <Sparkles className="w-3 h-3" />
                <span>{spec.badge || 'Regional Classic'}</span>
              </span>
              <Layers className="w-4 h-4 text-text-muted/40 group-hover:text-primary/60 transition-colors" />
            </div>

            {/* Specialty Title & Description */}
            <div className="space-y-1">
              <h4 className="font-editorial text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                {spec.name}
              </h4>
              <p className="text-xs text-text-muted font-normal leading-relaxed">
                {spec.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionalSpecialties;
