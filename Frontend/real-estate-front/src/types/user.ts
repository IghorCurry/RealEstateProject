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
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
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

export interface UserRegister extends UserCreate {
  confirmPassword: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface UserProfile {
  user: User;
  properties: Property[];
  sentInquiries: Inquiry[];
  receivedInquiries: Inquiry[];
  favoriteProperties: Property[];
} 