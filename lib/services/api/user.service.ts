import apiClient from "@/lib/services/axios";
import { User, SchoolMembership } from "@prisma/client";
import { USER_ENDPOINTS } from "../endpoints";

export interface UserWithMemberships extends User {
  memberships: SchoolMembership[];
}

export const userService = {
  getUsers: async () => {
    const { data } = await apiClient.get<UserWithMemberships[]>(
      USER_ENDPOINTS.BASE
    );
    return data;
  },

  getUser: async (id: string) => {
    const { data } = await apiClient.get<UserWithMemberships>(
      USER_ENDPOINTS.DETAIL(id)
    );
    return data;
  },

  updateUser: async (id: string, body: Partial<User>) => {
    const { data } = await apiClient.patch<UserWithMemberships>(
      USER_ENDPOINTS.DETAIL(id),
      body
    );
    return data;
  },

  deleteUser: async (id: string) => {
    const { data } = await apiClient.delete(USER_ENDPOINTS.DETAIL(id));
    return data;
  },
};
