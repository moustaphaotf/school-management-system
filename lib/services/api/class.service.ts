import apiClient from "@/lib/services/axios";
import { Class } from "@prisma/client";
import { ClassFormValues } from "@/lib/validations/class";
import { ClassWithLevel, ReorderClass } from "@/lib/types/class";
import { CLASS_ENDPOINTS } from "../endpoints";

export const classService = {
  getClasses: async () => {
    const { data } = await apiClient.get<ClassWithLevel[]>(
      CLASS_ENDPOINTS.BASE
    );
    return data;
  },

  getClass: async (id: string) => {
    const { data } = await apiClient.get<ClassWithLevel>(
      CLASS_ENDPOINTS.DETAIL(id)
    );
    return data;
  },

  createClass: async (body: ClassFormValues) => {
    const { data } = await apiClient.post<ClassWithLevel>(
      CLASS_ENDPOINTS.BASE,
      body
    );
    return data;
  },

  updateClass: async (id: string, body: Partial<ClassFormValues>) => {
    const { data } = await apiClient.patch<ClassWithLevel>(
      CLASS_ENDPOINTS.DETAIL(id),
      body
    );
    return data;
  },

  deleteClass: async (id: string) => {
    const { data } = await apiClient.delete(CLASS_ENDPOINTS.DETAIL(id));
    return data;
  },

  reorderClasses: async (body: ReorderClass[]) => {
    const { data } = await apiClient.patch<ClassWithLevel[]>(
      CLASS_ENDPOINTS.REORDER,
      body
    );
    return data;
  },
};
