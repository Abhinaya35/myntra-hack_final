import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Layers, Heart } from 'lucide-react';

/**
 * Icon Map for Stat Metrics
 */
const getMetricIcon = (index) => {
  if (index === 0) return Award;
  if (index === 1) return Users;
  if (index === 2) return Layers;
  return Heart;
};

/**
 * Section 3B: HeritageMetrics Component
 * Responsive grid of statistics highlighting decades of legacy & artisan impact.
 */
export const HeritageMetrics = ({ metrics = [] }) => {
  if (!metrics || metrics.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {metrics.map((stat, i) => {
        const IconComponent = getMetricIcon(i);

        return (
          <motion.div
            key={stat.id || i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: 'easeOut' }}
            className="group bg-surface border border-border/80 rounded-2xl p-5 sm:p-6 shadow-subtle hover:shadow-card hover:border-primary/40 transition-all duration-300 flex flex-col justify-between text-center sm:text-left"
          >
            <div className="flex items-center justify-center sm:justify-between mb-3">
              <span className="font-editorial text-3xl sm:text-4xl font-bold text-primary tracking-tight group-hover:scale-105 transition-transform">
                {stat.value}
              </span>
              <div className="hidden sm:block p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-editorial text-base sm:text-lg font-bold text-text-primary">
                {stat.label}
              </h4>
              <p className="text-xs text-text-muted font-normal leading-relaxed">
                {stat.subtext}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeritageMetrics;
