import type { PropertyCreate, PropertyUpdate } from "../types/property";
import { validateImageFiles } from "./imageValidation";

/**
 * Utility functions for creating FormData objects
 */
export const createPropertyFormData = (property: PropertyCreate): FormData => {
  const formData = new FormData();

  // Add basic property data
  formData.append("title", property.title);
  formData.append("description", property.description);
  formData.append("price", property.price.toString());
  formData.append("address", property.address);
  formData.append("location", property.location.toString());
  formData.append("propertyType", property.propertyType.toString());
  formData.append("status", property.status.toString());
  formData.append("bedrooms", property.bedrooms.toString());
  formData.append("bathrooms", property.bathrooms.toString());
  formData.append("squareMeters", property.squareMeters.toString());
  formData.append("features", JSON.stringify(property.features || []));

  // Add images
  if (property.images && property.images.length > 0) {
    const validation = validateImageFiles(property.images);
    if (!validation.isValid) {
      throw new Error(
        `Image validation failed: ${validation.errors.join(", ")}`
      );
    }

    validation.validFiles.forEach((image) => {
      formData.append("Images", image);
    });
  }

  return formData;
};

export const createPropertyUpdateFormData = (
  property: PropertyUpdate
): FormData => {
  const formData = new FormData();

  // Add ID (обов'язкове поле для оновлення)
  if (property.id) formData.append("id", property.id);

  // Add basic property data
  if (property.title !== undefined) formData.append("title", property.title);
  if (property.description !== undefined)
    formData.append("description", property.description);
  if (property.price !== undefined)
    formData.append("price", property.price.toString());
  if (property.address !== undefined)
    formData.append("address", property.address);
  if (property.location !== undefined)
    formData.append("location", property.location.toString());
  if (property.propertyType !== undefined)
    formData.append("propertyType", property.propertyType.toString());
  if (property.status !== undefined)
    formData.append("status", property.status.toString());
  if (property.bedrooms !== undefined)
    formData.append("bedrooms", property.bedrooms.toString());
  if (property.bathrooms !== undefined)
    formData.append("bathrooms", property.bathrooms.toString());
  if (property.squareMeters !== undefined)
    formData.append("squareMeters", property.squareMeters.toString());
  if (property.features !== undefined)
    formData.append("features", JSON.stringify(property.features));

  // Add images
  if (property.images && property.images.length > 0) {
    const validation = validateImageFiles(property.images);
    if (!validation.isValid) {
      throw new Error(
        `Image validation failed: ${validation.errors.join(", ")}`
      );
    }

    validation.validFiles.forEach((image) => {
      formData.append("Images", image);
    });
  }

  // Add image URLs for updates
  if (property.imageUrls && property.imageUrls.length > 0) {
    property.imageUrls.forEach((url) => {
      formData.append("imageUrls", url);
    });
  }

  // Add images to delete
  if (property.imagesToDelete && property.imagesToDelete.length > 0) {
    property.imagesToDelete.forEach((imageId) => {
      formData.append("imagesToDelete", imageId);
    });
  }

  return formData;
};

export const createImageUploadFormData = (files: File[]): FormData => {
  const formData = new FormData();

  // Validate files
  const validation = validateImageFiles(files);
  if (!validation.isValid) {
    throw new Error(`Image validation failed: ${validation.errors.join(", ")}`);
  }

  // Add valid files
  validation.validFiles.forEach((file) => {
    formData.append("files", file);
  });

  return formData;
};
