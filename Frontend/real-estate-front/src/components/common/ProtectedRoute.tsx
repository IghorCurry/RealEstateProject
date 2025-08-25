import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CircularProgress, Box, Alert, Button } from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { ROUTES } from "../../utils/constants";
import { useAuth } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, isLoading, user } = useAuth();

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

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={3}
        p={3}
      >
        <Alert severity="warning" sx={{ maxWidth: 500 }}>
          <div style={{ fontWeight: 600, marginBottom: "8px" }}>
            Access Denied
          </div>
          <div>
            You don't have permission to access this page. Admin privileges are
            required.
          </div>
        </Alert>
        <Button
          variant="contained"
          onClick={() => navigate(ROUTES.HOME)}
        >
          Go to Home
        </Button>
      </Box>
    );
  }

  if (!user || !user.id || !user.email) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        gap={3}
        p={3}
      >
        <Alert severity="error" sx={{ maxWidth: 500 }}>
          <div style={{ fontWeight: 600, marginBottom: "8px" }}>
            Authentication Error
          </div>
          <div>Your session appears to be invalid. Please log in again.</div>
        </Alert>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </Box>
    );
  }

  return <>{children}</>;
};
