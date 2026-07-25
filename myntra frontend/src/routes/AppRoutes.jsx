import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import { ROUTES } from '../constants/routes';

// Page Component Imports
import LandingPage from '../pages/Landing/LandingPage';
import AuthenticationPage from '../pages/Auth/AuthenticationPage';
import LocationPermissionPage from '../pages/Location/LocationPermissionPage';
import ChooseCityPage from '../pages/Location/ChooseCityPage';
import LocatingPage from '../pages/Locating/LocatingPage';
import NearbyPage from '../pages/Nearby/NearbyPage';
import ExplorePage from '../pages/Explore/ExplorePage';
import StateDetailsPage from '../pages/State/StateDetailsPage';
import HubDetailsPage from '../pages/HubDetails/HubDetailsPage';
import StoreDetailsPage from '../pages/Store/StoreDetailsPage';
import CollectionsPage from '../pages/Collections/CollectionsPage';
import ProductDetailsPage from '../pages/Product/ProductDetailsPage';
import ShortlistPage from '../pages/Shortlist/ShortlistPage';
import FashionPulseCategoryPage from '../pages/FashionPulse/FashionPulseCategoryPage';
import ThreadsOfBharatPage from '../pages/ThreadsOfBharat/ThreadsOfBharatPage';
import NotFoundPage from '../pages/NotFound/NotFoundPage';

/**
 * AppRoutes configuration wrapping routes inside MainLayout
 */
export const AppRoutes = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path={ROUTES.HOME} element={<LandingPage />} />
        <Route path={ROUTES.AUTH} element={<AuthenticationPage />} />
        <Route path={ROUTES.LOCATION_PERMISSION} element={<LocationPermissionPage />} />
        <Route path={ROUTES.CHOOSE_CITY} element={<ChooseCityPage />} />
        <Route path={ROUTES.LOCATING} element={<LocatingPage />} />
        <Route path={ROUTES.NEARBY} element={<NearbyPage />} />
        <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
        <Route path={ROUTES.THREADS_OF_BHARAT} element={<ThreadsOfBharatPage />} />
        <Route path={ROUTES.THREADS_OF_BHARAT_CATEGORY} element={<FashionPulseCategoryPage />} />
        <Route path={ROUTES.STATE_DETAILS} element={<StateDetailsPage />} />
        <Route path={ROUTES.HUB_DETAILS} element={<HubDetailsPage />} />
        <Route path={ROUTES.STORE_DETAILS} element={<StoreDetailsPage />} />
        <Route path={ROUTES.STORE_COLLECTIONS} element={<CollectionsPage />} />
        <Route path={ROUTES.COLLECTIONS} element={<CollectionsPage />} />
        <Route path={ROUTES.PRODUCT_DETAILS} element={<ProductDetailsPage />} />
        <Route path={ROUTES.SHORTLIST} element={<ShortlistPage />} />
        <Route path={ROUTES.FASHION_PULSE_CATEGORY} element={<FashionPulseCategoryPage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRoutes;
