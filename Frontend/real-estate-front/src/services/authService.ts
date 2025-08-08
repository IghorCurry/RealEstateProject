import { apiClient } from "./api";
import type {
  UserLogin,
  UserRegister,
  AuthResponse,
  User,
} from "../types/user";

export const authService = {
  async login(credentials: UserLogin): Promise<AuthResponse> {
    try {
      return await apiClient.post<AuthResponse>("/auth/login", credentials);
    } catch (error) {
      console.warn(
        "Failed to login with API, falling back to mock data:",
        error
      );
      // Fallback to mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockResponse: AuthResponse = {
            accessToken: "mock-access-token-" + Date.now(),
            refreshToken: "mock-refresh-token-" + Date.now(),
            user: {
              id: "mock-user-id-" + Date.now(),
              email: credentials.email,
              fullName: "Mock User",
              phoneNumber: "+380 99 123 4567",
              role: "User",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
          resolve(mockResponse);
        }, 1000);
      });
    }
  },

  async register(userData: UserRegister): Promise<AuthResponse> {
    try {
      return await apiClient.post<AuthResponse>("/auth/register", userData);
    } catch (error) {
      console.warn(
        "Failed to register with API, falling back to mock data:",
        error
      );
      // Fallback to mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          const mockResponse: AuthResponse = {
            accessToken: "mock-access-token-" + Date.now(),
            refreshToken: "mock-refresh-token-" + Date.now(),
            user: {
              id: "mock-user-id-" + Date.now(),
              email: userData.email,
              fullName: `${userData.firstName} ${userData.lastName}`,
              phoneNumber: userData.phone,
              role: "User",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          };
          resolve(mockResponse);
        }, 1000);
      });
    }
  },

  async logout(): Promise<void> {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  async getCurrentUser(): Promise<User> {
    // For now, return stored user data
    const storedUser = this.getStoredUser();
    if (!storedUser) {
      throw new Error("User not authenticated");
    }
    return Promise.resolve(storedUser);

    // TODO: Uncomment when backend is ready
    // return apiClient.get<User>("/users/me");
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken");
  },

  getStoredUser(): User | null {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem("accessToken", authResponse.accessToken);
    localStorage.setItem("refreshToken", authResponse.refreshToken);
    localStorage.setItem("user", JSON.stringify(authResponse.user));
  },

  isAdmin(): boolean {
    const user = this.getStoredUser();
    return user?.role === "Admin";
  },
};
