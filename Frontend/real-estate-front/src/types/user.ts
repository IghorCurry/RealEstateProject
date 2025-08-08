export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

export interface UserUpdate {
  id: string;
  email?: string;
  fullName?: string;
  phoneNumber?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export type UserRegister = UserCreate;

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface UserProfile {
  user: User;
  properties: any[]; // Property type will be imported when needed
  sentInquiries: any[]; // Inquiry type will be imported when needed
  receivedInquiries: any[]; // Inquiry type will be imported when needed
  favoriteProperties: any[]; // Property type will be imported when needed
}
