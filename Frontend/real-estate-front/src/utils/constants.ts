// Автоматичне визначення API URL залежно від середовища
const getApiUrl = () => {
  // Якщо є змінна середовища - використовуємо її
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // Якщо розробка - локальний сервер
  if (import.meta.env.DEV) {
    return "http://localhost:5158/api";
  }

  // Якщо production - Azure
  return "https://real-estate-api-ig25-eahbg3dwgwemfjej.northeurope-01.azurewebsites.net/api";
};

export const API_BASE_URL = getApiUrl();

// Логування для відстеження
console.log(`🚀 Frontend connecting to: ${API_BASE_URL}`);
console.log(`🌍 Environment: ${import.meta.env.MODE}`);
console.log(`🔧 Development mode: ${import.meta.env.DEV}`);

// API endpoints with correct capitalization matching backend
export const API_ENDPOINTS = {
  // Authentication endpoints
  AUTH: {
    LOGIN: "/Auth/login",
    REGISTER: "/Auth/register",
    REFRESH: "/Auth/refresh",
    LOGOUT: "/Auth/logout",
    VALIDATE_TOKEN: "/Auth/validate-token",
  },

  // Property endpoints
  PROPERTY: {
    ALL: "/Property",
    SEARCH: "/Property/search",
    BY_ID: "/Property/:id",
    BY_TYPE: "/Property/by-type/:propertyType",
    BY_LOCATION: "/Property/by-location/:location",
    BY_STATUS: "/Property/by-status/:status",
    BY_USER: "/Property/user/:userId",
    CREATE: "/Property",
    UPDATE: "/Property", // Виправлено: без ID в URL згідно з API документацією
    DELETE: "/Property/:id",
  },

  // Property images endpoints
  PROPERTY_IMAGES: {
    UPLOAD: "/Property/:propertyId/images",
    GET: "/Property/:propertyId/images",
    DELETE: "/Property/:propertyId/images/:imageId",
    REORDER: "/Property/:propertyId/images/reorder",
  },

  // User endpoints
  USER: {
    CURRENT: "/User/current",
    ALL: "/User",
    BY_ID: "/User/:id",
  },

  // Inquiry endpoints
  INQUIRY: {
    ALL: "/Inquiry",
    BY_ID: "/Inquiry/:id",
    USER: "/Inquiry/user",
    BY_USER: "/Inquiry/by-user/:userId",
    BY_PROPERTY: "/Inquiry/by-property/:propertyId",
    CREATE: "/Inquiry",
    UPDATE: "/Inquiry/:id",
    DELETE: "/Inquiry/:id",
  },

  // Favorite endpoints - згідно з backend контролером
  FAVORITE: {
    ALL: "/Favorite/user/:userId", // GET /api/Favorite/user/{userId} - отримання улюблених користувача
    CHECK: "/Favorite/check/:userId/:propertyId", // GET /api/Favorite/check/{userId}/{propertyId}
    ADD: "/Favorite", // POST /api/Favorite
    REMOVE: "/Favorite/:userId/:propertyId", // DELETE /api/Favorite/{userId}/{propertyId}
  },
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  PROPERTIES: "/properties",
  PROPERTY_DETAIL: "/properties/:id",
  CREATE_PROPERTY: "/properties/create",
  EDIT_PROPERTY: "/properties/:id/edit",
  PROFILE: "/profile",
  FAVORITES: "/favorites",
  INQUIRIES: "/inquiries",
  ADMIN: "/admin",
  ABOUT: "/about",
  FAQ: "/faq",
  DEVELOPER: "/developer",
} as const;

export const USER_ROLES = {
  ADMIN: "Admin",
  USER: "User",
} as const;

export const INQUIRY_STATUSES = {
  PENDING: "Pending",
  RESPONDED: "Responded",
  CLOSED: "Closed",
} as const;

// API configuration constants
export const API_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES_PER_PROPERTY: 20,
  SUPPORTED_IMAGE_TYPES: [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
    "image/webp",
  ],
  SUPPORTED_IMAGE_EXTENSIONS: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
} as const;

// React Query cache time constants
export const CACHE_TIMES = {
  PROPERTIES: 2 * 60 * 1000, // 2 minutes
  PROPERTY_DETAIL: 5 * 60 * 1000, // 5 minutes
  USER_DATA: 10 * 60 * 1000, // 10 minutes
  FAVORITES: 3 * 60 * 1000, // 3 minutes
  INQUIRIES: 5 * 60 * 1000, // 5 minutes
  GARBAGE_COLLECTION: 15 * 60 * 1000, // 15 minutes
} as const;
