import apiClient from "@/lib/services/axios";
import { Subject } from "@prisma/client";
import { SubjectFormValues } from "@/lib/validations";
import { SUBJECT_ENDPOINTS } from "../endpoints";

export const subjectService = {
  getSubjects: async () => {
    const { data } = await apiClient.get<Subject[]>(SUBJECT_ENDPOINTS.BASE);
    return data;
  },

  getSubject: async (id: string) => {
    const { data } = await apiClient.get<Subject>(SUBJECT_ENDPOINTS.DETAIL(id));
    return data;
  },

  createSubject: async (body: SubjectFormValues) => {
    const { data } = await apiClient.post<Subject>(
      SUBJECT_ENDPOINTS.BASE,
      body
    );
    return data;
  },

  updateSubject: async (id: string, body: Partial<SubjectFormValues>) => {
    const { data } = await apiClient.patch<Subject>(
      SUBJECT_ENDPOINTS.DETAIL(id),
      body
    );
    return data;
  },

  deleteSubject: async (id: string) => {
    const { data } = await apiClient.delete(SUBJECT_ENDPOINTS.DETAIL(id));
    return data;
  },
};
