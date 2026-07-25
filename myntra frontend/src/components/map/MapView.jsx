import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import MapMarker from './MapMarker';
import { APP_CONFIG } from '../../constants/theme';
import { cn } from '../../utils/cn';

// Leaflet default icon fix for React projects
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
});

/**
 * Reusable MapView component wrapping React Leaflet
 */
export const MapView = ({
  center = [APP_CONFIG.defaultCoordinates.lat, APP_CONFIG.defaultCoordinates.lng],
  zoom = 13,
  markers = [],
  height = '400px',
  className = '',
}) => {
  return (
    <div
      style={{ height }}
      className={cn(
        "relative w-full rounded-3xl overflow-hidden border border-border shadow-subtle z-10",
        className
      )}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((marker, index) => (
          <MapMarker key={marker.id || index} marker={marker} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
