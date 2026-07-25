import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

/**
 * Reusable Editorial Section Header component
 */
export const SectionHeader = ({
  tagline,
  title,
  subtitle,
  actionLink,
  actionText = 'View All',
  centered = false,
  className = '',
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8",
        centered && "text-center md:text-center items-center md:items-center justify-center",
        className
      )}
    >
      <div className="space-y-1.5 max-w-2xl">
        {tagline && (
          <span className="text-xs uppercase tracking-widest font-semibold text-primary">
            {tagline}
          </span>
        )}
        {title && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-editorial font-bold text-text-primary tracking-tight">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center text-sm font-semibold text-primary hover:text-primary-hover transition-colors group shrink-0"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
