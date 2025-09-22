import React, { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import { Box, Typography, Button, Alert, Container } from "@mui/material";
import { Refresh as RefreshIcon, Home as HomeIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

// Moved to its own file would fix react-refresh rule too, but keeping minimal:
export const ErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
          <Typography variant="h6" component="div" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography variant="body2" color="text.secondary">
            We encountered an unexpected error. Please try refreshing the page.
          </Typography>
        </Alert>

        {error && (
          <Box sx={{ width: "100%", textAlign: "left" }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Error details:
            </Typography>
            <Typography
              variant="caption"
              component="pre"
              sx={{
                backgroundColor: "grey.100",
                p: 2,
                borderRadius: 1,
                overflow: "auto",
                fontSize: "0.75rem",
              }}
            >
              {error.message}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleRefresh}
          >
            Refresh Page
          </Button>
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
          >
            Go Home
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
