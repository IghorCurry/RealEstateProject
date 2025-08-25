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
import {
  propertyFormSchema,
  type PropertyFormData,
} from "../../utils/validationSchemas";
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

  const { features, newFeature, setNewFeature, addFeature, removeFeature } =
    usePropertyFeatures(property.features || []);

  const methods = useForm<PropertyFormData>({
    resolver: yupResolver(propertyFormSchema),
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
      features: property.features || [],
    },
  });

  // Load existing images
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
        // Fallback: використовуємо зображення з property з фільтрацією
        if (property.images && property.images.length > 0) {
          const validImages = filterValidImages(property.images);
          setImages(validImages);
        } else {
          setImages([]);
        }
      }
    };

    loadImages();
  }, [property.id]);

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

      // Додаємо нові зображення до існуючих
      // Перетворюємо PropertyImage[] в PropertyImageWithFile[]
      setImages((prevImages) => {
        const updatedImages = [
          ...prevImages,
          ...uploadedImages.map((img) => ({ ...img })),
        ];
        return updatedImages;
      });

      toast.success(`${files.length} image(s) uploaded successfully`);
    } catch (error) {
      // Покращена обробка помилок
      if (error instanceof Error) {
        toast.error(`Failed to upload images: ${error.message}`);
      } else {
        toast.error("Failed to upload images");
      }

      throw error; // Re-throw to let ImageUpload handle it
    }
  };

  const handleImagesDelete = async (imageIds: string[]) => {
    try {
      // Миттєво видаляємо зображення через API
      for (const imageId of imageIds) {
        await propertyService.deleteImage(property.id, imageId);
      }

      // Оновлюємо локальний стан
      setImages((prevImages) =>
        prevImages.filter((img) => !imageIds.includes(img.id))
      );

      toast.success(`${imageIds.length} image(s) deleted successfully`);
    } catch {
      toast.error("Failed to delete images");
    }
  };

  const onSubmit = async (data: PropertyFormData) => {
    setIsSubmitting(true);
    try {
      // Отримуємо userId з поточного користувача
      const currentUser = storageService.getUser();
      const userId = currentUser?.id || property.userId;

      // Оновлюємо тільки основні дані property (з пустими масивами для зображень)
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
        // Передаємо пусті масиви для зображень, щоб бекенд не скаржився
        images: null, // null замість пустого масиву
        imageUrls: null, // null замість пустого масиву
        imagesToDelete: null, // null замість пустого масиву
      });

      toast.success(t("property.edit.success"));

      // Оновлюємо кеш перед навігацією
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      queryClient.invalidateQueries({ queryKey: ["property", property.id] });
      queryClient.invalidateQueries({
        queryKey: ["property-images", property.id],
      });

      // Перенаправляємо на сторінку деталей property замість списку
      navigate(`/properties/${property.id}`);
    } catch {
      toast.error(t("property.edit.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {t("property.edit.title")}
          </Typography>

          <Alert severity="info" sx={{ mb: 3 }}>
            {t("property.edit.description")}
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
