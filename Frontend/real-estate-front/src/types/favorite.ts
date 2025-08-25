import type { Property } from "./property";

/**
 * Favorite entity interface
 */
export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  property?: Property; // Associated property data
}

/**
 * Data structure for creating a new favorite
 */
export interface FavoriteCreate {
  userId: string;
  propertyId: string;
}

// FavoriteCountResponse видалено - не підтримується API
