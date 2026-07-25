import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 6: FabricExplorer
 * Interactive fabric & weave purity selector (Cotton, Silk, Linen, Khadi, Chanderi, Banarasi, Ikat).
 */
export const FabricExplorer = ({ fabrics = [], activeFabric, onSelectFabric }) => {
  if (!fabrics || fabrics.length === 0) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Weave & Thread Purity"
        title="Shop By Fabric"
        subtitle="Filter collections by organic natural fibers, heritage weaves, and Silk Mark certified drapes."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {fabrics.map((fab) => {
          const isSelected = activeFabric === fab.id;

          return (
            <motion.button
              key={fab.id}
              type="button"
              onClick={() => onSelectFabric(isSelected ? null : fab.id)}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-700 shadow-card ring-2 ring-primary/40'
                  : 'bg-surface border-border/80 text-text-primary hover:border-primary/40 hover:shadow-subtle'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                  <Layers className="w-4 h-4" />
                </div>
                <span className={`text-[10px] font-semibold ${isSelected ? 'text-accent' : 'text-text-muted'}`}>
                  {fab.count} Weaves
                </span>
              </div>

              <div>
                <h4 className="font-editorial text-lg font-bold">
                  {fab.label}
                </h4>
                <p className={`text-[11px] truncate ${isSelected ? 'text-slate-300' : 'text-text-muted'}`}>
                  {fab.origin}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default FabricExplorer;
