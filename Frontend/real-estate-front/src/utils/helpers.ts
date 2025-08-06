import { PropertyType, PropertyStatus, Location } from '../types/property';
import { PROPERTY_TYPES, PROPERTY_STATUSES, LOCATIONS } from './constants';

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('uk-UA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getPropertyTypeLabel = (type: PropertyType): string => {
  return PROPERTY_TYPES[type] || 'Unknown';
};

export const getPropertyStatusLabel = (status: PropertyStatus): string => {
  return PROPERTY_STATUSES[status] || 'Unknown';
};

export const getLocationLabel = (location: Location): string => {
  return LOCATIONS[location] || 'Unknown';
};

export const getPropertyStatusColor = (status: PropertyStatus): string => {
  switch (status) {
    case PropertyStatus.Available:
      return '#4caf50';
    case PropertyStatus.UnderContract:
      return '#ff9800';
    case PropertyStatus.Sold:
      return '#f44336';
    case PropertyStatus.Rented:
      return '#2196f3';
    default:
      return '#757575';
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[0-9\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
}; 