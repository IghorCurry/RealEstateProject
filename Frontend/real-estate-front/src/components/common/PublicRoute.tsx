import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../../services/authService";
import { ROUTES } from "../../utils/constants";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  // If user is authenticated, redirect to home or intended destination
  if (isAuthenticated) {
    const from = location.state?.from?.pathname || ROUTES.HOME;
    return <Navigate to={from} replace />;
  }

  // User is not authenticated, show the public page
  return <>{children}</>;
};
