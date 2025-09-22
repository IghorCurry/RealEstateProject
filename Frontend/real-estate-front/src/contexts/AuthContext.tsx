/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";
import type { User, AuthResponse, UserCreate } from "../types/user";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: UserCreate) => Promise<void>;
  logout: () => void;
  updateUser: (updatedUser: User) => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Validation functions
  const validateStoredUser = (storedUser: User | null): boolean => {
    if (
      !storedUser ||
      !storedUser.id ||
      !storedUser.email ||
      !storedUser.firstName ||
      !storedUser.lastName
    ) {
      return false;
    }
    return true;
  };

  const validateUpdatedUser = (updatedUser: User): boolean => {
    if (
      !updatedUser.id ||
      !updatedUser.email ||
      !updatedUser.firstName ||
      !updatedUser.lastName
    ) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const storedUser = authService.getStoredUser();
          if (storedUser && validateStoredUser(storedUser)) {
            setUser(storedUser);
          } else {
            // Валідуємо дані користувача
            if (!validateStoredUser(storedUser)) {
              authService.logout();
              setUser(null);
            }
          }
        }
      } catch {
        authService.logout();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response: AuthResponse = await authService.login({ email, password });
    authService.setAuthData(response);
    setUser(response.user);
  };

  const register = async (userData: UserCreate) => {
    const response: AuthResponse = await authService.register(userData);
    authService.setAuthData(response);
    setUser(response.user);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    try {
      // Валідуємо оновлені дані
      if (!validateUpdatedUser(updatedUser)) {
        throw new Error("Invalid user data");
      }
      setUser(updatedUser);
      // Оновлюємо дані в localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isAdmin: user?.role === "Admin",
    login,
    register,
    logout,
    updateUser,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
