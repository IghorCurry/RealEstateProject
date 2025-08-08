import { apiClient } from "./api";
import type { InquiryCreate } from "../types/inquiry";

export const inquiryService = {
  async createInquiry(inquiryData: InquiryCreate): Promise<any> {
    // For now, just simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Inquiry created successfully" });
      }, 1000);
    });

    // TODO: Uncomment when backend is ready
    // return apiClient.post<any>('/inquiries', inquiryData);
  },

  async getInquiries(): Promise<any[]> {
    // For now, return empty array
    return Promise.resolve([]);

    // TODO: Uncomment when backend is ready
    // return apiClient.get<any[]>('/inquiries');
  },

  async getInquiryById(id: string): Promise<any> {
    // For now, return mock data
    return Promise.resolve({
      id,
      propertyId: "mock-property-id",
      message: "Mock inquiry message",
      status: "Pending",
      createdAt: new Date().toISOString(),
    });

    // TODO: Uncomment when backend is ready
    // return apiClient.get<any>(`/inquiries/${id}`);
  },

  async updateInquiry(id: string, data: any): Promise<any> {
    // For now, just simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "Inquiry updated successfully" });
      }, 1000);
    });

    // TODO: Uncomment when backend is ready
    // return apiClient.put<any>(`/inquiries/${id}`, data);
  },

  async deleteInquiry(id: string): Promise<void> {
    // For now, just simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });

    // TODO: Uncomment when backend is ready
    // return apiClient.delete<void>(`/inquiries/${id}`);
  },
};
