import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

/**
 * Component 1: StateBreadcrumb
 * Contextual breadcrumb navigation trail for state details page.
 */
export const StateBreadcrumb = ({ stateName }) => {
  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted font-medium overflow-x-auto py-1" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
      <ChevronRight className="w-3 h-3 text-border shrink-0" />
      <Link to="/explore" className="hover:text-primary transition-colors shrink-0">Explore India</Link>
      <ChevronRight className="w-3 h-3 text-border shrink-0" />
      <span className="text-text-primary font-semibold truncate">{stateName}</span>
    </nav>
  );
};

export default StateBreadcrumb;
