import React from "react";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { Clear as ClearIcon } from "@mui/icons-material";
import { useLanguage } from "../../contexts/LanguageContext";
import type { PropertyFilter } from "../../types/property";
import { PropertyType, PropertyStatus, Location } from "../../types/property";
import {
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  getLocationLabel,
} from "../../utils/helpers";

interface FilterPanelProps {
  filters: PropertyFilter;
  onFilterChange: (key: keyof PropertyFilter, value: unknown) => void;
  onClearFilters: () => void;
  onPriceRangeChange: (event: Event, newValue: number | number[]) => void;
  onAreaRangeChange: (event: Event, newValue: number | number[]) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
  onPriceRangeChange,
  onAreaRangeChange,
}) => {
  const { t } = useLanguage();
  const priceRange = [filters.minPrice || 0, filters.maxPrice || 1000000];

  const areaRange = [
    filters.minSquareMeters || 0,
    filters.maxSquareMeters || 500,
  ];

  // Створюємо масиви для опцій
  const propertyTypeOptions = [
    {
      value: PropertyType.House,
      label: getPropertyTypeLabel(PropertyType.House),
    },
    {
      value: PropertyType.Apartment,
      label: getPropertyTypeLabel(PropertyType.Apartment),
    },
    {
      value: PropertyType.Condo,
      label: getPropertyTypeLabel(PropertyType.Condo),
    },
    {
      value: PropertyType.Townhouse,
      label: getPropertyTypeLabel(PropertyType.Townhouse),
    },
    {
      value: PropertyType.Villa,
      label: getPropertyTypeLabel(PropertyType.Villa),
    },
    {
      value: PropertyType.Land,
      label: getPropertyTypeLabel(PropertyType.Land),
    },
    {
      value: PropertyType.Commercial,
      label: getPropertyTypeLabel(PropertyType.Commercial),
    },
  ];

  const propertyStatusOptions = [
    {
      value: PropertyStatus.Available,
      label: getPropertyStatusLabel(PropertyStatus.Available),
    },
    {
      value: PropertyStatus.UnderContract,
      label: getPropertyStatusLabel(PropertyStatus.UnderContract),
    },
    {
      value: PropertyStatus.Sold,
      label: getPropertyStatusLabel(PropertyStatus.Sold),
    },
    {
      value: PropertyStatus.Rented,
      label: getPropertyStatusLabel(PropertyStatus.Rented),
    },
  ];

  const locationOptions = [
    { value: Location.Downtown, label: getLocationLabel(Location.Downtown) },
    { value: Location.Suburban, label: getLocationLabel(Location.Suburban) },
    { value: Location.Rural, label: getLocationLabel(Location.Rural) },
    {
      value: Location.Beachfront,
      label: getLocationLabel(Location.Beachfront),
    },
    { value: Location.Mountain, label: getLocationLabel(Location.Mountain) },
    { value: Location.Urban, label: getLocationLabel(Location.Urban) },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {t("properties.filter.title")}
        </Typography>
        <Button startIcon={<ClearIcon />} onClick={onClearFilters} size="small">
          {t("properties.filter.clear")}
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Property Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>{t("properties.filter.type")}</InputLabel>
            <Select
              value={filters.propertyType || ""}
              label={t("properties.filter.type")}
              onChange={(e) => onFilterChange("propertyType", e.target.value)}
            >
              <MenuItem value="">{t("properties.filter.allTypes")}</MenuItem>
              {propertyTypeOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Property Status */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>{t("properties.filter.status")}</InputLabel>
            <Select
              value={filters.status || ""}
              label={t("properties.filter.status")}
              onChange={(e) => onFilterChange("status", e.target.value)}
            >
              <MenuItem value="">{t("properties.filter.allStatuses")}</MenuItem>
              {propertyStatusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>{t("properties.filter.location")}</InputLabel>
            <Select
              value={filters.location || ""}
              label={t("properties.filter.location")}
              onChange={(e) => onFilterChange("location", e.target.value)}
            >
              <MenuItem value="">
                {t("properties.filter.allLocations")}
              </MenuItem>
              {locationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Bedrooms */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>{t("properties.filter.bedrooms")}</InputLabel>
            <Select
              value={filters.minBedrooms || ""}
              label={t("properties.filter.bedrooms")}
              onChange={(e) => onFilterChange("minBedrooms", e.target.value)}
            >
              <MenuItem value="">{t("properties.filter.any")}</MenuItem>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}+ {t("properties.filter.bedrooms")}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Price Range */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {t("properties.filter.price")} (USD)
          </Typography>
          <Slider
            value={priceRange}
            onChange={onPriceRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000000}
            step={10000}
            valueLabelFormat={(value) => `$${value.toLocaleString()}`}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              ${priceRange[0].toLocaleString()}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              ${priceRange[1].toLocaleString()}
            </Typography>
          </Box>
        </Grid>

        {/* Area Range */}
        <Grid item xs={12}>
          <Typography variant="subtitle2" sx={{ mb: 2 }}>
            {t("properties.filter.area")} (m²)
          </Typography>
          <Slider
            value={areaRange}
            onChange={onAreaRangeChange}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            step={10}
            valueLabelFormat={(value) => `${value}m²`}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {areaRange[0]}m²
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {areaRange[1]}m²
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
