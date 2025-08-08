export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  property?: any; // Property type will be imported when needed
}

export interface FavoriteCreate {
  propertyId: string;
} 