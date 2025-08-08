import axios from "axios";
import type { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "../utils/constants";
import type { ApiError } from "../types/api";

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("accessToken");
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
        // Обработка кодов перенаправления
        if (
          error.response?.status &&
          error.response.status >= 300 &&
          error.response.status < 400
        ) {
          console.log(
            `Redirect detected: ${error.response.status} - ${error.response.statusText}`
          );
          console.log("Location header:", error.response.headers.location);

          // Можно обработать перенаправление вручную
          if (error.response.headers.location) {
            // Выполнить запрос по новому URL
            const redirectUrl = error.response.headers.location;
            console.log("Redirecting to:", redirectUrl);
          }
        }

        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, params?: any): Promise<T> {
    try {
      const response = await this.client.get<T>(url, { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  public async post<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.post<T>(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error as AxiosError);
    }
  }

  public async put<T>(url: string, data?: any): Promise<T> {
    try {
      const response = await this.client.put<T>(url, data);
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
      return {
        message: (error.response.data as any)?.message || "An error occurred",
        statusCode: error.response.status,
        errors: (error.response.data as any)?.errors,
      };
    } else if (error.request) {
      return {
        message: "Network error. Please check your connection.",
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
