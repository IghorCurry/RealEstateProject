import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { propertyService } from "../../services/propertyService";
import { PropertyType, PropertyStatus, Location } from "../../types/property";
import { ROUTES } from "../../utils/constants";
import type { Property } from "../../types/property";

const schema = yup.object({
  title: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: yup
    .string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  address: yup.string().required("Address is required"),
  city: yup.number().required("City is required"),
  propertyType: yup.number().required("Property type is required"),
  propertyStatus: yup.number().required("Property status is required"),
  bedrooms: yup
    .number()
    .required("Number of bedrooms is required")
    .min(0, "Bedrooms cannot be negative"),
  bathrooms: yup
    .number()
    .required("Number of bathrooms is required")
    .min(0, "Bathrooms cannot be negative"),
  area: yup
    .number()
    .required("Area is required")
    .positive("Area must be positive"),
  yearBuilt: yup
    .number()
    .required("Year built is required")
    .min(1900, "Year must be at least 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

type EditPropertyFormData = yup.InferType<typeof schema>;

interface EditPropertyFormProps {
  property: Property;
}

export const EditPropertyForm: React.FC<EditPropertyFormProps> = ({
  property,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditPropertyFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: property.title,
      description: property.description,
      price: property.price,
      address: property.address,
      city: property.city,
      propertyType: property.propertyType,
      propertyStatus: property.propertyStatus,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      yearBuilt: property.yearBuilt,
    },
  });

  const onSubmit = async (data: EditPropertyFormData) => {
    setIsSubmitting(true);
    try {
      await propertyService.update(property.id, {
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.address,
        city: data.city as Location,
        propertyType: data.propertyType as PropertyType,
        propertyStatus: data.propertyStatus as PropertyStatus,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        area: data.area,
        yearBuilt: data.yearBuilt,
      });

      toast.success("Property updated successfully!");
      navigate(ROUTES.PROPERTY_DETAIL.replace(":id", property.id));
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Failed to update property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Property
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            Update the property details below. All fields are required.
          </Alert>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {/* Title */}
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Property Title"
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
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
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      error={!!errors.description}
                      helperText={errors.description?.message}
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
                      label="Price ($)"
                      type="number"
                      fullWidth
                      error={!!errors.price}
                      helperText={errors.price?.message}
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

              {/* City and Property Type */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="city"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.city}>
                      <InputLabel>City</InputLabel>
                      <Select {...field} label="City">
                        <MenuItem value={1}>Kyiv</MenuItem>
                        <MenuItem value={2}>Lviv</MenuItem>
                        <MenuItem value={3}>Kharkiv</MenuItem>
                        <MenuItem value={4}>Odesa</MenuItem>
                        <MenuItem value={5}>Dnipro</MenuItem>
                      </Select>
                      {errors.city && (
                        <FormHelperText>{errors.city.message}</FormHelperText>
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
                        <FormHelperText>
                          {errors.propertyType.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              {/* Property Status and Year Built */}
              <Grid item xs={12} md={6}>
                <Controller
                  name="propertyStatus"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.propertyStatus}>
                      <InputLabel>Status</InputLabel>
                      <Select {...field} label="Status">
                        <MenuItem value={1}>Available</MenuItem>
                        <MenuItem value={2}>Under Contract</MenuItem>
                        <MenuItem value={3}>Sold</MenuItem>
                        <MenuItem value={4}>Rented</MenuItem>
                      </Select>
                      {errors.propertyStatus && (
                        <FormHelperText>
                          {errors.propertyStatus.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Controller
                  name="yearBuilt"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Year Built"
                      type="number"
                      fullWidth
                      error={!!errors.yearBuilt}
                      helperText={errors.yearBuilt?.message}
                    />
                  )}
                />
              </Grid>

              {/* Bedrooms and Bathrooms */}
              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
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

              {/* Area */}
              <Grid item xs={12}>
                <Controller
                  name="area"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Area (sq meters)"
                      type="number"
                      fullWidth
                      error={!!errors.area}
                      helperText={errors.area?.message}
                    />
                  )}
                />
              </Grid>

              {/* Submit Buttons */}
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() =>
                      navigate(
                        ROUTES.PROPERTY_DETAIL.replace(":id", property.id)
                      )
                    }
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    startIcon={
                      isSubmitting ? <CircularProgress size={20} /> : null
                    }
                  >
                    {isSubmitting ? "Updating..." : "Update Property"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};
