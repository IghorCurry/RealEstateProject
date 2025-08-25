// Утилита для очистки некорректных данных в localStorage
export const cleanupLocalStorage = () => {
  const keys = [
    "user",
    "accessToken",
    "refreshToken",
    "accessTokenExpiresAt",
    "refreshTokenExpiresAt",
  ];

  keys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value === "undefined" || value === "null" || value === "") {
      localStorage.removeItem(key);
    }
  });
};

// Функция для полной очистки всех данных аутентификации
export const clearAuthData = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessTokenExpiresAt");
  localStorage.removeItem("refreshTokenExpiresAt");
};
