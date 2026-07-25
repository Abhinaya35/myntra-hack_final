import React from 'react';
import { ShieldCheck, MapPin, Layers, Award } from 'lucide-react';

/**
 * Component 2: StateHero
 * Full-width immersive editorial hero introducing the state's fashion identity and key metrics.
 */
export const StateHero = ({ stateData }) => {
  if (!stateData) return null;

  const { name, tagline, bannerImage, stats } = stateData;

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-elevated border border-border/80 bg-slate-950 text-white">
      {/* Background Imagery with Subtle Overlay */}
      <div className="relative h-96 sm:h-[450px] md:h-[500px] w-full overflow-hidden">
        <img
          src={bannerImage}
          alt={name}
          className="w-full h-full object-cover opacity-80 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-10 p-6 sm:p-10 md:p-14 flex flex-col justify-end space-y-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-semibold w-fit">
          <Award className="w-4 h-4 text-accent" />
          <span>Regional Fashion Identity</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            {name}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
            {tagline}
          </p>
        </div>

        {/* Elegant Stat Pills */}
        <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold">
          <div className="px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>{stats?.verifiedStores || 42} Verified Regional Fashion Icons</span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent" />
            <span>{stats?.shoppingHubs || 8} Shopping Hubs</span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>{stats?.totalProducts?.toLocaleString() || '1,200'}+ Handcrafted Items</span>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-300" />
            <span>{stats?.traditionalCrafts || 15} Traditional Crafts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateHero;
