import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Store, Sparkles } from 'lucide-react';
import Badge from '../common/Badge';
import { getHubDetailsPath } from '../../constants/routes';
import { cn } from '../../utils/cn';

/**
 * Reusable HubCard component for famous shopping hubs across India
 */
export const HubCard = ({
  hub = {},
  className = '',
}) => {
  const {
    id,
    name = 'Hub Name',
    city = 'City',
    state = 'State',
    storeCount = 45,
    heroSpecialty = 'Handloom Sarees & Jewelry',
    image,
    isIconic = true,
  } = hub;

  return (
    <Link
      to={getHubDetailsPath(id)}
      className={cn(
        "group relative bg-surface border border-border/80 rounded-3xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col h-72",
        className
      )}
    >
      {/* Hero Overlay Background Image */}
      <div className="absolute inset-0 bg-slate-900 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-purple-950 to-rose-950 opacity-90" />
        )}
        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
      </div>

      {/* Top Header info */}
      <div className="relative p-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-text-primary">
          <MapPin className="w-3.5 h-3.5 text-primary" />
          <span>{city}, {state}</span>
        </div>
        {isIconic && (
          <Badge variant="iconic" icon={Sparkles} className="shadow-sm">
            Iconic Hub
          </Badge>
        )}
      </div>

      {/* Bottom Content */}
      <div className="relative mt-auto p-6 z-10 space-y-2 text-white">
        <div className="flex items-center gap-2 text-xs font-medium text-amber-300">
          <Store className="w-3.5 h-3.5" />
          <span>{storeCount}+ Verified Retailers</span>
        </div>

        <h3 className="font-editorial text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
          {name}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-1">
          Specialty: {heroSpecialty}
        </p>

        <div className="pt-2 flex items-center text-xs font-semibold text-accent group-hover:underline">
          <span>Explore Shopping Hub</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
};

export default HubCard;
