import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Sparkles, Filter } from 'lucide-react';
import FashionPulseGrid from './FashionPulseGrid';
import fashionPulseService from '../../services/fashionPulseService';

const STATE_OPTIONS = [
  { id: 'all', label: 'All Regions' },
  { id: 'telangana', label: 'Telangana', name: 'Telangana' },
  { id: 'rajasthan', label: 'Rajasthan', name: 'Rajasthan' },
  { id: 'tamil-nadu', label: 'Tamil Nadu', name: 'Tamil Nadu' },
  { id: 'madhya-pradesh', label: 'Madhya Pradesh', name: 'Madhya Pradesh' },
  { id: 'west-bengal', label: 'West Bengal', name: 'West Bengal' },
];

/**
 * FashionPulseSection - Homepage section component for Bharat Fashion Pulse
 */
export const FashionPulseSection = () => {
  const [selectedState, setSelectedState] = useState('all');
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrends(selectedState);
  }, [selectedState]);

  const fetchTrends = async (stateFilter) => {
    try {
      setLoading(true);
      setError(null);
      const activeStateName = stateFilter === 'all' ? '' : stateFilter;
      const data = await fashionPulseService.getFashionPulse(activeStateName);
      setTrends(data || []);
    } catch (err) {
      console.error('[FashionPulseSection] Failed to load trends:', err);
      setError('Unable to fetch regional trends at the moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-12 md:py-16 relative overflow-hidden">
      {/* Subtle Ambient Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-primary/10 via-amber-500/5 to-rose-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border/60 pb-6">
          <div className="space-y-2">
            {/* Myntra Regional Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Regional Insights</span>
            </div>

            {/* Title */}
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-text-primary tracking-tight flex items-center gap-2">
              <Flame className="w-8 h-8 text-primary animate-pulse shrink-0" />
              <span>Threads of Bharat</span>
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-text-muted font-normal max-w-xl">
              Discover what's shaping fashion in your region. Updated weekly based on local festivals, craft guilds, and shopping surges.
            </p>
          </div>

          {/* Region Filter Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <div className="flex items-center gap-1 text-xs font-semibold text-text-muted mr-1 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Region:</span>
            </div>
            {STATE_OPTIONS.map((st) => {
              const isActive = selectedState === (st.name || st.id);
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => setSelectedState(st.name || st.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 focus:outline-none ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105'
                      : 'bg-surface/80 text-text-muted hover:text-text-primary hover:bg-surface border border-border/70'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Trend Cards Grid */}
        <FashionPulseGrid trends={trends} loading={loading} error={error} />
      </div>
    </section>
  );
};

export default FashionPulseSection;
