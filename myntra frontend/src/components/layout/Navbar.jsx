import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, MapPin, Bookmark, Menu, X, Sparkles, User, LogOut, Flame } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useShortlist } from '../../hooks/useShortlist';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalSavedCount } = useShortlist();

  const { user, profile, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

          {/* Actions: Shortlist & Auth */}
          <div className="hidden md:flex items-center gap-3">

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

            {/* Auth Actions (User Profile dropdown vs Sign In) */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-bold bg-surface hover:bg-background border border-border rounded-xl shadow-subtle transition-all text-text-primary cursor-pointer animate-fade-in"
                  aria-label="Profile Menu"
                >
                  <User className="w-4 h-4 text-primary" />
                  <span>Profile</span>
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-surface border border-border rounded-2xl shadow-xl py-4 px-5 z-[100] animate-scale-in">
                    <div className="flex flex-col mb-3">
                      <span className="text-xs font-bold text-text-primary">Hello {profile?.full_name || user?.name || 'User'}</span>
                      <span className="text-[10px] text-text-muted mt-0.5">{user?.phone || user?.email || 'No phone linked'}</span>
                    </div>
                    <hr className="border-border/60 my-2.5" />
                    <div className="flex flex-col gap-2">
                      <Link
                        to={ROUTES.PROFILE}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="text-xs font-semibold text-text-muted hover:text-primary transition-colors text-left"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          alert("My Orders functionality is coming soon!");
                        }}
                        className="text-left text-xs font-semibold text-text-muted hover:text-primary transition-colors cursor-pointer"
                      >
                        My Orders
                      </button>
                      <Link
                        to={ROUTES.SHORTLIST}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="text-xs font-semibold text-text-muted hover:text-primary transition-colors text-left"
                      >
                        Wishlist
                      </Link>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          alert("Coupons module is coming soon!");
                        }}
                        className="text-left text-xs font-semibold text-text-muted hover:text-primary transition-colors cursor-pointer"
                      >
                        Coupons
                      </button>
                      <Link
                        to={ROUTES.ADDRESSES}
                        onClick={() => setProfileDropdownOpen(false)}
                        className="text-xs font-semibold text-text-muted hover:text-primary transition-colors text-left"
                      >
                        Addresses
                      </Link>
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          alert("Contact support at support@threadsofbharat.com");
                        }}
                        className="text-left text-xs font-semibold text-text-muted hover:text-primary transition-colors cursor-pointer"
                      >
                        Contact Us
                      </button>
                    </div>
                    <hr className="border-border/60 my-3" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-2 px-3 text-xs font-bold rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
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
              <>
                <div className="flex items-center gap-3 px-2 py-1.5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-xs flex items-center justify-center">
                    {(profile?.full_name || user?.name || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary">Hello {profile?.full_name || user?.name || 'User'}</span>
                    <span className="text-[10px] text-text-muted mt-0.5">{user?.phone || user?.email || 'No phone linked'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 py-2">
                  <Link
                    to={ROUTES.PROFILE}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2 px-3 text-xs font-semibold border border-border rounded-xl bg-surface hover:bg-background text-text-primary text-center"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/addresses"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center py-2 px-3 text-xs font-semibold border border-border rounded-xl bg-surface hover:bg-background text-text-primary text-center"
                  >
                    Addresses
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-1.5 text-xs font-semibold text-red-500 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500 hover:text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                to={ROUTES.AUTH}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-xl bg-primary text-white shadow-sm"
              >
                Sign In
              </Link>
            )}


          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
