import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Bookmark } from 'lucide-react';
import { useShortlist } from '../../hooks/useShortlist';
import { cn } from '../../utils/cn';

/**
 * Section 10: StickyActionBar Component
 * Floating/Sticky action panel (bottom bar on mobile, floating bottom widget on desktop).
 */
export const StickyActionBar = ({ store }) => {
  const { isStoreSaved, toggleSaveStore } = useShortlist();
  const saved = isStoreSaved(store.id);

  const scrollToCollections = () => {
    const section = document.getElementById('featured-collections');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-surface/90 backdrop-blur-xl border-t border-border/80 shadow-elevated md:bottom-6 md:right-6 md:left-auto md:max-w-md md:rounded-2xl md:border">
      <div className="flex items-center justify-between gap-3">
        {/* Store Brand Pill (Desktop visible) */}
        <div className="hidden sm:block min-w-0 pr-2">
          <p className="font-editorial text-sm font-bold text-text-primary truncate">
            {store.name}
          </p>
          <p className="text-[11px] text-text-muted truncate">
            {store.hubName}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          {/* Secondary Action: Save Store */}
          <button
            type="button"
            onClick={() => toggleSaveStore(store)}
            className={cn(
              "p-3 rounded-xl border text-xs font-semibold transition-all shrink-0 flex items-center justify-center gap-1.5 cursor-pointer",
              saved
                ? "bg-primary/10 border-primary/30 text-primary"
                : "bg-surface border-border/80 text-text-primary hover:bg-background"
            )}
            aria-label="Save Store"
          >
            <Bookmark className={cn("w-4 h-4", saved && "fill-current text-primary")} />
            <span className="hidden xs:inline">{saved ? 'Saved' : 'Save'}</span>
          </button>

          {/* Primary Action: Explore Collections */}
          <Link
            to={`/collections/${store.id}`}
            className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-primary text-white text-xs sm:text-sm font-semibold hover:bg-primary-hover shadow-subtle transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Explore Collections</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StickyActionBar;
