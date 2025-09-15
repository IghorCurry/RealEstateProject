import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Alert,
  Button,
  Grow,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import { useFavorites } from "../hooks/useFavorites";
import { Favorite as FavoriteIcon } from "@mui/icons-material";
import { PropertyCard } from "../components/property/PropertyCard";
import type { Property } from "../types/property";
import { SectionHeader } from "../components/common/SectionHeader";
import { LoadingState } from "../components/common/LoadingState";
import { EmptyState } from "../components/common/EmptyState";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { ROUTES } from "../utils/constants";

export const FavoritesPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const breadcrumbItems = useBreadcrumbs();

  const {
    favorites,
    isLoadingFavorites: isLoading,
    favoritesError: error,
    refetchFavorites,
  } = useFavorites();

  const favoritesList = favorites as Property[];

  const handleRemoveFavorite = () => {
    // This will be called when user clicks favorite button in PropertyCard
    // The PropertyCard will handle the removal internally
    // We need to refetch the favorites to refresh the list
    refetchFavorites();
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs items={breadcrumbItems} />
        <LoadingState type="properties" count={8} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs items={breadcrumbItems} />
        <Alert severity="error" sx={{ mb: 3 }}>
          {t("favorites.load.error")}
        </Alert>
        <Button variant="contained" onClick={() => navigate(ROUTES.PROPERTIES)}>
          {t("favorites.empty.browse")}
        </Button>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Breadcrumbs items={breadcrumbItems} />
        <Alert severity="info" sx={{ mb: 3 }}>
          {t("favorites.auth.required")}
        </Alert>
        <Button variant="contained" onClick={() => navigate(ROUTES.LOGIN)}>
          {t("nav.login")}
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, overflow: "hidden" }}>
      <Breadcrumbs items={breadcrumbItems} />

      <SectionHeader
        title={t("favorites.title")}
        subtitle={t("favorites.subtitle")}
      />

      {favoritesList.length === 0 ? (
        <EmptyState
          title={t("favorites.empty.title")}
          description={t("favorites.empty.description")}
          actionLabel={t("favorites.empty.browse")}
          onAction={() => navigate(ROUTES.PROPERTIES)}
          icon={<FavoriteIcon sx={{ fontSize: 64, color: "error.light" }} />}
        />
      ) : (
        <>
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
              {t("favorites.count").replace(
                "{count}",
                favoritesList.length.toString()
              )}
            </Typography>
            <Chip
              label={`${favoritesList.length} items`}
              color="primary"
              variant="outlined"
              size="small"
              sx={{ fontWeight: 500 }}
            />
            {favoritesList.length > 0 && (
              <Chip
                label="❤️ All Favorites"
                color="error"
                size="small"
                sx={{
                  fontWeight: 500,
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.7 },
                    "100%": { opacity: 1 },
                  },
                }}
              />
            )}
          </Box>

          <Grid container spacing={3}>
            {favoritesList.map((property: Property, index: number) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                <Grow in={true} timeout={300 + index * 100}>
                  <Box>
                    <PropertyCard
                      property={property}
                      onFavoriteToggle={handleRemoveFavorite}
                      isFavorited={true}
                      showOwnerActions={false}
                    />
                  </Box>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};
