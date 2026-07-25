import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 7: WhyLoveSection
 * Feature cards highlighting key product hallmarks (GI Certified, Handwoven, Natural Dye, etc.).
 */
export const WhyLoveSection = ({ features = [] }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Key Highlights"
        title="Why You'll Love It"
        subtitle="Uncompromising craft excellence and authentic regional design features."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {features.map((item, index) => (
          <div
            key={item.id || index}
            className="p-5 rounded-2xl bg-surface border border-border/80 shadow-subtle hover:shadow-card transition-all duration-300 space-y-2"
          >
            <div className="flex items-center gap-2 text-primary font-bold text-base">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <h4 className="font-editorial text-xl">{item.title}</h4>
            </div>
            <p className="text-xs text-text-muted font-normal leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyLoveSection;
