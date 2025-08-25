// API_ENDPOINTS is not used in this file

/**
 * Utility function to replace URL parameters in API endpoints
 * @param endpoint - The endpoint template with parameters like :id, :userId, etc.
 * @param params - Object with parameter values
 * @returns The endpoint with replaced parameters
 */
export const replaceUrlParams = (
  endpoint: string,
  params: Record<string, string | number>
): string => {
  let result = endpoint;

  Object.entries(params).forEach(([key, value]) => {
    result = result.replace(`:${key}`, value.toString());
  });

  return result;
};

/**
 * Utility function to build query string from parameters
 * @param params - Object with query parameters
 * @returns Query string starting with '?' or empty string
 */
export const buildQueryString = (params: Record<string, unknown>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, item.toString()));
      } else {
        searchParams.append(key, value.toString());
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
};

/**
 * Utility function to build full API URL with parameters and query string
 * @param endpoint - The endpoint template
 * @param urlParams - URL parameters to replace
 * @param queryParams - Query parameters to add
 * @returns Full API URL
 */
export const buildApiUrl = (
  endpoint: string,
  urlParams?: Record<string, string | number>,
  queryParams?: Record<string, unknown>
): string => {
  let url = endpoint;

  if (urlParams) {
    url = replaceUrlParams(endpoint, urlParams);
  }

  if (queryParams) {
    url += buildQueryString(queryParams);
  }

  return url;
};

/**
 * Utility function to get current user ID from localStorage
 * @returns User ID or null if not found
 */
export const getCurrentUserId = (): string | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "undefined" || userStr === "null") {
      return null;
    }

    const user = JSON.parse(userStr);
    return user?.id || null;
  } catch (error) {
    console.error("Error getting current user ID:", error);
    return null;
  }
};

/**
 * Utility function to validate if user is authenticated
 * @returns True if user is authenticated, false otherwise
 */
export const isUserAuthenticated = (): boolean => {
  try {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    return !!(
      token &&
      token !== "undefined" &&
      token !== "null" &&
      user &&
      user !== "undefined" &&
      user !== "null"
    );
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

/**
 * Utility function to get authentication headers
 * @returns Headers object with Authorization token
 */
export const getAuthHeaders = (): Record<string, string> => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token && token !== "undefined" && token !== "null") {
      return {
        Authorization: `Bearer ${token}`,
      };
    }
  } catch (error) {
    console.error("Error getting auth headers:", error);
  }

  return {};
};

/**
 * Utility function to get multipart form data headers
 * @returns Headers object for multipart form data
 */
export const getMultipartHeaders = (): Record<string, string> => {
  // Для FormData з файлами не встановлюємо Content-Type
  // Браузер автоматично встановить правильний Content-Type з boundary
  return {
    // Порожній об'єкт - браузер автоматично встановить Content-Type
  };
};
