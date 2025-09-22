import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { favoriteService } from "../services/favoriteService";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import type { Property } from "../types/property";

export const useFavorites = () => {
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const queryClient = useQueryClient();

  // Отримання списку улюблених користувача
  const {
    data: favorites = [],
    isLoading: isLoadingFavorites,
    error: favoritesError,
    refetch: refetchFavorites,
  } = useQuery<Property[]>({
    queryKey: ["favorites", "list", user?.id],
    queryFn: () => favoriteService.getUserFavorites(),
    enabled: isAuthenticated && !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 хвилин
  });

  // Мутація для додавання в улюблені
  const addToFavoritesMutation = useMutation({
    mutationFn: (propertyId: string) =>
      favoriteService.addToFavorites(propertyId),
    onSuccess: (_, propertyId) => {
      // Оновлюємо кеш улюблених
      queryClient.setQueryData(
        ["favorites", "list", user?.id],
        (old: Property[] = []) => {
          // Додаємо property до favorites (якщо його там немає)
          const properties =
            queryClient.getQueryData<Property[]>(["properties"]) || [];
          const property = properties.find((p) => p.id === propertyId);
          if (property && !old.find((fav) => fav.id === propertyId)) {
            return [...old, property];
          }
          return old;
        }
      );

      // Оновлюємо статус улюблених для конкретного property
      queryClient.setQueryData(
        ["property", propertyId],
        (old: Property | undefined) => {
          if (old) {
            return { ...old, isFavoritedByCurrentUser: true };
          }
          return old;
        }
      );

      toast.success(t("favorites.add.success"));
    },
    onError: () => {
      toast.error(t("favorites.add.error"));
    },
  });

  // Мутація для видалення з улюблених
  const removeFromFavoritesMutation = useMutation({
    mutationFn: (propertyId: string) =>
      favoriteService.removeFromFavorites(propertyId),
    onSuccess: (_, propertyId) => {
      // Оновлюємо кеш улюблених
      queryClient.setQueryData(
        ["favorites", "list", user?.id],
        (old: Property[] = []) => old.filter((fav) => fav.id !== propertyId)
      );

      // Оновлюємо статус улюблених для конкретного property
      queryClient.setQueryData(
        ["property", propertyId],
        (old: Property | undefined) => {
          if (old) {
            return { ...old, isFavoritedByCurrentUser: false };
          }
          return old;
        }
      );

      toast.success(t("favorites.remove.success"));
    },
    onError: () => {
      toast.error(t("favorites.remove.error"));
    },
  });

  // Функція для перемикання стану улюблених
  const toggleFavorite = async (propertyId: string) => {
    const isCurrentlyFavorite = (favorites as Property[]).some(
      (fav: Property) => fav.id === propertyId
    );

    if (isCurrentlyFavorite) {
      await removeFromFavoritesMutation.mutateAsync(propertyId);
    } else {
      await addToFavoritesMutation.mutateAsync(propertyId);
    }
  };

  // Функція для перевірки чи property в улюблених
  const isFavorite = (propertyId: string) => {
    return (favorites as Property[]).some(
      (fav: Property) => fav.id === propertyId
    );
  };

  return {
    favorites,
    isLoadingFavorites,
    favoritesError,
    refetchFavorites,
    addToFavorites: addToFavoritesMutation.mutate,
    removeFromFavorites: removeFromFavoritesMutation.mutate,
    toggleFavorite,
    isFavorite,
    isAddingToFavorites: addToFavoritesMutation.status === "pending",
    isRemovingFromFavorites: removeFromFavoritesMutation.status === "pending",
  };
};
