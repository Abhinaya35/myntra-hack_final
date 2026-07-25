import React, { useState } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { cn } from '../../utils/cn';

/**
 * Reusable Search Bar component with clear button & optional filter action
 */
export const SearchBar = ({
  value = '',
  onChange,
  onSearch,
  onFilterToggle,
  placeholder = 'Search regional crafts, stores, or iconic hubs...',
  className = '',
  showFilterButton = false,
  autoFocus = false,
}) => {
  const [query, setQuery] = useState(value);

  const handleInputChange = (e) => {
    const newVal = e.target.value;
    setQuery(newVal);
    if (onChange) onChange(newVal);
  };

  const handleClear = () => {
    setQuery('');
    if (onChange) onChange('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("relative flex items-center w-full group", className)}
    >
      <div className="relative flex-1 flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-text-muted transition-colors group-focus-within:text-primary" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-10 py-3.5 bg-surface text-text-primary text-sm placeholder:text-text-muted/60 border border-border rounded-2xl shadow-subtle transition-all duration-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3.5 p-1 text-text-muted hover:text-text-primary rounded-full hover:bg-background transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {showFilterButton && (
        <button
          type="button"
          onClick={onFilterToggle}
          className="ml-3 p-3.5 bg-surface border border-border rounded-2xl shadow-subtle hover:border-primary/40 hover:bg-background text-text-primary transition-all duration-200"
          aria-label="Toggle filters"
        >
          <SlidersHorizontal className="w-5 h-5 text-text-muted hover:text-primary transition-colors" />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
