/**
 * Безпечний сервіс для роботи з localStorage
 */
export const storageService = {
  /**
   * Безпечно отримує значення з localStorage
   */
  getItem: (key: string): string | null => {
    try {
      const value = localStorage.getItem(key);
      return value === "undefined" || value === "null" ? null : value;
    } catch (error) {
      console.error(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Безпечно зберігає значення в localStorage
   */
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Безпечно видаляє значення з localStorage
   */
  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Отримує токен доступу
   */
  getAccessToken: (): string | null => {
    return storageService.getItem("accessToken");
  },

  /**
   * Зберігає токен доступу
   */
  setAccessToken: (token: string): boolean => {
    return storageService.setItem("accessToken", token);
  },

  /**
   * Отримує refresh токен
   */
  getRefreshToken: (): string | null => {
    return storageService.getItem("refreshToken");
  },

  /**
   * Зберігає refresh токен
   */
  setRefreshToken: (token: string): boolean => {
    return storageService.setItem("refreshToken", token);
  },

  /**
   * Отримує дані користувача
   */
  getUser: (): any => {
    try {
      const userStr = storageService.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
      return null;
    }
  },

  /**
   * Зберігає дані користувача
   */
  setUser: (user: any): boolean => {
    try {
      return storageService.setItem("user", JSON.stringify(user));
    } catch (error) {
      console.error("Failed to stringify user data for localStorage", error);
      return false;
    }
  },

  /**
   * Очищає всі дані авторизації
   */
  clearAuthData: (): void => {
    const authKeys = [
      "user",
      "accessToken",
      "refreshToken",
      "accessTokenExpiresAt",
      "refreshTokenExpiresAt",
    ];

    authKeys.forEach((key) => {
      storageService.removeItem(key);
    });
  },

  /**
   * Перевіряє чи є валідні дані авторизації
   */
  hasValidAuthData: (): boolean => {
    const token = storageService.getAccessToken();
    const user = storageService.getUser();

    return !!(token && user && user.id && user.email);
  },
};
