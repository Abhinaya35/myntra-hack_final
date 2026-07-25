import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone, ShoppingBag, Truck, Compass, Navigation } from 'lucide-react';
import SectionHeader from '../common/SectionHeader';

/**
 * Section 8: LocationExperience Component (Polished StoreInformation)
 * Premium location card featuring district notes, travel info, landmarks, static map preview canvas & Explore Nearby CTA.
 */
export const StoreInformation = ({ location = {}, information = {} }) => {
  const loc = { ...information, ...location };
  const address = loc.address || 'Abids Main Road, Hyderabad, Telangana';
  const district = loc.district || loc.hub || 'Abids Heritage Fashion District';
  const landmark = loc.landmark || 'Adjacent to Historic Palace Theatre';
  const travelNote = loc.travelNote || 'Valet parking available | 15 mins from Railway Station';
  const hours = loc.hours || 'Mon - Sat: 10:30 AM – 9:00 PM';
  const phone = loc.phone || '+91 40 2473 8890';
  const delivery = loc.delivery || 'Pan-India insured shipping & international delivery';

  return (
    <div className="space-y-8">
      <SectionHeader
        tagline="Visit & Connect"
        title="Location Experience"
        subtitle="Plan your visit to our flagship destination in the heart of Hyderabad's heritage district."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column (7 Cols): Premium Location & Travel Details */}
        <div className="lg:col-span-7 bg-surface border border-border/80 rounded-3xl p-6 sm:p-8 shadow-card flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Shopping District Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-primary">
              <Compass className="w-4 h-4 text-primary" />
              <span>{district}</span>
            </div>

            {/* Address */}
            <div className="space-y-1">
              <h4 className="font-editorial text-2xl font-bold text-text-primary">
                Flagship Destination Address
              </h4>
              <p className="text-sm text-text-muted font-normal leading-relaxed">
                {address}
              </p>
            </div>

            {/* Landmark & Travel Note */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-background border border-border/60 space-y-1">
                <p className="text-xs text-text-muted font-medium">Nearby Landmark</p>
                <p className="text-xs font-bold text-text-primary">{landmark}</p>
              </div>

              <div className="p-4 rounded-2xl bg-background border border-border/60 space-y-1">
                <p className="text-xs text-text-muted font-medium">Travel & Parking</p>
                <p className="text-xs font-bold text-text-primary">{travelNote}</p>
              </div>
            </div>

            {/* Operating Hours & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/60">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-800 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted font-medium">Showroom Hours</p>
                  <p className="text-xs font-bold text-text-primary">{hours}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl border border-border/60">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-800 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] text-text-muted font-medium">Direct Line</p>
                  <p className="text-xs font-bold text-text-primary">{phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-between gap-4 flex-wrap">
            <Link
              to="/nearby"
              className="inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline underline-offset-4"
            >
              <Navigation className="w-4 h-4" />
              <span>Explore Nearby Fashion Icons</span>
            </Link>

            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-hover transition-colors shadow-subtle flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Open Directions</span>
            </a>
          </div>
        </div>

        {/* Right Column (5 Cols): Custom Static Map Canvas Preview (NO Google Maps iframe) */}
        <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-card border border-border/80 bg-slate-950 min-h-[300px] flex flex-col justify-between p-6 text-white group">
          {/* Custom Stylized Static Map Graphic */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />
          
          <div className="relative z-10 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-semibold text-accent border border-white/20">
              📍 Heritage Map Preview
            </span>
          </div>

          {/* Animated Pin Graphic */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center space-y-2 py-8">
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full bg-primary/40 animate-ping" />
              <div className="w-10 h-10 rounded-full bg-primary border-2 border-white shadow-elevated flex items-center justify-center z-10">
                <MapPin className="w-5 h-5 text-white" />
              </div>
            </div>
            <p className="font-editorial text-xl font-bold tracking-wide">
              {district}
            </p>
            <p className="text-xs text-slate-300 max-w-xs font-normal">
              Situated in the heart of Hyderabad's traditional sari and handloom silk corridor.
            </p>
          </div>

          <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>Coordinates: 17.4319° N, 78.4071° E</span>
            <Link to="/nearby" className="text-accent font-semibold hover:underline">
              View Nearby Map →
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default StoreInformation;
