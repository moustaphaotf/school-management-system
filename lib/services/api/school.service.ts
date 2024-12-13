import apiClient from "@/lib/services/axios";
import { SchoolFormValues } from "@/lib/validations";
import { School, SchoolMembership } from "@prisma/client";
import { SCHOOL_ENDPOINTS } from "../endpoints";

export const schoolService = {
  createSchool: async (body: SchoolFormValues) => {
    const { data } = await apiClient.post<School>(SCHOOL_ENDPOINTS.BASE, body);
    return data;
  },

  getSchools: async () => {
    const response = await apiClient.get<
      (SchoolMembership & { school: School })[]
    >(SCHOOL_ENDPOINTS.BASE);
    return response.data;
  },

  getSchool: async (id: string) => {
    const { data } = await apiClient.get<School>(SCHOOL_ENDPOINTS.DETAIL(id));
    return data;
  },

  getCurrentSchool: async () => {
    const { data } = await apiClient.get<
      Pick<SchoolMembership, "id" | "role"> & { school: School }
    >(SCHOOL_ENDPOINTS.CURRENT);
    return data;
  },

  updateSchool: async (id: string, body: Partial<SchoolFormValues>) => {
    const { data } = await apiClient.patch<School>(
      SCHOOL_ENDPOINTS.DETAIL(id),
      body
    );
    return data;
  },

  switchSchool: async (id: string) => {
    const { data } = await apiClient.post<{ success: boolean }>(
      SCHOOL_ENDPOINTS.SWITCH(id)
    );
    return data;
  },
};
