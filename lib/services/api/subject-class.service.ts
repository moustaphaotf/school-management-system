import apiClient from "@/lib/services/axios";
import { SubjectClass } from "@prisma/client";
import { SubjectClassFormValues } from "@/lib/validations";
import { SUBJECT_CLASS_ENDPOINTS } from "../endpoints";
import {
  SubjectClassesFilters,
  SubjectClassWithRelations,
} from "@/lib/types/subject-class";
import { PaginatedResponse } from "@/lib/types/api";

export const subjectClassService = {
  getSubjectsClasses: async (params: SubjectClassesFilters = {}) => {
    const { data } = await apiClient.get<
      PaginatedResponse<SubjectClassWithRelations>
    >(SUBJECT_CLASS_ENDPOINTS.BASE, { params });
    return data;
  },

  createSubjectClass: async (body: SubjectClassFormValues) => {
    const { data } = await apiClient.post<SubjectClass>(
      SUBJECT_CLASS_ENDPOINTS.BASE,
      body
    );
    return data;
  },

  updateSubjectClass: async (
    id: string,
    body: Partial<SubjectClassFormValues>
  ) => {
    const { data } = await apiClient.patch<SubjectClass>(
      SUBJECT_CLASS_ENDPOINTS.DETAIL(id),
      body
    );
    return data;
  },

  deleteSubjectClass: async (id: string) => {
    const { data } = await apiClient.delete(SUBJECT_CLASS_ENDPOINTS.DETAIL(id));
    return data;
  },
};
