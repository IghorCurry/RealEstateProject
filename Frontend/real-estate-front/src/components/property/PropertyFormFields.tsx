import React, { useState } from "react";
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
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Add as AddIcon, Close as CloseIcon } from "@mui/icons-material";
import { Controller, useFormContext } from "react-hook-form";
import { useLanguage } from "../../contexts/LanguageContext";
import { featureValidationSchema } from "../../utils/validationSchemas";

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

  const [featureError, setFeatureError] = useState<string>("");

  // Функція для валідації та додавання feature
  const handleAddFeature = async () => {
    try {
      setFeatureError("");

      const cleanedFeature = newFeature.replace(/["'[\]]/g, "").trim();

      // Валідуємо нову feature
      await featureValidationSchema.validate({ feature: cleanedFeature });

      // Перевіряємо на дублікати
      const normalizedNewFeature = cleanedFeature.toLowerCase().trim();
      const isDuplicate = features.some(
        (feature) => feature.toLowerCase().trim() === normalizedNewFeature
      );

      if (isDuplicate) {
        setFeatureError("This feature already exists");
        return;
      }

      // Перевіряємо максимальну кількість features
      if (features.length >= 20) {
        setFeatureError("Cannot have more than 20 features");
        return;
      }

      // Оновлюємо стан на нормалізоване значення перед додаванням
      onNewFeatureChange(cleanedFeature);
      onAddFeature();
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Invalid feature";
      setFeatureError(message);
    }
  };

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
              onChange={(e) => {
                const v = e.target.value;
                field.onChange(v === "" ? "" : Number(v));
              }}
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
              helperText={errors.address?.message?.toString()}
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
              <Select
                {...field}
                label="Location"
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <MenuItem value={1}>Downtown</MenuItem>
                <MenuItem value={2}>Suburban</MenuItem>
                <MenuItem value={3}>Rural</MenuItem>
                <MenuItem value={4}>Beachfront</MenuItem>
                <MenuItem value={5}>Mountain</MenuItem>
                <MenuItem value={6}>Urban</MenuItem>
              </Select>
              {errors.location?.message && (
                <FormHelperText>
                  {String(errors.location.message)}
                </FormHelperText>
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
              <Select
                {...field}
                label="Property Type"
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <MenuItem value={1}>House</MenuItem>
                <MenuItem value={2}>Apartment</MenuItem>
                <MenuItem value={3}>Condo</MenuItem>
                <MenuItem value={4}>Townhouse</MenuItem>
                <MenuItem value={5}>Villa</MenuItem>
                <MenuItem value={6}>Land</MenuItem>
                <MenuItem value={7}>Commercial</MenuItem>
              </Select>
              {errors.propertyType?.message && (
                <FormHelperText>
                  {String(errors.propertyType.message)}
                </FormHelperText>
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
              <Select
                {...field}
                label="Status"
                onChange={(e) => field.onChange(Number(e.target.value))}
              >
                <MenuItem value={1}>Available</MenuItem>
                <MenuItem value={4}>Under Contract</MenuItem>
                <MenuItem value={2}>Sold</MenuItem>
                <MenuItem value={3}>Rented</MenuItem>
              </Select>
              {errors.status?.message && (
                <FormHelperText>{String(errors.status.message)}</FormHelperText>
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
              onChange={(e) => {
                const v = e.target.value;
                field.onChange(v === "" ? "" : Number(v));
              }}
              error={!!errors.bedrooms}
              helperText={errors.bedrooms?.message?.toString()}
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
              onChange={(e) => {
                const v = e.target.value;
                field.onChange(v === "" ? "" : Number(v));
              }}
              error={!!errors.bathrooms}
              helperText={errors.bathrooms?.message?.toString()}
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
              onChange={(e) => {
                const v = e.target.value;
                field.onChange(v === "" ? "" : Number(v));
              }}
              error={!!errors.squareMeters}
              helperText={errors.squareMeters?.message?.toString()}
            />
          )}
        />
      </Grid>

      {/* Features */}
      <Grid item xs={12}>
        <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "flex-start" }}>
          <TextField
            value={newFeature}
            onChange={(e) => {
              const raw = e.target.value;
              const cleaned = raw.replace(/["'[\]]/g, "");
              onNewFeatureChange(cleaned);
              setFeatureError(""); // Очищаємо помилку при зміні
            }}
            placeholder="Add a feature (e.g., Pool, Garage)"
            size="small"
            sx={{ flexGrow: 1 }}
            error={!!featureError}
            helperText={featureError}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddFeature();
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleAddFeature}
                    disabled={!newFeature.trim() || features.length >= 20}
                    size="small"
                    color="primary"
                  >
                    <AddIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Features Display */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {features.map((feature) => (
            <Chip
              key={feature}
              label={feature}
              onDelete={() => onRemoveFeature(feature)}
              color="primary"
              variant="outlined"
              deleteIcon={<CloseIcon />}
            />
          ))}
        </Box>

        {/* Features Info */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Alert severity="info" sx={{ fontSize: "0.875rem", py: 0.5 }}>
            Features: {features.length}/20
          </Alert>
          {features.length === 0 && (
            <Alert severity="warning" sx={{ fontSize: "0.875rem", py: 0.5 }}>
              At least one feature is recommended
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};
