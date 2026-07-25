import React, { useState, useEffect } from 'react';
import { X, MapPin, Home, Briefcase, HelpCircle } from 'lucide-react';

export const AddressForm = ({ address = null, onSubmit, onClose, isSubmitting = false }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        houseNumber: '',
        street: '',
        landmark: '',
        city: '',
        state: '',
        pincode: '',
        country: 'India',
        label: 'Home',
        isDefault: false
    });

    const [error, setError] = useState(null);

    // Pre-populate form fields if editing an existing address
    useEffect(() => {
        if (address) {
            setFormData({
                fullName: address.fullName || '',
                phoneNumber: address.phoneNumber || '',
                houseNumber: address.houseNumber || '',
                street: address.street || '',
                landmark: address.landmark || '',
                city: address.city || '',
                state: address.state || '',
                pincode: address.pincode || '',
                country: address.country || 'India',
                label: address.label || 'Home',
                isDefault: address.isDefault || false
            });
        }
    }, [address]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLabelSelect = (labelVal) => {
        setFormData((prev) => ({
            ...prev,
            label: labelVal
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);

        // Dynamic field validation
        if (!formData.fullName.trim()) return setError("Full Name is required.");
        if (!formData.phoneNumber.trim()) return setError("Phone Number is required.");
        if (!formData.houseNumber.trim()) return setError("Flat / House Number is required.");
        if (!formData.street.trim()) return setError("Street / Area details are required.");
        if (!formData.city.trim()) return setError("City is required.");
        if (!formData.state.trim()) return setError("State is required.");
        if (!formData.pincode.trim()) return setError("Pincode is required.");

        // Alphanumeric pincode validation for backend matches
        if (!/^[a-zA-Z0-9]+$/.test(formData.pincode.trim())) {
            return setError("Pincode must contain only alphanumeric characters.");
        }

        const payload = {
            fullName: formData.fullName.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            label: formData.label,
            isDefault: formData.isDefault,
            houseNumber: formData.houseNumber.trim(),
            street: formData.street.trim(),
            landmark: formData.landmark.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            pincode: formData.pincode.trim(),
            country: formData.country.trim()
        };

        onSubmit(payload);
    };

    const labels = [
        { name: 'Home', icon: Home },
        { name: 'Office', icon: Briefcase },
        { name: 'Other', icon: HelpCircle }
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-text-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-scale-in border border-border">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4.5 border-b border-border/80">
                    <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-primary" />
                        <h3 className="text-sm font-bold text-text-primary">
                            {address ? 'Edit Address' : 'Add New Address'}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-text-muted hover:bg-background transition-colors cursor-pointer"
                        aria-label="Close form"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content & Form */}
                <form onSubmit={handleSubmit} className="px-6 py-5 max-h-[80vh] overflow-y-auto space-y-4 text-xs font-semibold text-text-primary">
                    {error && (
                        <div className="p-3 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 mb-2">
                            {error}
                        </div>
                    )}

                    {/* Contact Details */}
                    <div className="space-y-3">
                        <h4 className="text-[10px] text-text-muted font-bold uppercase tracking-wider border-b border-border/40 pb-1">
                            Contact Details
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-[11px] text-text-primary font-bold">Contact Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Name of recipient"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[11px] text-text-primary font-bold">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="10-digit mobile number"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Details */}
                    <div className="space-y-3 pt-2">
                        <h4 className="text-[10px] text-text-muted font-bold uppercase tracking-wider border-b border-border/40 pb-1">
                            Address Location
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="space-y-1 sm:col-span-1">
                                <label className="block text-[11px] text-text-primary font-bold">House / Flat *</label>
                                <input
                                    type="text"
                                    name="houseNumber"
                                    value={formData.houseNumber}
                                    onChange={handleChange}
                                    placeholder="Flat/House No"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1 sm:col-span-2">
                                <label className="block text-[11px] text-text-primary font-bold">Street Name / Town *</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={formData.street}
                                    onChange={handleChange}
                                    placeholder="Street and Area details"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="block text-[11px] text-text-primary font-bold">Landmark</label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={handleChange}
                                placeholder="e.g. Near Apollo Hospital (Optional)"
                                className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-[11px] text-text-primary font-bold">City / District *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="City"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[11px] text-text-primary font-bold">State / Region *</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
                                    placeholder="State"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                                <label className="block text-[11px] text-text-primary font-bold">Pincode *</label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="6 digit pincode"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="block text-[11px] text-text-primary font-bold">Country *</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    placeholder="Country"
                                    className="w-full text-xs px-3 py-2.5 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Label Select */}
                    <div className="space-y-2 pt-2">
                        <span className="block text-[11px] text-text-primary font-bold">Save Address As</span>
                        <div className="flex gap-2">
                            {labels.map((lbl) => {
                                const Icon = lbl.icon;
                                const selected = formData.label === lbl.name;
                                return (
                                    <button
                                        key={lbl.name}
                                        type="button"
                                        onClick={() => handleLabelSelect(lbl.name)}
                                        className={`flex items-center gap-1.5 px-4 py-2 border rounded-xl text-xs font-semibold cursor-pointer transition-all ${selected
                                            ? 'border-primary bg-primary-light text-primary font-bold'
                                            : 'border-border bg-surface text-text-muted hover:text-text-primary hover:bg-background/60'
                                            }`}
                                    >
                                        <Icon className="w-3.5 h-3.5" />
                                        <span>{lbl.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Default Marker */}
                    <div className="pt-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={handleChange}
                            className="w-4 h-4 accent-primary border border-border/80 rounded cursor-pointer"
                        />
                        <label htmlFor="isDefault" className="text-xs font-semibold text-text-primary cursor-pointer select-none">
                            Make this my default shipping address
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-border/60">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 text-xs font-bold rounded-xl bg-primary text-white hover:bg-primary-hover disabled:bg-primary-light disabled:cursor-not-allowed transition-colors text-center cursor-pointer shadow-subtle"
                        >
                            {isSubmitting ? 'Saving Address...' : address ? 'Update Address' : 'Add Address'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="px-5 py-2.5 text-xs font-bold rounded-xl border border-border bg-surface text-text-primary hover:bg-background transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressForm;
