import { toast } from "react-hot-toast";
import type { ApiError } from "../types/api";

/**
 * Enhanced Error Handler for Real Estate API
 * Provides detailed error handling with logging and user-friendly messages
 */

export interface ErrorContext {
  operation?: string;
  resource?: string;
  userId?: string;
  timestamp?: string;
  userAgent?: string;
}

export interface ErrorLogEntry {
  error: unknown;
  context: ErrorContext;
  timestamp: string;
  level: "error" | "warning" | "info";
}

// In-memory error log for debugging (in production, this would go to a logging service)
const errorLog: ErrorLogEntry[] = [];
const MAX_LOG_ENTRIES = 30; // Оптимізовано для мінімального використання пам'яті

/**
 * Logs error with context for debugging
 */
const logError = (
  error: unknown,
  context: ErrorContext,
  level: "error" | "warning" | "info" = "error"
) => {
  const logEntry: ErrorLogEntry = {
    error: {
      message: error?.message || "Unknown error",
      statusCode: error?.statusCode,
      stack: error?.stack,
      type: typeof error,
    },
    context: {
      ...context,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    },
    timestamp: new Date().toISOString(),
    level,
  };

  // Add to in-memory log
  errorLog.unshift(logEntry);

  // Keep only last MAX_LOG_ENTRIES
  if (errorLog.length > MAX_LOG_ENTRIES) {
    errorLog.splice(MAX_LOG_ENTRIES);
  }

  // Console logging based on level
  if (level === "error") {
    console.error("API Error:", logEntry);
  } else if (level === "warning") {
    console.warn("API Warning:", logEntry);
  } else {
    console.info("API Info:", logEntry);
  }

  // In production, send to logging service
  if (
    typeof window !== "undefined" &&
    window.location.hostname !== "localhost"
  ) {
    // Send to external logging service (e.g., Sentry, LogRocket, etc.)
    // For now, we'll use a simple implementation
    try {
      // You can replace this with actual logging service calls
      if (level === "error") {
        // Example: Sentry.captureException(logEntry.error);
        console.error("Production Error Log:", logEntry);
      }
    } catch (loggingError) {
      console.error("Failed to send to logging service:", loggingError);
    }
  }
};

/**
 * Gets user-friendly error messages for specific operations
 */
const getContextualErrorMessage = (
  statusCode: number,
  context: ErrorContext
): string => {
  const { resource } = context;

  const messages: Record<string, Record<number, string>> = {
    // Property operations
    property: {
      400: "Invalid property data. Please check all required fields.",
      404: "Property not found. It may have been deleted or moved.",
      409: "This property already exists or conflicts with existing data.",
      422: "Property validation failed. Please check your input.",
    },

    // User operations
    user: {
      400: "Invalid user data provided.",
      404: "User not found.",
      409: "This email is already registered.",
      422: "User validation failed. Please check email format and password requirements.",
    },

    // Authentication operations
    auth: {
      400: "Invalid login credentials.",
      401: "Your session has expired. Please log in again.",
      403: "Access denied. You don't have permission for this action.",
      429: "Too many login attempts. Please try again later.",
    },

    // Favorite operations
    favorite: {
      400: "Invalid favorite request.",
      404: "Property not found in favorites.",
      409: "Property is already in your favorites.",
    },

    // Inquiry operations
    inquiry: {
      400: "Invalid inquiry data.",
      404: "Inquiry not found.",
      422: "Please provide all required inquiry information.",
    },

    // Image operations
    image: {
      400: "Invalid image data or format.",
      413: "Image file is too large. Maximum size is 10MB.",
      415: "Unsupported image format. Please use JPG, PNG, or WebP.",
      422: "Image validation failed. Please check file format and size.",
    },
  };

  const resourceMessages = messages[resource || ""] || {};
  return resourceMessages[statusCode] || "";
};

/**
 * Enhanced API error handler with context and logging
 */
