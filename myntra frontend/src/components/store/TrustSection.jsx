import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Users, Sparkles, Clock } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Icon Map Helper for Trust Badges
 */
const getTrustIcon = (title) => {
  if (title.includes('Verified')) return ShieldCheck;
  if (title.includes('Authentic')) return Award;
  if (title.includes('Craftsmanship')) return HeartHandshake;
  if (title.includes('Thousands') || title.includes('Trusted')) return Users;
  if (title.includes('Heritage') || title.includes('Decades')) return Clock;
  return Sparkles;
};

/**
 * Section 3: TrustSection Component
 * Displays 6 elegant trust cards highlighting authenticity, heritage & Myntra curation.
 */
export const TrustSection = ({ trustHighlights = [] }) => {
  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Authenticity Assured"
        title="Why Shoppers Trust This Store"
        subtitle="Every thread, motif, and drape verified for uncompromised regional perfection."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {trustHighlights.map((item) => {
          const IconComponent = getTrustIcon(item.title);

          return (
            <div
              key={item.id || item.title}
              className="group bg-surface border border-border/80 rounded-2xl p-5 shadow-subtle hover:shadow-card hover:border-primary/30 transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>

              <div className="space-y-1">
                <h4 className="font-editorial text-lg font-bold text-text-primary group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-text-muted font-normal leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrustSection;
