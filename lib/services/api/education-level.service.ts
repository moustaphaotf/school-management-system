import apiClient from "@/lib/services/axios";
import { EducationLevel } from "@prisma/client";
import { EducationLevelFormValues } from "@/lib/validations";
import { EDUCATION_LEVEL_ENDPOINT } from "../endpoints";

export const educationLevelService = {
  getLevels: async () => {
    const { data } = await apiClient.get<EducationLevel[]>(
      EDUCATION_LEVEL_ENDPOINT.BASE
    );
    return data;
  },

  getLevel: async (id: string) => {
    const { data } = await apiClient.get<EducationLevel>(
      EDUCATION_LEVEL_ENDPOINT.DETAIL(id)
    );
    return data;
  },

  createLevel: async (body: EducationLevelFormValues) => {
    const { data } = await apiClient.post<EducationLevel>(
      EDUCATION_LEVEL_ENDPOINT.BASE,
      body
    );
    return data;
  },

  updateLevel: async (id: string, body: Partial<EducationLevelFormValues>) => {
    const { data } = await apiClient.patch<EducationLevel>(
      EDUCATION_LEVEL_ENDPOINT.DETAIL(id),
      body
    );
    return data;
  },

  deleteLevel: async (id: string) => {
    const { data } = await apiClient.delete(
      EDUCATION_LEVEL_ENDPOINT.DETAIL(id)
    );
    return data;
  },

  reorderLevels: async (body: Pick<EducationLevel, "order" | "id">[]) => {
    const { data } = await apiClient.patch<EducationLevel[]>(
      EDUCATION_LEVEL_ENDPOINT.REORDER,
      body
    );
    return data;
  },
};
