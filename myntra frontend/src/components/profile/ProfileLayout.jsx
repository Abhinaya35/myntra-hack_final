import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ClipboardList, Bookmark, Ticket, MapPin, PhoneCall } from 'lucide-react';
import { ROUTES } from '../../constants/routes';

export const ProfileLayout = ({ children }) => {
    const location = useLocation();

    const menuItems = [
        { label: 'My Profile', path: ROUTES.PROFILE, icon: User },
        { label: 'My Orders', path: '#orders', icon: ClipboardList, isPlaceholder: true, placeholderName: 'My Orders' },
        { label: 'Wishlist', path: ROUTES.SHORTLIST, icon: Bookmark },
        { label: 'Coupons', path: '#coupons', icon: Ticket, isPlaceholder: true, placeholderName: 'Coupons' },
        { label: 'Addresses', path: ROUTES.ADDRESSES, icon: MapPin },
        { label: 'Contact Us', path: '#contact', icon: PhoneCall, isPlaceholder: true, placeholderName: 'Contact Us' }
    ];

    const handlePlaceholderClick = (e, name) => {
        e.preventDefault();
        if (name === 'Contact Us') {
            alert("Support Contact: support@threadsofbharat.com\nPhone: +91 1800-419-3500");
        } else {
            alert(`${name} section is coming soon! This is a placeholder for the MVP.`);
        }
    };

    const isActive = (item) => {
        return location.pathname === item.path;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Breadcrumb path */}
            <div className="text-xs text-text-muted mb-6">
                <Link to={ROUTES.HOME} className="hover:text-primary transition-colors text-text-muted no-underline">Home</Link>
                <span className="mx-2">/</span>
                <span className="text-text-primary font-semibold">Account</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Left Sidebar */}
                <aside className="lg:col-span-1 bg-surface border border-border/80 rounded-2xl p-6 shadow-subtle h-fit">
                    <div className="mb-6">
                        <h2 className="text-sm font-bold text-text-muted uppercase tracking-widest px-3 mb-4">
                            Account Settings
                        </h2>
                        <nav className="flex flex-col gap-1">
                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                const active = isActive(item);
                                const baseClasses = "flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-xl transition-all duration-200";

                                if (item.isPlaceholder) {
                                    return (
                                        <a
                                            key={item.label}
                                            href={item.path}
                                            onClick={(e) => handlePlaceholderClick(e, item.placeholderName)}
                                            className={`${baseClasses} text-text-muted hover:text-text-primary hover:bg-background/60`}
                                        >
                                            <Icon className="w-4 h-4 text-text-muted" />
                                            <span>{item.label}</span>
                                        </a>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`${baseClasses} ${active
                                                ? "bg-primary-light text-primary font-bold shadow-sm"
                                                : "text-text-muted hover:text-text-primary hover:bg-background/60"
                                            }`}
                                    >
                                        <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-text-muted'}`} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </aside>

                {/* Right Main Content */}
                <main className="lg:col-span-3 bg-surface border border-border/80 rounded-2xl p-6 md:p-8 shadow-subtle min-h-[500px]">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default ProfileLayout;
