// Експорт всіх типів з одного місця для кращої організації

// API типи
export type { ApiError, QueueItem } from "./api";

// Auth та User типи
export type { 
  User, 
  UserCreate, 
  UserUpdate, 
  AuthResponse, 
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse 
} from "./user";

// Property типи
export type {
  Property,
  PropertyDetailed,
  PropertyCreate,
  PropertyUpdate,
  PropertyFilter,
  PropertyImage,
  Inquiry,
  PropertyType,
  PropertyStatus,
  Location,
} from "./property";

// Favorite типи
export type { Favorite, FavoriteCreate } from "./favorite";

// Inquiry типи
export type { InquiryCreate, InquiryUpdate } from "./inquiry";

// Спільні типи для форм
export type { PropertyFormData } from "../utils/validationSchemas";

// Розширені типи для роботи з файлами
export type PropertyImageWithFile = PropertyImage & { file?: File };
