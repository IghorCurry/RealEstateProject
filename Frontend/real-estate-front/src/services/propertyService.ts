import { apiClient } from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import { buildApiUrl, getMultipartHeaders } from "../utils/apiHelpers";
import type {
  Property,
  PropertyDetailed,
  PropertyCreate,
  PropertyUpdate,
  PropertyFilter,
  PropertyImage,
} from "../types/property";
import {
  createPropertyFormData,
  createImageUploadFormData,
} from "../utils/formDataUtils";
import { validateImageFiles } from "../utils/imageValidation";

export const propertyService = {
  async getAll(): Promise<Property[]> {
    try {
      const response = await apiClient.get<Property[]>(
        API_ENDPOINTS.PROPERTY.ALL
      );
      if (import.meta.env.DEV) {
        console.log("Properties API Response:", response);
      }
      return response || [];
    } catch (error: unknown) {
      console.error("Failed to fetch properties:", error);
      throw error;
    }
  },

  async getById(id: string): Promise<PropertyDetailed> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.PROPERTY.BY_ID, { id });
      if (import.meta.env.DEV) {
        console.log("PropertyService - Fetching property from URL:", url);
      }
      const property = await apiClient.get<PropertyDetailed>(url);
      if (import.meta.env.DEV) {
        console.log("PropertyService - Received property:", property);
        console.log("PropertyService - Property images:", property.images);
      }
      return property;
    } catch (error: unknown) {
      console.error("Failed to fetch property:", error);
      throw error;
    }
  },

  async create(property: PropertyCreate): Promise<Property> {
    try {
      if (property.images && property.images.length > 0) {
        const formData = createPropertyFormData(property);
        return await apiClient.post<Property>(
          API_ENDPOINTS.PROPERTY.CREATE,
          formData,
          { headers: getMultipartHeaders() }
        );
      } else {
        return await apiClient.post<Property>(
          API_ENDPOINTS.PROPERTY.CREATE,
          property
        );
      }
    } catch (error) {
      console.error("Failed to create property:", error);
      throw error;
    }
  },

  async update(id: string, property: PropertyUpdate): Promise<Property> {
    try {
      const url = API_ENDPOINTS.PROPERTY.UPDATE;

      // Спробуємо спочатку JSON
      try {
        return await apiClient.put<Property>(url, property);
      } catch {
        // Fallback: використовуємо FormData
        const formData = new FormData();
        formData.append("Id", property.id);
        if (property.userId) formData.append("UserId", property.userId);
        if (property.title) formData.append("Title", property.title);
        if (property.description)
          formData.append("Description", property.description);
        if (property.price) formData.append("Price", property.price.toString());
        if (property.address) formData.append("Address", property.address);
        if (property.location)
          formData.append("Location", property.location.toString());
        if (property.propertyType)
          formData.append("PropertyType", property.propertyType.toString());
        if (property.status)
          formData.append("Status", property.status.toString());
        if (property.bedrooms)
          formData.append("Bedrooms", property.bedrooms.toString());
        if (property.bathrooms)
          formData.append("Bathrooms", property.bathrooms.toString());
        if (property.squareMeters)
          formData.append("SquareMeters", property.squareMeters.toString());
        if (property.features) {
          property.features.forEach((feature) =>
            formData.append("Features", feature)
          );
        }

        return await apiClient.put<Property>(url, formData, {
          headers: getMultipartHeaders(),
        });
      }
    } catch (error) {
      console.error("Failed to update property:", error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.PROPERTY.DELETE, { id });
      return await apiClient.delete<void>(url);
    } catch (error) {
      console.error("Failed to delete property:", error);
      throw error;
    }
  },

  async search(filters: PropertyFilter): Promise<Property[]> {
    try {
      const searchParams = {
        ...filters,
        page: filters.page || 1,
        pageSize: filters.pageSize || 10,
      };

      const url = buildApiUrl(
        API_ENDPOINTS.PROPERTY.SEARCH,
        undefined,
        searchParams
      );
      const response = await apiClient.get<Property[]>(url);
      if (import.meta.env.DEV) {
        console.log("Search API Response:", response);
      }
      return response || [];
    } catch (error: unknown) {
      console.error("Failed to search properties:", error);
      throw error;
    }
  },

  async getByUserId(userId: string): Promise<Property[]> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.PROPERTY.BY_USER, { userId });
      const response = await apiClient.get<Property[]>(url);
      if (import.meta.env.DEV) {
        console.log("User Properties API Response:", response);
      }
      return response || [];
    } catch (error) {
      console.error("Failed to fetch user properties:", error);
      throw error;
    }
  },

  /**
   * Upload images for a property with validation
   * @param propertyId - Property ID to upload images for
   * @param files - Array of image files to upload
   * @returns Promise with uploaded property images
   */
  async uploadImages(
    propertyId: string,
    files: File[]
  ): Promise<PropertyImage[]> {
    try {
      if (!files || files.length === 0) {
        throw new Error("No files provided for upload");
      }

      const validation = validateImageFiles(files);
      if (!validation.isValid) {
        throw new Error(
          `Image validation failed: ${validation.errors.join(", ")}`
        );
      }

      const formData = createImageUploadFormData(validation.validFiles);

      const url = buildApiUrl(API_ENDPOINTS.PROPERTY_IMAGES.UPLOAD, {
        propertyId,
      });

      const result = await apiClient.post<PropertyImage[]>(url, formData, {
        headers: getMultipartHeaders(),
      });

      return result;
    } catch (error) {
      console.error("Failed to upload images:", error);
      throw error;
    }
  },

  /**
   * Delete a specific image from a property
   * @param propertyId - Property ID that owns the image
   * @param imageId - Image ID to delete
   * @returns Promise with deletion success status
   */
  async deleteImage(propertyId: string, imageId: string): Promise<boolean> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.PROPERTY_IMAGES.DELETE, {
        propertyId,
        imageId,
      });

      const result = await apiClient.delete<boolean>(url);

      return result;
    } catch (error) {
      console.error("Failed to delete image:", error);
      throw error;
    }
  },

  /**
   * Reorder images for a property
   * @param propertyId - Property ID to reorder images for
   * @param imageIds - Array of image IDs in the desired order
   * @returns Promise with reorder success status
   */
  async reorderImages(
    propertyId: string,
    imageIds: string[]
  ): Promise<boolean> {
    try {
      if (!imageIds || imageIds.length === 0) {
        throw new Error("No image IDs provided for reordering");
      }

      const url = buildApiUrl(API_ENDPOINTS.PROPERTY_IMAGES.REORDER, {
        propertyId,
      });
      return await apiClient.put<boolean>(url, imageIds);
    } catch (error) {
      console.error("Failed to reorder images:", error);
      throw error;
    }
  },

  /**
   * Get all images for a specific property
   * @param propertyId - Property ID to get images for
   * @returns Promise with array of property images
   */
  async getPropertyImages(propertyId: string): Promise<PropertyImage[]> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.PROPERTY_IMAGES.GET, {
        propertyId,
      });

      const images = await apiClient.get<PropertyImage[]>(url);

      return images;
    } catch (error) {
      console.error("Failed to get property images:", error);
      throw error;
    }
  },
};
