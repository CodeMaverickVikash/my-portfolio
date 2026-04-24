/**
 * Application Routes
 */
export const ROUTES = {
  // Frontend Routes
  HOME: '/',
  PROFILE: '/profile',
  CONTACT: '/contact',
  TECH_STACK: '/tech-stack',
  TECH_DETAIL: '/tech/:techId',

  // Auth Routes
  LOGIN: '/login',

  // Admin Routes (Backend UI)
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_TECH_STACK: '/admin/tech-stack',
  ADMIN_PROFILE: '/admin/profile',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];

