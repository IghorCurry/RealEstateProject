import React, { useState, useCallback } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Fade,
  Grow,
} from "@mui/material";
import { Add as AddIcon, Refresh as RefreshIcon } from "@mui/icons-material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { propertyService } from "../services/propertyService";
import { PropertyCard } from "../components/property/PropertyCard";
import { FilterPanel } from "../components/property/FilterPanel";
import { SearchBar } from "../components/common/SearchBar";
import { LoadingState } from "../components/common/LoadingState";
import { EmptyState } from "../components/common/EmptyState";
import { SectionHeader } from "../components/common/SectionHeader";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useBreadcrumbs } from "../hooks/useBreadcrumbs";
import { ROUTES } from "../utils/constants";
import type { PropertyFilter, Property } from "../types/property";

import { usePropertyFilters } from "../hooks/usePropertyFilters";
import { useLanguage } from "../contexts/LanguageContext";

export const PropertiesPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const breadcrumbItems = useBreadcrumbs();

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [showFilters, setShowFilters] = useState(false);

  const {
    data: allProperties = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      try {
        return await propertyService.getAll();
      } catch (error) {
        console.error("Error fetching properties:", error);
        toast.error(t("properties.load.error"));
        throw error;
      }
    },
    retry: (failureCount: number, error: unknown) => {
      // Don't retry on 4xx errors
      const apiError = error as { statusCode?: number };
      if (
        apiError?.statusCode &&
        apiError.statusCode >= 400 &&
        apiError.statusCode < 500
      ) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // Use the new property filters hook for client-side filtering
  const {
    filteredProperties: properties,
    totalCount,
    hasFilters,
  } = usePropertyFilters({
    properties: allProperties,
    filters,
    searchQuery: searchTerm,
  });

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback(
    (key: keyof PropertyFilter, value: unknown) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const handlePriceRangeChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      const [minPrice, maxPrice] = newValue as number[];
      setFilters((prev) => ({
        ...prev,
        minPrice,
        maxPrice,
      }));
    },
    []
  );

  const handleAreaRangeChange = useCallback(
    (_event: Event, newValue: number | number[]) => {
      const [minSquareMeters, maxSquareMeters] = newValue as number[];
      setFilters((prev) => ({
        ...prev,
        minSquareMeters,
        maxSquareMeters,
      }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setFilters({});
    setSearchTerm("");
  }, []);

  // Видалено зайву функцію handleFavoriteToggle - вона не використовується

  const handlePropertyDelete = useCallback(
    async (propertyId: string) => {
      try {
        if (import.meta.env.DEV) {
          console.log("Deleting property:", propertyId);
        }
        await propertyService.delete(propertyId);
        if (import.meta.env.DEV) {
          console.log("Property deleted successfully");
        }
        toast.success(t("property.delete.success"));

        // Оптимістично оновлюємо кеш - видаляємо проперті зі списку
        queryClient.setQueryData(
          ["properties"],
          (oldData: Property[] | undefined) => {
            if (!oldData) return oldData;
            return oldData.filter((property) => property.id !== propertyId);
          }
        );

        // Також оновлюємо user-properties якщо потрібно
        queryClient.setQueryData(
          ["user-properties"],
          (oldData: Property[] | undefined) => {
            if (!oldData) return oldData;
            return oldData.filter((property) => property.id !== propertyId);
          }
        );

        if (import.meta.env.DEV) {
          console.log("Cache updated successfully");
        }
      } catch (error) {
        console.error("Error deleting property:", error);
        toast.error(t("property.delete.error"));

        // Якщо помилка, перезавантажуємо дані
        await refetch();
      }
    },
    [queryClient, refetch, t]
  );

  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleGoHome = useCallback(() => {
    navigate(ROUTES.HOME);
  }, [navigate]);

  const handleCreateProperty = useCallback(() => {
    navigate(ROUTES.CREATE_PROPERTY);
  }, [navigate]);

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 4 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            gap: 3,
            py: 8,
          }}
        >
          <Typography variant="h5" color="error" sx={{ fontWeight: 600 }}>
            Failed to load properties
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
              sx={{ borderRadius: 2 }}
            >
              Retry
            </Button>
            <Button
              variant="outlined"
              onClick={handleGoHome}
              sx={{ borderRadius: 2 }}
            >
              Go Home
            </Button>
          </Box>
        </Box>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: { xs: 3, md: 4 }, overflow: "visible", pb: { xs: 6, md: 8 } }}
    >
      <Breadcrumbs items={breadcrumbItems} />
      {/* Header */}
      <SectionHeader
        title={t("properties.title")}
        subtitle={t("properties.subtitle")}
        variant="page"
      />

      {/* Search and Filters */}
      <Box sx={{ mb: { xs: 4, md: 5 } }}>
        <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
          <Grid item xs={12} md={8}>
            <SearchBar
              placeholder={t("properties.search.placeholder")}
              onSearch={handleSearch}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 1.5, md: 2 },
                justifyContent: { xs: "stretch", md: "flex-end" },
                mt: { xs: 2, md: 0 },
              }}
            >
              <Button
                variant="outlined"
                onClick={() => setShowFilters(!showFilters)}
                sx={{
                  borderRadius: 2,
                  flex: { xs: 1, md: "none" },
                  minWidth: { md: 120 },
                  py: { xs: 1.2, md: 1 },
                  px: { xs: 2, md: 3 },
                  overflow: "visible",
                }}
              >
                {showFilters ? t("common.hide") : t("common.show")}{" "}
                {t("properties.filter.title")}
              </Button>
              {isAuthenticated && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleCreateProperty}
                  sx={{
                    borderRadius: 2,
                    flex: { xs: 1, md: "none" },
                    minWidth: { md: 140 },
                    py: { xs: 1.2, md: 1 },
                    px: { xs: 2, md: 3 },
                    overflow: "visible",
                  }}
                >
                  {t("property.create.add")}
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>

        {/* Filter Panel */}
        {showFilters && (
          <Fade in={showFilters} timeout={300}>
            <Box sx={{ mt: { xs: 3, md: 4 } }}>
              <FilterPanel
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onPriceRangeChange={handlePriceRangeChange}
                onAreaRangeChange={handleAreaRangeChange}
              />
            </Box>
          </Fade>
        )}
      </Box>

      {/* Results Count */}
      {!isLoading && (
        <Fade in={true} timeout={400}>
          <Box
            sx={{
              mb: { xs: 3, md: 4 },
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: { xs: 1.5, md: 2 },
              py: { xs: 1, md: 1.5 },
            }}
          >
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                wordBreak: "break-word",
                overflow: "hidden",
                textOverflow: "ellipsis",
                minWidth: 0,
                flex: "1 1 auto",
              }}
            >
              {totalCount}{" "}
              {totalCount === 1
                ? t("properties.count.singular")
                : t("properties.count.plural")}{" "}
              {t("properties.count.found")}
            </Typography>
            {hasFilters && (
              <Button
                variant="text"
                onClick={handleClearFilters}
                sx={{
                  textTransform: "none",
                  flex: "0 0 auto",
                  whiteSpace: "nowrap",
                }}
              >
                {t("properties.filter.clear")}
              </Button>
            )}
          </Box>
        </Fade>
      )}

      {/* Properties Grid */}
      {isLoading ? (
        <LoadingState type="properties" count={8} />
      ) : properties.length === 0 ? (
        <EmptyState
          title="No properties found"
          description={
            searchTerm || Object.keys(filters).length > 0
              ? "Try adjusting your search criteria or filters to find more properties."
              : "There are no properties available at the moment. Check back later or add a new property."
          }
          variant="properties"
          actionLabel={isAuthenticated ? "Add Property" : "Browse All"}
          onAction={isAuthenticated ? handleCreateProperty : handleClearFilters}
        />
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ overflow: "visible" }}>
          {properties.map((property, index) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={property.id}>
              <Grow in={true} timeout={300 + index * 100}>
                <Box sx={{ height: "100%", overflow: "visible" }}>
                  <PropertyCard
                    property={property}
                    onDelete={() => handlePropertyDelete(property.id)}
                    showOwnerActions={true}
                  />
                </Box>
              </Grow>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
