import type { PropertyImage } from "../types/property";

/**
 * Фільтрує валідні зображення, видаляючи ті з пустими або невалідними URL
 * та сортує їх за порядком (order)
 */
export const filterValidImages = (images: PropertyImage[]): PropertyImage[] => {
  return images
    .filter(
      (img) =>
        img.imageUrl &&
        img.imageUrl.trim() !== "" &&
        img.imageUrl !== "null" &&
        img.imageUrl !== "undefined"
    )
    .sort((a, b) => a.order - b.order); // Сортуємо за порядком
};

/**
 * Форматує URL зображення для відображення
 */
export const formatImageUrl = (imageUrl: string): string => {
  if (!imageUrl) {
    return "/placeholder-house.svg";
  }

  if (imageUrl.startsWith("blob:")) {
    return imageUrl; // Blob URL для тимчасових зображень
  }

  if (imageUrl.startsWith("http")) {
    return imageUrl; // Повний URL
  }

  if (imageUrl.startsWith("/")) {
    const fullUrl = `${
      import.meta.env.VITE_API_URL || "http://localhost:5158"
    }${imageUrl}`;
    return fullUrl; // Відносний шлях
  }

  return imageUrl; // Інші випадки
};
