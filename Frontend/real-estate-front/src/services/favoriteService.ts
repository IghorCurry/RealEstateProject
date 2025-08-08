import { apiClient } from "./api";
import type { FavoriteCreate } from "../types/favorite";

export const favoriteService = {
  async getFavorites(): Promise<any[]> {
    return apiClient.get<any[]>("/favorites");
  },

  async addToFavorites(propertyId: string): Promise<any> {
    const favoriteData: FavoriteCreate = { propertyId };
    return apiClient.post<any>("/favorites", favoriteData);
  },

  async removeFromFavorites(propertyId: string): Promise<void> {
    return apiClient.delete<void>(`/favorites/${propertyId}`);
  },

  async toggleFavorite(propertyId: string): Promise<void> {
    try {
      // Try to add first, if it fails (already exists), then remove
      await this.addToFavorites(propertyId);
    } catch (error: any) {
      if (error.statusCode === 400) {
        // Property is already in favorites, remove it
        await this.removeFromFavorites(propertyId);
      } else {
        throw error;
      }
    }
  },

  async isFavorite(propertyId: string): Promise<boolean> {
    try {
      const favorites = await this.getFavorites();
      return favorites.some((fav) => fav.propertyId === propertyId);
    } catch (error) {
      return false;
    }
  },
};
