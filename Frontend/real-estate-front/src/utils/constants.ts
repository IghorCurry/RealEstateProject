export const API_BASE_URL = 'http://localhost:5000/api';

export const ROUTES = {
  HOME: '/',
  PROPERTIES: '/properties',
  PROPERTY_DETAIL: '/properties/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
  ADMIN: '/admin',
  ADMIN_PROPERTIES: '/admin/properties',
  ADMIN_USERS: '/admin/users',
  ADMIN_INQUIRIES: '/admin/inquiries',
} as const;

export const PROPERTY_TYPES = {
  1: 'House',
  2: 'Apartment',
  3: 'Condo',
  4: 'Townhouse',
  5: 'Villa',
  6: 'Land',
  7: 'Commercial',
} as const;

export const PROPERTY_STATUSES = {
  1: 'Available',
  2: 'Under Contract',
  3: 'Sold',
  4: 'Rented',
} as const;

export const LOCATIONS = {
  1: 'Kyiv',
  2: 'Lviv',
  3: 'Kharkiv',
  4: 'Odesa',
  5: 'Dnipro',
} as const;

export const USER_ROLES = {
  ADMIN: 'Admin',
  USER: 'User',
} as const;

export const INQUIRY_STATUSES = {
  PENDING: 'Pending',
  RESPONDED: 'Responded',
  CLOSED: 'Closed',
} as const; 