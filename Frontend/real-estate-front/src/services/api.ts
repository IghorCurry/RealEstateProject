import axios from "axios";
import type {
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
} from "axios";
import { API_BASE_URL, API_CONFIG } from "../utils/constants";
import type { ApiError, QueueItem } from "../types/api";
import { authService } from "./authService";
import { storageService } from "./storageService";

class ApiClient {
  private client: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: QueueItem[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_CONFIG.TIMEOUT, // Using constant from config
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });

    this.setupInterceptors();
  }

  private processQueue(error: unknown, token: string | null = null) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = storageService.getAccessToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && originalRequest) {
          if (this.isRefreshing) {
            // If already refreshing, add to queue
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.client.request(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest.headers = originalRequest.headers || {};
          this.isRefreshing = true;

          try {
            const refreshToken = storageService.getRefreshToken();
            if (refreshToken) {
              const newTokens = await authService.refreshToken();

              // Update the failed queue
              this.processQueue(null, newTokens.accessToken);

              // Retry the original request
              originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
              return this.client.request(originalRequest);
            } else {
              throw new Error("No refresh token available");
            }
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            this.processQueue(refreshError, null);

            // Clear auth data and redirect to login for protected routes
            try {
              const currentPath = window.location.pathname;
              const protectedRoutes = [
                "/profile",
                "/properties/create",
                "/properties/edit",
                "/admin",
                "/favorites",
                "/inquiries",
              ];

              if (
                protectedRoutes.some((route) => currentPath.includes(route))
              ) {
                authService.logout();
                // Використовуємо window.location для надійного перенаправлення
                window.location.href = "/login";
              }
            } catch (logoutError) {
              console.error("Error during logout:", logoutError);
            }

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public async get<T>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  public async delete<T>(url: string): Promise<T> {
    try {
      const response = await this.client.delete<T>(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      const statusCode = error.response.status;
      const responseData = error.response.data as Record<string, unknown>;

      // Handle specific error cases
      if (statusCode === 404) {
        return {
          message: "Resource not found",
          statusCode,
          errors: responseData?.errors as
            | string[]
            | Record<string, string[]>
            | undefined,
        };
      }

      if (statusCode === 403) {
        return {
          message:
            "Access denied. You don't have permission to perform this action.",
          statusCode,
          errors: responseData?.errors as
            | string[]
            | Record<string, string[]>
            | undefined,
        };
      }

      if (statusCode === 422) {
        return {
          message: "Validation error. Please check your input.",
          statusCode,
          errors: responseData?.errors,
        };
      }

      if (statusCode >= 500) {
        return {
          message: "Server error. Please try again later.",
          statusCode,
          errors: responseData?.errors as
            | string[]
            | Record<string, string[]>
            | undefined,
        };
      }

      return {
        message:
          responseData?.message || `Request failed with status ${statusCode}`,
        statusCode,
        errors: responseData?.errors,
      };
    } else if (error.request) {
      return {
        message: "Network error. Please check your connection and try again.",
        statusCode: 0,
      };
    } else {
      return {
        message: error.message || "An unexpected error occurred",
        statusCode: 0,
      };
    }
  }
}

export const apiClient = new ApiClient();
