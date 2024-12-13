import { ROLE_PERMISSIONS, Permission } from "@/lib/constants/roles";
import { Role } from "../types/next-auth";

export function hasPermission(role: string, permission: Permission): boolean {
  // @ts-ignore
  return ROLE_PERMISSIONS[role].includes(permission);
}

export function canManageUsers(role: Role): boolean {
  return hasPermission(role, "manage:users");
}

export function canManageSchool(role: string): boolean {
  return hasPermission(role, "manage:school");
}

export function canManageInvitations(role: Role): boolean {
  return hasPermission(role, "manage:invitations");
}

export function canManageClasses(role: Role): boolean {
  return hasPermission(role, "manage:classes");
}

export function canManageSubjects(role: Role): boolean {
  return hasPermission(role, "manage:subjects");
}

export function canManageTeachers(role: Role): boolean {
  return hasPermission(role, "manage:teachers");
}

export function canManageStudents(role: Role): boolean {
  return hasPermission(role, "manage:students");
}

export function canManageGrades(role: Role): boolean {
  return hasPermission(role, "manage:grades");
}
