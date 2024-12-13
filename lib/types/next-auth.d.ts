import { Permission } from "@/lib/constants/roles";

export type Role = "SCHOOL_OWNER" | "SCHOOL_ADMIN" | "SCHOOL_TEACHER";

export interface UserSession {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  currentSchool?: {
    id: string;
    name: string;
    role: Role;
    permissions: Permission[];
  };
}

declare module "next-auth" {
  interface Session {
    user: UserSession;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    currentSchool?: {
      id: string;
      name: string;
      role: Role;
      permissions: Permission[];
    };
  }
}