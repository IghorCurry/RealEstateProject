import React from "react";
import { Box, Typography, Button, Paper, Fade, useTheme } from "@mui/material";
import {
  Search as SearchIcon,
  Home as HomeIcon,
  Add as AddIcon,
  Refresh as RefreshIcon,
} from "@mui/icons-material";

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  variant?: "search" | "properties" | "inquiries" | "favorites";
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
  variant = "search",
}) => {
  const theme = useTheme();

  const getDefaultIcon = () => {
    switch (variant) {
      case "properties":
        return <HomeIcon sx={{ fontSize: 64, color: "primary.main" }} />;
      case "inquiries":
        return <SearchIcon sx={{ fontSize: 64, color: "primary.main" }} />;
      case "favorites":
        return <AddIcon sx={{ fontSize: 64, color: "primary.main" }} />;
      default:
        return <SearchIcon sx={{ fontSize: 64, color: "primary.main" }} />;
    }
  };

  const getDefaultAction = () => {
    switch (variant) {
      case "properties":
        return { label: "Create Property", icon: <AddIcon /> };
      case "inquiries":
        return { label: "Browse Properties", icon: <HomeIcon /> };
      case "favorites":
        return { label: "Explore Properties", icon: <SearchIcon /> };
      default:
        return { label: "Try Again", icon: <RefreshIcon /> };
    }
  };

  const defaultAction = getDefaultAction();

  return (
    <Fade in={true} timeout={500}>
      <Paper
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
          px: 4,
          textAlign: "center",
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[50]} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
          minHeight: 400,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            maxWidth: 400,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.primary.main}20 100%)`,
              mb: 2,
            }}
          >
            {icon || getDefaultIcon()}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              variant="h5"
              component="h2"
              sx={{
                fontWeight: 600,
                color: "text.primary",
                mb: 1,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                lineHeight: 1.6,
                maxWidth: 320,
              }}
            >
              {description}
            </Typography>
          </Box>

          {actionLabel && onAction && (
            <Button
              variant="contained"
              size="large"
              onClick={onAction}
              startIcon={defaultAction.icon}
              sx={{
                mt: 2,
                px: 4,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
                boxShadow: theme.shadows[4],
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  boxShadow: theme.shadows[6],
                  transform: "translateY(-1px)",
                },
              }}
            >
              {actionLabel}
            </Button>
          )}
        </Box>
      </Paper>
    </Fade>
  );
};
