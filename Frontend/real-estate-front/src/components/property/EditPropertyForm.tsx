import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
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
import { storageService } from "../../services/storageService";

import { ImageUpload } from "./ImageUpload";
import { PropertyFormFields } from "./PropertyFormFields";
import { filterValidImages } from "../../utils/imageHelpers";
import { usePropertyFeatures } from "../../hooks/usePropertyFeatures";
import { createPropertyFormSchema } from "../../utils/validationSchemas";
import type {
  Property,
  PropertyImage,
  Location,
  PropertyType,
  PropertyStatus,
} from "../../types/property";

// Розширений тип для PropertyImage з файлом
type PropertyImageWithFile = PropertyImage & { file?: File };

interface EditPropertyFormProps {
  property: Property;
}

export const EditPropertyForm: React.FC<EditPropertyFormProps> = ({
  property,
}) => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<PropertyImageWithFile[]>([]);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const sanitizeFeature = (value: string) =>
    value.replace(/["'[\]]/g, "").trim();
  const initialFeatures = (property.features || [])
    .map((f) => sanitizeFeature(String(f)))
    .filter(Boolean);

  const { features, newFeature, setNewFeature, addFeature, removeFeature } =
    usePropertyFeatures(initialFeatures);

  const schema = createPropertyFormSchema(t);
  type PropertyFormData = yup.InferType<typeof schema>;

  const methods = useForm<PropertyFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: property.title,
      description: property.description,
      price: property.price,
      address: property.address,
      location: property.location,
      propertyType: property.propertyType,
      status: property.status,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      squareMeters: property.squareMeters,
      features: initialFeatures,
    },
  });

  useEffect(() => {
    methods.setValue("features", features, { shouldValidate: true });
  }, [features, methods]);

  useEffect(() => {
    const loadImages = async () => {
      try {
        const propertyImages = await propertyService.getPropertyImages(
          property.id
        );

        // Застосовуємо фільтрацію до зображень з API
        const validImages = filterValidImages(propertyImages);
        setImages(validImages);
      } catch {
        if (property.images && property.images.length > 0) {
          const validImages = filterValidImages(property.images);
          setImages(validImages);
        } else {
          setImages([]);
        }
      }
    };

    loadImages();
  }, [property.id, property.images]);

  const handleImagesChange = (newImages: PropertyImageWithFile[]) => {
    setImages(newImages);
  };

  const handleImagesUpload = async (files: File[]) => {
    try {
      // Миттєво завантажуємо зображення через API
      const uploadedImages = await propertyService.uploadImages(
        property.id,
        files
      );

      setImages((prevImages) => {
        const updatedImages = [
          ...prevImages,
          ...uploadedImages.map((img) => ({ ...img })),
        ];
        return updatedImages;
      });

      toast.success(t("toasts.imageEdit.upload.success", { count: files.length }));
    } catch (error) {
      if (error instanceof Error) {
        toast.error(t("toasts.imageEdit.upload.failedWithMessage", { message: error.message }));
      } else {
        toast.error(t("toasts.imageEdit.upload.failed"));
      }

      throw error;
    }
  };

  const handleImagesDelete = async (imageIds: string[]) => {
    try {
      for (const imageId of imageIds) {
        await propertyService.deleteImage(property.id, imageId);
      }

      setImages((prevImages) =>
        prevImages.filter((img) => !imageIds.includes(img.id))
      );

      toast.success(t("toasts.imageEdit.delete.success", { count: imageIds.length }));
    } catch {
      toast.error(t("toasts.imageEdit.delete.failed"));
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    try {
      const currentUser = storageService.getUser();
      const userId = currentUser?.id || property.userId;

      await propertyService.update(property.id, {
        id: property.id,
        userId: userId, // Використовуємо ID поточного користувача
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
        images: null,
        imageUrls: null,
        imagesToDelete: null,
      });

      toast.success(t("property.edit.success"));

      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["property", property.id] });
      queryClient.invalidateQueries({
        queryKey: ["property-images", property.id],
      });

      navigate(`/properties/${property.id}`);
    } catch {
      toast.error(t("property.edit.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3, overflow: "hidden" }}>
      <Card sx={{ overflow: "hidden" }}>
        <CardContent sx={{ overflow: "hidden" }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {t("property.edit.title")}
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            {t("property.edit.description")}
          </Alert>

          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit, (errors) => {
                const firstKey = Object.keys(errors)[0];
                const translated = t("form.validationError");
                const fallbackMsg =
                  translated === "form.validationError"
                    ? "Please fix validation errors"
                    : translated;
                const firstMessage =
                  (firstKey &&
                    (errors as Record<string, { message?: unknown }>)[
                      firstKey
                    ]?.message?.toString()) ||
                  fallbackMsg;
                toast.error(firstMessage);
                if (firstKey) {
                  const el = document.querySelector(
                    `[name="${firstKey}"]`
                  ) as HTMLElement | null;
                  el?.scrollIntoView({ behavior: "smooth", block: "center" });
                  el?.focus();
                }
              })}
            >
              <PropertyFormFields
                features={features}
                newFeature={newFeature}
                onNewFeatureChange={setNewFeature}
                onAddFeature={addFeature}
                onRemoveFeature={removeFeature}
              />

              {/* Image Upload */}
              <Box sx={{ mt: 4 }}>
                <ImageUpload
                  images={images}
                  onImagesChange={handleImagesChange}
                  onImagesDelete={handleImagesDelete}
                  onImagesUpload={handleImagesUpload}
                  maxImages={10}
                  disabled={isSubmitting}
                />
              </Box>

              {/* Submit Button */}
              <Box
                sx={{
                  mt: 4,
                  display: "flex",
                  gap: 2,
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/properties/${property.id}`)}
                  disabled={isSubmitting}
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  startIcon={
                    isSubmitting ? <CircularProgress size={20} /> : null
                  }
                >
                  {isSubmitting
                    ? t("common.updating")
                    : t("property.edit.submit")}
                </Button>
              </Box>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </Box>
  );
};
