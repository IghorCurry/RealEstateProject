import type { Property } from "./property";
import type { User } from "./user";

/**
 * Inquiry entity interface - відповідає API документації
 */
export interface Inquiry {
  id: string;
  message: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  propertyId?: string; // Опціональне поле
  userId?: string; // Опціональне поле
  property?: Property; // Associated property data
  user?: User; // Associated user data
}

/**
 * Inquiry status enum - відповідає бекенду
 */
export const InquiryStatus = {
  PENDING: "Pending",
  RESPONDED: "Responded",
  CLOSED: "Closed",
} as const;

export type InquiryStatus = (typeof InquiryStatus)[keyof typeof InquiryStatus];

/**
 * Data structure for creating a new inquiry - відповідає API документації
 */
export interface InquiryCreate {
  propertyId: string;
  message: string;
  name?: string; // Для анонімних користувачів
  email?: string; // Для анонімних користувачів
  phone?: string; // Для анонімних користувачів
}

/**
 * Data structure for updating an inquiry
 */
export interface InquiryUpdate {
  id: string;
  message?: string;
  status?: InquiryStatus;
} 