import { apiClient } from "./api";
import type {
  Property,
  PropertyCreate,
  PropertyUpdate,
  PropertyFilter,
} from "../types/property";
import { PropertyType, PropertyStatus, Location } from "../types/property";

// Mock data for testing
const mockProperties: Property[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Сучасна квартира в центрі міста",
    description:
      "Розкішна 3-кімнатна квартира з ремонтом, меблями та технікою. Ідеальне розташування, поруч метро, магазини, ресторани.",
    price: 85000,
    address: "вул. Хрещатик, 15, Київ",
    city: Location.Kyiv,
    propertyType: PropertyType.Apartment,
    propertyStatus: PropertyStatus.Available,
    bedrooms: 3,
    bathrooms: 2,
    area: 85.5,
    yearBuilt: 2015,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
    userId: "cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae",
    userName: "Admin User",
    imageUrls: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    isFavoritedByCurrentUser: false,
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f23456789012",
    title: "Затишний будинок з садом",
    description:
      "Двоповерховий будинок з великим садом та гаражем. Тиха вулиця, зелена зона, ідеально для сім'ї.",
    price: 250000,
    address: "вул. Садова, 42, Буча",
    city: Location.Kyiv,
    propertyType: PropertyType.House,
    propertyStatus: PropertyStatus.Available,
    bedrooms: 4,
    bathrooms: 3,
    area: 180.0,
    yearBuilt: 2010,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-10T10:00:00Z",
    userId: "e2403a4f-0d12-4555-bf66-7338cd13ff3e",
    userName: "John Doe",
    imageUrls: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    isFavoritedByCurrentUser: true,
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-345678901234",
    title: "Студія для молодих",
    description:
      "Компактна студія з сучасним ремонтом. Ідеально для молодих людей або студентів. Розумна ціна.",
    price: 35000,
    address: "вул. Студентська, 8, Київ",
    city: Location.Kyiv,
    propertyType: PropertyType.Apartment,
    propertyStatus: PropertyStatus.Available,
    bedrooms: 1,
    bathrooms: 1,
    area: 35.0,
    yearBuilt: 2020,
    createdAt: "2024-01-05T10:00:00Z",
    updatedAt: "2024-01-05T10:00:00Z",
    userId: "d7e228e1-4c36-4ead-8bc1-622bb13140d2",
    userName: "Jane Smith",
    imageUrls: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    isFavoritedByCurrentUser: false,
  },
  {
    id: "d4e5f6a7-b8c9-0123-def4-567890123456",
    title: "Пентхаус з панорамним видом",
    description:
      "Розкішний пентхаус на останньому поверсі з панорамним видом на місто. Елітний район, найкраща інфраструктура.",
    price: 500000,
    address: "вул. Печерська, 25, Київ",
    city: Location.Kyiv,
    propertyType: PropertyType.Apartment,
    propertyStatus: PropertyStatus.Available,
    bedrooms: 3,
    bathrooms: 2,
    area: 120.0,
    yearBuilt: 2018,
    createdAt: "2024-01-01T10:00:00Z",
    updatedAt: "2024-01-01T10:00:00Z",
    userId: "cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae",
    userName: "Admin User",
    imageUrls: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    isFavoritedByCurrentUser: false,
  },
  {
    id: "e5f6a7b8-c9d0-1234-ef56-789012345678",
    title: "Квартира у Львові",
    description:
      "Гарна 2-кімнатна квартира в історичному центрі Львова. Поруч парки, музеї, кафе.",
    price: 120000,
    address: "вул. Ринок, 15, Львів",
    city: Location.Lviv,
    propertyType: PropertyType.Apartment,
    propertyStatus: PropertyStatus.Available,
    bedrooms: 2,
    bathrooms: 1,
    area: 65.0,
    yearBuilt: 2012,
    createdAt: "2023-12-25T10:00:00Z",
    updatedAt: "2023-12-25T10:00:00Z",
    userId: "e2403a4f-0d12-4555-bf66-7338cd13ff3e",
    userName: "John Doe",
    imageUrls: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    isFavoritedByCurrentUser: true,
  },
  {
    id: "f6a7b8c9-d0e1-2345-f678-901234567890",
    title: "Вілла в Одесі",
    description:
      "Розкішна вілла з видом на море. Приватний пляж, басейн, сад. Ідеально для відпочинку.",
    price: 750000,
    address: "вул. Морська, 100, Одеса",
    city: Location.Odesa,
    propertyType: PropertyType.Villa,
    propertyStatus: PropertyStatus.Available,
    bedrooms: 5,
    bathrooms: 4,
    area: 300.0,
    yearBuilt: 2019,
    createdAt: "2023-12-20T10:00:00Z",
    updatedAt: "2023-12-20T10:00:00Z",
    userId: "d7e228e1-4c36-4ead-8bc1-622bb13140d2",
    userName: "Jane Smith",
    imageUrls: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    isFavoritedByCurrentUser: false,
  },
];

// Helper function to filter properties
const filterProperties = (
  properties: Property[],
  filters: PropertyFilter
): Property[] => {
  return properties.filter((property) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        property.title.toLowerCase().includes(searchLower) ||
        property.description.toLowerCase().includes(searchLower) ||
        property.address.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Property type filter
    if (
      filters.propertyType &&
      property.propertyType !== filters.propertyType
    ) {
      return false;
    }

    // City filter
    if (filters.city && property.city !== filters.city) {
      return false;
    }

    // Status filter
    if (
      filters.propertyStatus &&
      property.propertyStatus !== filters.propertyStatus
    ) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }

    // Area range filter
    if (filters.minArea && property.area < filters.minArea) {
      return false;
    }
    if (filters.maxArea && property.area > filters.maxArea) {
      return false;
    }

    // Bedrooms filter
    if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) {
      return false;
    }

    return true;
  });
};

export const propertyService = {
  async getAll(): Promise<Property[]> {
    try {
      return await apiClient.get<Property[]>("/property/get-all");
    } catch (error) {
      console.warn(
        "Failed to fetch properties from API, falling back to mock data:",
        error
      );
      return Promise.resolve(mockProperties);
    }
  },

  async getById(id: string): Promise<Property> {
    try {
      return await apiClient.get<Property>(`/property/${id}`);
    } catch (error) {
      console.warn(
        "Failed to fetch property from API, falling back to mock data:",
        error
      );
      const property = mockProperties.find((p) => p.id === id);
      if (!property) {
        throw new Error("Property not found");
      }
      return Promise.resolve(property);
    }
  },

  async create(property: PropertyCreate): Promise<Property> {
    return apiClient.post<Property>("/property", property);
  },

  async update(id: string, property: PropertyUpdate): Promise<Property> {
    return apiClient.put<Property>(`/property/${id}`, property);
  },

  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/property/${id}`);
  },

  async search(filters: PropertyFilter): Promise<Property[]> {
    try {
      return await apiClient.get<Property[]>("/property/search", filters);
    } catch (error) {
      console.warn(
        "Failed to search properties from API, falling back to mock data:",
        error
      );
      const filteredProperties = filterProperties(mockProperties, filters);
      return Promise.resolve(filteredProperties);
    }
  },

  async getByUserId(userId: string): Promise<Property[]> {
    try {
      return await apiClient.get<Property[]>(`/property/user/${userId}`);
    } catch (error) {
      console.warn(
        "Failed to fetch user properties from API, falling back to mock data:",
        error
      );
      const userProperties = mockProperties.filter((p) => p.userId === userId);
      return Promise.resolve(userProperties);
    }
  },
};
