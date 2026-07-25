import React from 'react';
import { ShieldCheck, MapPin, Layers, Award } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 7: StateHighlights
 * Clean statistic cards showcasing key state legacy metrics.
 */
export const StateHighlights = ({ stats, stateName = 'Telangana' }) => {
  if (!stats) return null;

  const statItems = [
    {
      label: 'Verified Regional Stores',
      value: `${stats.verifiedStores || 42}`,
      subtext: 'Authentic multi-generational fashion houses',
      icon: ShieldCheck,
    },
    {
      label: 'Shopping Hub Destinations',
      value: `${stats.shoppingHubs || 8}`,
      subtext: 'Iconic fashion quarters and handloom districts',
      icon: MapPin,
    },
    {
      label: 'Curated Handcraft Items',
      value: `${stats.totalProducts?.toLocaleString() || '1,200'}+`,
      subtext: 'Silk sarees, bridal drapes & ethnic ensembles',
      icon: Layers,
    },
    {
      label: 'Traditional Weaving Crafts',
      value: `${stats.traditionalCrafts || 15}`,
      subtext: 'Geographical Indication authenticated weaves',
      icon: Award,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="State Legacy Numbers"
        title={`${stateName} at a Glance`}
        subtitle="Key metrics highlighting the scale and authenticity of regional fashion across the state."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={index}
              className="p-6 rounded-3xl bg-surface border border-border/80 shadow-subtle hover:shadow-card transition-all duration-300 space-y-2"
            >
              <div className="p-3 rounded-2xl bg-primary/10 text-primary w-fit">
                <IconComponent className="w-5 h-5" />
              </div>

              <div>
                <p className="font-editorial text-3xl sm:text-4xl font-bold text-text-primary">
                  {item.value}
                </p>
                <p className="text-sm font-semibold text-text-primary pt-0.5">
                  {item.label}
                </p>
                <p className="text-xs text-text-muted font-normal pt-1">
                  {item.subtext}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StateHighlights;
