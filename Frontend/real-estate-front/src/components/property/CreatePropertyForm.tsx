import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "../../contexts/LanguageContext";
import { propertyService } from "../../services/propertyService";
import { ROUTES } from "../../utils/constants";
import { ImageUpload } from "./ImageUpload";
import { PropertyFormFields } from "./PropertyFormFields";
import { usePropertyFeatures } from "../../hooks/usePropertyFeatures";
import { createPropertyFormSchema } from "../../utils/validationSchemas";
import type {
  PropertyImage,
  Location,
  PropertyType,
  PropertyStatus,
} from "../../types/property";

// Розширений тип для PropertyImage з файлом
type PropertyImageWithFile = PropertyImage & { file?: File };

export const CreatePropertyForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<PropertyImageWithFile[]>([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  const { features, newFeature, setNewFeature, addFeature, removeFeature } =
    usePropertyFeatures();

  const schema = createPropertyFormSchema(t);
  type PropertyFormData = yup.InferType<typeof schema>;

  const methods = useForm<PropertyFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      address: "",
      location: 6 as Location, // Urban
      propertyType: 1 as PropertyType, // House
      status: 1 as PropertyStatus, // Available
      bedrooms: 1,
      bathrooms: 1,
      squareMeters: 0,
      features: [],
    },
  });

  const handleImagesChange = (newImages: PropertyImageWithFile[]) => {
    setImages(newImages);
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    try {
      // Валідація зображень
      if (images.length === 0) {
        toast.error(t("toasts.createProperty.noImages"));
        setIsSubmitting(false);
        return;
      }

      // Extract files from images
      const files = images
        .filter(
          (img): img is PropertyImageWithFile & { file: File } =>
            "file" in img && img.file !== undefined
        )
        .map((img) => img.file);

      if (files.length === 0) {
        toast.error(t("toasts.createProperty.noFiles"));
        setIsSubmitting(false);
        return;
      }

      await propertyService.create({
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.address,
        location: data.location as Location,
        propertyType: data.propertyType as PropertyType,
        status: data.status as PropertyStatus,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        squareMeters: data.squareMeters,
        features: features,
        images: files,
      });

      // Правильне оновлення кешу React Query - використовуємо refetchQueries
      await queryClient.refetchQueries({ queryKey: ["properties"] });
      await queryClient.refetchQueries({ queryKey: ["user-properties"] });

      toast.success(t("toasts.createProperty.success"));
      navigate(ROUTES.PROPERTIES);
    } catch (error) {
      // More specific error messages
      if (error instanceof Error) {
        if (error.message.includes("413")) {
          toast.error(t("toasts.createProperty.imagesTooLarge"));
        } else if (error.message.includes("400")) {
          toast.error(t("toasts.createProperty.invalidData"));
        } else if (error.message.includes("401")) {
          toast.error(t("toasts.createProperty.loginRequired"));
        } else {
          toast.error(
            t("toasts.createProperty.failedWithMessage", {
              message: error.message,
            })
          );
        }
      } else {
        toast.error(t("toasts.createProperty.failed"));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, overflow: "hidden" }}>
      <Card sx={{ overflow: "hidden" }}>
        <CardContent sx={{ overflow: "hidden" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t("createProperty.header.title")}
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            {t("createProperty.header.subtitle")}
          </Alert>

          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <PropertyFormFields
                features={features}
                newFeature={newFeature}
                onNewFeatureChange={setNewFeature}
                onAddFeature={addFeature}
                onRemoveFeature={removeFeature}
              />

              {/* Image Upload */}
              <Grid item xs={12}>
                <ImageUpload
                  images={images}
                  onImagesChange={handleImagesChange}
                  disabled={isSubmitting}
                />
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <Box
                  sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => navigate(ROUTES.PROPERTIES)}
                    disabled={isSubmitting}
                  >
                    {t("common.cancel")}
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting || images.length === 0}
                    startIcon={
                      isSubmitting ? <CircularProgress size={20} /> : null
                    }
                  >
                    {isSubmitting
                      ? t("common.updating")
                      : t("property.create.add")}
                  </Button>
                </Box>
              </Grid>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Box>
  );
};
