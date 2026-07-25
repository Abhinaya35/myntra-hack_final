import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Section 2B: HeritageTimeline Component
 * Editorial timeline showcasing key heritage milestones over decades.
 */
export const HeritageTimeline = ({ timeline = [] }) => {
  if (!timeline || timeline.length === 0) return null;

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Decades of Mastery"
        title="Our Heritage Timeline"
        subtitle="A chronological journey through six decades of handloom preservation."
      />

      <div className="relative bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-subtle overflow-hidden">
        {/* Central Connecting Line on Desktop */}
        <div className="hidden md:block absolute left-1/2 top-24 bottom-24 w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20 -translate-x-1/2" />

        {/* Timeline Grid / Stack */}
        <div className="space-y-8 sm:space-y-12 relative z-10">
          {timeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.year || index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Box */}
                <div className="flex-1 w-full text-left md:text-right space-y-2">
                  <div className={`p-6 rounded-2xl bg-background border border-border/80 shadow-subtle hover:border-primary/40 transition-all duration-300 ${
                    isEven ? 'md:text-left' : 'md:text-right'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5 text-xs font-semibold text-primary">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Milestone {index + 1}</span>
                    </div>

                    <h4 className="font-editorial text-xl font-bold text-text-primary">
                      {item.title}
                    </h4>

                    <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center Year Badge */}
                <div className="relative shrink-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary text-primary flex items-center justify-center font-editorial font-bold text-base shadow-subtle z-20 group-hover:scale-110 transition-transform">
                    {item.year}
                  </div>
                </div>

                {/* Empty Spacer Column for Desktop Balance */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeritageTimeline;
