// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react';
import {Login} from '../pages/login';
import {Dashboard} from '../pages/dashboard';
// Assuming your authConfig is in './config/authConfig'

// A component to protect routes using MSAL's authenticated status
const ProtectedRoute = () => {
  return (
    <AuthenticatedTemplate>
      {/* If authenticated, render child routes */}
      <Outlet /> 
    </AuthenticatedTemplate>
  );
};

export const AppRoutes = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public Route for Login page */}
          <Route path="/" element={<Login />} />
          
          {/* Use ProtectedRoute to guard the Dashboard route */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Redirect users based on authentication status for the root path */}
          <Route path="/" element={
            <>
              {/* Redirect to dashboard if logged in */}
              <AuthenticatedTemplate>
                <Navigate to="/dashboard" replace />
              </AuthenticatedTemplate>
              {/* Redirect to login if not logged in */}
              <UnauthenticatedTemplate>
                <Navigate to="/" replace />
              </UnauthenticatedTemplate>
            </>
          } />
          {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

