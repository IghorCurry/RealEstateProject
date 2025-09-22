import React, { useState, useEffect, useCallback } from "react";
import { Box, Alert, Button, Typography } from "@mui/material";
import {
  WifiOff as WifiOffIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";
import { performHealthCheck } from "../../utils/apiHealthCheck";

interface NetworkErrorBoundaryProps {
  children: React.ReactNode;
}

export const NetworkErrorBoundary: React.FC<NetworkErrorBoundaryProps> = ({
  children,
}) => {
  const [hasNetworkError, setHasNetworkError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const [errorCount, setErrorCount] = useState(0);

  const checkNetworkHealth = useCallback(async () => {
    setIsChecking(true);
    try {
      const healthReport = await performHealthCheck();
      const online = healthReport.overall.isOnline;
      setHasNetworkError(!online);
      setErrorCount((prev) => (online ? 0 : prev + 1));
      setLastCheck(new Date());
    } catch {
      setErrorCount((prev) => {
        const next = prev + 1;
        if (next >= 2) setHasNetworkError(true);
        return next;
      });
      setLastCheck(new Date());
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    const initialCheck = setTimeout(() => {
      checkNetworkHealth();
    }, 2000);

    const interval = setInterval(checkNetworkHealth, 30000); // Check every 30 seconds

    return () => {
      clearTimeout(initialCheck);
      clearInterval(interval);
    };
  }, [checkNetworkHealth]);

  if (hasNetworkError && errorCount >= 2) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          p: 2,
        }}
      >
        <Alert
          severity="warning"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={checkNetworkHealth}
              disabled={isChecking}
              startIcon={<RefreshIcon />}
            >
              {isChecking ? "Checking..." : "Retry"}
            </Button>
          }
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WifiOffIcon />
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                Network Connection Issue
              </Typography>
              <Typography variant="caption" sx={{ display: "block" }}>
                {lastCheck && `Last checked: ${lastCheck.toLocaleTimeString()}`}
              </Typography>
            </Box>
          </Box>
        </Alert>
      </Box>
    );
  }

  return <>{children}</>;
};
