import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { getStoreDetailsPath, getCollectionsPath } from '../../constants/routes';

/**
 * Component 1: ProductBreadcrumb
 * Contextual breadcrumb navigation trail for product details page.
 */
export const ProductBreadcrumb = ({ product }) => {
  if (!product) return null;

  const store = product.store || {};

  return (
    <nav className="flex items-center gap-1.5 text-xs text-text-muted font-medium overflow-x-auto py-1 custom-scrollbar no-scrollbar" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-primary transition-colors shrink-0">Home</Link>
      <ChevronRight className="w-3 h-3 text-border shrink-0" />
      <Link to="/nearby" className="hover:text-primary transition-colors shrink-0">Nearby</Link>
      <ChevronRight className="w-3 h-3 text-border shrink-0" />
      <Link to={getStoreDetailsPath(store.id || 'dest-1')} className="hover:text-primary transition-colors shrink-0">
        {store.name || 'Rajkamal Sarees'}
      </Link>
      <ChevronRight className="w-3 h-3 text-border shrink-0" />
      <Link to={getCollectionsPath(store.id || 'dest-1')} className="hover:text-primary transition-colors shrink-0">
        Women
      </Link>
      <ChevronRight className="w-3 h-3 text-border shrink-0" />
      <span className="text-text-primary font-semibold truncate">{product.name}</span>
    </nav>
  );
};

export default ProductBreadcrumb;
