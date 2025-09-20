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
import { useLanguage } from "../contexts/LanguageContext";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { t } = useLanguage();

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
            overflow: "hidden",
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
            {t("notFound.title")}
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
            {t("notFound.description")}
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
              {t("notFound.actions.home")}
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
              {t("notFound.actions.browse")}
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
              {t("notFound.actions.back")}
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
              {t("notFound.popular")}
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
                {
                  label: t("notFound.link.properties"),
                  path: ROUTES.PROPERTIES,
                },
                { label: t("notFound.link.about"), path: ROUTES.ABOUT },
                { label: t("notFound.link.faq"), path: ROUTES.FAQ },
                { label: t("notFound.link.contact"), path: ROUTES.DEVELOPER },
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
