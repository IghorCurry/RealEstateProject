import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import { ROUTES } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";

interface PublicRouteProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={2}
      >
        <CircularProgress size={40} />
        <Box sx={{ textAlign: "center" }}>
          <div>Loading...</div>
          <div style={{ fontSize: "0.875rem", color: "rgba(0,0,0,0.6)" }}>
            Please wait while we verify your authentication
          </div>
        </Box>
      </Box>
    );
  }

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || ROUTES.HOME;
    return <Navigate to={from} replace />;
  }

  return <>{children}</>;
};
