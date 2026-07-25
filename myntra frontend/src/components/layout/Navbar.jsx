import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, MapPin, Bookmark, Menu, X, Sparkles, User, LogOut, Flame } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useShortlist } from '../../hooks/useShortlist';
import { useLocation as useGeoLocation } from '../../hooks/useLocation';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalSavedCount } = useShortlist();
  const { location: userLoc, detectUserLocation, isDetecting } = useGeoLocation();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { label: 'Overview', path: ROUTES.HOME },
    { label: 'Nearby Stores', path: ROUTES.NEARBY, icon: MapPin },
    { label: 'Explore Hubs', path: ROUTES.EXPLORE, icon: Compass },
    { label: 'Threads of Bharat', path: ROUTES.THREADS_OF_BHARAT, icon: Flame },
  ];

  const isActive = (path) => {
    if (path === ROUTES.HOME) return location.pathname === ROUTES.HOME;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate(ROUTES.AUTH);
  };

  return (
    <header className="sticky top-0 z-50 glass-nav transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Title */}
          <Link to={ROUTES.HOME} className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-0.5 shadow-sm group-hover:shadow transition-shadow">
              <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-editorial text-xl font-bold tracking-tight text-text-primary leading-none group-hover:text-primary transition-colors">
                Regional Fashion Icons
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-text-muted mt-0.5">
                India's Fashion Culture
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-surface/60 p-1.5 border border-border/60 rounded-2xl shadow-subtle">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200",
                    active
                      ? "bg-surface text-primary shadow-sm font-semibold"
                      : "text-text-muted hover:text-text-primary hover:bg-background/60"
                  )}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Actions: Location Selector, Shortlist & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {/* Location Pill */}
            <button
              onClick={detectUserLocation}
              disabled={isDetecting}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-surface hover:bg-background border border-border rounded-xl shadow-subtle transition-colors text-text-primary"
              title="Detect or change location"
            >
              <MapPin className="w-3.5 h-3.5 text-primary" />
              <span>{userLoc?.city || 'Detecting...'}</span>
              {isDetecting && (
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              )}
            </button>

            {/* Shortlist Counter */}
            <Link
              to={ROUTES.SHORTLIST}
              className={cn(
                "relative flex items-center justify-center p-2.5 rounded-xl border border-border bg-surface text-text-primary hover:border-primary/40 shadow-subtle transition-all duration-200",
                isActive(ROUTES.SHORTLIST) && "border-primary text-primary bg-primary-light/30"
              )}
              aria-label="View Saved Items"
            >
              <Bookmark className="w-5 h-5" />
              {totalSavedCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-[20px] px-1 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                  {totalSavedCount}
                </span>
              )}
            </Link>

            {/* Auth Actions (User Profile vs Sign In) */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 bg-surface border border-border/80 rounded-xl shadow-subtle">
                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-semibold text-text-primary max-w-[100px] truncate">
                    {user?.name || 'User'}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-2 rounded-xl border border-border/80 bg-surface text-text-muted hover:text-red-500 hover:border-red-500/30 hover:bg-red-500/5 transition-all shadow-subtle cursor-pointer"
                  title="Sign out"
                  aria-label="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.AUTH}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 border border-primary/20 shadow-subtle",
                  isActive(ROUTES.AUTH)
                    ? "bg-primary text-white"
                    : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
                )}
              >
                <User className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to={ROUTES.SHORTLIST}
              className="relative p-2 rounded-xl border border-border bg-surface text-text-primary"
            >
              <Bookmark className="w-5 h-5" />
              {totalSavedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {totalSavedCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-border bg-surface text-text-primary hover:bg-background"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-border px-4 pt-2 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors",
                  isActive(link.path)
                    ? "bg-primary-light/50 text-primary font-semibold"
                    : "text-text-primary hover:bg-background"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            {isAuthenticated ? (
              <div className="flex items-center justify-between px-2 py-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-text-primary">{user?.name}</span>
                    <span className="text-[10px] text-text-muted">{user?.email}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-xs font-semibold text-red-500 px-3 py-1.5 rounded-lg bg-red-500/10"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to={ROUTES.AUTH}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-xl bg-primary text-white shadow-sm"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={() => {
                detectUserLocation();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-text-muted bg-background rounded-lg mt-1"
            >
              <MapPin className="w-4 h-4 text-primary" />
              <span>Location: {userLoc?.city || 'Detect'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
