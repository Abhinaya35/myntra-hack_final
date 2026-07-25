import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users, Award, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Section 2: StoreStory Component
 * Editorial storytelling highlighting history, heritage, artisan craftsmanship & family legacy.
 */
export const StoreStory = ({ story }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!story) return null;

  return (
    <div className="space-y-6">
      <SectionHeader
        tagline="Heritage & Craftsmanship"
        title="Our Story"
        subtitle="A journey of loom legacy, master artisans, and uncompromising purity."
      />

      <div className="bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-subtle relative overflow-hidden">
        {/* Subtle decorative quote mark background */}
        <div className="absolute top-4 right-6 font-editorial text-9xl text-border/20 select-none pointer-events-none">
          “
        </div>

        <div className="space-y-6 relative z-10">
          {/* Headline */}
          <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
            {story.headline}
          </h3>

          {/* Primary Summary Paragraph */}
          <p className="text-base sm:text-lg text-text-muted font-normal leading-relaxed">
            {story.summary}
          </p>

          {/* Expandable Full Story Text */}
          {story.fullText && (
            <div className="space-y-4">
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="text-base text-text-muted font-normal leading-relaxed pt-2 border-t border-border/60 space-y-4"
                >
                  <p>{story.fullText}</p>
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-4 pt-1 cursor-pointer"
              >
                <span>{isExpanded ? 'Read Less' : 'Read Full Heritage Story'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Key Heritage Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-border/60">
            <div className="p-4 rounded-2xl bg-background border border-border/60 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">Artisan Network</p>
                <p className="text-sm font-bold text-text-primary">{story.artisanCount || 300}+ Master Weavers</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-background border border-border/60 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent/15 text-amber-700 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">Enterprise Type</p>
                <p className="text-sm font-bold text-text-primary">{story.generation || 'Heritage Family Enterprise'}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-background border border-border/60 flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-secondary/10 text-secondary shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted font-medium">Purity Guarantee</p>
                <p className="text-sm font-bold text-text-primary">100% Handloom Certified</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreStory;
