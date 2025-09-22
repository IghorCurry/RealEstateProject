import { PropertyType, PropertyStatus, Location } from "../types/property";

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString("uk-UA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const getPropertyTypeLabel = (type: PropertyType | string): string => {
  // Якщо type - це рядок (наприклад, "Apartment", "House")
  if (typeof type === "string") {
    const stringLabels: Record<string, string> = {
      Apartment:
        localStorage.getItem("language") === "uk" ? "Квартира" : "Apartment",
      House: localStorage.getItem("language") === "uk" ? "Будинок" : "House",
      Condo: localStorage.getItem("language") === "uk" ? "Кондо" : "Condo",
      Townhouse:
        localStorage.getItem("language") === "uk" ? "Таунхаус" : "Townhouse",
      Villa: localStorage.getItem("language") === "uk" ? "Вілла" : "Villa",
      Land:
        localStorage.getItem("language") === "uk" ? "Земельна ділянка" : "Land",
      Commercial:
        localStorage.getItem("language") === "uk" ? "Комерційне" : "Commercial",
    };
    return stringLabels[type] || type;
  }

  // Якщо type - це число (enum)
  const isUk = localStorage.getItem("language") === "uk";
  const labels: Record<PropertyType, string> = {
    1: isUk ? "Будинок" : "House",
    2: isUk ? "Квартира" : "Apartment",
    3: isUk ? "Кондо" : "Condo",
    4: isUk ? "Таунхаус" : "Townhouse",
    5: isUk ? "Вілла" : "Villa",
    6: isUk ? "Земельна ділянка" : "Land",
    7: isUk ? "Комерційне" : "Commercial",
  };
  return labels[type] || "Unknown";
};

export const getPropertyStatusLabel = (status: PropertyStatus): string => {
  const isUk = localStorage.getItem("language") === "uk";
  const labels: Record<PropertyStatus, string> = {
    1: isUk ? "Доступно" : "Available",
    2: isUk ? "Під контрактом" : "Under Contract",
    3: isUk ? "Продано" : "Sold",
    4: isUk ? "Орендовано" : "Rented",
  };
  return labels[status] || "Unknown";
};

export const getLocationLabel = (location: Location | string): string => {
  // Якщо location - це рядок (наприклад, "Urban", "Suburban")
  if (typeof location === "string") {
    const isUk = localStorage.getItem("language") === "uk";
    const stringLabels: Record<string, string> = {
      Urban: isUk ? "Місто" : "Urban",
      Suburban: isUk ? "Передмістя" : "Suburban",
      Downtown: isUk ? "Центр" : "Downtown",
      Rural: isUk ? "Сільська місцевість" : "Rural",
      Beachfront: isUk ? "Берег моря" : "Beachfront",
      Mountain: isUk ? "Гори" : "Mountain",
    };
    return stringLabels[location] || location;
  }

  // Якщо location - це число (enum)
  const isUk = localStorage.getItem("language") === "uk";
  const labels: Record<Location, string> = {
    1: isUk ? "Центр" : "Downtown",
    2: isUk ? "Передмістя" : "Suburban",
    3: isUk ? "Сільська місцевість" : "Rural",
    4: isUk ? "Берег моря" : "Beachfront",
    5: isUk ? "Гори" : "Mountain",
    6: isUk ? "Місто" : "Urban",
  };
  return labels[location] || "Unknown";
};

export const getPropertyStatusColor = (status: PropertyStatus): string => {
  switch (status) {
    case 1: // Available
      return "#4caf50";
    case 2: // UnderContract
      return "#ff9800";
    case 3: // Sold
      return "#f44336";
    case 4: // Rented
      return "#2196f3";
    default:
      return "#757575";
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  // Backend accepts E.164-like: + followed by 10-15 digits
  const phoneRegex = /^\+\d{10,15}$/;
  return phoneRegex.test(phone);
};

// User name utilities
export const getUserFullName = (user: {
  firstName: string;
  lastName: string;
}): string => {
  return `${user.firstName} ${user.lastName}`.trim();
};

export const getInitials = (user: {
  firstName: string;
  lastName: string;
}): string => {
  const firstName = user.firstName?.charAt(0) || "";
  const lastName = user.lastName?.charAt(0) || "";
  return `${firstName}${lastName}`.toUpperCase();
};

export const getInitialsFromFullName = (fullName: string): string => {
  const names = fullName.split(" ");
  const firstName = names[0]?.charAt(0) || "";
  const lastName = names[names.length - 1]?.charAt(0) || "";
  return `${firstName}${lastName}`.toUpperCase();
};
