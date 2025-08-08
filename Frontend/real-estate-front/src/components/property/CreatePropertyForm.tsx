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
});

type CreatePropertyFormData = yup.InferType<typeof schema>;

export const CreatePropertyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreatePropertyFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      address: "",
      city: 1, // Kyiv
      propertyType: 1, // House
      propertyStatus: 1, // Available
      bedrooms: 1,
      bathrooms: 1,
      area: 0,
    },
  });

  const onSubmit = async (data: CreatePropertyFormData) => {
    setIsSubmitting(true);
    try {
      await propertyService.create({
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
      });

      toast.success("Property created successfully!");
      navigate(ROUTES.PROPERTIES);
    } catch (error) {
      console.error("Error creating property:", error);
      toast.error("Failed to create property. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            Create New Property
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            Fill in the details below to create a new property listing. All
            fields are required.
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
                    onClick={() => navigate(ROUTES.PROPERTIES)}
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
                    {isSubmitting ? "Creating..." : "Create Property"}
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
