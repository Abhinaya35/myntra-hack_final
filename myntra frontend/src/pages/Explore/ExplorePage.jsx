import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Compass, ShoppingBag, Search } from 'lucide-react';

// Layout & Component Imports
import PageContainer from '../../components/layout/PageContainer';
import IndiaBackdrop from '../Landing/IndiaBackdrop';
import StateFilterSidebar from '../../components/explore/StateFilterSidebar';
import ShoppingHubCard from '../../components/explore/ShoppingHubCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

// Service Imports
import shoppingHubService from '../../services/shoppingHubService';

/**
 * ExplorePage Component (Route: /explore)
 * Integrated directly with FastAPI Backend:
 * - GET /shopping-hubs
 * - GET /shopping-hubs?state={StateName}
 * Builds state filter list dynamically from backend shopping hub records.
 */
export const ExplorePage = () => {
  const [allHubs, setAllHubs] = useState([]);
  const [displayedHubs, setDisplayedHubs] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top and fetch all shopping hubs from backend on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    fetchAllShoppingHubs();
  }, []);

  /**
   * Fetch initial full list of shopping hubs from GET /shopping-hubs
   * and dynamically extract the unique state list with count metadata.
   */
  const fetchAllShoppingHubs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call GET /shopping-hubs
      const data = await shoppingHubService.getShoppingHubs();
      const hubsList = data || [];

      setAllHubs(hubsList);
      setDisplayedHubs(hubsList);

      // Extract unique states and calculate counts dynamically from backend response
      const stateCountsMap = {};
      hubsList.forEach((hub) => {
        if (hub.state) {
          stateCountsMap[hub.state] = (stateCountsMap[hub.state] || 0) + 1;
        }
      });

      const dynamicStates = Object.keys(stateCountsMap)
        .sort((a, b) => a.localeCompare(b))
        .map((stateName) => ({
          id: stateName.toLowerCase().replace(/\s+/g, '-'),
          name: stateName,
          hubCount: stateCountsMap[stateName],
        }));

      setAvailableStates(dynamicStates);
    } catch (err) {
      console.error('[ExplorePage] Failed to fetch shopping hubs from backend:', err);
      setError(err.message || 'Failed to load shopping hubs from backend server.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle state filter selection / toggle.
   * If a single state is selected, execute GET /shopping-hubs?state={stateName}.
   */
  const handleStateToggle = async (stateName) => {
    const updatedSelected = selectedStates.includes(stateName)
      ? selectedStates.filter((s) => s !== stateName)
      : [...selectedStates, stateName];

    setSelectedStates(updatedSelected);

    // If exactly 1 state is selected, query backend API directly with GET /shopping-hubs?state={state}
    if (updatedSelected.length === 1) {
      try {
        setLoading(true);
        const filteredData = await shoppingHubService.getShoppingHubs({
          state: updatedSelected[0],
        });
        setDisplayedHubs(filteredData || []);
      } catch (err) {
        console.error(`[ExplorePage] Failed to fetch hubs for state '${updatedSelected[0]}':`, err);
      } finally {
        setLoading(false);
      }
    } else if (updatedSelected.length === 0) {
      // Re-fetch / display all hubs if none selected
      setDisplayedHubs(allHubs);
    } else {
      // Filter locally across cached allHubs if multiple states selected
      const multiFiltered = allHubs.filter((hub) =>
        updatedSelected.includes(hub.state)
      );
      setDisplayedHubs(multiFiltered);
    }
  };

  const handleSelectAll = () => {
    const allStateNames = availableStates.map((s) => s.name);
    setSelectedStates(allStateNames);
    setDisplayedHubs(allHubs);
  };

  const handleClearAll = async () => {
    setSelectedStates([]);
    setSearchQuery('');
    await fetchAllShoppingHubs();
  };

  // Filter displayed hubs by keyword search query
  const finalFilteredHubs = displayedHubs.filter((hub) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      hub.name?.toLowerCase().includes(q) ||
      hub.state?.toLowerCase().includes(q) ||
      hub.description?.toLowerCase().includes(q) ||
      (hub.categories && hub.categories.some((c) => c.toLowerCase().includes(q)))
    );
  });

  return (
    <PageContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-24 md:pb-28">
      <div className="space-y-8">
        
        {/* Editorial Page Header Banner */}
        <div className="relative rounded-3xl bg-surface border border-border/80 p-6 sm:p-10 shadow-card overflow-hidden text-center space-y-3">
          <IndiaBackdrop />

          <div className="relative z-10 max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>India Regional Fashion Directory</span>
            </div>

            <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              Explore Regional Shopping Hubs
            </h1>

            <p className="text-xs sm:text-sm text-text-muted font-normal leading-relaxed max-w-2xl mx-auto">
              Discover verified fashion destinations, master weaving hubs, and iconic markets across Indian states.
            </p>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="py-20 flex justify-center">
            <LoadingSpinner size="lg" message="Fetching regional shopping hubs from backend..." />
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="py-12">
            <ErrorState
              title="Failed to Load Shopping Hubs"
              message={error}
              onRetry={fetchAllShoppingHubs}
            />
          </div>
        )}

        {/* Main Two-Column Layout */}
        {!loading && !error && (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            
            {/* Left Column (20-22% Desktop Width): Dynamic State Filter Sidebar */}
            <div className="w-full lg:w-64 xl:w-72 shrink-0">
              <StateFilterSidebar
                availableStates={availableStates}
                selectedStates={selectedStates}
                onStateToggle={handleStateToggle}
                onSelectAll={handleSelectAll}
                onClearAll={handleClearAll}
                totalHubsCount={allHubs.length}
                filteredHubsCount={finalFilteredHubs.length}
              />
            </div>

            {/* Right Column (78-80% Desktop Width): Shopping Hub Search Bar & 4-Column Grid */}
            <div className="flex-1 space-y-6 w-full min-w-0">
              
              {/* Top Toolbar with Hub Search & Results Summary */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-border/80 shadow-subtle">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-text-primary">
                    {selectedStates.length === 0
                      ? 'Showing All Shopping Hubs'
                      : `Filtered by ${selectedStates.length} ${selectedStates.length === 1 ? 'State' : 'States'}`}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
                    {finalFilteredHubs.length}
                  </span>
                </div>

                {/* Keyword Search Input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                  <input
                    type="text"
                    placeholder="Search hub or city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-background border border-border/70 text-xs font-normal text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              {/* Shopping Hub Grid (4 columns on xl/2xl screens, 3 on lg, 2 on sm, 1 on mobile) */}
              {finalFilteredHubs.length === 0 ? (
                <div className="p-12 text-center bg-surface border border-dashed border-border rounded-3xl text-text-muted space-y-2">
                  <ShoppingBag className="w-8 h-8 mx-auto text-text-muted/60" />
                  <p className="text-sm font-semibold text-text-primary">No Shopping Hubs found</p>
                  <p className="text-xs text-text-muted">
                    No destinations match your selected state filters. Try clearing state filters or resetting search.
                  </p>
                  <button
                    type="button"
                    onClick={handleClearAll}
                    className="mt-3 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover shadow-subtle transition-all"
                  >
                    Reset State Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {finalFilteredHubs.map((hub, index) => (
                    <ShoppingHubCard key={hub.id || hub._id} hub={hub} index={index} />
                  ))}
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </PageContainer>
  );
};

export default ExplorePage;
