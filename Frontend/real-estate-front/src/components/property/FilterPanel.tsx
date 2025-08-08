import React from 'react';
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
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import type { PropertyFilter } from '../../types/property';
import {
  PROPERTY_TYPES,
  PROPERTY_STATUSES,
  LOCATIONS,
} from '../../utils/constants';
import {
  getPropertyTypeLabel,
  getPropertyStatusLabel,
  getLocationLabel,
} from '../../utils/helpers';

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
  const priceRange = [
    filters.minPrice || 0,
    filters.maxPrice || 1000000,
  ];

  const areaRange = [
    filters.minArea || 0,
    filters.maxArea || 500,
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Filters
        </Typography>
        <Button
          startIcon={<ClearIcon />}
          onClick={onClearFilters}
          size="small"
        >
          Clear All
        </Button>
      </Box>

      <Grid container spacing={3}>
        {/* Property Type */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Property Type</InputLabel>
            <Select
              value={filters.propertyType || ''}
              label="Property Type"
              onChange={(e) => onFilterChange('propertyType', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {getPropertyTypeLabel(value)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Property Status */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Status</InputLabel>
            <Select
              value={filters.status || ''}
              label="Status"
              onChange={(e) => onFilterChange('status', e.target.value)}
            >
              <MenuItem value="">All Statuses</MenuItem>
              {Object.entries(PROPERTY_STATUSES).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {getPropertyStatusLabel(value)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Location */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Location</InputLabel>
            <Select
              value={filters.location || ''}
              label="Location"
              onChange={(e) => onFilterChange('location', e.target.value)}
            >
              <MenuItem value="">All Locations</MenuItem>
              {Object.entries(LOCATIONS).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {getLocationLabel(value)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Bedrooms */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth size="small">
            <InputLabel>Bedrooms</InputLabel>
            <Select
              value={filters.bedrooms || ''}
              label="Bedrooms"
              onChange={(e) => onFilterChange('bedrooms', e.target.value)}
            >
              <MenuItem value="">Any</MenuItem>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <MenuItem key={num} value={num}>
                  {num}+ Bedrooms
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
            Price Range (USD)
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
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
            Area Range (m²)
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
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