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
      Apartment: "Квартира",
      House: "Будинок",
      Condo: "Кондо",
      Townhouse: "Таунхаус",
      Villa: "Вілла",
      Land: "Земельна ділянка",
      Commercial: "Комерційне",
    };
    return stringLabels[type] || type;
  }

  // Якщо type - це число (enum)
  const labels: Record<PropertyType, string> = {
    1: "House",
    2: "Apartment",
    3: "Condo",
    4: "Townhouse",
    5: "Villa",
    6: "Land",
    7: "Commercial",
  };
  return labels[type] || "Unknown";
};

export const getPropertyStatusLabel = (status: PropertyStatus): string => {
  const labels: Record<PropertyStatus, string> = {
    1: "Available",
    2: "Under Contract",
    3: "Sold",
    4: "Rented",
  };
  return labels[status] || "Unknown";
};

export const getLocationLabel = (location: Location | string): string => {
  // Якщо location - це рядок (наприклад, "Urban", "Suburban")
  if (typeof location === "string") {
    const stringLabels: Record<string, string> = {
      Urban: "Місто",
      Suburban: "Передмістя",
      Downtown: "Центр",
      Rural: "Сільська місцевість",
      Beachfront: "Берег моря",
      Mountain: "Гори",
    };
    return stringLabels[location] || location;
  }

  // Якщо location - це число (enum)
  const labels: Record<Location, string> = {
    1: "Downtown",
    2: "Suburban",
    3: "Rural",
    4: "Beachfront",
    5: "Mountain",
    6: "Urban",
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
  // Backend requires strict +380XXXXXXXXX (UA) format
  const phoneRegex = /^\+380\d{9}$/;
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
