export interface Inquiry {
  id: string;
  propertyId: string;
  userId: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  property?: Property;
  user?: User;
}

export interface InquiryCreate {
  propertyId: string;
  message: string;
}

export interface InquiryUpdate {
  id: string;
  message?: string;
  status?: string;
} 