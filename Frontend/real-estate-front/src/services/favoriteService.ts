import { apiClient } from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import { buildApiUrl, isUserAuthenticated } from "../utils/apiHelpers";
import type { FavoriteCreate, Favorite } from "../types/favorite";
import type { Property } from "../types/property";

// Функція для отримання userId з токена
const getCurrentUserId = (): string => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("No access token found");
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.nameid || payload.sub;
  } catch {
    throw new Error("Invalid token format");
  }
};

export const favoriteService = {
  /**
   * Get all favorites (admin only)
   */
  async getFavorites(): Promise<Favorite[]> {
    try {
      return await apiClient.get<Favorite[]>(API_ENDPOINTS.FAVORITE.ALL);
    } catch (error) {
      console.error("Failed to get favorites:", error);
      throw error;
    }
  },

  /**
   * Get current user's favorites
   * Згідно з backend контролером: GET /api/Favorite/user/{userId}
   */
  async getUserFavorites(): Promise<Property[]> {
    try {
      if (!isUserAuthenticated()) {
        throw new Error("User not authenticated");
      }

      const userId = getCurrentUserId();
      const url = buildApiUrl(API_ENDPOINTS.FAVORITE.ALL, { userId });
      return await apiClient.get<Property[]>(url);
    } catch (error) {
      console.error("Failed to get user favorites:", error);
      throw error;
    }
  },

  /**
   * Add property to favorites
   */
  async addToFavorites(propertyId: string): Promise<Favorite> {
    try {
      if (!isUserAuthenticated()) {
        throw new Error("User not authenticated");
      }

      const userId = getCurrentUserId();
      const favoriteData: FavoriteCreate = { userId, propertyId };
      return await apiClient.post<Favorite>(
        API_ENDPOINTS.FAVORITE.ADD,
        favoriteData
      );
    } catch (error) {
      console.error("Failed to add to favorites:", error);
      throw error;
    }
  },

  /**
   * Remove property from favorites
   */
  async removeFromFavorites(propertyId: string): Promise<void> {
    try {
      if (!isUserAuthenticated()) {
        throw new Error("User not authenticated");
      }

      const userId = getCurrentUserId();
      const url = buildApiUrl(API_ENDPOINTS.FAVORITE.REMOVE, {
        userId,
        propertyId,
      });
      return await apiClient.delete<void>(url);
    } catch (error) {
      console.error("Failed to remove from favorites:", error);
      throw error;
    }
  },

  /**
   * Toggle favorite status (add if not exists, remove if exists)
   * Спрощена логіка з використанням isFavorite
   */
  async toggleFavorite(propertyId: string): Promise<void> {
    try {
      const isCurrentlyFavorite = await this.isFavorite(propertyId);

      if (isCurrentlyFavorite) {
        await this.removeFromFavorites(propertyId);
      } else {
        await this.addToFavorites(propertyId);
      }
    } catch (error) {
      console.error("Failed to toggle favorite status:", error);
      throw error;
    }
  },

  /**
   * Check if property is in user's favorites
   */
  async isFavorite(propertyId: string): Promise<boolean> {
    try {
      if (!isUserAuthenticated()) {
        return false;
      }

      const userId = getCurrentUserId();
      const url = buildApiUrl(API_ENDPOINTS.FAVORITE.CHECK, {
        userId,
        propertyId,
      });
      const response = await apiClient.get<{ isFavorite: boolean }>(url);
      return response.isFavorite;
    } catch (error) {
      console.error("Failed to check favorite status:", error);
      return false;
    }
  },

  // Метод getFavoriteCount видалено - не підтримується API
};
