import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const Footer = () => {
  return (
    <footer className="bg-surface border-t border-border mt-20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-border/60">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-1 space-y-4">
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-editorial text-xl font-bold text-text-primary tracking-tight">
                Regional Fashion Icons
              </span>
            </Link>
            <p className="text-xs text-text-muted leading-relaxed">
              Connecting users with verified local fashion retailers, iconic shopping hubs, and authentic regional collections across India.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Regional Ecosystem</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-text-primary">
              Discovery
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>
                <Link to={ROUTES.HOME} className="hover:text-primary transition-colors">
                  Overview Platform
                </Link>
              </li>
              <li>
                <Link to={ROUTES.NEARBY} className="hover:text-primary transition-colors">
                  Nearby Retailers
                </Link>
              </li>
              <li>
                <Link to={ROUTES.EXPLORE} className="hover:text-primary transition-colors">
                  Iconic Shopping Hubs
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SHORTLIST} className="hover:text-primary transition-colors">
                  Saved Shortlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Hub Cities */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-text-primary">
              Famous Hubs
            </h4>
            <ul className="space-y-2 text-xs text-text-muted">
              <li>Jaipur — Johari Bazaar</li>
              <li>Lucknow — Aminabad & Chowk</li>
              <li>Varanasi — Vishwanath Gali</li>
              <li>Kolkata — New Market & Gariahat</li>
              <li>Hyderabad — Laad Bazaar</li>
            </ul>
          </div>

          {/* Column 4: Platform Mission */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-bold text-text-primary">
              Our Vision
            </h4>
            <p className="text-xs text-text-muted leading-relaxed">
              We empower local fashion artisans and legacy retail hubs by creating digital visibility while preserving authentic offline shopping culture.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
          <p>© {new Date().getFullYear()} Regional Fashion Icons — Myntra Hackathon Project.</p>
          <p className="text-[11px]">Designed with Editorial Precision for Indian Craft Culture.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
