import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Chip,
  Box,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { useLanguage } from "../../contexts/LanguageContext";

interface PropertyFormFieldsProps {
  features: string[];
  newFeature: string;
  onNewFeatureChange: (value: string) => void;
  onAddFeature: () => void;
  onRemoveFeature: (feature: string) => void;
}

export const PropertyFormFields: React.FC<PropertyFormFieldsProps> = ({
  features,
  newFeature,
  onNewFeatureChange,
  onAddFeature,
  onRemoveFeature,
}) => {
  const { t } = useLanguage();
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Grid container spacing={3}>
      {/* Title */}
      <Grid item xs={12}>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("property.form.title")}
              fullWidth
              error={!!errors.title}
              helperText={errors.title?.message?.toString()}
              sx={{
                "& .MuiInputBase-root": {
                  overflow: "hidden",
                },
              }}
            />
          )}
        />
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("property.form.description")}
              fullWidth
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description?.message?.toString()}
            />
          )}
        />
      </Grid>

      {/* Price and Address */}
      <Grid item xs={12} md={6}>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label={t("property.form.price")}
              type="number"
              fullWidth
              error={!!errors.price}
              helperText={errors.price?.message?.toString()}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Address"
              fullWidth
              error={!!errors.address}
              helperText={errors.address?.message}
            />
          )}
        />
      </Grid>

      {/* Location and Property Type */}
      <Grid item xs={12} md={6}>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.location}>
              <InputLabel>Location</InputLabel>
              <Select {...field} label="Location">
                <MenuItem value={1}>Downtown</MenuItem>
                <MenuItem value={2}>Suburban</MenuItem>
                <MenuItem value={3}>Rural</MenuItem>
                <MenuItem value={4}>Beachfront</MenuItem>
                <MenuItem value={5}>Mountain</MenuItem>
                <MenuItem value={6}>Urban</MenuItem>
              </Select>
              {errors.location && (
                <FormHelperText>{errors.location.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Controller
          name="propertyType"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.propertyType}>
              <InputLabel>Property Type</InputLabel>
              <Select {...field} label="Property Type">
                <MenuItem value={1}>House</MenuItem>
                <MenuItem value={2}>Apartment</MenuItem>
                <MenuItem value={3}>Condo</MenuItem>
                <MenuItem value={4}>Townhouse</MenuItem>
                <MenuItem value={5}>Villa</MenuItem>
                <MenuItem value={6}>Land</MenuItem>
                <MenuItem value={7}>Commercial</MenuItem>
              </Select>
              {errors.propertyType && (
                <FormHelperText>{errors.propertyType.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Grid>

      {/* Status */}
      <Grid item xs={12} md={6}>
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.status}>
              <InputLabel>Status</InputLabel>
              <Select {...field} label="Status">
                <MenuItem value={1}>Available</MenuItem>
                <MenuItem value={2}>Under Contract</MenuItem>
                <MenuItem value={3}>Sold</MenuItem>
                <MenuItem value={4}>Rented</MenuItem>
              </Select>
              {errors.status && (
                <FormHelperText>{errors.status.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />
      </Grid>

      {/* Bedrooms and Bathrooms */}
      <Grid item xs={12} md={3}>
        <Controller
          name="bedrooms"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Bedrooms"
              type="number"
              fullWidth
              error={!!errors.bedrooms}
              helperText={errors.bedrooms?.message}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <Controller
          name="bathrooms"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Bathrooms"
              type="number"
              fullWidth
              error={!!errors.bathrooms}
              helperText={errors.bathrooms?.message}
            />
          )}
        />
      </Grid>

      {/* Square Meters */}
      <Grid item xs={12} md={6}>
        <Controller
          name="squareMeters"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Square Meters"
              type="number"
              fullWidth
              error={!!errors.squareMeters}
              helperText={errors.squareMeters?.message}
            />
          )}
        />
      </Grid>

      {/* Features */}
      <Grid item xs={12}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <TextField
            value={newFeature}
            onChange={(e) => onNewFeatureChange(e.target.value)}
            placeholder="Add a feature (e.g., Pool, Garage)"
            size="small"
            sx={{ flexGrow: 1 }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddFeature();
              }
            }}
          />
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
          {features.map((feature) => (
            <Chip
              key={feature}
              label={feature}
              onDelete={() => onRemoveFeature(feature)}
              color="primary"
              variant="outlined"
            />
          ))}
        </Box>
      </Grid>
    </Grid>
  );
};
