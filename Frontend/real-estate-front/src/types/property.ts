export const PropertyType = {
  House: 1,
  Apartment: 2,
  Condo: 3,
  Townhouse: 4,
  Villa: 5,
  Land: 6,
  Commercial: 7,
} as const;

// Updated PropertyStatus to match backend API documentation
export const PropertyStatus = {
  Available: 1,
  Sold: 2, // Changed from UnderContract
  Rented: 3, // Changed from Sold
  UnderContract: 4, // Changed from Rented
} as const;

export const Location = {
  Downtown: 1,
  Suburban: 2,
  Rural: 3,
  Beachfront: 4,
  Mountain: 5,
  Urban: 6,
} as const;

export type PropertyType = (typeof PropertyType)[keyof typeof PropertyType];
export type PropertyStatus =
  (typeof PropertyStatus)[keyof typeof PropertyStatus];
export type Location = (typeof Location)[keyof typeof Location];

export interface PropertyImage {
  id: string;
  imageUrl: string;
  order: number; // Added order field to match backend API
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  location: Location;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  features: string[];
  createdAt: string;
  userId: string; // Обов'язкове - виправлено в бекенді
  userName: string;
  images?: PropertyImage[]; // Додаємо зображення для списку
}

export interface PropertyDetailed extends Property {
  images: PropertyImage[]; // Всі зображення для деталей
  inquiries?: Inquiry[]; // Запити (якщо потрібно)
  isFavoritedByCurrentUser?: boolean;
  updatedAt?: string; // Дата останнього оновлення
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    role: string;
    createdAt: string;
  };
}

export interface Inquiry {
  id: string;
  message: string;
  propertyId: string;
  userId?: string;
  name?: string;
  email?: string;
  phone?: string;
  createdAt: string;
}

export interface PropertyCreate {
  title: string;
  description: string;
  price: number;
  address: string;
  location: Location;
  propertyType: PropertyType;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  features: string[];
  images?: File[]; // For file uploads
  imageUrls?: string[]; // For existing URLs
}

export interface PropertyUpdate {
  id: string;
  userId?: string; // Додано для сумісності з бекендом
  title?: string;
  description?: string;
  price?: number;
  address?: string;
  location?: Location;
  propertyType?: PropertyType;
  status?: PropertyStatus;
  bedrooms?: number;
  bathrooms?: number;
  squareMeters?: number;
  features?: string[];
  images?: File[] | null;
  imageUrls?: string[] | null;
  imagesToDelete?: string[] | null;
}

export interface PropertyFilter {
  location?: Location;
  propertyType?: PropertyType;
  status?: PropertyStatus;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  maxBedrooms?: number;
  minSquareMeters?: number;
  maxSquareMeters?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}
