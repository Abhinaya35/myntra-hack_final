import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import profileService from '../services/profileService';

export const useProfile = () => {
    const { profile, setProfile, refreshProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProfile = async () => {
        // Only load if not already present in the shared state
        if (profile) return;
        try {
            setIsLoading(true);
            await refreshProfile();
            setError(null);
        } catch (err) {
            console.error("Error loading profile:", err);
            setError(err.message || "Failed to load profile");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [profile]);

    const updateProfile = async (updatedData) => {
        try {
            setIsLoading(true);
            const result = await profileService.updateProfile(updatedData);
            setProfile(result);
            setError(null);
            return result;
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(err.message || "Failed to update profile");
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        profileData: profile,
        isLoading: isLoading || (!profile && !error),
        error,
        updateProfile,
        refetchProfile: refreshProfile
    };
};

export default useProfile;
