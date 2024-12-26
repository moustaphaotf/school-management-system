// Auth endpoints
export const AUTH_ENDPOINTS = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  ME: "/auth/me",
} as const;

// School endpoints
export const SCHOOL_ENDPOINTS = {
  BASE: "/schools",
  DETAIL: (id: string) => `/schools/${id}`,
  SWITCH: (id: string) => `/schools/${id}/switch`,
  CURRENT: `/schools/current`,
} as const;

// Academic Year endpoints
export const ACADEMIC_YEAR_ENDPOINTS = {
  BASE: "/academic-years",
  DETAIL: (id: string) => `/academic-years/${id}`,
} as const;

// Class endpoints
export const CLASS_ENDPOINTS = {
  BASE: "/classes",
  DETAIL: (id: string) => `/classes/${id}`,
  REORDER: "/classes/reorder",
} as const;

// Class endpoints
export const EDUCATION_LEVEL_ENDPOINT = {
  BASE: "/education-levels",
  DETAIL: (id: string) => `/education-levels/${id}`,
  REORDER: "/education-levels/reorder",
} as const;

// Subject endpoints
export const SUBJECT_ENDPOINTS = {
  BASE: "/subjects",
  DETAIL: (id: string) => `/subjects/${id}`,
} as const;

// Subject-Class endpoints
export const SUBJECT_CLASS_ENDPOINTS = {
  BASE: "/subjects-classes",
  DETAIL: (id: string) => `/subjects-classes/${id}`,
} as const;

// Teacher Assignment endpoints
export const TEACHER_ASSIGNMENT_ENDPOINTS = {
  BASE: "/teacher-assignments",
  DETAIL: (id: string) => `/teacher-assignments/${id}`,
  IMPORT: "/teacher-assignments/import",
} as const;

// User endpoints
export const USER_ENDPOINTS = {
  BASE: "/users",
  DETAIL: (id: string) => `/users/${id}`,
  INVITE: "/users/invite",
  RESEND_INVITATION: (id: string) => `/users/${id}/resend-invitation`,
  CANCEL_INVITATION: (id: string) => `/users/${id}/cancel-invitation`,
} as const;
