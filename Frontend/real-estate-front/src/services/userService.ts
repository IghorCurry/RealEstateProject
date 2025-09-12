import { apiClient } from "./api";
import type { User, UserUpdate } from "../types/user";

export const userService = {
  async getCurrentUser(): Promise<User> {
    try {
      return await apiClient.get<User>("/User/me");
    } catch (error) {
      console.error("Failed to get current user:", error);
      throw error;
    }
  },

  async updateProfile(userData: UserUpdate): Promise<User> {
    try {
      return await apiClient.put<User>("/User/profile", userData);
    } catch (error) {
      console.error("Failed to update profile:", error);
      throw error;
    }
  },

  async getUserById(id: string): Promise<User> {
    try {
      return await apiClient.get<User>(`/User/${id}`);
    } catch (error) {
      console.error("Failed to get user by ID:", error);
      throw error;
    }
  },

  async getAll(): Promise<User[]> {
    try {
      return await apiClient.get<User[]>("/User");
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  },
};
