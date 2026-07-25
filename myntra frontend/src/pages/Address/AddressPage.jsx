import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileLayout from '../../components/profile/ProfileLayout';
import AddressForm from '../../components/profile/AddressForm';
import addressService from '../../services/addressService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';
import { MapPin, Home, Briefcase, HelpCircle, Edit2, Trash2, Plus, Check } from 'lucide-react';
import { LocationContext } from '../../context/LocationContext';
import { ROUTES } from '../../constants/routes';


export const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { setLocation } = useContext(LocationContext);
    const navigate = useNavigate();

    // Modals state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch saved addresses from backend API
    const loadAddresses = async () => {
        try {
            setIsLoading(true);
            const data = await addressService.fetchAddresses();
            // Ensure the returned address is a list, backend returns sorted defaults first
            setAddresses(Array.isArray(data) ? data : []);
            setError(null);
        } catch (err) {
            console.error("Failed to load addresses:", err);
            setError(err.message || "Failed to load saved addresses.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const handleOpenAddForm = () => {
        setSelectedAddress(null);
        setIsFormOpen(true);
    };

    const handleSelectAddress = async (addr) => {
        if (!addr) return;
        try {
            // Call backend geocode API with address details
            console.log('Selected Address:', addr);
            const geocodeResponse = await addressService.createAddress({
                house_number: addr.houseNumber,
                street: addr.street,
                landmark: addr.landmark,
                city: addr.city,
                state: addr.state,
                pincode: addr.pincode,
                country: addr.country,
            });
            console.log('Geocode Response:', geocodeResponse);
            const { latitude, longitude, display_name } = geocodeResponse;
            const loc = {
                city: addr.city,
                state: addr.state,
                pincode: addr.pincode,
                formattedAddress: display_name || `${addr.houseNumber ? addr.houseNumber + ' ' : ''}${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}`,
                latitude,
                longitude,
            };
            console.log('Latitude being sent:', latitude);
            console.log('Longitude being sent:', longitude);
            setLocation(loc);
            navigate(ROUTES.NEARBY);
        } catch (err) {
            console.error('Failed to geocode selected address:', err);
            // Fallback to existing address coordinates if geocode fails
            const loc = {
                city: addr.city,
                state: addr.state,
                pincode: addr.pincode,
                formattedAddress: `${addr.houseNumber ? addr.houseNumber + ' ' : ''}${addr.street}, ${addr.city}, ${addr.state} - ${addr.pincode}`,
                latitude: addr.latitude,
                longitude: addr.longitude,
            };
            setLocation(loc);
            navigate(ROUTES.NEARBY);
        }
    };

    const handleOpenEditForm = (address) => {
        setSelectedAddress(address);
        setIsFormOpen(true);
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setSelectedAddress(null);
    };

    const handleFormSubmit = async (payload) => {
        setIsSubmitting(true);
        try {
            if (selectedAddress) {
                // Edit Address
                await addressService.updateAddress(selectedAddress.id, payload);
            } else {
                // Create Address
                await addressService.createAddress(payload);
            }
            setIsFormOpen(false);
            setSelectedAddress(null);
            await loadAddresses();
        } catch (err) {
            alert(err.message || "An error occurred while saving the address.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSetDefault = async (id) => {
        try {
            await addressService.setDefaultAddress(id);
            await loadAddresses();
        } catch (err) {
            alert(err.message || "Failed to set default address.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to remove this address?")) {
            try {
                await addressService.deleteAddress(id);
                await loadAddresses();
            } catch (err) {
                alert(err.message || "Failed to remove address.");
            }
        }
    };



    const getLabelIcon = (label) => {
        switch (label) {
            case 'Office':
                return Briefcase;
            case 'Other':
                return HelpCircle;
            default:
                return Home;
        }
    };

    return (
        <ProfileLayout>
            <div className="flex items-center justify-between border-b border-border/60 pb-5 mb-6">
                <div>
                    <h1 className="text-xl font-bold font-editorial text-text-primary">Saved Addresses</h1>
                    <p className="text-xs text-text-muted mt-1">Manage your delivery and checkout options</p>
                </div>
                <button
                    onClick={handleOpenAddForm}
                    className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold bg-primary text-white hover:bg-primary-hover rounded-xl shadow-subtle transition-colors cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    <span>Add New Address</span>
                </button>
            </div>

            {isLoading && addresses.length === 0 ? (
                <div className="flex items-center justify-center p-12">
                    <LoadingSpinner className="w-8 h-8 text-primary" />
                </div>
            ) : error && addresses.length === 0 ? (
                <ErrorState message={error} />
            ) : addresses.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center text-text-muted border border-dashed border-border mb-4">
                        <MapPin className="w-6 h-6 text-text-muted" />
                    </div>
                    <span className="text-sm font-bold text-text-primary">No saved addresses found</span>
                    <p className="text-xs text-text-muted mt-1 max-w-[280px]">
                        Add a shipping address to speed up your checkout flow next time.
                    </p>
                    <button
                        onClick={handleOpenAddForm}
                        className="mt-5 px-4 py-2 text-xs font-bold border border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-white rounded-xl transition-all shadow-subtle cursor-pointer"
                    >
                        Create Address
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => {
                        const LabelIcon = getLabelIcon(address.label);

                        return (
                            <div
                                key={address.id}
                                onClick={() => handleSelectAddress(address)}
                                className={`relative bg-surface rounded-2xl p-5 border shadow-subtle transition-all flex flex-col justify-between cursor-pointer ${address.isDefault ? 'border-primary/40 ring-1 ring-primary/10 bg-primary-light/5' : 'border-border/80'
                                    }`}
                            >
                                <div>
                                    {/* Card Header Label Badges */}
                                    <div className="flex items-center justify-between mb-3.5">
                                        <span className="flex items-center gap-1 px-2.5 py-1 bg-background text-[10px] font-bold text-text-primary border border-border rounded-lg uppercase tracking-wide">
                                            <LabelIcon className="w-3 h-3 text-text-muted" />
                                            <span>{address.label || 'Home'}</span>
                                        </span>

                                        {address.isDefault && (
                                            <span className="flex items-center gap-0.5 px-2.5 py-1 bg-primary text-white text-[10px] font-bold rounded-lg shadow-sm border border-primary">
                                                <Check className="w-3 h-3" />
                                                <span>Default</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Recipient Details */}
                                    <div className="space-y-1 mb-3">
                                        <h4 className="text-xs font-bold text-text-primary text-sm">
                                            {address.fullName || 'Recipient'}
                                        </h4>
                                        <p className="text-[11px] text-text-muted font-bold font-sans">
                                            Phone: <span className="text-text-primary">{address.phoneNumber || 'Not Linked'}</span>
                                        </p>
                                    </div>

                                    {/* Complete Address Text */}
                                    <div className="text-[11px] text-text-muted leading-relaxed font-semibold">
                                        {address.houseNumber && (
                                            <p className="text-text-primary">{address.houseNumber}</p>
                                        )}
                                        <p className="text-text-primary">{address.street}</p>
                                        {address.landmark && (
                                            <p>
                                                <span className="text-text-muted font-normal">Landmark:</span> {address.landmark}
                                            </p>
                                        )}
                                        <p>
                                            {address.city}, {address.state} - <span className="font-sans text-text-primary font-bold">{address.pincode}</span>
                                        </p>
                                        <p className="text-[10px] tracking-wide text-text-muted mt-1 uppercase">
                                            {address.country || 'India'}
                                        </p>
                                    </div>
                                </div>

                                {/* Card Actions */}
                                <div className="mt-5 pt-3.5 border-t border-border/50 flex flex-col gap-2.5">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleOpenEditForm(address); }}
                                            className="flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-bold text-text-primary bg-background hover:bg-border/30 rounded-lg border border-border/80 transition-colors cursor-pointer"
                                            title="Edit address attributes"
                                        >
                                            <Edit2 className="w-3 h-3" />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDelete(address.id); }}
                                            className="flex-1 flex items-center justify-center gap-1 py-2 text-[10px] font-bold text-red-500 bg-red-500/5 hover:bg-red-500 hover:text-white rounded-lg border border-red-500/10 hover:border-red-500/20 transition-all cursor-pointer"
                                            title="Remove address record"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                            <span>Remove</span>
                                        </button>
                                    </div>

                                    {!address.isDefault && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleSetDefault(address.id); }}
                                            className="w-full text-center py-2 text-[10px] font-bold text-primary bg-primary-light/40 hover:bg-primary hover:text-white rounded-lg border border-primary/20 transition-all cursor-pointer"
                                        >
                                            Set as Default
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Address Overlay Modal */}
            {isFormOpen && (
                <AddressForm
                    address={selectedAddress}
                    onSubmit={handleFormSubmit}
                    onClose={handleFormClose}
                    isSubmitting={isSubmitting}
                />
            )}
        </ProfileLayout>
    );
};

export default AddressPage;
