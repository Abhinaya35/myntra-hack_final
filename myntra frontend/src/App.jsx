import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LocationProvider } from './context/LocationContext';
import { ShortlistProvider } from './context/ShortlistContext';
import AppRoutes from './routes/AppRoutes';

/**
 * Top-level Application Root Component
 */
export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LocationProvider>
          <ShortlistProvider>
            <AppRoutes />
          </ShortlistProvider>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
