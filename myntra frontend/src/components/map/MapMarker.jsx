import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { MapPin, Star, ExternalLink } from 'lucide-react';
import { getStoreDetailsPath, getHubDetailsPath } from '../../constants/routes';

/**
 * Custom MapMarker component with popup details
 */
export const MapMarker = ({ marker = {} }) => {
  const {
    id,
    type = 'store', // 'store' | 'hub'
    title = 'Retailer Location',
    lat = 26.9124,
    lng = 75.7873,
    address = 'Market Street',
    rating = 4.8,
  } = marker;

  const linkPath = type === 'hub' ? getHubDetailsPath(id) : getStoreDetailsPath(id);

  return (
    <Marker position={[lat, lng]}>
      <Popup className="rfi-map-popup">
        <div className="p-1 space-y-1.5 font-sans">
          <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-primary tracking-wider">
            <MapPin className="w-3 h-3" />
            <span>{type === 'hub' ? 'Shopping Hub' : 'Verified Store'}</span>
          </div>
          <h4 className="font-editorial text-base font-bold text-slate-900 leading-tight">
            {title}
          </h4>
          <p className="text-xs text-slate-500">{address}</p>
          {rating && (
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-600">
              <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
              <span>{rating}</span>
            </div>
          )}
          <div className="pt-1">
            <Link
              to={linkPath}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
            >
              <span>View Details</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
