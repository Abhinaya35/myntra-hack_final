import React from 'react';
import { ShieldCheck, Sparkles, Bookmark } from 'lucide-react';
import { useShortlist } from '../../hooks/useShortlist';
import { cn } from '../../utils/cn';

/**
 * StoreHero - Branded regional storefront Hero banner.
 * All brand story indicators (badge, save bookmark, name, description,
 * specialties chips) are positioned left-aligned on the banner overlay.
 */
export const StoreHero = ({ store }) => {
  const { isStoreSaved, toggleSaveStore } = useShortlist();
  const saved = isStoreSaved(store.id);

  // Calculate serving legacy year using 2026 as standard reference
  const estYear = store.yearsInBusiness ? 2026 - store.yearsInBusiness : 1994;

  const scrollToCollections = () => {
    const section = document.getElementById('featured-collections');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-[500px] sm:h-[540px] md:h-[600px] w-full overflow-hidden rounded-3xl bg-slate-950 shadow-elevated border border-border/80">
      {/* Background Banner Image — only rendered when a URL is available */}
      {store.heroBanner ? (
        <img src={store.heroBanner} alt={store.name} className="w-full h-full object-cover opacity-75" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      )}
      {/* Black-to-transparent gradient overlay on the lower portion */}
      <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/95 via-black/50 to-transparent" />


      {/* Top Banner Row: Left Badge, Right Save Button */}
      {store.isVerified && (
        <div className="absolute top-6 left-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/45 backdrop-blur-md border border-white/10 text-xs font-semibold text-white tracking-wide shadow-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>✓ Verified Regional Store</span>
          </span>
        </div>
      )}

      {/* Save Bookmark Button */}
      <div className="absolute top-6 right-6">
        <button
          type="button"
          onClick={() => toggleSaveStore(store)}
          className={cn(
            "px-4 py-2.5 rounded-full backdrop-blur-md transition-all shadow-subtle flex items-center gap-2 text-xs font-semibold cursor-pointer border",
            saved ? "bg-primary text-white border-primary" : "bg-black/45 text-white border-white/10 hover:bg-black/60"
          )}
          aria-label="Save Store"
        >
          <Bookmark className={cn('w-4 h-4', saved && 'fill-current')} />
          <span>{saved ? 'Saved' : 'Save Store'}</span>
        </button>
      </div>

      {/* Hero Content overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 md:p-12 text-white flex flex-col items-start text-left space-y-4">
        {/* Location & Serving Since */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm font-semibold tracking-wide text-white/90">
          <span>📍 {store.city} • {store.state}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span>Serving Since {estYear}</span>
        </div>

        {/* Store Name */}
        <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight max-w-4xl drop-shadow-md">
          {store.name}
        </h1>

        {/* Famous For (Specialties) */}
        {store.specialties && store.specialties.length > 0 && (
          <div className="space-y-1.5 w-full pt-1">
            <p className="text-xs font-bold text-white/70 uppercase tracking-widest">Famous For</p>
            <div className="flex flex-wrap gap-2 text-xs">
              {store.specialties.map((specialty, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/10 shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <p className="text-sm sm:text-base text-white/80 max-w-2xl font-light leading-relaxed line-clamp-2">
          {store.description || store.tagline}
        </p>
      </div>
    </div>
  );
};

export default StoreHero;
