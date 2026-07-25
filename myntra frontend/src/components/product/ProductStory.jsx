import React from 'react';
import { Sparkles, Quote } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Component 3: ProductStory
 * Editorial narrative storytelling explaining the craft heritage behind the piece.
 */
export const ProductStory = ({ story }) => {
  if (!story) return null;

  return (
    <div className="bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 md:p-10 shadow-card space-y-6">
      <SectionHeader
        tagline="Heritage Storytelling"
        title="The Story Behind The Piece"
        subtitle="Uncover the cultural significance, weaving legacy, and artisan dedication woven into every thread."
      />

      <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/40 space-y-4">
        <Quote className="w-8 h-8 text-primary/20 absolute -top-2 left-2 pointer-events-none" />

        <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-text-primary leading-tight">
          "{story.headline}"
        </h3>

        {story.paragraphs?.map((p, idx) => (
          <p key={idx} className="text-sm sm:text-base text-text-muted font-normal leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductStory;
