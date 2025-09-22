import { QueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { CACHE_TIMES } from "../utils/constants";

/**
 * Smart retry function that doesn't retry on certain errors
 */
const smartRetry = (failureCount: number, error: unknown) => {
  const apiError = error as { statusCode?: number };

  // Don't retry on 4xx client errors (except 408 Request Timeout)
  if (
    apiError?.statusCode &&
    apiError.statusCode >= 400 &&
    apiError.statusCode < 500
  ) {
    if (apiError.statusCode === 408) {
      return failureCount < 2; // Retry timeouts up to 2 times
    }
    return false; // Don't retry other 4xx errors
  }

  // Retry network errors and 5xx server errors
  return failureCount < 3;
};

/**
 * React Query client configuration optimized for Real Estate API
 * Handles caching, background updates, and error handling
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Properties data: cache for 5 minutes (increased from 2 minutes)
      staleTime: CACHE_TIMES.PROPERTIES * 2.5,
      // Keep in memory for 15 minutes after component unmounts
      gcTime: CACHE_TIMES.GARBAGE_COLLECTION,
      // Smart retry logic
      retry: smartRetry,
      // Progressive retry delay (1s, 2s, 4s)
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 8000),
      // Don't refetch on window focus for better UX
      refetchOnWindowFocus: false,
      // Refetch on network reconnect
      refetchOnReconnect: true,
      // Refetch on mount if data is stale
      refetchOnMount: true,
      // Optimize for better performance
      networkMode: "always",
      // Add placeholder data for better UX
      placeholderData: (previousData: unknown) => previousData,
    },
    mutations: {
      // Retry mutations more conservatively
      retry: (failureCount, error) => {
        const apiError = error as { statusCode?: number };

        // Don't retry validation errors (400)
        if (apiError?.statusCode === 400) {
          return false;
        }

        // Don't retry unauthorized/forbidden
        if (apiError?.statusCode === 401 || apiError?.statusCode === 403) {
          return false;
        }

        // Retry network errors and server errors
        return failureCount < 2;
      },
      // Shorter retry delay for mutations
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 5000),
      // Global error handler for mutations
      onError: (error) => {
        console.error("Mutation error:", error);
        const apiError = error as { statusCode?: number; message?: string };

        if (apiError?.statusCode === 400) {
          toast.error(apiError.message || "Invalid data provided");
        } else if (apiError?.statusCode === 409) {
          toast.error("Conflict: Resource already exists or is being used");
        } else if (!apiError?.statusCode || apiError.statusCode >= 500) {
          toast.error("Failed to save changes. Please try again.");
        }
      },
      // Network mode for mutations
      networkMode: "always",
    },
  },
});

/**
 * Query keys factory for consistent caching
 */
export const queryKeys = {
  // Properties
  properties: {
    all: ["properties"] as const,
    lists: () => [...queryKeys.properties.all, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...queryKeys.properties.lists(), filters] as const,
    details: () => [...queryKeys.properties.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.properties.details(), id] as const,
    search: (query: string) =>
      [...queryKeys.properties.all, "search", query] as const,
    byUser: (userId: string) =>
      [...queryKeys.properties.all, "user", userId] as const,
  },

  // Favorites
  favorites: {
    all: ["favorites"] as const,
    lists: () => [...queryKeys.favorites.all, "list"] as const,
    byUser: (userId?: string) =>
      [...queryKeys.favorites.lists(), userId] as const,
    check: (userId: string, propertyId: string) =>
      [...queryKeys.favorites.all, "check", userId, propertyId] as const,
    count: (propertyId: string) =>
      [...queryKeys.favorites.all, "count", propertyId] as const,
  },

  // Inquiries
  inquiries: {
    all: ["inquiries"] as const,
    lists: () => [...queryKeys.inquiries.all, "list"] as const,
    my: (userId?: string) => [...queryKeys.inquiries.all, "my", userId] as const,
    byUser: (userId?: string) =>
      [...queryKeys.inquiries.lists(), userId] as const,
    byProperty: (propertyId: string) =>
      [...queryKeys.inquiries.all, "property", propertyId] as const,
    detail: (id: string) => [...queryKeys.inquiries.all, "detail", id] as const,
  },

  // User & Auth
  user: {
    current: ["user", "current"] as const,
    profile: (id: string) => ["user", "profile", id] as const,
  },

  // Images
  images: {
    property: (propertyId: string) =>
      ["images", "property", propertyId] as const,
  },
} as const;
