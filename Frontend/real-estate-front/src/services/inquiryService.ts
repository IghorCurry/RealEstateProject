import { apiClient } from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import { buildApiUrl, isUserAuthenticated } from "../utils/apiHelpers";
import type { InquiryCreate, InquiryUpdate, Inquiry } from "../types/inquiry";
import type { ApiError } from "../types/api";

export const inquiryService = {
  /**
   * Create new inquiry
   */
  async createInquiry(inquiryData: InquiryCreate): Promise<Inquiry> {
    try {
      return await apiClient.post<Inquiry>(
        API_ENDPOINTS.INQUIRY.CREATE,
        inquiryData
      );
    } catch (error) {
      console.error("Failed to create inquiry:", error);
      throw error;
    }
  },

  /**
   * Get all inquiries (admin only)
   */
  async getAll(): Promise<Inquiry[]> {
    try {
      return await apiClient.get<Inquiry[]>(API_ENDPOINTS.INQUIRY.ALL);
    } catch (error) {
      console.error("Failed to fetch inquiries:", error);
      throw error;
    }
  },

  async getMyInquiries(): Promise<{ sent: Inquiry[]; received: Inquiry[] }> {
    try {
      return await apiClient.get<{ sent: Inquiry[]; received: Inquiry[] }>(
        API_ENDPOINTS.INQUIRY.MY
      );
    } catch (error) {
      console.error("Failed to get my inquiries:", error);
      throw error;
    }
  },

  async getUserInquiries(): Promise<Inquiry[]> {
    try {
      if (!isUserAuthenticated()) {
        return [];
      }

      return await apiClient.get<Inquiry[]>(API_ENDPOINTS.INQUIRY.USER);
    } catch (error) {
      console.error("Failed to get user inquiries:", error);
      // Якщо помилка 401 або 403, повертаємо порожній масив
      const apiError = error as ApiError;
      if (apiError?.statusCode === 401 || apiError?.statusCode === 403) {
        return [];
      }
      throw error;
    }
  },

  /**
   * Get inquiry by ID
   */
  async getInquiryById(id: string): Promise<Inquiry> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.INQUIRY.BY_ID, { id });
      return await apiClient.get<Inquiry>(url);
    } catch (error) {
      console.error("Failed to get inquiry by ID:", error);
      throw error;
    }
  },

  /**
   * Update inquiry
   */
  async updateInquiry(id: string, data: InquiryUpdate): Promise<Inquiry> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.INQUIRY.UPDATE, { id });
      return await apiClient.put<Inquiry>(url, data);
    } catch (error) {
      console.error("Failed to update inquiry:", error);
      throw error;
    }
  },

  /**
   * Delete inquiry
   */
  async deleteInquiry(id: string): Promise<void> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.INQUIRY.DELETE, { id });
      return await apiClient.delete<void>(url);
    } catch (error) {
      console.error("Failed to delete inquiry:", error);
      throw error;
    }
  },

  /**
   * Get inquiries by property ID
   */
  async getInquiriesByProperty(propertyId: string): Promise<Inquiry[]> {
    try {
      const url = buildApiUrl(API_ENDPOINTS.INQUIRY.BY_PROPERTY, {
        propertyId,
      });
      return await apiClient.get<Inquiry[]>(url);
    } catch (error) {
      console.error("Failed to get inquiries by property:", error);
      throw error;
    }
  },
};
