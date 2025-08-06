import { apiClient } from './api';
import type { Property, PropertyCreate, PropertyUpdate, PropertyFilter } from '../types/property';

export const propertyService = {
  async getAll(): Promise<Property[]> {
    return apiClient.get<Property[]>('/properties/get-all');
  },

  async getById(id: string): Promise<Property> {
    return apiClient.get<Property>(`/properties/${id}`);
  },

  async create(property: PropertyCreate): Promise<Property> {
    return apiClient.post<Property>('/properties', property);
  },

  async update(id: string, property: PropertyUpdate): Promise<Property> {
    return apiClient.put<Property>(`/properties/${id}`, property);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/properties/${id}`);
  },

  async search(filters: PropertyFilter): Promise<Property[]> {
    return apiClient.get<Property[]>('/properties/search', filters);
  },

  async getByUserId(userId: string): Promise<Property[]> {
    return apiClient.get<Property[]>(`/properties/user/${userId}`);
  },
}; 