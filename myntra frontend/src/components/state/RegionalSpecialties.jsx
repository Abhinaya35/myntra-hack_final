import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 4: RegionalSpecialties
 * Feature cards showcasing iconic regional crafts and signature weaves.
 */
export const RegionalSpecialties = ({ specialties = [] }) => {
  if (!specialties || specialties.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Iconic Crafts"
        title="Regional Specialties"
        subtitle="Discover hallmark textile traditions and master weaves originating from this state."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {specialties.map((item, index) => (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3, delay: index * 0.06 }}
            className="group bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface/90 backdrop-blur-md text-[11px] font-semibold text-primary shadow-subtle flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>GI Heritage</span>
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
              <h4 className="font-editorial text-2xl font-bold text-text-primary group-hover:text-primary transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-text-muted font-normal leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RegionalSpecialties;
