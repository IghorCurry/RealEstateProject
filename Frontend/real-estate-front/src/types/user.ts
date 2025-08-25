export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  createdAt: string;
  updatedAt?: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string; 
}

export interface UserUpdate {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
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
  expiresIn: number;
  user: User;
}

