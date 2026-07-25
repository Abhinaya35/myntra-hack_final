import React from 'react';
import { Layers } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 5: CraftDetails
 * Information cards displaying craft origin, weaving technique, raw materials & crafting time.
 */
export const CraftDetails = ({ craftDetails = [] }) => {
  if (!craftDetails || craftDetails.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Artisanal Blueprint"
        title="Craft Details"
        subtitle="Explore the exact weaving specifications, material purity, and crafting labor behind this piece."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {craftDetails.map((item, index) => (
          <div
            key={item.id || index}
            className="p-5 rounded-2xl bg-surface border border-border/80 shadow-subtle hover:shadow-card transition-all duration-300 space-y-1.5"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-primary">
              <Layers className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </div>
            <p className="font-editorial text-lg font-bold text-text-primary">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CraftDetails;
