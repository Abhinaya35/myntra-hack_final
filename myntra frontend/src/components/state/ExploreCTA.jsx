import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, ArrowLeft } from 'lucide-react';

/**
 * Component 8: ExploreCTA
 * End of page call-to-action encouraging users to explore shopping hubs or return to Explore India.
 */
export const ExploreCTA = ({ stateName = 'Telangana', onScrollToHubs }) => {
  return (
    <div className="relative w-full rounded-3xl bg-slate-950 text-white p-8 sm:p-12 shadow-elevated overflow-hidden text-center space-y-6">
      {/* Background Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/15 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 text-accent border border-white/15 text-xs font-semibold">
          <Compass className="w-3.5 h-3.5" />
          <span>Fashion Travel Destination</span>
        </div>

        <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight">
          Ready to explore {stateName}?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
          Discover authentic Regional Fashion Icons across {stateName}'s most iconic shopping hubs and handloom markets.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onScrollToHubs}
            className="px-6 py-3.5 rounded-2xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover shadow-subtle transition-all duration-200 flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Shopping Hubs</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            to="/explore"
            className="px-6 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explore India</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExploreCTA;
