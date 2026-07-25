import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, MapPin, Bookmark, Navigation, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { useShortlist } from '../../hooks/useShortlist';
import { getHubDetailsPath } from '../../constants/routes';
import { cn } from '../../utils/cn';

/**
 * Section 1: StoreHero Component (Polished)
 * Hero with interactive Shopping Hub card, store badges, and smooth action triggers.
 */
export const StoreHero = ({ store }) => {
  const { isStoreSaved, toggleSaveStore } = useShortlist();
  const saved = isStoreSaved(store.id);

  const scrollToCollections = () => {
    const section = document.getElementById('featured-collections');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const hubPath = getHubDetailsPath(store.hubId || 'hub-1');

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-elevated border border-border/80 bg-surface">
      {/* 1. Immersive Hero Banner */}
      <div className="relative h-72 sm:h-96 md:h-[440px] w-full overflow-hidden bg-slate-950 group">
        <img
          src={store.heroBanner}
          alt={store.name}
          className="w-full h-full object-cover opacity-85 scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 pointer-events-auto">
            {store.isVerified && (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-border/80 text-xs font-semibold text-primary shadow-subtle animate-pulse">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>{store.badgeText || 'Verified Regional Icon'}</span>
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={() => toggleSaveStore(store)}
            className={cn(
              "pointer-events-auto px-4 py-2 rounded-full backdrop-blur-md transition-all shadow-subtle flex items-center gap-2 text-xs font-semibold cursor-pointer",
              saved
                ? "bg-primary text-white"
                : "bg-surface/90 text-text-primary hover:bg-surface border border-border/80"
            )}
            aria-label="Save Store"
          >
            <Bookmark className={cn("w-4 h-4", saved && "fill-current")} />
            <span className="hidden sm:inline">{saved ? 'Saved' : 'Save Store'}</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Details Block */}
      <div className="relative p-6 sm:p-8 md:p-10 -mt-20 sm:-mt-24 z-10">
        <div className="bg-surface/95 backdrop-blur-xl border border-border/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-card space-y-6">
          
          {/* 1. Clickable Premium Shopping Hub Experience */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border/60">
            <Link
              to={hubPath}
              className="group/hub inline-flex items-center gap-3 p-2.5 px-4 rounded-2xl bg-background border border-border/80 hover:border-primary/40 hover:bg-surface transition-all duration-300 shadow-subtle hover:shadow-card cursor-pointer"
            >
              <div className="p-2 rounded-xl bg-primary/10 text-primary group-hover/hub:bg-primary group-hover/hub:text-white transition-colors">
                <MapPin className="w-4 h-4" />
              </div>

              <div className="text-left">
                <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Shopping Hub
                </p>
                <p className="text-sm font-bold text-text-primary group-hover/hub:text-primary transition-colors flex items-center gap-1.5">
                  <span>📍 {store.hubName}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover/hub:opacity-100 group-hover/hub:translate-x-1 transition-all" />
                </p>
              </div>
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-xs font-semibold text-amber-800">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>Trusted Since {store.trustedSince || '1968'}</span>
            </div>
          </div>

          {/* Store Name & Tagline */}
          <div className="space-y-3">
            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              {store.name}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-text-muted max-w-3xl font-normal leading-relaxed">
              {store.tagline}
            </p>
          </div>

          {/* Action CTAs Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to={`/collections/${store.id}`}
              className="px-6 py-3.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-hover shadow-subtle hover:shadow-elevated transition-all duration-200 flex items-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Collections</span>
            </Link>

            <button
              type="button"
              onClick={() => toggleSaveStore(store)}
              className={cn(
                "px-5 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer",
                saved
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-surface border-border/80 text-text-primary hover:bg-background"
              )}
            >
              <Bookmark className={cn("w-4 h-4", saved && "fill-current text-primary")} />
              <span>{saved ? 'Saved in Shortlist' : 'Save Store'}</span>
            </button>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(store.name + ' ' + (store.location?.address || store.city))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3.5 rounded-xl bg-background border border-border/60 text-text-muted hover:text-text-primary text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 ml-auto"
            >
              <Navigation className="w-4 h-4 text-primary" />
              <span>Get Directions</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StoreHero;
