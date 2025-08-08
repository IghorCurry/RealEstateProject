export interface Inquiry {
  id: string;
  propertyId: string;
  userId: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  property?: any; // Property type will be imported when needed
  user?: any; // User type will be imported when needed
}

export interface InquiryCreate {
  propertyId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface InquiryUpdate {
  id: string;
  message?: string;
  status?: string;
} 