export enum PropertyType {
  House = 1,
  Apartment = 2,
  Condo = 3,
  Townhouse = 4,
  Villa = 5,
  Land = 6,
  Commercial = 7
}

export enum PropertyStatus {
  Available = 1,
  UnderContract = 2,
  Sold = 3,
  Rented = 4
}

export enum Location {
  Kyiv = 1,
  Lviv = 2,
  Kharkiv = 3,
  Odesa = 4,
  Dnipro = 5
}

export interface PropertyImage {
  id: string;
  imageUrl: string;
  propertyId: string;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: Location;
  propertyType: PropertyType;
  propertyStatus: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  userName: string;
  imageUrls: string[];
  isFavoritedByCurrentUser?: boolean;
}

export interface PropertyCreate {
  title: string;
  description: string;
  price: number;
  address: string;
  city: Location;
  propertyType: PropertyType;
  propertyStatus: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  area: number;
}

export interface PropertyUpdate extends Partial<PropertyCreate> {
  id: string;
}

export interface PropertyFilter {
  city?: Location;
  propertyType?: PropertyType;
  propertyStatus?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minArea?: number;
  maxArea?: number;
  search?: string;
} 