export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]> | string[];
}

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Paginated response structure matching backend API
 * Based on API documentation: https://github.com/your-repo/API_DOCUMENTATION.md
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number; // Changed from pageNumber to match backend
  pageSize: number;
  totalPages: number;
}

/**
 * Pagination parameters for API requests
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

/**
 * Pagination state for UI components
 */
export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number; // Відповідає AuthResponse структурі
  user: import("./user").User;
}

export interface QueueItem {
  resolve: (value?: unknown) => void;
  reject: (error?: unknown) => void;
}

export interface ApiRequestConfig {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  timeout?: number;
}

export interface ApiErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]> | string[];
  timestamp?: string;
  path?: string;
}

/**
 * Generic API response wrapper
 */
export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

/**
 * API response for single item operations
 */
export interface SingleItemResponse<T> {
  data: T;
  message?: string;
}

/**
 * API response for list operations (non-paginated)
 */
export interface ListResponse<T> {
  data: T[];
  message?: string;
}
