import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, ChevronRight, ArrowLeft } from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer';
import LocationCard from '../../components/location/LocationCard';
import CitySearch from '../../components/location/CitySearch';
import PopularCities, { POPULAR_CITIES } from '../../components/location/PopularCities';
import CityCard from '../../components/location/CityCard';
import IndiaBackdrop from '../Landing/IndiaBackdrop';
import { ROUTES } from '../../constants/routes';
import { LocationContext } from '../../context/LocationContext';

/**
 * ChooseCityPage Component (Route: /choose-city)
 * Manual city selection screen featuring live search and popular regional fashion destinations.
 */
export const ChooseCityPage = () => {
  const navigate = useNavigate();
  const { location, selectCity } = useContext(LocationContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cities by search query
  const filteredCities = searchQuery.trim()
    ? POPULAR_CITIES.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.state.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : POPULAR_CITIES;

  const handleSelectCity = (cityData) => {
    selectCity(cityData, () => {
      navigate(ROUTES.NEARBY);
    });
  };

  const handleBackToPermission = () => {
    navigate(ROUTES.LOCATION_PERMISSION);
  };

  return (
    <PageContainer maxWidth="max-w-4xl" padding="px-4 py-8 md:py-12 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <IndiaBackdrop />

      <div className="relative z-10 w-full flex flex-col items-center justify-center my-auto py-4">
        <LocationCard maxWidth="max-w-[620px]">
          {/* Back Navigation Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              type="button"
              onClick={handleBackToPermission}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-text-muted hover:text-primary transition-colors focus:outline-none cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted/80 bg-background px-3 py-1 rounded-full border border-border/60">
              City Selection
            </span>
          </div>

          {/* Page Heading */}
          <h1 className="font-editorial text-3xl sm:text-4xl font-bold text-text-primary tracking-tight leading-tight mb-2">
            Choose Your City
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-text-muted font-normal max-w-md mx-auto leading-relaxed mb-6">
            Select a city to discover iconic regional shopping hubs, master weaving heritage, and verified fashion stores.
          </p>

          {/* Search Input */}
          <div className="mb-6">
            <CitySearch
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
              placeholder="Search by city or state (e.g. Hyderabad, Karnataka)..."
            />
          </div>

          {/* Cities Grid or Search Results */}
          {searchQuery.trim() ? (
            <div className="space-y-3 text-left">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Search Results
                </h3>
                <span className="text-[11px] font-medium text-primary">
                  {filteredCities.length} {filteredCities.length === 1 ? 'City' : 'Cities'} Found
                </span>
              </div>

              {filteredCities.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
                  {filteredCities.map((city) => (
                    <CityCard
                      key={city.id}
                      city={city}
                      onClick={handleSelectCity}
                      isSelected={location?.city?.toLowerCase() === city.name.toLowerCase()}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 border border-dashed border-border rounded-2xl text-center text-text-muted">
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-text-muted/60" />
                  <p className="text-xs font-semibold text-text-primary">No matching cities found</p>
                  <p className="text-[11px] mt-0.5">Try searching for another city name or state.</p>
                </div>
              )}
            </div>
          ) : (
            <PopularCities
              onSelectCity={handleSelectCity}
              selectedCityName={location?.city}
            />
          )}
        </LocationCard>
      </div>
    </PageContainer>
  );
};

export default ChooseCityPage;
