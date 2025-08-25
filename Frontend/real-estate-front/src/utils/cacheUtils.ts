import type { QueryClient } from "@tanstack/react-query";
import type { Property } from "../types/property";

/**
 * Утиліти для оптимізації кешування React Query
 */
export const cacheUtils = {
  /**
   * Точне оновлення property в кеші
   */
  updatePropertyInCache: (
    queryClient: QueryClient,
    updatedProperty: Property
  ) => {
    // Оновлюємо детальну сторінку property
    queryClient.setQueryData(["property", updatedProperty.id], updatedProperty);

    // Оновлюємо список properties
    queryClient.setQueryData(["properties"], (old: Property[] | undefined) => {
      if (!old) return old;
      return old.map((p) =>
        p.id === updatedProperty.id ? updatedProperty : p
      );
    });

    // Оновлюємо properties користувача
    queryClient.setQueryData(
      ["properties", "user", updatedProperty.userId],
      (old: Property[] | undefined) => {
        if (!old) return old;
        return old.map((p) =>
          p.id === updatedProperty.id ? updatedProperty : p
        );
      }
    );
  },

  /**
   * Додавання нового property в кеш
   */
  addPropertyToCache: (queryClient: QueryClient, newProperty: Property) => {
    // Додаємо до загального списку
    queryClient.setQueryData(["properties"], (old: Property[] | undefined) => {
      if (!old) return [newProperty];
      return [newProperty, ...old];
    });

    // Додаємо до списку користувача
    queryClient.setQueryData(
      ["properties", "user", newProperty.userId],
      (old: Property[] | undefined) => {
        if (!old) return [newProperty];
        return [newProperty, ...old];
      }
    );
  },

  /**
   * Видалення property з кешу
   */
  removePropertyFromCache: (
    queryClient: QueryClient,
    propertyId: string,
    userId?: string
  ) => {
    // Видаляємо з детальної сторінки
    queryClient.removeQueries({
      queryKey: ["property", propertyId],
    });

    // Видаляємо з загального списку
    queryClient.setQueryData(["properties"], (old: Property[] | undefined) => {
      if (!old) return old;
      return old.filter((p) => p.id !== propertyId);
    });

    // Видаляємо зі списку користувача
    if (userId) {
      queryClient.setQueryData(
        ["properties", "user", userId],
        (old: Property[] | undefined) => {
          if (!old) return old;
          return old.filter((p) => p.id !== propertyId);
        }
      );
    }
  },

  /**
   * Оновлення статусу favorite в кеші
   */
  updateFavoriteStatus: (
    queryClient: QueryClient,
    propertyId: string,
    isFavorited: boolean
  ) => {
    // Оновлюємо детальну сторінку
    queryClient.setQueryData(
      ["property", propertyId],
      (old: Property | undefined) => {
        if (!old) return old;
        return { ...old, isFavoritedByCurrentUser: isFavorited };
      }
    );

    // Оновлюємо список properties
    queryClient.setQueryData(["properties"], (old: Property[] | undefined) => {
      if (!old) return old;
      return old.map((p) =>
        p.id === propertyId
          ? { ...p, isFavoritedByCurrentUser: isFavorited }
          : p
      );
    });

    // Оновлюємо список favorites
    if (isFavorited) {
      // Додаємо до favorites
      queryClient.setQueryData(["favorites"], (old: Property[] | undefined) => {
        if (!old) return [];
        const property = queryClient.getQueryData([
          "property",
          propertyId,
        ]) as Property;
        if (property && !old.find((p) => p.id === propertyId)) {
          return [property, ...old];
        }
        return old;
      });
    } else {
      // Видаляємо з favorites
      queryClient.setQueryData(["favorites"], (old: Property[] | undefined) => {
        if (!old) return old;
        return old.filter((p) => p.id !== propertyId);
      });
    }
  },

  /**
   * Інвалідація всіх пов'язаних запитів
   */
  invalidateRelatedQueries: (
    queryClient: QueryClient,
    propertyId: string,
    userId?: string
  ) => {
    const queriesToInvalidate = [
      ["properties"],
      ["property", propertyId],
      ["property-images", propertyId],
    ];

    if (userId) {
      queriesToInvalidate.push(["properties", "user", userId]);
    }

    queriesToInvalidate.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  },
};
