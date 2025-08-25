import { useMemo } from "react";
import type { Property, PropertyFilter } from "../types/property";

export interface UsePropertyFiltersOptions {
  properties: Property[];
  filters: PropertyFilter;
  searchQuery: string;
}

export const usePropertyFilters = ({
  properties,
  filters,
  searchQuery,
}: UsePropertyFiltersOptions) => {
  // Мемоізуємо пошуковий запит для оптимізації
  const normalizedSearchQuery = useMemo(
    () => searchQuery.toLowerCase().trim(),
    [searchQuery]
  );

  // Мемоізуємо фільтри для оптимізації
  const normalizedFilters = useMemo(
    () => ({
      propertyType: filters.propertyType,
      status: filters.status,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minBedrooms: filters.minBedrooms,
      maxBedrooms: filters.maxBedrooms,
      minSquareMeters: filters.minSquareMeters,
      maxSquareMeters: filters.maxSquareMeters,
    }),
    [filters]
  );

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      // Пошук по назві та опису
      if (normalizedSearchQuery) {
        const matchesSearch =
          property.title.toLowerCase().includes(normalizedSearchQuery) ||
          property.description.toLowerCase().includes(normalizedSearchQuery) ||
          property.address.toLowerCase().includes(normalizedSearchQuery);

        if (!matchesSearch) return false;
      }

      // Фільтр по типу нерухомості
      if (normalizedFilters.propertyType !== undefined) {
        if (property.propertyType !== normalizedFilters.propertyType)
          return false;
      }

      // Фільтр по статусу
      if (normalizedFilters.status !== undefined) {
        if (property.status !== normalizedFilters.status) return false;
      }

      // Фільтр по ціні
      if (
        normalizedFilters.minPrice !== undefined &&
        property.price < normalizedFilters.minPrice
      ) {
        return false;
      }
      if (
        normalizedFilters.maxPrice !== undefined &&
        property.price > normalizedFilters.maxPrice
      ) {
        return false;
      }

      // Фільтр по кількості кімнат
      if (
        normalizedFilters.minBedrooms !== undefined &&
        property.bedrooms < normalizedFilters.minBedrooms
      ) {
        return false;
      }
      if (
        normalizedFilters.maxBedrooms !== undefined &&
        property.bedrooms > normalizedFilters.maxBedrooms
      ) {
        return false;
      }

      // Фільтр по площі
      if (
        normalizedFilters.minSquareMeters !== undefined &&
        property.squareMeters < normalizedFilters.minSquareMeters
      ) {
        return false;
      }
      if (
        normalizedFilters.maxSquareMeters !== undefined &&
        property.squareMeters > normalizedFilters.maxSquareMeters
      ) {
        return false;
      }

      return true;
    });
  }, [properties, normalizedFilters, normalizedSearchQuery]);

  return {
    filteredProperties,
    totalCount: filteredProperties.length,
    hasFilters:
      Object.values(filters).some(
        (value) => value !== undefined && value !== "all" && value !== ""
      ) || searchQuery.trim() !== "",
  };
};
