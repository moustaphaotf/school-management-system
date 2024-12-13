import { Role } from "../types/next-auth";

export const ROLES = {
  SCHOOL_OWNER: "SCHOOL_OWNER",
  SCHOOL_ADMIN: "SCHOOL_ADMIN",
  SCHOOL_TEACHER: "SCHOOL_TEACHER",
} as const;

export const ROLE_PERMISSIONS = {
  [ROLES.SCHOOL_OWNER]: [
    "manage:school",
    "manage:users",
    "manage:invitations",
    "manage:classes",
    "manage:subjects",
    "manage:teachers",
    "manage:students",
    "view:all",
  ],
  [ROLES.SCHOOL_ADMIN]: [
    "manage:classes",
    "manage:subjects",
    "manage:teachers",
    "manage:students",
    "view:all",
  ],
  [ROLES.SCHOOL_TEACHER]: [
    "view:assigned_classes",
    "view:assigned_subjects",
    "manage:grades",
  ],
} as const;

export type Permission = (typeof ROLE_PERMISSIONS)[Role][number];

// @ts-ignore
export const ROLE_LABELS: Record<string, string> = {
  [ROLES.SCHOOL_OWNER]: "Propriétaire",
  [ROLES.SCHOOL_ADMIN]: "Administrateur",
  [ROLES.SCHOOL_TEACHER]: "Enseignant",
} as const;
