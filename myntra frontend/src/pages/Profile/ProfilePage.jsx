import React, { useState, useEffect } from 'react';
import ProfileLayout from '../../components/profile/ProfileLayout';
import useProfile from '../../hooks/useProfile';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorState from '../../components/common/ErrorState';

const convertDDMMYYYYToYYYYMMDD = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
};

const convertYYYYMMDDToDDMMYYYY = (dateStr) => {
    if (!dateStr) return null;
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return dateStr;
};

const formatDisplayDate = (dateStr) => {
    if (!dateStr) return 'Add your DOB';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);
        return d.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
    return dateStr;
};

export const ProfilePage = () => {
    const { profileData, isLoading, error, updateProfile } = useProfile();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: 'Not Specified',
        dob: ''
    });
    const [formError, setFormError] = useState(null);

    // Sync component state when backend profile loads
    useEffect(() => {
        if (profileData) {
            setFormData({
                name: profileData.full_name || '',
                email: profileData.email || '',
                gender: profileData.gender || 'Not Specified',
                dob: convertDDMMYYYYToYYYYMMDD(profileData.date_of_birth)
            });
        }
    }, [profileData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Revert changes on cancel
            if (profileData) {
                setFormData({
                    name: profileData.full_name || '',
                    email: profileData.email || '',
                    gender: profileData.gender || 'Not Specified',
                    dob: convertDDMMYYYYToYYYYMMDD(profileData.date_of_birth)
                });
            }
            setFormError(null);
        }
        setIsEditing(!isEditing);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);

        // Frontend validation
        if (!formData.name.trim()) {
            setFormError("Full Name is required.");
            return;
        }

        if (!formData.email.trim()) {
            setFormError("Email signature is required.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setFormError("Please enter a valid email address.");
            return;
        }

        try {
            await updateProfile({
                full_name: formData.name.trim(),
                email: formData.email.trim(),
                gender: formData.gender === 'Not Specified' ? null : formData.gender,
                date_of_birth: convertYYYYMMDDToDDMMYYYY(formData.dob)
            });
            setIsEditing(false);
        } catch (err) {
            setFormError(err.message || "Failed to update profile. Please try again.");
        }
    };

    if (isLoading && !profileData) {
        return (
            <ProfileLayout>
                <div className="flex items-center justify-center p-12">
                    <LoadingSpinner className="w-8 h-8 text-primary" />
                </div>
            </ProfileLayout>
        );
    }

    if (error && !profileData) {
        return (
            <ProfileLayout>
                <ErrorState message={error} />
            </ProfileLayout>
        );
    }

    return (
        <ProfileLayout>
            <div className="border-b border-border/60 pb-5 mb-6">
                <h1 className="text-xl font-bold font-editorial text-text-primary">Profile Details</h1>
                <p className="text-xs text-text-muted mt-1">Manage your personal profile information</p>
            </div>

            {formError && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-xs font-semibold border border-red-100 animate-fade-in">
                    {formError}
                </div>
            )}

            {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl animate-fade-in">
                    {/* Edit Form Fields */}
                    <div className="space-y-1">
                        <label className="block text-xs font-bold text-text-primary tracking-wide">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="w-full text-xs px-3.5 py-3 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-bold text-text-primary tracking-wide">
                            Email Address *
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            className="w-full text-xs px-3.5 py-3 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <span className="block text-xs font-bold text-text-primary tracking-wide">
                            Gender
                        </span>
                        <div className="flex flex-wrap gap-4 pt-1">
                            {['Male', 'Female', 'Other', 'Not Specified'].map((g) => (
                                <label key={g} className="flex items-center gap-2 text-xs font-semibold cursor-pointer text-text-primary">
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={g}
                                        checked={formData.gender === g}
                                        onChange={handleChange}
                                        className="w-4 h-4 accent-primary border border-border/80 rounded-full"
                                    />
                                    <span>{g}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="block text-xs font-bold text-text-primary tracking-wide">
                            Date of Birth (Optional)
                        </label>
                        <input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="w-full text-xs px-3.5 py-3 border border-border/80 rounded-xl bg-surface focus:outline-none focus:border-primary/80 transition-colors"
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-border/60">
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-xs font-bold rounded-xl bg-primary text-white hover:bg-primary-hover transition-colors shadow-subtle cursor-pointer"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleEditToggle}
                            className="px-5 py-2.5 text-xs font-bold rounded-xl border border-border bg-surface text-text-primary hover:bg-background transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="space-y-6 max-w-xl animate-fade-in">
                    {/* Read Mode Information Display */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                        <div>
                            <span className="block text-[10px] text-text-muted font-bold uppercase tracking-wider">
                                Full Name
                            </span>
                            <span className="block text-sm font-semibold text-text-primary mt-1">
                                {formData.name || 'Not filled'}
                            </span>
                        </div>

                        <div>
                            <span className="block text-[10px] text-text-muted font-bold uppercase tracking-wider">
                                Email Address
                            </span>
                            <span className="block text-sm font-semibold text-text-primary mt-1">
                                {formData.email || 'Not filled'}
                            </span>
                        </div>

                        <div>
                            <span className="block text-[10px] text-text-muted font-bold uppercase tracking-wider">
                                Gender
                            </span>
                            <span className="block text-sm font-semibold text-text-primary mt-1">
                                {formData.gender}
                            </span>
                        </div>

                        <div>
                            <span className="block text-[10px] text-text-muted font-bold uppercase tracking-wider">
                                Date of Birth
                            </span>
                            <span className="block text-sm font-semibold text-text-primary mt-1 font-sans">
                                {formatDisplayDate(formData.dob)}
                            </span>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-border/60">
                        <button
                            onClick={handleEditToggle}
                            className="px-5 py-2.5 text-xs font-bold rounded-xl border border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-subtle cursor-pointer"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            )}
        </ProfileLayout>
    );
};

export default ProfilePage;
