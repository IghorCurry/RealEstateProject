import React from "react";
import {
  Box,
  Skeleton,
  Typography,
  CircularProgress,
  Fade,
  Grid,
} from "@mui/material";
import { keyframes } from "@emotion/react";

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

interface LoadingStateProps {
  message?: string;
  fullHeight?: boolean;
  type?: "skeleton" | "spinner" | "properties" | "property-card";
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = "Loading...",
  fullHeight = false,
  type = "spinner",
  count = 6,
}) => {
  const renderSkeleton = () => {
    switch (type) {
      case "properties":
        return (
          <Grid container spacing={3}>
            {Array.from({ length: count }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Box
                  sx={{
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                    bgcolor: "background.paper",
                  }}
                >
                  <Skeleton
                    variant="rectangular"
                    height={200}
                    sx={{
                      background: `linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)`,
                      backgroundSize: "200px 100%",
                      animation: `${shimmer} 1.5s infinite`,
                    }}
                  />
                  <Box sx={{ p: 2 }}>
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="60%" height={20} />
                    <Skeleton variant="text" width="40%" height={20} />
                    <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                      <Skeleton variant="rounded" width={60} height={24} />
                      <Skeleton variant="rounded" width={80} height={24} />
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        );

      case "property-card":
        return (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: 1,
              bgcolor: "background.paper",
            }}
          >
            <Skeleton
              variant="rectangular"
              height={300}
              sx={{
                background: `linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)`,
                backgroundSize: "200px 100%",
                animation: `${shimmer} 1.5s infinite`,
              }}
            />
            <Box sx={{ p: 3 }}>
              <Skeleton variant="text" width="90%" height={32} />
              <Skeleton variant="text" width="70%" height={24} />
              <Skeleton variant="text" width="50%" height={20} />
              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Skeleton variant="rounded" width={80} height={32} />
                <Skeleton variant="rounded" width={100} height={32} />
              </Box>
            </Box>
          </Box>
        );

      default:
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Skeleton variant="text" width="60%" height={32} />
            <Skeleton variant="text" width="80%" height={24} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
        );
    }
  };

  const renderSpinner = () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <CircularProgress
        size={48}
        thickness={4}
        sx={{
          color: "primary.main",
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ fontWeight: 500 }}
      >
        {message}
      </Typography>
    </Box>
  );

  const content = type === "skeleton" ? renderSkeleton() : renderSpinner();

  return (
    <Fade in={true} timeout={300}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: fullHeight ? "100vh" : "400px",
          p: 3,
        }}
      >
        {content}
      </Box>
    </Fade>
  );
};
