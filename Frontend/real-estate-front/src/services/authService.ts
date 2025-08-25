import { apiClient } from "./api";
import { API_ENDPOINTS } from "../utils/constants";
import type {
  UserLogin,
  UserRegister,
  AuthResponse,
  User,
} from "../types/user";
import { cleanupLocalStorage } from "../utils/cleanup";

// Виконуємо очистку при завантаженні модуля тільки один раз
if (typeof window !== "undefined") {
  cleanupLocalStorage();
}

export const authService = {
  // Публічний метод для очистки некорректних даних
  cleanupStorage(): void {
    cleanupLocalStorage();
  },

  async login(credentials: UserLogin): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  },

  async refreshToken(): Promise<AuthResponse> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Перевіряємо чи не закінчився термін дії refresh токена
      const refreshTokenExpiry = localStorage.getItem("refreshTokenExpiresAt");
      if (refreshTokenExpiry) {
        const expiryDate = new Date(refreshTokenExpiry);
        const now = new Date();

        if (now >= expiryDate) {
          this.logout();
          throw new Error("Refresh token expired");
        }
      }

      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REFRESH,
        { refreshToken }
      );
      this.setAuthData(response);
      return response;
    } catch (error) {
      console.error("Token refresh failed:", error);
      // Якщо refresh не вдався, очищаємо дані аутентифікації
      this.logout();
      throw error;
    }
  },

  async register(userData: UserRegister): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        userData
      );
      return response;
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      // Спробуємо викликати logout endpoint
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
        } catch {
          // Logout API call failed, but continuing with local cleanup
        }
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      // Завжди очищаємо локальні дані
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("accessTokenExpiresAt");
      localStorage.removeItem("refreshTokenExpiresAt");

      // Очищаємо будь-які некорректні дані
      if (
        localStorage.getItem("user") === "undefined" ||
        localStorage.getItem("user") === "null"
      ) {
        localStorage.removeItem("user");
      }
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      // Перевіряємо чи не закінчився термін дії токена перед запитом
      const tokenExpiry = localStorage.getItem("accessTokenExpiresAt");
      if (tokenExpiry) {
        const expiryDate = new Date(tokenExpiry);
        const now = new Date();

        if (now >= expiryDate) {
          const refreshResponse = await this.refreshToken();
          return refreshResponse.user;
        }
      }

      // Спробуємо отримати користувача з бекенду
      return await apiClient.get<User>(API_ENDPOINTS.USER.CURRENT);
    } catch (error) {
      console.error("Error getting current user from API:", error);
      // Fallback до збережених даних користувача
      const storedUser = this.getStoredUser();
      if (!storedUser) {
        throw new Error("User not authenticated");
      }
      return Promise.resolve(storedUser);
    }
  },

  isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");
      const tokenExpiry = localStorage.getItem("accessTokenExpiresAt");

      if (
        !token ||
        token === "undefined" ||
        token === "null" ||
        !user ||
        user === "undefined" ||
        user === "null"
      ) {
        return false;
      }

      // Перевіряємо термін дії токена
      if (tokenExpiry) {
        const expiryDate = new Date(tokenExpiry);
        const now = new Date();

        if (now >= expiryDate) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error checking authentication:", error);
      return false;
    }
  },

  getStoredUser(): User | null {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr || userStr === "undefined" || userStr === "null") {
        return null;
      }
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        // Очищаємо некорректні дані
        localStorage.removeItem("user");
        return null;
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      return null;
    }
  },

  setAuthData(authResponse: AuthResponse): void {
    try {
      if (authResponse.accessToken) {
        localStorage.setItem("accessToken", authResponse.accessToken);
      }
      if (authResponse.refreshToken) {
        localStorage.setItem("refreshToken", authResponse.refreshToken);
      }
      if (authResponse.user) {
        localStorage.setItem("user", JSON.stringify(authResponse.user));
      }
      if (authResponse.expiresIn) {
        // Розраховуємо термін дії токена
        const expiresAt = new Date(Date.now() + authResponse.expiresIn * 1000);
        localStorage.setItem("accessTokenExpiresAt", expiresAt.toISOString());
      }
      // Для refresh token використовуємо довший термін (наприклад, 30 днів)
      const refreshExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      localStorage.setItem(
        "refreshTokenExpiresAt",
        refreshExpiresAt.toISOString()
      );
    } catch (error) {
      console.error("Error setting auth data:", error);
    }
  },

  isAdmin(): boolean {
    try {
      const user = this.getStoredUser();
      const isAdminUser = user?.role === "Admin";
      return isAdminUser;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  },
};