export const handleApiError = (
  error: unknown,
  context: ErrorContext = {}
): void => {
  const apiError = error as ApiError;
  logError(error, context, "error");

  // Handle specific status codes
  switch (apiError.statusCode) {
    case 400: {
      const contextMsg = getContextualErrorMessage(400, context);
      toast.error(contextMsg || apiError.message || "Invalid request data");
      break;
    }

    case 401: {
      const contextMsg = getContextualErrorMessage(401, context);
      toast.error(contextMsg || "Please log in to continue");

      // Clear authentication data
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      // Redirect to login after a short delay
      setTimeout(() => {
        // Використовуємо history API замість window.location
        window.history.pushState(null, "", "/login");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }, 2000);
      break;
    }

    case 403: {
      const contextMsg = getContextualErrorMessage(403, context);
      toast.error(
        contextMsg || "You don't have permission to perform this action"
      );
      break;
    }

    case 404: {
      const contextMsg = getContextualErrorMessage(404, context);
      toast.error(contextMsg || "Resource not found");
      break;
    }

    case 408: {
      toast.error("Request timeout. Please try again.");
      break;
    }

    case 409: {
      const contextMsg = getContextualErrorMessage(409, context);
      toast.error(contextMsg || "Conflict: Resource already exists");
      break;
    }

    case 413: {
      const contextMsg = getContextualErrorMessage(413, context);
      toast.error(contextMsg || "File too large");
      break;
    }

    case 415: {
      const contextMsg = getContextualErrorMessage(415, context);
      toast.error(contextMsg || "Unsupported file type");
      break;
    }

    case 422: {
      const contextMsg = getContextualErrorMessage(422, context);

      // Handle validation errors
      if (apiError.errors) {
        if (Array.isArray(apiError.errors)) {
          apiError.errors.forEach((message) => toast.error(message));
        } else if (typeof apiError.errors === "object") {
          const errorMessages = Object.values(apiError.errors).flat();
          errorMessages.forEach((message) => toast.error(String(message)));
        }
      } else {
        toast.error(contextMsg || "Validation failed");
      }
      break;
    }

    case 429: {
      toast.error("Too many requests. Please wait a moment and try again.");
      break;
    }

    case 500:
    case 502:
    case 503:
    case 504: {
      toast.error("Server error. Please try again later.");
      break;
    }

    default: {
      if (apiError.statusCode >= 400) {
        const contextMsg = getContextualErrorMessage(
          apiError.statusCode,
          context
        );
        toast.error(contextMsg || apiError.message || "An error occurred");
      }
    }
  }
};

/**
 * Network error handler with retry suggestions
 */
export const handleNetworkError = (context: ErrorContext = {}): void => {
  logError({ message: "Network error", type: "network" }, context, "error");

  toast.error(
    "Connection problem. Please check your internet connection and try again.",
    { duration: 5000 }
  );
};

/**
 * Handles unexpected errors with detailed logging
 */
export const handleUnexpectedError = (
  error: unknown,
  context: ErrorContext = {}
): void => {
  logError(error, context, "error");

  console.error("Unexpected error:", error);
  toast.error(
    "An unexpected error occurred. Please refresh the page and try again."
  );
};

/**
 * Handles validation errors with field-specific messages
 */
export const handleValidationError = (
  errors: string[],
  context: ErrorContext = {}
): void => {
  logError({ message: "Validation error", errors }, context, "warning");

  errors.forEach((error, index) => {
    // Delay multiple error messages to avoid overwhelming the user
    setTimeout(() => {
      toast.error(error);
    }, index * 100);
  });
};

/**
 * Success message handler with context
 */
export const handleSuccess = (
  message: string,
  context: ErrorContext = {}
): void => {
  logError({ message, type: "success" }, context, "info");
  toast.success(message);
};

/**
 * Warning message handler
 */
export const handleWarning = (
  message: string,
  context: ErrorContext = {}
): void => {
  logError({ message, type: "warning" }, context, "warning");
  toast(message, { icon: "⚠️", duration: 4000 });
};

/**
 * Gets recent error logs for debugging
 */
export const getRecentErrors = (count: number = 10): ErrorLogEntry[] => {
  return errorLog.slice(0, count);
};

/**
 * Clears error log
 */
export const clearErrorLog = (): void => {
  errorLog.length = 0;
};

/**
 * Gets error statistics
 */
export const getErrorStats = () => {
  const stats = {
    total: errorLog.length,
    byLevel: { error: 0, warning: 0, info: 0 },
    byStatusCode: {} as Record<number, number>,
    byResource: {} as Record<string, number>,
  };

  errorLog.forEach((entry) => {
    stats.byLevel[entry.level]++;

    if (entry.error.statusCode) {
      stats.byStatusCode[entry.error.statusCode] =
        (stats.byStatusCode[entry.error.statusCode] || 0) + 1;
    }

    if (entry.context.resource) {
      stats.byResource[entry.context.resource] =
        (stats.byResource[entry.context.resource] || 0) + 1;
    }
  });

  return stats;
};

/**
 * Error handler factory for specific operations
 */
export const createErrorHandler = (defaultContext: ErrorContext) => {
  return (error: unknown, additionalContext: ErrorContext = {}) => {
    handleApiError(error, { ...defaultContext, ...additionalContext });
  };
};

// Pre-configured error handlers for common operations
export const propertyErrorHandler = createErrorHandler({
  resource: "property",
});
export const userErrorHandler = createErrorHandler({ resource: "user" });
export const authErrorHandler = createErrorHandler({ resource: "auth" });
export const favoriteErrorHandler = createErrorHandler({
  resource: "favorite",
});
export const inquiryErrorHandler = createErrorHandler({ resource: "inquiry" });
export const imageErrorHandler = createErrorHandler({ resource: "image" });
