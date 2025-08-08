import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Chip,
  Drawer,
  Pagination,
  Alert,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { FilterList as FilterIcon, Add as AddIcon } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import {
  PropertyCard,
  FilterPanel,
  SearchBar,
  LoadingState,
  EmptyState,
  SectionHeader,
  PageContainer,
} from "../components";
import { propertyService } from "../services/propertyService";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";
import type { PropertyFilter } from "../types/property";

const ITEMS_PER_PAGE = 12;

export const PropertiesPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<PropertyFilter>({});
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch properties
  const {
    data: properties = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["properties", filters, currentPage],
    queryFn: () => propertyService.search(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Handle search
  const handleSearch = (searchValue: string) => {
    const newFilters = { ...filters };
    if (searchValue.trim()) {
      newFilters.search = searchValue.trim();
    } else {
      delete newFilters.search;
    }
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handle filter changes
  const handleFilterChange = (key: keyof PropertyFilter, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
    setCurrentPage(1);
  };

  // Handle price range change
  const handlePriceRangeChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    const [minPrice, maxPrice] = newValue as number[];
    setFilters((prev) => ({
      ...prev,
      minPrice: minPrice > 0 ? minPrice : undefined,
      maxPrice: maxPrice < 1000000 ? maxPrice : undefined,
    }));
    setCurrentPage(1);
  };

  // Handle area range change
  const handleAreaRangeChange = (
    _event: Event,
    newValue: number | number[]
  ) => {
    const [minArea, maxArea] = newValue as number[];
    setFilters((prev) => ({
      ...prev,
      minArea: minArea > 0 ? minArea : undefined,
      maxArea: maxArea < 500 ? maxArea : undefined,
    }));
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm("");
    setCurrentPage(1);
    toast.success("Filters cleared");
  };

  const handleFavoriteToggle = async () => {
    // TODO: Implement favorite toggle functionality
    toast.success("Favorite functionality coming soon!");
  };

  // Handle property delete
  const handlePropertyDelete = async () => {
    // Refetch properties to update the list
    await refetch();
  };

  // Calculate pagination
  const totalPages = Math.ceil(properties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProperties = properties.slice(startIndex, endIndex);

  // Active filters count
  const activeFiltersCount = Object.keys(filters).filter(
    (key) =>
      filters[key as keyof PropertyFilter] !== undefined &&
      filters[key as keyof PropertyFilter] !== ""
  ).length;

  if (error) {
    return (
      <PageContainer>
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load properties. Please try again.
        </Alert>
        <Button variant="contained" onClick={() => refetch()}>
          Retry
        </Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <SectionHeader
        title="Properties"
        subtitle="Discover your perfect home from our extensive collection"
      />

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <SearchBar
              placeholder="Search properties by location, type, or features..."
              onSearch={handleSearch}
              initialValue={searchTerm}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={() => setDrawerOpen(true)}
              fullWidth={isMobile}
              sx={{ height: 56 }}
            >
              Filters
              {activeFiltersCount > 0 && (
                <Chip
                  label={activeFiltersCount}
                  size="small"
                  color="primary"
                  sx={{ ml: 1 }}
                />
              )}
            </Button>
          </Grid>
          {isAuthenticated && (
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate(ROUTES.CREATE_PROPERTY)}
                fullWidth={isMobile}
                sx={{ height: 56 }}
              >
                Create Property
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>

      {/* Properties Grid */}
      {isLoading ? (
        <LoadingState message="Loading properties..." fullHeight />
      ) : currentProperties.length > 0 ? (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {startIndex + 1}-{Math.min(endIndex, properties.length)}{" "}
              of {properties.length} properties
            </Typography>
          </Box>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            {currentProperties.map((property) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={property.id}>
                <PropertyCard
                  property={property}
                  onFavoriteToggle={handleFavoriteToggle}
                  onDelete={handlePropertyDelete}
                  showOwnerActions={true}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_event, page) => setCurrentPage(page)}
                color="primary"
                size="large"
              />
            </Box>
          )}
        </>
      ) : (
        <EmptyState
          title="No properties found"
          description="Try adjusting your search criteria or filters to find more properties."
          actionLabel="Clear Filters"
          onAction={clearFilters}
        />
      )}

      {/* Filter Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: { width: { xs: "100%", sm: 400 } },
        }}
      >
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          onPriceRangeChange={handlePriceRangeChange}
          onAreaRangeChange={handleAreaRangeChange}
        />
      </Drawer>
    </PageContainer>
  );
};
