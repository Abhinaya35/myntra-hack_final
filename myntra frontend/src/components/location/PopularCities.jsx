import React from 'react';
import CityCard from './CityCard';

/**
 * Curated Popular Cities List with Coordinates & Hub Counts
 */
export const POPULAR_CITIES = [
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    state: 'Telangana',
    latitude: 17.385044,
    longitude: 78.486671,
    hubCount: 5,
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    latitude: 12.971598,
    longitude: 77.594566,
    hubCount: 6,
  },
  {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.08268,
    longitude: 80.270718,
    hubCount: 4,
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    state: 'Maharashtra',
    latitude: 19.07609,
    longitude: 72.877426,
    hubCount: 7,
  },
  {
    id: 'delhi',
    name: 'Delhi',
    state: 'NCR',
    latitude: 28.613939,
    longitude: 77.209021,
    hubCount: 8,
  },
  {
    id: 'pune',
    name: 'Pune',
    state: 'Maharashtra',
    latitude: 18.52043,
    longitude: 73.856744,
    hubCount: 4,
  },
  {
    id: 'visakhapatnam',
    name: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    latitude: 17.686816,
    longitude: 83.218482,
    hubCount: 3,
  },
  {
    id: 'vijayawada',
    name: 'Vijayawada',
    state: 'Andhra Pradesh',
    latitude: 16.506174,
    longitude: 80.648015,
    hubCount: 3,
  },
];

/**
 * PopularCities Component
 * Renders a grid of popular regional fashion cities.
 */
export const PopularCities = ({ onSelectCity, selectedCityName }) => {
  return (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Popular Fashion Destinations
        </h3>
        <span className="text-[11px] font-medium text-primary">
          {POPULAR_CITIES.length} Cities
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {POPULAR_CITIES.map((city) => (
          <CityCard
            key={city.id}
            city={city}
            onClick={onSelectCity}
            isSelected={selectedCityName?.toLowerCase() === city.name.toLowerCase()}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
