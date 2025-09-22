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
  propertyId?: string;
  userId?: string;
  property?: Property;
  user?: User;

  propertyTitle?: string;
  propertyOwnerId?: string;
  propertyOwnerName?: string;
  senderName?: string;
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
