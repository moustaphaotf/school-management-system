import apiClient from "@/lib/services/axios";
import { RegisterFormValues } from "@/lib/validations/auth";
import { UserSession } from "../../types/next-auth";
import { AUTH_ENDPOINTS } from "../endpoints";

export const authService = {
  register: async (body: RegisterFormValues) => {
    const { data } = await apiClient.post<UserSession>(
      AUTH_ENDPOINTS.REGISTER,
      body
    );
    return data;
  },
};
