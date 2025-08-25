import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const handleGoHome = () => {
    navigate(ROUTES.HOME);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleBrowseProperties = () => {
    navigate(ROUTES.PROPERTIES);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.primary.light}15 0%, ${theme.palette.secondary.light}15 100%)`,
          }}
        >
          {/* 404 Number */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "6rem", md: "8rem" },
              fontWeight: 700,
              color: "primary.main",
              mb: 2,
              textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            404
          </Typography>

          {/* Main Message */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 600,
              mb: 2,
              color: "text.primary",
            }}
          >
            Page Not Found
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontSize: "1.1rem",
              color: "text.secondary",
              mb: 4,
              maxWidth: 500,
              mx: "auto",
            }}
          >
            The page you're looking for doesn't exist or has been moved. Don't
            worry, we'll help you find what you're looking for.
          </Typography>

          {/* Action Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
              sx={{
                minWidth: 200,
                py: 1.5,
                px: 3,
                borderRadius: 2,
              }}
            >
              Go to Home
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<SearchIcon />}
              onClick={handleBrowseProperties}
              sx={{
                minWidth: 200,
                py: 1.5,
                px: 3,
                borderRadius: 2,
              }}
            >
              Browse Properties
            </Button>

            <Button
              variant="text"
              size="large"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
              sx={{
                minWidth: 200,
                py: 1.5,
                px: 3,
                borderRadius: 2,
              }}
            >
              Go Back
            </Button>
          </Box>

          {/* Helpful Links */}
          <Box
            sx={{
              mt: 6,
              pt: 4,
              borderTop: `1px solid ${theme.palette.divider}`,
            }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Popular pages you might be looking for:
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {[
                { label: "Properties", path: ROUTES.PROPERTIES },
                { label: "About", path: ROUTES.ABOUT },
                { label: "FAQ", path: ROUTES.FAQ },
                { label: "Contact", path: ROUTES.DEVELOPER },
              ].map((link) => (
                <Button
                  key={link.path}
                  variant="text"
                  size="small"
                  onClick={() => navigate(link.path)}
                  sx={{
                    textTransform: "none",
                    color: "text.secondary",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "primary.light",
                    },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
